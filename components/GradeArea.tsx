'use client'

import { useState } from 'react'

export interface GradeItem {
  id: string
  subject: string
  date: string
  grade: number
}

const MAX_VISIBLE_ITEMS = 4;

const ACCENTS = [
  { bar: 'bg-entreprenariat-500', bg: 'bg-entreprenariat-100', text: 'text-entreprenariat-700' },
  { bar: 'bg-tech-500', bg: 'bg-tech-100', text: 'text-tech-700' },
  { bar: 'bg-ia-500', bg: 'bg-ia-100', text: 'text-ia-700' },
  { bar: 'bg-structure-data-500', bg: 'bg-structure-data-100', text: 'text-structure-data-700' },
  { bar: 'bg-creativite-500', bg: 'bg-creativite-100', text: 'text-creativite-700' },
]

export default function GradeArea({ title, items }: { title: string; items: GradeItem[] }) {
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
      <ul className="flex flex-col rounded-3xl border border-border bg-paper px-4">
        {visibleItems.map((item, index) => {
          const accent = ACCENTS[index % ACCENTS.length];
          return (
          <li
            key={item.id}
            className={`flex items-center gap-3 py-3 ${
              index === visibleItems.length - 1 ? '' : 'border-b border-border'
            }`}
          >
            <span className={`h-full min-h-10 w-1 shrink-0 rounded-full ${accent.bar}`} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <h3 className="font-heading text-sm font-bold text-ink">{item.subject}</h3>
              <p className="text-xs text-ink-muted">{item.date}</p>
            </div>
            <span className={`flex h-11 w-14 shrink-0 items-center justify-center rounded-full text-sm font-bold ${accent.bg} ${accent.text}`}>
              {item.grade}
            </span>
          </li>
          );
        })}
      </ul>
    </section>
  )
}
