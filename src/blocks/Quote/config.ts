import type { Block } from 'payload'

export const Quote: Block = {
  slug: 'quote',
  interfaceName: 'QuoteBlock',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote',
      admin: {
        description: 'Primary quote text.',
      },
    },
    {
      name: 'attribution',
      type: 'text',
      label: 'Attribution',
      admin: {
        description: 'Who said it.',
      },
    },
    {
      name: 'context',
      type: 'text',
      label: 'Context',
      admin: {
        description: 'Optional role or organization.',
      },
    },
  ],
}
