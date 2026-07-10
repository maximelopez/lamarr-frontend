"use client";

import { useState } from "react";

import { SearchIcon, ComposeIcon, BellIcon } from "./icons";
import { UrgentRow, ConversationListRow } from "./ConversationRow";
import { mockConversations } from "./mockConversations";

type Filter = "tous" | "non-lus" | "groupes";

const filters: { key: Filter; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "non-lus", label: "Non lus" },
  { key: "groupes", label: "Groupes" },
];

export default function Messagerie() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("tous");

  const urgentConversations = mockConversations.filter((c) => c.urgent);

  // Le React Compiler mémoïse ce calcul automatiquement (pas de useMemo manuel).
  const filteredConversations = mockConversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.preview.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "tous"
        ? true
        : activeFilter === "non-lus"
        ? Boolean(c.unreadCount)
        : c.type === "group";

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-heading text-[1.375rem] font-bold text-ink">Messagerie</h1>
          <p className="mt-1 font-body text-sm text-ink-muted">
            Tes échanges avec l&apos;école, tes groupes et les intervenants
          </p>
        </div>
        <button
          type="button"
          aria-label="Nouvelle conversation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-paper text-ink transition hover:bg-paper-soft"
        >
          <ComposeIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mb-4">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une conversation..."
          className="w-full rounded-full border border-border bg-paper py-2.5 pl-10 pr-4 font-body text-sm text-ink outline-none transition focus:border-base focus:ring-2 focus:ring-base/15"
        />
      </div>

      <div className="mb-6 flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActiveFilter(filter.key)}
            className={`rounded-full px-4 py-1.5 font-body text-sm font-medium transition ${
              activeFilter === filter.key
                ? "bg-ink text-white"
                : "border border-border bg-paper text-ink-muted hover:text-ink"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {urgentConversations.length > 0 && (
        <div className="mb-6 rounded-2xl border border-entreprenariat-100 bg-entreprenariat-100/40 p-4">
          <div className="mb-1 flex items-center gap-2">
            <BellIcon className="h-4 w-4 text-entreprenariat-700" />
            <p className="font-body text-sm font-semibold text-entreprenariat-700">
              À traiter aujourd&apos;hui
            </p>
          </div>
          <div className="divide-y divide-entreprenariat-100">
            {urgentConversations.map((conversation) => (
              <UrgentRow key={conversation.id} conversation={conversation} />
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 font-body text-sm font-semibold text-ink">Messages récents</p>
        <div className="divide-y divide-border rounded-2xl border border-border bg-paper px-4">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <ConversationListRow key={conversation.id} conversation={conversation} />
            ))
          ) : (
            <p className="py-6 text-center font-body text-sm text-ink-muted">
              Aucune conversation ne correspond à ta recherche.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}