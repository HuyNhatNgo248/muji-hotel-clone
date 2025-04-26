import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { News } from '@/payload-types'
import { Params } from '@/types'

import { fetchById } from '@/lib/api'
import PayloadRichText from '@/components/shared/payload-richtext'
import { getDictionary } from '../../dictionaries'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'

export default async function Page({ params }: Params) {
  const { lang, id } = await params

  if (!id) return notFound()

  const news = await fetchById('news', id, lang, 2)

  if (!news) return notFound()

  const dictionary = await getDictionary(lang)

  const { title, content, publishedDate } = news as News

  return (
    <div className="w-container py-container">
      <h2 className="text-2xl font-semibold mb-8 capitalize">{dictionary['news']['news']}</h2>

      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-8 xl:w-1/2 lg:w-2/3 md:w-[80%] w-full text-xl">
          <div>
            {title && <p className="mb-4 text-2xl font-semibold">{title}</p>}
            {publishedDate && <p className="text-sm text-gray-500">{formatDate(publishedDate)}</p>}
          </div>

          <div className={'text-base font-normal'}>
            {content && <PayloadRichText data={content as SerializedEditorState} />}
          </div>
        </div>
      </div>
    </div>
  )
}
