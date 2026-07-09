export type SchoolLifeItem = {
  id: string;
  type: "food_truck" | "announcement" | "event" | "deadline";
  title: string;
  subtitle?: string;
  date: string;
  time?: string;
  active?: boolean;
};

const TYPE_CONFIG = {
  food_truck: {
    color: "text-[#C6A300]",
    bg: "bg-[#F2F127]/20",
  },
  announcement: {
    color: "text-[#00A8B8]",
    bg: "bg-[#61F3FF]/20",
  },
  event: {
    color: "text-[#FE0B5B]",
    bg: "bg-[#FE0B5B]/10",
  },
  deadline: {
    color: "text-[#BE33FF]",
    bg: "bg-[#BE33FF]/10",
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
            <div className="flex flex-col items-center pt-1.5">
              <span
                className={`h-3.5 w-3.5 rounded-full border-2 ${
                  event.active
                    ? "border-[#FE0B5B] bg-[#FE0B5B]"
                    : "border-gray-300 bg-white"
                }`}
              />
              {!isLast && <span className="w-0.5 flex-1 bg-gray-200" />}
            </div>

            <div className={`flex-1 ${isLast ? "" : "pb-4"}`}>
              <div
                className={`rounded-2xl ${
                  event.active
                    ? "border border-[#FE0B5B]/30 bg-[#FE0B5B]/5 p-3"
                    : "border-b border-gray-100 pb-4"
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${config.bg}`}
                  >
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[#160833]">
                      {event.title}
                    </h3>

                    {event.subtitle && (
                      <p className="text-sm text-gray-500">
                        {event.subtitle}
                      </p>
                    )}

                    <p className="mt-1 text-sm text-gray-400">
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