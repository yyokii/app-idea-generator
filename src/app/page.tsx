'use client'

import { useState } from 'react'
import { Button, Text, Heading, VStack, Select } from '../components'
import FeaturesList from './FeaturesList'
import Hero from './Hero'
import { appCategories } from '@/model/appCategory'
import { Idea } from '@/model/idea'
import { IdeaCard } from './IdeaCard'

export default function Home() {
  const [generatingError, setGeneratingError] = useState<string>('')
  const [generatedIdeas, setGeneratedIdeas] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  const [appCategory, setAppCateogry] = useState('')

  async function generateIdea(appCategory: string) {
    setGeneratedIdeas('')
    setGeneratingError('')
    setIsGenerating(true)

    const response = await fetch('/api/appIdea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appCategory,
      }),
    })

    if (!response.ok) {
      setIsGenerating(false)
      setGeneratingError(response.statusText)
      return
    }

    const data = response.body
    if (!data) {
      setIsGenerating(false)
      setGeneratingError('Failed to generate ideas. No data.')
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedIdeas((prev) => prev + chunkValue)
    }

    setIsGenerating(false)
  }

  function makeIdeaFromStreamData(data: string): Idea {
    const titlePattern = /title:\s*(.*)\s*description:/i
    const descriptionPattern = /description:\s*(.*)/i

    const titleMatch = data.match(titlePattern)
    const descriptionMatch = data.match(descriptionPattern)

    const title = titleMatch ? titleMatch[1] : ''
    const description = descriptionMatch ? descriptionMatch[1] : ''

    return {
      title,
      description,
    }
  }

  return (
    <VStack spacing={4} align='center'>
      <Hero />
      <FeaturesList />
      <VStack spacing={4} pb={8}>
        <Heading fontSize={'3xl'}>Try</Heading>
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
            colorScheme='red'
            size='lg'
            isLoading={isGenerating}
            onClick={async () => {
              await generateIdea(appCategory)
            }}
          >
            Generate
          </Button>
          {generatingError && <Text fontSize={'md'}>{generatingError}</Text>}

          <VStack spacing={4} align={'center'}>
            {generatedIdeas &&
              generatedIdeas
                .substring(generatedIdeas.indexOf('1') + 3)
                .split('2.')
                .map((data: string) => {
                  const idea = makeIdeaFromStreamData(data)
                  return <IdeaCard key={idea.title} idea={idea} />
                })}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
