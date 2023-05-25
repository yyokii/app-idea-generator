'use client'

import { useState } from 'react'
import { Button, Text, Heading, VStack, Select } from '../components'
import FeaturesList from './FeaturesList'
import Hero from './Hero'
import { Configuration, OpenAIApi } from 'openai'
import { appCategories } from '@/model/appCategory'
import { Idea } from '@/model/idea'
import { IdeaCard } from './IdeaCard'

export default function Home() {
  const [generatingError, setGeneratingError] = useState<string>('')
  const [generatedIdeas, setGeneratedIdeas] = useState<[Idea]>()
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  const [appCategory, setAppCateogry] = useState('')

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })
  delete configuration.baseOptions.headers['User-Agent']
  const openAIAPI = new OpenAIApi(configuration)

  async function generateIdeas() {
    setGeneratingError('')
    setIsGenerating(true)

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
        A. ${appCategory}

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

      console.log(generatedIdeas)
      if (generatedIdeas) {
        const data = JSON.parse(generatedIdeas)
        const ideas: [Idea] = data.product.map((item: any) => ({
          name: item.name,
          description: item.description,
        }))
        setGeneratedIdeas(ideas)
      } else {
        setGeneratingError('Error occurred while parsing and formating. Please try again later.')
      }
    } catch (error: any) {
      console.log(error)
      if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
        setGeneratingError('error')
      } else {
        setGeneratingError('Error occurred while generating ideas. Please try again later.')
      }
    }

    setIsGenerating(false)
  }

  return (
    <VStack spacing={4} align='center'>
      <Hero />
      <FeaturesList />
      <VStack spacing={4} pb={8}>
        <Heading fontSize={'3xl'}>Start</Heading>
        <VStack spacing={4} pb={8}>
          <Heading fontSize={'xl'}>What is the category of product you want to create?</Heading>
          <Select
            placeholder='select category'
            value={appCategory}
            onChange={(e) => setAppCateogry(e.target.value)}
          >
            {appCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>

          <Button
            colorScheme='orange'
            size='lg'
            isLoading={isGenerating}
            onClick={async () => {
              await generateIdeas()
              // demo()
            }}
          >
            Generate
          </Button>
          {generatingError && <Text fontSize={'md'}>{generatingError}</Text>}

          <VStack spacing={4} align={'center'}>
            {generatedIdeas?.map((idea) => (
              <IdeaCard key={idea.name} name={idea.name} description={idea.description} />
            ))}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
