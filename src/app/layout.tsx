import { Inter } from 'next/font/google'

import Provider from './Provider'
import Header from './Header'
import Footer from './Footer'
import MainContainer from './MainContainer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App Idea Generator by AI',
  description: 'Generate app ideas by AI',
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
