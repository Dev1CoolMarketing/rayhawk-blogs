import type { Block } from 'payload'

import { link } from '@/fields/link'

export const Carousel: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  labels: {
    singular: 'Carousel',
    plural: 'Carousels',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            label: 'Link',
            admin: {
              description: 'Optional link or button for this slide.',
            },
          },
        }),
      ],
    },
    {
      name: 'autoPlay',
      type: 'checkbox',
      label: 'Auto-play slides',
      defaultValue: true,
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      label: 'Slide duration (ms)',
      defaultValue: 5000,
      min: 1500,
      admin: {
        description: 'Time each slide stays on screen when auto-play is enabled.',
        step: 500,
      },
    },
    {
      name: 'showDots',
      type: 'checkbox',
      label: 'Show pagination dots',
      defaultValue: true,
    },
    {
      name: 'showArrows',
      type: 'checkbox',
      label: 'Show navigation arrows',
      defaultValue: true,
    },
  ],
}
