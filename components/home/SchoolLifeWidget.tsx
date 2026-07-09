export type SchoolLifeItem = {
  id: string;
  type: "food_truck" | "announcement" | "event" | "deadline";
  title: string;
  subtitle?: string;
  date: string;
  time?: string;
  active?: boolean;
};

/** Couleurs par type d'événement — tokens DS uniquement. */
const TYPE_CONFIG: Record<SchoolLifeItem["type"], { dot: string; bg: string }> = {
  food_truck: {
    dot: "bg-creativite-700",
    bg: "bg-creativite-500/20",
  },
  announcement: {
    dot: "bg-structure-data-700",
    bg: "bg-structure-data-500/20",
  },
  event: {
    dot: "bg-entreprenariat-500",
    bg: "bg-entreprenariat-500/10",
  },
  deadline: {
    dot: "bg-ia-500",
    bg: "bg-ia-500/10",
  },
};

export default function SchoolLifeTimeline({
  events,
}: {
  events: SchoolLifeItem[];
}) {
  return (
    <ol className="flex flex-col">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        const config = TYPE_CONFIG[event.type];

        return (
          <li key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center pt-1.5" aria-hidden>
              <span
                className={`h-3.5 w-3.5 rounded-full border-2 ${
                  event.active
                    ? "border-entreprenariat-500 bg-entreprenariat-500"
                    : "border-entreprenariat-300 bg-paper"
                }`}
              />
              {!isLast && <span className="w-0.5 flex-1 bg-border" />}
            </div>

            <div className={`flex-1 ${isLast ? "" : "pb-4"}`}>
              <div
                className={`rounded-2xl ${
                  event.active
                    ? "border border-entreprenariat-300 bg-entreprenariat-100/60 p-3"
                    : "border-b border-border pb-4"
                }`}
              >
                <div className="flex gap-3">
                  <span
                    aria-hidden
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${config.dot}`} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-body text-base font-semibold text-ink">
                      {event.title}
                    </h3>

                    {event.subtitle && (
                      <p className="font-body text-sm text-ink-muted">{event.subtitle}</p>
                    )}

                    <p className="mt-1 font-body text-sm text-ink-muted">
                      {event.date}
                      {event.time && ` • ${event.time}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
