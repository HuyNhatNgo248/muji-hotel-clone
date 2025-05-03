'use client'

import { NewsBlock, News } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn, formatDate } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Logo from '@/components/organisms/logo'
import PayloadRichText from '@/components/shared/payload-richtext'
import React from 'react'
import { Separator } from '@/components/ui/separator'

interface NewsListProps extends NewsBlock {
  className?: string
}

const NewsList: React.FC<NewsListProps> = ({ className, news }) => {
  const router = useRouter()

  if (!news) return null

  return (
    <div className={cn('flex flex-col lg:gap-8 gap-16', className)}>
      {(news as News[]).map((item, index) => (
        <React.Fragment key={`${item.id}-${index}`}>
          <div
            className="flex flex-col gap-4 cursor-pointer"
            onClick={() => router.push(`/news/${item.id}`)}
          >
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
                {item.title && <p className="text-xl font-bold tracking-wide">{item.title}</p>}

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
