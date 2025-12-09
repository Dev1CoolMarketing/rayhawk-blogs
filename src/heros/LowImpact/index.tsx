import React from 'react'

import type { Hero } from '@/heros/types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      subtitle?: Hero['subtitle']
    }
  | (Omit<Hero, 'richText'> & {
      children?: never
      richText?: Hero['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText, subtitle }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
        {subtitle && (
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
