import { Inter } from 'next/font/google'

import Provider from './Provider'
import Header from './Header'
import Footer from './Footer'
import MainContainer from './MainContainer'

const inter = Inter({ subsets: ['latin'] })

const siteName = 'App Idea Generator by AI'
const description = 'Generate app ideas by AI'
const url = 'https://app-idea-generator-rust.vercel.app/'

export const metadata = {
  title: {
    default: siteName,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    type: 'website',
  },
  alternates: {
    canonical: url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <Header />
          <MainContainer>{children}</MainContainer>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
