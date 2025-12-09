'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Hero } from '@/heros/types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Hero> = ({
  links,
  media,
  overlayHeading,
  overlaySubheading,
  richText,
  subtitle,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && (
            <RichText
              className={subtitle ? 'mb-4' : 'mb-6'}
              data={richText}
              enableGutter={false}
            />
          )}
          {subtitle && <p className="mb-6 text-lg text-white/80">{subtitle}</p>}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none relative">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        {(overlayHeading || overlaySubheading) && (
          <div className="absolute bottom-6 right-6 max-w-md rounded-2xl bg-black/60 p-5 text-white backdrop-blur">
            {overlayHeading && <p className="text-lg font-semibold">{overlayHeading}</p>}
            {overlaySubheading && (
              <p className="mt-2 text-sm text-white/85">{overlaySubheading}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
