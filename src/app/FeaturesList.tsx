import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '../components'
import { AiOutlineCheck } from 'react-icons/ai'

// Replace test data with your own
const features = [
  {
    id: 1,
    title: 'Free',
    text: 'This service is free to start.',
  },
  {
    id: 2,
    title: 'AI',
    text: "This service uses OpenAI's API.",
  },
  {
    id: 3,
    title: 'Simple',
    text: 'Just press one button.',
  },
]

export default function FeaturesList() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Features</Heading>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <AiOutlineCheck />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
