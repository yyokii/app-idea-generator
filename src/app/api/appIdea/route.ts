import { NextRequest } from 'next/server'
import { makeBadRequestErrorResponse, makeTooManyRequestsErrorResponse } from '../errorResponse'
import { rateLimit } from '@/util/rateLimit'
import { openAIStream } from './openAIStream'
import { appCategories } from '@/model/appCategory'

const limiter = rateLimit()

export const runtime = 'edge'

export async function POST(req: NextRequest): Promise<Response> {
  // リクエスト元のIPアドレスによりrate limitを設定
  let ip = req.ip ?? req.headers.get('x-real-ip') ?? ''
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (!ip && forwardedFor) {
    // 中間サーバーを経由している場合は、x-forwarded-forヘッダーから先頭のIPアドレスを取得
    ip = forwardedFor.split(',').at(0) ?? 'Unknown'
  }
  try {
    await limiter.check(5, ip) // 同一IPアドレスからのアクセスはインターバルで最大5回まで
  } catch (error: any) {
    console.log(error)
    return makeTooManyRequestsErrorResponse(error)
  }

  // OpenAI APIを使ってアイデアを生成
  const { appCategory } = (await req.json()) as {
    appCategory?: string
  }

  const isValidAppCategory =
    appCategory === '' || appCategories.some((category) => category.value === appCategory)

  if (!isValidAppCategory) {
    return makeBadRequestErrorResponse('Invalid app category')
  }

  const prompt = `
    What I want you to consider is an idea for an application, such as a mobile app or web app.
    As much as possible, please make the application idea something that has never been seen before.
    Please output 2 product ideas. Each output should only include the product name and a brief description(about 150 words).

    Below are the answers to the questions.
    You set the target users and what problem you want to solve at random, and create an idea based on that and the answers below.

    Q. What is the category of product you want to create?
    A. ${appCategory ?? 'Not specified. Assume random.'}

    The output is the product name and its details.
    Each idea should be labeled "1. ", "2. ".
    The title should be prefixed with title: and the description should be prefixed with description:.
    An example output is shown below.

    1. title: product name
    description: product description

    2. title: product name
    description: product description
  `

  const payload = {
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 500,
    stream: true,
    n: 1,
  }

  const stream = await openAIStream(payload)
  return new Response(stream)
}
