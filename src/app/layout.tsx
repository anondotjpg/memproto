import type { Metadata } from 'next'
import { Pixelify_Sans } from 'next/font/google'
import './globals.css'
import SessionProvider from './components/SessionProvider'

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400'], // Pixelify only supports 400
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Meme Protocol',
  description: 'All Roads Lead to Meme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={pixelify.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
