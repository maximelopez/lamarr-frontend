import Image from 'next/image'

export interface ExternalWorkbenchItem {
  id: string
  name: string
  logoSrc: string
}

export default function ExternalWorkbench({ items }: { items: ExternalWorkbenchItem[] }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-heading text-lg font-bold text-ink">Mes outils</h2>
      <div className="flex flex-wrap justify-center gap-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex aspect-square min-w-0 shrink-0 basis-[calc((100%-1.5rem)/3)] flex-col items-center justify-center gap-1.5 rounded-3xl border border-border bg-paper p-2.5 transition hover:bg-paper-soft"
        >
          {/* Logo aussi grand que possible dans la carte */}
          <div className="relative w-full flex-1">
            <Image
              src={item.logoSrc}
              alt={item.name}
              fill
              sizes="140px"
              className="object-contain"
            />
          </div>
          <span className="w-full truncate text-center font-body text-[0.7rem] font-medium text-ink">
            {item.name}
          </span>
        </div>
      ))}
      </div>
    </section>
  )
}
