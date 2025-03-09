import type { Metadata } from 'next'
import { Rosario } from 'next/font/google'
import './globals.css'

const rosario = Rosario({
  variable: '--font-rosario',
})

export const metadata: Metadata = {
  title: '7d Hymnal Kit',
  description: 'It is a toolkit to help us to create the 7d hymnal.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`${rosario.variable} antialiased`}>{children}</body>
    </html>
  )
}
