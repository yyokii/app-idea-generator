import { Idea } from '@/model/idea'
import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'
import { makeBadRequestErrorResponse } from '../errorResponse'

export async function POST(request: Request) {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })
  delete configuration.baseOptions.headers['User-Agent']
  const openAIAPI = new OpenAIApi(configuration)

  const body = await request.json()

  try {
    const completion = await openAIAPI.createCompletion({
      model: 'text-davinci-003',
      prompt: `
        What I want you to consider is an idea for an application, such as a mobile app or web app.
        As much as possible, please make the application idea something that has never been seen before.
        Please output 3 product ideas. Each output should only include the product name and a brief description(about 150 words).

        Below are the answers to the questions.
        You set the target users and what problem you want to solve at random, and create an idea based on that and the answers below.

        Q. What is the category of product you want to create?
        A. ${body.appCategory}

        The output should be in JSON format, and only output the content of JSON.
        Start with the output of JSON, and end the answer when the output of JSON is finished. Please use the following key names for JSON.
        Array key: product
        Product name key: name
        Product details key: description

        Below is an example output.

        {
          "product": [
            {
              "name": "sample name",
              "description": "sample description"
            },
            {
              "name": "sample name",
              "description": "sample description"
            }
          ]
        }
        `,
      max_tokens: 500,
    })

    const generatedIdeas = completion.data.choices[0].text ?? ''
    if (generatedIdeas) {
      const data = JSON.parse(generatedIdeas)
      const ideas: [Idea] = data.product.map((item: any) => ({
        name: item.name,
        description: item.description,
      }))

      return NextResponse.json(ideas)
    } else {
      return makeBadRequestErrorResponse('No generated data.')
    }
  } catch (e: any) {
    console.log(e)
    return makeBadRequestErrorResponse(e)
  }
}