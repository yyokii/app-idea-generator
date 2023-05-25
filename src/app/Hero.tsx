import { Container, Heading, Stack, Text, Button, Box, HStack } from '../components'
import Image from 'next/image'

export default function Hero() {
  return (
    <Container maxW={'5xl'}>
      <Stack align={'center'} direction={{ base: 'column', md: 'row' }} spacing='24px'>
        <Image src='/top.png' alt='top image' width={300} height={300} />
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 4, md: 8 }}
          py={{ base: 4, md: 8 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            App Idea Generator <Text as={'span'}>by </Text>
            <Text as={'span'} color={'red.400'}>
              AI
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            A free and straightforward service that generates creative app ideas. This AI-powered
            tool is perfect for aspiring developers and entrepreneurs looking for innovative
            concepts. In just a few clicks, let AI transform your ideas into potential app concepts,
            sparking your creativity and assisting you in your app development journey. Discover
            innovation with us.
          </Text>
        </Stack>
      </Stack>
    </Container>
  )
}
