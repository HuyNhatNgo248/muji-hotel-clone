import { NewsBlock, News } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { MujiLocale } from '@/types'

import { cn, formatDate } from '@/lib/utils'
import Link from 'next/link'
import Logo from '@/components/organisms/logo'
import PayloadRichText from '@/components/shared/payload-richtext'
import React from 'react'
import { Separator } from '@/components/ui/separator'

interface NewsListProps extends NewsBlock {
  className?: string
  lang: MujiLocale
}

const NewsList: React.FC<NewsListProps> = ({ className, news, lang }) => {
  if (!news) return null

  return (
    <div className={cn('flex flex-col lg:gap-8 gap-16', className)}>
      {(news as News[]).map((item, index) => (
        <React.Fragment key={`${item.id}-${index}`}>
          {/* Title link stretches over the card; previews contain links, so the card itself can't be an <a> */}
          <div className="relative flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="lg:flex flex-col items-center justify-center xl:w-56 lg:w-48 hidden aspect-square bg-gray-300 flex-shrink-0">
                <Logo
                  classNames={{
                    container: 'text-white lg:flex hidden',
                  }}
                  orientation="vertical"
                  variant="xs"
                  companyName="MUJI HOTEL"
                  branchName="GINZA"
                  blockType="logo"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  href={`/${lang}/news/${item.id}`}
                  className="text-xl font-bold tracking-wide after:absolute after:inset-0"
                >
                  {item.title}
                </Link>

                {item.publishedDate && <p>{formatDate(item.publishedDate)}</p>}

                {item.content && (
                  <PayloadRichText
                    data={item.content as SerializedEditorState}
                    classNames={{
                      container: 'line-clamp-4 text-sm',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-12 mx-auto">
            <Separator className="bg-black" />
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default NewsList
