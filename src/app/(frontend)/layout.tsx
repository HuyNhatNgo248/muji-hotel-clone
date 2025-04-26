import '../globals.css'

import { Roboto } from 'next/font/google'

export const metadata = {
  description: 'MUJI HOTEL',
  title: 'MUJI HOTEL',
}

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={roboto.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
