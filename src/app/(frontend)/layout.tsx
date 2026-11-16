import React from 'react'
import './styles.css'
import { LapProgress, MotionProvider } from './components/motion'

export const metadata = {
  title: 'Maranello Annual — Ferrari road and race cars',
  description:
    'An unofficial gallery of Ferrari road cars and Scuderia Ferrari Formula 1 cars, from the 125 S of 1947 to today.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap"
        />
      </head>
      <body>
        <MotionProvider>
          <LapProgress />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
