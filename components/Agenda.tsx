'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function formatTime(iso: string) {
  const date = new Date(iso);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}h${minutes}`;
}

function isHappeningNow(item: AgendaItem, now: Date) {
  const start = new Date(item.startDate);
  if (!item.endDate) return now >= start;
  return now >= start && now <= new Date(item.endDate);
}

function formatDayLabel(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(new Date(iso));
}

function groupByDay(items: AgendaItem[]) {
  const sorted = [...items].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  const groups: { dateKey: string; label: string; items: AgendaItem[] }[] = [];
  for (const item of sorted) {
    const dateKey = new Date(item.startDate).toDateString();
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.dateKey === dateKey) {
      lastGroup.items.push(item);
    } else {
      groups.push({ dateKey, label: formatDayLabel(item.startDate), items: [item] });
    }
  }
  return groups;
}

const MAX_VISIBLE_ITEMS = 4;

export default function Agenda({ title, type, items }: { title: string; type: 'course' | 'event'; items: AgendaItem[] }) {
  const now = new Date();
  const [showAll, setShowAll] = useState(false);
  const typeItems = items
    .filter((item) => item.source === type)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const visibleItems = showAll ? typeItems : typeItems.slice(0, MAX_VISIBLE_ITEMS);
  const dayGroups = groupByDay(visibleItems);
  return (
    <section className="flex flex-col gap-5 px-2">
      <header className="relative flex items-center justify-center">
        <h2 className="font-heading text-xl font-bold text-ink text-center">{title}</h2>
        {typeItems.length > MAX_VISIBLE_ITEMS && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="absolute right-0 font-body text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            {showAll ? 'Voir moins' : 'Tout voir'}
          </button>
        )}
      </header>
      <div className="flex flex-col gap-5">
        {dayGroups.map((group) => (
          <div key={group.dateKey} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="font-heading text-xs font-bold uppercase text-ink-muted">{group.label}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <ol className="relative flex flex-col gap-6">
              <div className="absolute left-[6px] top-2 bottom-2 w-px bg-border" />
              {group.items.map((item) => {
                const isCurrent = isHappeningNow(item, now);
                return (
                <li key={item.id} className="flex items-stretch gap-4">
                  <div className="relative w-3.5 shrink-0">
                    <span
                      className={`relative z-10 mt-1.5 block h-3.5 w-3.5 rounded-full border-2 bg-paper ${
                        isCurrent ? 'border-entreprenariat bg-entreprenariat' : 'border-border'
                      }`}
                    />
                  </div>
                  <div
                    className={`flex flex-1 items-stretch gap-4 ${
                      isCurrent
                        ? '-my-1 rounded-3xl border border-entreprenariat-300 bg-entreprenariat-100/40 p-4'
                        : 'border-b border-border pb-4 last:border-b-0 last:pb-0'
                    }`}
                  >
                    <div
                      className={`w-20 shrink-0 font-heading text-sm font-bold text-ink ${
                        item.endDate ? '' : 'self-start text-center'
                      }`}
                    >
                      {formatTime(item.startDate)}
                      {item.endDate && ` - ${formatTime(item.endDate)}`}
                    </div>
                    <div className="w-px bg-border" />
                    <div className="flex flex-col gap-1">
                      <h3 className={`font-heading text-sm font-bold ${isCurrent ? 'text-entreprenariat' : 'text-ink'}`}>{item.name}</h3>
                      {item.source === 'course' && (
                        <p className="text-xs text-ink-muted">{item.room}</p>
                      )}
                      <p className="flex items-center gap-1.5 text-xs text-ink-muted">
                        <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                        {item.source === 'course' ? `Avec ${item.referent}` : `Publié par ${item.referent}`}
                      </p>
                    </div>
                  </div>
                </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
