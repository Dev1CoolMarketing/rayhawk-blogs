import React from 'react'

import type { Hero } from '@/heros/types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Hero> = ({
  links,
  media,
  overlayHeading,
  overlaySubheading,
  richText,
  subtitle,
}) => {
  return (
    <div className="">
      <div className="container mb-8">
        {richText && (
          <RichText
            className={subtitle ? 'mb-4' : 'mb-6'}
            data={richText}
            enableGutter={false}
          />
        )}
        {subtitle && (
          <p className="mb-6 text-lg text-neutral-700 dark:text-neutral-300">{subtitle}</p>
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
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
      <div className="container ">
        {media && typeof media === 'object' && (
          <div className="relative">
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {(overlayHeading || overlaySubheading) && (
              <div className="absolute bottom-6 left-6 max-w-lg rounded-2xl bg-black/60 p-5 text-white backdrop-blur">
                {overlayHeading && <p className="text-xl font-semibold">{overlayHeading}</p>}
                {overlaySubheading && (
                  <p className="mt-2 text-sm text-white/85">{overlaySubheading}</p>
                )}
              </div>
            )}
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
