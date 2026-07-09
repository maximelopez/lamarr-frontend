import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function Agenda({title} : {title:string},{ items }: { items: AgendaItem[] }) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex items-baseline justify-between">
        <h2 className="text-heading">title</h2>
        <a href="#" className="text-secondary">Tout voir</a>
      </header>
      <ol className="relative flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
        <div className="absolute left-[5px] top-2.5 bottom-2.5 w-px bg-neutral-200" />
        {items.map((item) => (
          <li key={item.id} className="flex items-stretch gap-4">
            <div className="relative w-3 shrink-0">
              <span
                className={`relative z-10 mt-1 block h-3 w-3 rounded-full border-2 bg-white ${
                  item.isActive
                    ? 'border-neutral-900 bg-neutral-900'
                    : 'border-neutral-300'
                }`}
              />
            </div>
            <div
              className={`flex flex-1 items-stretch gap-4 border-b border-neutral-100 pb-3 last:border-b-0 ${
                item.isActive
                  ? '-my-1 rounded-2xl border border-neutral-900 p-3'
                  : ''
              }`}
            >
              <div className="w-[90px] shrink-0 text-primary">
                {item.startDate} - {item.endDate}
              </div>
              <div className="w-px bg-neutral-200" />
              <div className="flex flex-col gap-1">
                <h3 className="text-heading">{item.name}</h3>
                <p className="text-secondary">{item.description}</p>
                <p className="flex items-center gap-1.5 text-secondary">
                  <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5" />
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}