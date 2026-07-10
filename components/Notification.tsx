'use client'

import { BellIcon } from './home/icons'

export interface NotificationItem {
  id: string
  title: string
  message: string
  date: string
  category?: 'entreprenariat' | 'tech' | 'ia' | 'structure-data' | 'creativite'
  read?: boolean
}

const ACCENTS: Record<NonNullable<NotificationItem['category']>, { bg: string; text: string }> = {
  entreprenariat: { bg: 'bg-entreprenariat-100', text: 'text-entreprenariat-700' },
  tech: { bg: 'bg-tech-100', text: 'text-tech-700' },
  ia: { bg: 'bg-ia-100', text: 'text-ia-700' },
  'structure-data': { bg: 'bg-structure-data-100', text: 'text-structure-data-700' },
  creativite: { bg: 'bg-creativite-100', text: 'text-creativite-700' },
}

export default function Notification({
  items,
  isOpen,
  onClose,
}: {
  items: NotificationItem[]
  isOpen: boolean
  onClose: () => void
}) {
  const unreadCount = items.filter((item) => !item.read).length

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
          <div
            className="flex max-h-[80vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-paper shadow-[0_20px_40px_-24px_rgba(23,10,46,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border p-5">
              <div>
                <h2 className="font-heading text-lg font-bold text-ink">Notifications</h2>
                {unreadCount > 0 && (
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition hover:bg-paper-soft"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col overflow-y-auto">
              {items.length === 0 ? (
                <li className="p-6 text-center text-sm text-ink-muted">
                  Aucune notification pour le moment
                </li>
              ) : (
                items.map((item) => {
                  const accent = ACCENTS[item.category ?? 'entreprenariat']
                  return (
                    <li
                      key={item.id}
                      className="flex gap-3 border-b border-border p-4 last:border-b-0"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}
                      >
                        <BellIcon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading text-sm font-bold text-ink">{item.title}</h3>
                          {!item.read && (
                            <span
                              aria-hidden
                              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-entreprenariat-500"
                            />
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-ink-muted">{item.message}</p>
                        <p className="mt-1 text-xs text-ink-muted/70">{item.date}</p>
                      </div>
                    </li>
                  )
                })
              )}
            </ul>
          </div>
    </div>
  )
}
