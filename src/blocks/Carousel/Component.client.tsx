'use client'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React, { useEffect, useMemo, useState } from 'react'

import type { CarouselBlock } from './types'

type Props = CarouselBlock & {
  className?: string
}

export const CarouselClient: React.FC<Props> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className,
}) => {
  const slideList = useMemo(
    () => (slides || []).filter((slide) => slide?.media && typeof slide.media === 'object'),
    [slides],
  )

  const totalSlides = slideList.length
  const [activeIndex, setActiveIndex] = useState(0)
  const resolvedInterval = Math.max(Number(autoPlayInterval) || 0, 1500)

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides)
    }, resolvedInterval)

    return () => window.clearInterval(timer)
  }, [autoPlay, resolvedInterval, totalSlides])

  useEffect(() => {
    if (activeIndex > totalSlides - 1) {
      setActiveIndex(0)
    }
  }, [activeIndex, totalSlides])

  if (!totalSlides) return null

  const goTo = (direction: number) => {
    setActiveIndex((prev) => (prev + direction + totalSlides) % totalSlides)
  }

  return (
    <div className={cn('not-prose', className)}>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative h-[320px] sm:h-[420px]">
          {slideList.map((slide, index) => {
            const isActive = index === activeIndex
            const link = slide.link || undefined

            return (
              <div
                key={slide.id || index}
                aria-hidden={!isActive}
                className={cn(
                  'absolute inset-0 transition-opacity duration-500 ease-in-out',
                  isActive ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                <Media
                  fill
                  imgClassName="object-cover"
                  priority={index === 0}
                  resource={slide.media}
                />

                {(slide.heading || slide.description || link) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 text-white">
                    {slide.heading && <h3 className="text-xl font-semibold">{slide.heading}</h3>}
                    {slide.description && (
                      <p className="mt-2 max-w-3xl text-sm text-white/90 md:text-base">
                        {slide.description}
                      </p>
                    )}
                    {link && (
                      <div className="mt-4">
                        <CMSLink {...link} appearance={link.appearance || 'default'} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {showArrows && totalSlides > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              aria-label="Previous slide"
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/70 text-foreground shadow ring-1 ring-border backdrop-blur transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => goTo(-1)}
              type="button"
            >
              ‹
            </button>
            <button
              aria-label="Next slide"
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/70 text-foreground shadow ring-1 ring-border backdrop-blur transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => goTo(1)}
              type="button"
            >
              ›
            </button>
          </div>
        )}

        {showDots && totalSlides > 1 && (
          <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slideList.map((_, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={cn(
                    'pointer-events-auto h-2 rounded-full transition-all duration-200',
                    isActive
                      ? 'w-6 bg-white shadow'
                      : 'w-2 bg-white/60 hover:bg-white focus-visible:bg-white',
                  )}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
