import type { Media, Page, Post } from '@/payload-types'

type CarouselReference = {
  relationTo: 'pages' | 'posts'
  value: number | string | Page | Post
}

export type CarouselLink = {
  appearance?: 'default' | 'outline' | null
  label?: string | null
  newTab?: boolean | null
  reference?: CarouselReference | null
  type?: 'reference' | 'custom' | null
  url?: string | null
} | null

export type CarouselSlide = {
  id?: string | null
  media?: Media | number | string | null
  heading?: string | null
  description?: string | null
  link?: CarouselLink
}

export type CarouselBlock = {
  slides?: CarouselSlide[]
  autoPlay?: boolean | null
  autoPlayInterval?: number | null
  showDots?: boolean | null
  showArrows?: boolean | null
}
