'use client'

import { useState } from 'react'

export interface GradeItem {
  id: string
  subject: string
  date: string
  grade: number
}

const MAX_VISIBLE_ITEMS = 4;

export default function GradeArea({ title, items }: { title: string; items: GradeItem[] }) {
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
      <ul className="flex flex-col">
        {visibleItems.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center gap-3 py-3 ${
              index === visibleItems.length - 1 ? '' : 'border-b border-border'
            }`}
          >
            <span className="h-full min-h-10 w-1 shrink-0 rounded-full bg-ink" />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <h3 className="font-heading text-sm font-bold text-ink">{item.subject}</h3>
              <p className="text-xs text-ink-muted">{item.date}</p>
            </div>
            <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-full bg-paper-soft text-sm font-bold text-ink">
              {item.grade}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
