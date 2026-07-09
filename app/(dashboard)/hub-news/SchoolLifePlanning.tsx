"use client";

import { useMemo, useState } from "react";
import {
  Utensils,
  PartyPopper,
  Megaphone,
  AlarmClock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SchoolLifeEvent, SchoolLifeEventType } from "./types/school-life-event";

interface SchoolLifePlanningProps {
  events: SchoolLifeEvent[];
  /** Titre de la section, ex: "Vie de l'école" */
  title?: string;
}

/** Palette LAMARR — voir lib/design-system.ts. Idéalement remplacé par
 *  bg-lamarr-pink / text-lamarr-navy une fois la palette déclarée dans tailwind.config. */
const TYPE_CONFIG: Record<
  SchoolLifeEventType,
  { icon: typeof Utensils; label: string; badgeClass: string; barClass: string }
> = {
  food_truck: {
    icon: Utensils,
    label: "Food truck",
    badgeClass: "bg-[#F2F127]/25 text-[#5c5b00]",
    barClass: "bg-[#F2F127]",
  },
  event: {
    icon: PartyPopper,
    label: "Événement",
    badgeClass: "bg-[#FE0B5B]/10 text-[#FE0B5B]",
    barClass: "bg-[#FE0B5B]",
  },
  announcement: {
    icon: Megaphone,
    label: "Info",
    badgeClass: "bg-[#61F3FF]/20 text-[#0b6e80]",
    barClass: "bg-[#61F3FF]",
  },
  deadline: {
    icon: AlarmClock,
    label: "Date limite",
    badgeClass: "bg-[#BE33FF]/10 text-[#BE33FF]",
    barClass: "bg-[#BE33FF]",
  },
};

const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = dimanche
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatWeekRange(monday: Date, sunday: Date): string {
  const sameMonth = monday.getMonth() === sunday.getMonth();
  const startDay = monday.getDate();
  const endDay = sunday.getDate();
  const monthEnd = sunday.toLocaleDateString("fr-FR", { month: "long" });
  const monthStart = monday.toLocaleDateString("fr-FR", { month: "long" });
  const year = sunday.getFullYear();
  return sameMonth
    ? `${startDay} – ${endDay} ${monthEnd} ${year}`
    : `${startDay} ${monthStart} – ${endDay} ${monthEnd} ${year}`;
}

function formatDayHeading(date: Date, short = false): string {
  const today = new Date();
  if (isSameDay(date, today)) return "Aujourd'hui";
  const formatted = date.toLocaleDateString("fr-FR", {
    weekday: short ? "short" : "long",
    day: "numeric",
    month: short ? undefined : "long",
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/** Contenu commun d'une carte événement, réutilisé en timeline (mobile) et en grille (desktop) */
function EventCardContent({ evt }: { evt: SchoolLifeEvent }) {
  const config = TYPE_CONFIG[evt.type];
  const Icon = config.icon;

  return (
    <>
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.badgeClass}`}
        >
          <Icon size={16} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#160833]">{evt.title}</p>
          {evt.subtitle && (
            <p className="truncate text-xs text-gray-500">{evt.subtitle}</p>
          )}
          <p className="mt-0.5 text-xs text-gray-400">
            {evt.startTime && (
              <>
                {evt.startTime}
                {evt.endTime ? ` – ${evt.endTime}` : ""}
                {evt.location ? " · " : ""}
              </>
            )}
            {evt.location}
          </p>
        </div>
      </div>

      {evt.action && (
        <a
          href={evt.action.href}
          className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#160833] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#2a1354]"
        >
          {evt.action.label}
          <ArrowRight size={12} />
        </a>
      )}
    </>
  );
}

export default function SchoolLifePlanning({
  events,
  title = "Vie de l'école",
}: SchoolLifePlanningProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  const monday = useMemo(() => addDays(getMonday(new Date()), weekOffset * 7), [weekOffset]);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(monday, i)), [monday]);
  const sunday = weekDays[6];

  const eventsByDate = useMemo(() => {
    const map = new Map<string, SchoolLifeEvent[]>();
    for (const evt of events) {
      const list = map.get(evt.date) ?? [];
      list.push(evt);
      map.set(evt.date, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => (a.startTime ?? "").localeCompare(b.startTime ?? ""));
    }
    return map;
  }, [events]);

  const daysWithEvents = weekDays.filter((d) => (eventsByDate.get(toIsoDate(d)) ?? []).length > 0);
  const hasAnyEvent = daysWithEvents.length > 0;

  return (
    <section className="w-full">
      {/* Header + navigation entre semaines */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-[#160833]">{title}</h2>

        <div className="flex items-center gap-1.5">
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="mr-1 text-xs font-medium text-[#160833]/60 hover:text-[#160833]"
            >
              Aujourd&apos;hui
            </button>
          )}
          <button
            aria-label="Semaine précédente"
            onClick={() => setWeekOffset((w) => w - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-[#160833] hover:bg-gray-50"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="min-w-[150px] text-center text-xs font-medium text-gray-500">
            {formatWeekRange(monday, sunday)}
          </span>
          <button
            aria-label="Semaine suivante"
            onClick={() => setWeekOffset((w) => w + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-[#160833] hover:bg-gray-50"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* ---------- Mobile : timeline verticale (jours avec événements uniquement) ---------- */}
      <div className="space-y-6 md:hidden">
        {!hasAnyEvent && (
          <p className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-400">
            Aucun événement cette semaine.
          </p>
        )}
        {daysWithEvents.map((day) => {
          const dayEvents = eventsByDate.get(toIsoDate(day)) ?? [];
          return (
            <div key={toIsoDate(day)}>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                {formatDayHeading(day)}
              </p>
              <ol className="relative">
                {dayEvents.map((evt, idx) => {
                  const isLast = idx === dayEvents.length - 1;
                  return (
                    <li key={evt.id} className="relative flex gap-3 pb-4 last:pb-0">
                      <div className="flex flex-col items-center">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-[#160833] bg-white" />
                        {!isLast && <span className="w-px flex-1 bg-gray-200" />}
                      </div>
                      <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm">
                        <EventCardContent evt={evt} />
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>

      {/* ---------- Desktop : grille hebdomadaire, une colonne par jour (Lun → Dim) ---------- */}
      <div className="hidden gap-3 md:grid md:grid-cols-7">
        {weekDays.map((day, idx) => {
          const dayEvents = eventsByDate.get(toIsoDate(day)) ?? [];
          const isToday = isSameDay(day, new Date());
          return (
            <div
              key={toIsoDate(day)}
              className={`flex min-h-[140px] flex-col rounded-2xl border p-2.5 ${
                isToday ? "border-[#160833]/30 bg-[#160833]/[0.03]" : "border-gray-100 bg-gray-50/60"
              }`}
            >
              <p
                className={`mb-2.5 px-0.5 text-xs font-semibold uppercase tracking-wide ${
                  isToday ? "text-[#160833]" : "text-gray-400"
                }`}
              >
                {WEEKDAY_LABELS[idx]} {day.getDate()}
              </p>

              <div className="flex flex-1 flex-col gap-2">
                {dayEvents.length === 0 && (
                  <p className="mt-1 text-xs text-gray-300">Rien de prévu</p>
                )}
                {dayEvents.map((evt) => {
                  const config = TYPE_CONFIG[evt.type];
                  return (
                    <div
                      key={evt.id}
                      className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <span className={`absolute inset-y-0 left-0 w-1 ${config.barClass}`} />
                      <EventCardContent evt={evt} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
