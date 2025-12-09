import type { Page } from '@/payload-types'

export type Hero = Page['hero'] & {
  subtitle?: string | null
  overlayHeading?: string | null
  overlaySubheading?: string | null
}
