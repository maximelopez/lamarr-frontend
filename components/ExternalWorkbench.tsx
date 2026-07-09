import Image from 'next/image'
export interface ExternalWorkbenchItem {
  id: string
  name: string
  logoSrc: string
}

export default function ExternalWorkbench({ items }: { items: ExternalWorkbenchItem[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex aspect-square min-w-0 shrink-0 basis-[calc((100%-2rem)/3)] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-ink p-3"
        >
          <div className="relative h-8 w-2/3">
            <Image src={item.logoSrc} alt={item.name} fill className="object-contain" />
          </div>
          <span className="w-full break-words text-center font-body text-sm text-ink">{item.name}</span>
        </div>
      ))}
    </div>
  )
}
