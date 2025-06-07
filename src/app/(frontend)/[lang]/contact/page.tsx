import { Params } from '@/types'
import { DynamicZone } from '@/types'

import { fetchPage } from '@/lib/api'
import { notFound } from 'next/navigation'
import Faq from '@/components/organisms/faq'
import { getDictionary } from '../dictionaries'

export default async function Page({ params }: Params) {
  const { lang } = await params

  const page = await fetchPage('/contact', lang, {}, 5)

  if (!page) return notFound()

  const dynamicZone = page.dynamicZone as DynamicZone

  const faqs = dynamicZone?.filter((item) => item.blockType === 'faq')

  const dictionary = await getDictionary(lang)

  return (
    <div className="py-container-sm">
      <div className="xl:w-[64%] md:w-[80%] w-[90%] mx-auto">
        <h2 className="text-4xl font-semibold mb-16 capitalize">
          {dictionary['contact']['contact']}
        </h2>
        <div className="flex flex-col gap-12">
          {faqs?.map((faq, index) => <Faq key={`${faq.id}-${index}`} {...faq} />)}
        </div>
      </div>
    </div>
  )
}
