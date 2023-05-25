import { Container, Heading, Stack, Text, Button, Box } from '../components'

export default function Hero() {
  return (
    <Container maxW={'5xl'}>
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
          Create{' '}
          <Text as={'span'} color={'orange.400'}>
            Idea
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          This is a service that allows you to save articles you read with comments and create your
          own curation page.
        </Text>
      </Stack>
    </Container>
  )
}
