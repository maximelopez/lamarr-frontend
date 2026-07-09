"use client";

/**
 * Filtres horizontaux de l'accueil (contrôlé par le parent).
 * Scroll horizontal sur petits écrans, barre de scroll masquée.
 * L'état actif est exposé sémantiquement via `aria-pressed`.
 */
export default function FilterChips({
  filters,
  active,
  onChange,
}: {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
}) {
  return (
    <div
      className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label="Filtrer le contenu"
    >
      <div className="flex w-max gap-2.5">
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(filter)}
              className={`flex min-h-11 items-center rounded-full px-5 font-body text-sm font-medium whitespace-nowrap transition ${
                isActive
                  ? "bg-entreprenariat-500 text-paper"
                  : "border border-border bg-paper text-ink hover:bg-paper-soft"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
