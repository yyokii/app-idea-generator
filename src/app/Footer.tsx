'use client'

import {
  Box,
  chakra,
  Container,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '../components'
import { ReactNode } from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const SocialButton = ({
  children,
  label,
  onclick,
}: {
  children: ReactNode
  label: string
  onclick: () => void
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      onClick={onclick}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <HStack>
          {/* <Image src='/images/icon.png' width={32} height={32} alt='My avatar' /> */}
          <Text fontWeight={'semibold'}>idea</Text>
        </HStack>

        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'Github'}
            onclick={() => {
              window.open('https://github.com/yyokii', '_blank')
            }}
          >
            <FaGithub />
          </SocialButton>
          <SocialButton
            label={'Twitter'}
            onclick={() => {
              window.open('https://twitter.com/enyyokii', '_blank')
            }}
          >
            <FaTwitter />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
