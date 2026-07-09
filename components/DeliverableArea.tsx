'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export interface DeliverableItem {
  id: string
  title: string
  dueLabel: string
  subtitle: string
  href?: string
}

const MAX_VISIBLE_ITEMS = 2;

const ACCENTS = [
  { bg: 'bg-entreprenariat-100', text: 'text-entreprenariat-700' },
  { bg: 'bg-tech-100', text: 'text-tech-700' },
  { bg: 'bg-ia-100', text: 'text-ia-700' },
  { bg: 'bg-structure-data-100', text: 'text-structure-data-700' },
  { bg: 'bg-creativite-100', text: 'text-creativite-700' },
]

export default function DeliverableArea({ title, items }: { title: string; items: DeliverableItem[] }) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, MAX_VISIBLE_ITEMS);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-baseline justify-between">
        <h2 className="font-heading text-xl font-bold text-ink">{title}</h2>
        {items.length > MAX_VISIBLE_ITEMS && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="font-body text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            {showAll ? 'Voir moins' : 'Tout voir'}
          </button>
        )}
      </header>
      <ul className="flex flex-col gap-4">
        {visibleItems.map((item, index) => {
          const accent = ACCENTS[index % ACCENTS.length];
          return (
          <li key={item.id}>
            <a
              href={item.href ?? '#'}
              className="flex items-center gap-4 rounded-3xl border border-border bg-paper p-4 transition hover:bg-paper-soft"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
                <FontAwesomeIcon icon={faFileLines} className="h-5 w-5" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="font-heading text-sm font-bold text-ink">{item.title}</h3>
                <p className="text-xs text-ink-muted">{item.dueLabel}</p>
                <p className="text-xs text-ink-muted">{item.subtitle}</p>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 shrink-0 text-ink" />
            </a>
          </li>
          );
        })}
      </ul>
    </section>
  )
}
