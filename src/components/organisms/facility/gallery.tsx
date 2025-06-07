'use client'

import { Media, MediaListBlock } from '@/payload-types'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel'
import PayloadMedia from '@/components/shared/payload-media'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

interface GalleryProps extends MediaListBlock {
  className?: string
}

const Gallery: React.FC<GalleryProps> = ({ className, mediaList }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())

    api.on('select', onSelect)
    onSelect() // Set initial dot

    // Cleanup
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // Dot click handler
  const handleDotClick = (idx: number) => {
    if (api) api.scrollTo(idx)
  }

  const multipleMedia = mediaList && mediaList.length > 1

  return (
    <div className={cn('relative', className)}>
      <Carousel
        className="h-full"
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-0">
          {mediaList?.map((item) => {
            if (!item.media) return null

            return (
              <CarouselItem
                key={item.id}
                className={'h-full w-full flex items-center justify-center pl-0'}
              >
                <div className="w-full">
                  <PayloadMedia {...(item.media as Media)} className="xl:object-cover" />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {multipleMedia && (
          <>
            <CarouselPrevious
              className="absolute top-1/2 -translate-y-1/2 md:left-6 left-4 border-none cursor-pointer"
              icon={<LuChevronLeft className="text-white size-8" />}
            />
            <CarouselNext
              className="absolute top-1/2 -translate-y-1/2 md:right-6 right-4 border-none cursor-pointer"
              icon={<LuChevronRight className="text-white size-8" />}
            />
          </>
        )}
      </Carousel>

      {multipleMedia && (
        <div className="absolute flex items-center justify-center gap-3 mt-6 left-1/2 -translate-x-1/2 md:bottom-6 bottom-4 z-10">
          {mediaList?.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleDotClick(idx)}
              className={cn(
                'md:size-3 size-2 rounded-full border-none outline-none cursor-pointer',
                {
                  'bg-gray-200': selectedIndex !== idx,
                  'bg-gray-500': selectedIndex === idx,
                },
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
