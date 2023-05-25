import { Text, Flex } from '../components'

export default function Header() {
  return (
    <Flex
      padding={2}
      h='40px'
      backgroundColor='white'
      w='100%'
      alignItems={'center'}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={'gray.300'}
    >
      <Text fontSize='lg' fontWeight='bold'>
        App Idea Generator by AI
      </Text>
    </Flex>
  )
}
