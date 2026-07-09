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

export default function DeliverableArea({ title, items }: { title: string; items: DeliverableItem[] }) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, MAX_VISIBLE_ITEMS);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-baseline justify-between">
        <h2 className="font-heading text-lg font-bold text-ink">{title}</h2>
        {items.length > MAX_VISIBLE_ITEMS && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm text-ink-muted"
          >
            {showAll ? 'Voir moins' : 'Tout voir'}
          </button>
        )}
      </header>
      <ul className="flex flex-col gap-4">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href ?? '#'}
              className="flex items-center gap-4 rounded-2xl border-2 border-ink p-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper-soft text-ink">
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
        ))}
      </ul>
    </section>
  )
}
