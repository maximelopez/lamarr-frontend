import Image from 'next/image'

export interface ExternalWorkbenchItem {
  id: string
  name: string
  logoSrc: string
}

const ACCENTS = ['bg-entreprenariat-100', 'bg-tech-100', 'bg-ia-100', 'bg-structure-data-100', 'bg-creativite-100']

export default function ExternalWorkbench({ items }: { items: ExternalWorkbenchItem[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex aspect-square min-w-0 shrink-0 basis-[calc((100%-2rem)/3)] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-border bg-paper p-3 transition hover:bg-paper-soft"
        >
          <div className={`relative flex h-14 w-14 items-center justify-center rounded-full ${ACCENTS[index % ACCENTS.length]}`}>
            <div className="relative h-6 w-6">
              <Image src={item.logoSrc} alt={item.name} fill className="object-contain" />
            </div>
          </div>
          <span className="w-full truncate text-center font-body text-xs text-ink">{item.name}</span>
        </div>
      ))}
    </div>
  )
}
