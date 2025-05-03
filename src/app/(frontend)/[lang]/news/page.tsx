import { DynamicZone, Params } from '@/types'

import { fetchPage } from '@/lib/api'
import { notFound } from 'next/navigation'
import NewsList from './components/news-list'
import { getDictionary } from '../dictionaries'
import SocialMedia from '@/components/organisms/social-media'

export default async function Page({ params }: Params) {
  const { lang } = await params

  const page = await fetchPage('/news', lang, {}, 5)

  if (!page) return notFound()

  const dynamicZone = page.dynamicZone as DynamicZone

  const news = dynamicZone?.find((item) => item.blockType === 'news')

  const socialMedia = dynamicZone?.find((item) => item.blockType === 'social-media')

  const dictionary = await getDictionary(lang)

  return (
    <div className="flex flex-col justify-center py-container w-container gap-20">
      <div className="xl:w-[64%] w-[80%] mx-auto">
        <h2 className="text-4xl font-semibold mb-16 capitalize">{dictionary['news']['news']}</h2>
        {news && <NewsList {...news} />}
      </div>

      {socialMedia && <SocialMedia {...socialMedia} />}
    </div>
  )
}
