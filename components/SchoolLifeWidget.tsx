"use client";

import Link from "next/link";
import {
  AlarmClock,
  ArrowRight,
  Megaphone,
  PartyPopper,
  Utensils,
} from "lucide-react";
import { SchoolLifeEvent, SchoolLifeEventType } from "../app/(dashboard)/hub-news/types/school-life-event";

interface SchoolLifeWidgetProps {
  events: SchoolLifeEvent[];
  title?: string;
  href?: string;
}

const TYPE_CONFIG: Record<
  SchoolLifeEventType,
  {
    icon: typeof Utensils;
    badgeClass: string;
    iconClass: string;
  }
> = {
  food_truck: {
    icon: Utensils,
    badgeClass: "bg-[#F2F127]/25",
    iconClass: "text-[#5c5b00]",
  },
  event: {
    icon: PartyPopper,
    badgeClass: "bg-[#FE0B5B]/10",
    iconClass: "text-[#FE0B5B]",
  },
  announcement: {
    icon: Megaphone,
    badgeClass: "bg-[#61F3FF]/20",
    iconClass: "text-[#0b6e80]",
  },
  deadline: {
    icon: AlarmClock,
    badgeClass: "bg-[#BE33FF]/10",
    iconClass: "text-[#BE33FF]",
  },
};

function dayLabel(date: Date) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (sameDay(date, today)) return "Aujourd'hui";
  if (sameDay(date, tomorrow)) return "Demain";

  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function SchoolLifeWidget({
  events,
  title = "Vie de l'école",
  href = "/hub-news",
}: SchoolLifeWidgetProps) {
  const upcomingEvents = [...events]
    .filter((e) => new Date(e.date) >= new Date(new Date().toDateString()))
    .sort((a, b) => {
      const da = `${a.date} ${a.startTime ?? "00:00"}`;
      const db = `${b.date} ${b.startTime ?? "00:00"}`;
      return da.localeCompare(db);
    });

  const displayed = upcomingEvents.slice(0, 3);

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#160833]">{title}</h2>

        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#160833] hover:text-[#FE0B5B]"
        >
          Voir tout
          <ArrowRight size={15} />
        </Link>
      </div>

      {displayed.length === 0 ? (
        <div className="flex h-44 items-center justify-center rounded-2xl bg-gray-50 text-sm text-gray-400">
          Aucun événement à venir
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((evt) => {
            const config = TYPE_CONFIG[evt.type];
            const Icon = config.icon;

            return (
              <div
                key={evt.id}
                className="rounded-2xl border border-gray-100 p-4 transition hover:border-[#160833]/20 hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.badgeClass}`}
                  >
                    <Icon className={config.iconClass} size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      {dayLabel(new Date(evt.date))}
                    </p>

                    <h3 className="mt-1 truncate font-semibold text-[#160833]">
                      {evt.title}
                    </h3>

                    {evt.subtitle && (
                      <p className="truncate text-sm text-gray-500">
                        {evt.subtitle}
                      </p>
                    )}

                    <p className="mt-1 text-sm text-gray-400">
                      {evt.startTime}
                      {evt.endTime && ` – ${evt.endTime}`}
                      {evt.location && ` • ${evt.location}`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {upcomingEvents.length > displayed.length && (
            <div className="pt-2 text-center">
              <Link
                href={href}
                className="text-sm font-medium text-[#FE0B5B] hover:underline"
              >
                + {upcomingEvents.length - displayed.length} autre
                {upcomingEvents.length - displayed.length > 1 ? "s" : ""}{" "}
                événement
                {upcomingEvents.length - displayed.length > 1 ? "s" : ""}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}