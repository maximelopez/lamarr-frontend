import { UserIcon } from "./icons";

export type AgendaEvent = {
  id: string;
  start: string;
  end: string;
  title: string;
  location: string;
  teacher: string;
  active?: boolean;
};

/**
 * Timeline verticale « Mon agenda ».
 * Une colonne de pastilles reliées par un trait, puis le détail de chaque
 * créneau. L'événement en cours (`active`) est mis en avant (pastille pleine
 * + carte teintée), comme sur la maquette.
 */
export default function AgendaTimeline({ events }: { events: AgendaEvent[] }) {
  return (
    <ol className="flex flex-col">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        return (
          <li key={event.id} className="flex gap-3">
            {/* Colonne pastille + trait */}
            <div className="flex flex-col items-center pt-1.5" aria-hidden>
              <span
                className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                  event.active
                    ? "border-entreprenariat-500 bg-entreprenariat-500"
                    : "border-entreprenariat-300 bg-paper"
                }`}
              />
              {!isLast && <span className="w-0.5 flex-1 bg-border" />}
            </div>

            {/* Contenu du créneau */}
            <div className={`flex-1 ${isLast ? "" : "pb-4"}`}>
              <div
                className={`flex gap-3 rounded-2xl ${
                  event.active
                    ? "border border-entreprenariat-300 bg-entreprenariat-100/60 p-3"
                    : "border-b border-border pb-4"
                }`}
              >
                <p
                  className={`w-16 shrink-0 font-body text-sm font-semibold leading-tight ${
                    event.active ? "text-ink" : "text-ink"
                  }`}
                >
                  {event.start}
                  <span className="block font-normal text-ink-muted">- {event.end}</span>
                </p>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-body text-base font-semibold ${
                      event.active ? "text-entreprenariat-700" : "text-ink"
                    }`}
                  >
                    {event.title}
                  </h3>
                  <p className="mt-0.5 font-body text-sm text-ink-muted">{event.location}</p>
                  <p className="mt-1 flex items-center gap-1.5 font-body text-sm text-ink-muted">
                    <UserIcon className="h-4 w-4 shrink-0" />
                    <span className="truncate">Avec {event.teacher}</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
