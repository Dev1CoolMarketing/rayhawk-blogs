import React from 'react'

import { CarouselClient } from './Component.client'
import type { CarouselBlock as CarouselBlockType } from './types'

type Props = CarouselBlockType & {
  className?: string
}

export const CarouselBlock: React.FC<Props> = (props) => {
  return <CarouselClient {...props} />
}
