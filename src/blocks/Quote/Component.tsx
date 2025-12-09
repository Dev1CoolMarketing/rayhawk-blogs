import React from 'react'

import type { QuoteBlock as QuoteBlockType } from './types'

type Props = QuoteBlockType & {
  className?: string
}

export const QuoteBlock: React.FC<Props> = ({ quote, attribution, context, className }) => {
  return (
    <div
      className={[
        'not-prose rounded-2xl border border-border bg-card px-8 py-6 shadow-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex gap-3">
        <span aria-hidden className="text-4xl leading-none text-primary">
          “
        </span>
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-foreground/90">{quote}</p>
          {(attribution || context) && (
            <div className="text-sm text-muted-foreground">
              {attribution && <span className="font-semibold">{attribution}</span>}
              {attribution && context && <span className="mx-2">•</span>}
              {context && <span>{context}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
