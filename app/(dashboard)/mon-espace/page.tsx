'use client';

import TodoList from '../../../components/TodoList';
import {
  User, Bell, Plus, FilePlus, Share2, ScanLine, Archive,
  Calendar, ChevronRight, Folder, FileText, MapPin, Clock,
} from 'lucide-react';

export default function MonEspace() {
  const quickAccess = [
    { icon: FilePlus, label: 'Nouveau fichier' },
    { icon: Share2, label: 'Partager' },
    { icon: ScanLine, label: 'Scanner' },
    { icon: Archive, label: 'Archives' },
  ];

  const folders = ['Maquettes', 'Recherche', 'Livrables', 'Ressources'];

  const notes = [
    "Revoir l'arborescence",
    'Ajouter des états des boutons',
    'Vérifier accessibilité',
  ];

  return (
    // Plus de cadre "téléphone" : on s'intègre au flux normal de la page,
    // le fond de page est géré par bg-paper-soft (cohérent avec le reste du site).
    <main className="min-h-full px-4 py-8">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            {/* font-heading -> utilise Unbounded via la variable exposée dans @theme */}
            <h1 className="font-heading text-[1.375rem] font-bold text-ink">Mon espace</h1>
            <p className="text-sm text-ink-muted mt-0.5">
              Gère tes projets, tes fichiers et tes tâches
            </p>
          </div>
        </div>

        {/* Accès rapides */}
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          Accès rapides
        </p>
        <div className="grid grid-cols-4 gap-3 mb-8">
          {quickAccess.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-paper border border-border hover:bg-paper-soft transition-colors"
            >
              <Icon size={18} className="text-ink" />
              <span className="text-[10px] text-ink-muted text-center leading-tight px-1">
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Carte projet */}
        <div className="rounded-2xl bg-paper border border-border p-4 mb-8 shadow-[0_1px_2px_rgba(20,15,45,0.04),0_16px_32px_-20px_rgba(20,15,45,0.16)]">
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-xl bg-entreprenariat-100 flex items-center justify-center text-ia-900 font-bold text-xs shrink-0">
              UX/UI
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <p className="font-heading font-semibold text-ink text-sm truncate pr-2">
                  Projet UX/UI — Lamarr
                </p>
                <button className="text-ink-muted shrink-0">•••</button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 rounded-full bg-paper-soft overflow-hidden">
                  <div className="h-full bg-entreprenariat-500 rounded-full" style={{ width: '68%' }} />
                </div>
                <span className="text-xs font-medium text-ink-muted">68%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Calendar size={13} />
              <span>Wireframes à rendre vendredi</span>
            </div>
            <div className="flex -space-x-2">
              {['MM', 'CL', 'JR'].map((initials) => (
                <div
                  key={initials}
                  className="w-6 h-6 rounded-full bg-entreprenariat-100 border-2 border-paper flex items-center justify-center text-[9px] font-semibold text-ia-900"
                >
                  {initials}
                </div>
              ))}
              <div className="w-6 h-6 rounded-full bg-paper-soft border-2 border-paper flex items-center justify-center text-[9px] font-semibold text-ink-muted">
                +2
              </div>
            </div>
          </div>
        </div>

        {/* Mon drive */}
        <div className="flex items-center justify-between mb-2">
          <p className="font-heading font-semibold text-ink text-sm">Mon drive</p>
          <span className="text-xs text-ink-muted">12,4 Go utilisés sur 20 Go</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden mb-2">
          <div className="bg-entreprenariat-500" style={{ width: '40%' }} />
          <div className="bg-structure-data-500" style={{ width: '16%' }} />
          <div className="bg-creativite-500" style={{ width: '5%' }} />
          <div className="bg-paper-soft flex-1" />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-8">
          <LegendDot color="bg-entreprenariat-500" label="Mes fichiers 8,1 Go" />
          <LegendDot color="bg-structure-data-500" label="Partagés 3,2 Go" />
          <LegendDot color="bg-creativite-500" label="Corbeille 1,1 Go" />
          <LegendDot color="bg-border" label="Libre 7,6 Go" />
        </div>

        {/* Grille de dossiers */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {folders.map((f) => (
            <button
              key={f}
              className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-paper border border-border"
            >
              <Folder size={18} className="text-ia-500" />
              <span className="text-[10px] text-ink-muted text-center leading-tight">{f}</span>
            </button>
          ))}
        </div>

        {/* Fichier récent */}
        <div className="flex items-center justify-between rounded-2xl bg-paper border border-border p-3 mb-8">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-entreprenariat-100 flex items-center justify-center shrink-0">
              <FileText size={16} className="text-ia-700" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink truncate">Wireframes v2.fig</p>
              <p className="text-xs text-ink-muted">Modifié il y a 2 h par toi</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold text-ia-700 shrink-0">
            Ouvrir <ChevronRight size={14} />
          </button>
        </div>

        {/* To-do list — composant partagé (autonome, synchronisé via localStorage) */}
        <TodoList />

        {/* Rendez-vous + Notes */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          <div className="rounded-2xl bg-paper border border-border p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-ia-700 uppercase mb-2">
              <Calendar size={12} />
              Ven 16
            </div>
            <p className="font-heading text-sm font-medium text-ink leading-tight mb-1">
              Point d'avancement
            </p>
            <div className="flex items-center gap-1 text-xs text-ink-muted mb-1">
              <Clock size={11} />
              10:00 - 11:00
            </div>
            <div className="flex items-center gap-1 text-xs text-ink-muted">
              <MapPin size={11} />
              Salle projet
            </div>
          </div>

          <div className="rounded-2xl bg-paper border border-border p-3">
            <p className="text-[10px] font-semibold text-ink-muted uppercase mb-2">
              Notes rapides
            </p>
            <ul className="space-y-1 mb-2">
              {notes.map((n) => (
                <li key={n} className="text-xs text-ink-muted leading-tight flex gap-1">
                  <span className="text-ia-500">•</span> {n}
                </li>
              ))}
            </ul>
            <button className="text-xs font-semibold text-ia-700">Voir toutes les notes</button>
          </div>
        </div>
      </div>
    </main>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-[10px] text-ink-muted">{label}</span>
    </div>
  );
}