import { Params } from '@/types'

export default async function Page({ params }: Params) {
  const { lang } = await params

  return (
    <div className="flex flex-col justify-center gap-40 py-container">
      <h1 className="text-4xl font-bold text-center">{lang}</h1>
      <p className="text-center">News</p>
    </div>
  )
}
