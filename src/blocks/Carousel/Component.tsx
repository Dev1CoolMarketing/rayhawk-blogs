import React from 'react'

import { CarouselClient } from './Component.client'
import type { CarouselBlock } from './types'

type Props = CarouselBlock & {
  className?: string
}

export const CarouselBlock: React.FC<Props> = (props) => {
  return <CarouselClient {...props} />
}
