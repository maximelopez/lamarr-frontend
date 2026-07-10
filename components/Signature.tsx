'use client'

import { useRef, useState } from 'react'
import { CalendarIcon, CheckIcon, PencilIcon, UserIcon } from './home/icons'

function formatTime(iso: string) {
  const date = new Date(iso)
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}h${minutes}`
}

export default function Signature({
  course,
  trigger,
  signedTrigger,
  triggerClassName,
  signedTriggerClassName,
}: {
  course: CourseAgendaItem
  trigger?: React.ReactNode
  signedTrigger?: React.ReactNode
  triggerClassName?: string
  signedTriggerClassName?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)

  const getContext = () => canvasRef.current?.getContext('2d') ?? null

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = getContext()
    if (!ctx) return
    isDrawing.current = true
    setHasDrawn(true)
    const { x, y } = getPoint(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return
    const ctx = getContext()
    if (!ctx) return
    const { x, y } = getPoint(e)
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#170a2e'
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    isDrawing.current = false
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = getContext()
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const closeModal = () => {
    setIsOpen(false)
    clearSignature()
  }

  const confirmSignature = () => {
    if (!hasDrawn) return
    setIsSigned(true)
  }

  return (
    <>
      <button
        type="button"
        disabled={isSigned}
        onClick={() => setIsOpen(true)}
        className={
          isSigned
            ? (signedTriggerClassName ?? triggerClassName ?? "") + " cursor-not-allowed"
            : triggerClassName ??
              "flex min-h-11 items-center gap-2 rounded-full bg-entreprenariat-500 px-4 font-body text-sm font-semibold text-paper transition hover:opacity-90"
        }
      >
        {isSigned
          ? signedTrigger ?? trigger ?? "Présence signée"
          : trigger ?? "Signer ma présence"}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-3xl border border-border bg-paper p-6 shadow-[0_20px_40px_-24px_rgba(23,10,46,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            {isSigned ? (
              <div className="flex flex-col items-center gap-3 rounded-3xl border border-tech-300 bg-tech-100/40 p-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tech-100 text-tech-700 shadow-sm">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h2 className="font-heading text-lg font-bold text-ink">Présence signée</h2>
                <p className="text-sm text-ink-muted">
                  {course.name} — {course.room}
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition hover:opacity-90"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-entreprenariat-100 text-entreprenariat-500">
                      <PencilIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-heading text-lg font-bold text-ink">Émargement</h2>
                      <p className="text-sm text-ink-muted">{course.name}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
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

                <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-border bg-paper-soft p-4 text-sm text-ink-muted">
                  <p className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 shrink-0 text-ink-muted" />
                    {formatTime(course.startDate)}
                    {course.endDate && ` - ${formatTime(course.endDate)}`}
                  </p>
                  <p className="flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-muted" />
                    {course.room}
                  </p>
                  <p className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 shrink-0 text-ink-muted" />
                    Avec {course.referent}
                  </p>
                </div>

                <p className="mt-5 font-body text-xs font-medium uppercase tracking-wide text-ink-muted">
                  Ta signature
                </p>
                <div className="relative mt-2">
                  <canvas
                    ref={canvasRef}
                    width={280}
                    height={140}
                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={stopDrawing}
                    onPointerLeave={stopDrawing}
                    className="w-full touch-none rounded-2xl border border-border bg-paper-soft"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-6 bottom-8 border-b border-dashed border-border"
                  />
                  {!hasDrawn && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 flex items-center justify-center font-body text-xs text-ink-muted/70"
                    >
                      Signe ici
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-ink transition hover:bg-paper-soft"
                  >
                    Effacer
                  </button>
                  <button
                    type="button"
                    onClick={confirmSignature}
                    disabled={!hasDrawn}
                    className="flex-1 rounded-full bg-gradient-to-br from-entreprenariat-500 to-entreprenariat-700 py-2.5 text-sm font-semibold text-paper shadow-[0_12px_24px_-12px_rgba(234,25,88,0.7)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    Valider
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
