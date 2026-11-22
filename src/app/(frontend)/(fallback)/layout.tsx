import '../../globals.css'

import { roboto } from '@/lib/fonts'

export const metadata = {
  description: 'MUJI HOTEL',
  title: 'MUJI HOTEL',
}

// Root layout for URLs outside /{lang} (the bilingual 404); /{lang} pages have their own root layout
export default function FallbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={roboto.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
