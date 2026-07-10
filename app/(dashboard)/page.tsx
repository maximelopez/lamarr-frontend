import Image from "next/image";
import Link from "next/link";

import HomeFeed from "@/components/home/HomeFeed";
import {
  ArrowRightIcon,
  BellIcon,
  InfoIcon,
  PencilIcon,
  QrDecoration,
  UserIcon,
} from "@/components/home/icons";

/* -------------------------------------------------------------------------- */
/*  Données de démonstration (statique — à brancher sur l'API à terme)        */
/* -------------------------------------------------------------------------- */

const agendaItems: AgendaItem[] = [
  // Cours (7)
  {
    source: 'course',
    id: 'course-1',
    name: "Design d'interface",
    type: 'Cours',
    description: 'Atelier sur les principes de design UI/UX',
    startDate: '2026-07-09T09:00:00+02:00',
    endDate: '2026-07-09T12:30:00+02:00',
    referent: 'Mickael Olise',
    isActive: true,
    room: 'Salle 302',
  },
  {
    source: 'course',
    id: 'course-2',
    name: 'Anglais',
    type: 'Cours',
    description: 'Cours de renforcement linguistique',
    startDate: '2026-07-09T13:30:00+02:00',
    endDate: '2026-07-09T17:00:00+02:00',
    referent: 'Mickael Olise',
    isActive: false,
    room: 'Salle 302',
  },
  {
    source: 'course',
    id: 'course-3',
    name: "Design d'interface",
    type: 'Cours',
    description: 'Atelier sur les principes de design UI/UX',
    startDate: '2026-07-10T09:00:00+02:00',
    endDate: '2026-07-10T12:30:00+02:00',
    referent: 'Mickael Olise',
    isActive: false,
    room: 'En Distanciel',
  },
  {
    source: 'course',
    id: 'course-4',
    name: "Design d'interface",
    type: 'Cours',
    description: 'Atelier sur les principes de design UI/UX',
    startDate: '2026-07-11T09:00:00+02:00',
    endDate: '2026-07-11T12:30:00+02:00',
    referent: 'Mickael Olise',
    isActive: false,
    room: 'Salle 302',
  },
  {
    source: 'course',
    id: 'course-5',
    name: 'Anglais',
    type: 'Cours',
    description: 'Cours de renforcement linguistique',
    startDate: '2026-07-11T13:30:00+02:00',
    endDate: '2026-07-11T17:00:00+02:00',
    referent: 'Mickael Olise',
    isActive: false,
    room: 'Salle 210',
  },
  {
    source: 'course',
    id: 'course-6',
    name: 'UX Research',
    type: 'Cours',
    description: "Méthodes de recherche utilisateur",
    startDate: '2026-07-14T09:00:00+02:00',
    endDate: '2026-07-14T12:30:00+02:00',
    referent: 'Mickael Olise',
    isActive: false,
    room: 'Salle 302',
  },
  {
    source: 'course',
    id: 'course-7',
    name: 'Business plan',
    type: 'Cours',
    description: "Élaboration d'un business plan",
    startDate: '2026-07-14T13:30:00+02:00',
    endDate: '2026-07-14T16:00:00+02:00',
    referent: 'Mickael Olise',
    isActive: false,
    room: 'En Distanciel',
  },

  // Events (7)
  {
    source: 'event',
    id: 'event-1',
    name: 'Portes ouvertes',
    type: 'Événement école',
    description: 'Journée portes ouvertes pour les futurs étudiants',
    startDate: '2026-07-12T10:00:00+02:00',
    endDate: '2026-07-12T16:00:00+02:00',
    referent: 'Marc Lefèvre',
    isActive: false,
  },
  {
    source: 'event',
    id: 'event-2',
    name: 'Réunion pédagogique',
    type: 'Réunion',
    description: "Point sur l'avancée des projets de fin d'année",
    startDate: '2026-07-15T14:00:00+02:00',
    endDate: '2026-07-15T15:30:00+02:00',
    referent: 'Claire Dubois',
    isActive: false,
  },
  {
    source: 'event',
    id: 'event-3',
    name: 'Conférence métiers du numérique',
    type: 'Conférence',
    description: 'Intervention de professionnels du secteur tech',
    startDate: '2026-07-16T09:30:00+02:00',
    endDate: '2026-07-16T11:00:00+02:00',
    referent: 'Nina Castellano',
    isActive: false,
  },
  {
    source: 'event',
    id: 'event-4',
    name: 'Examen final UX/UI',
    type: 'Examen',
    description: 'Évaluation finale du module design',
    startDate: '2026-07-17T09:00:00+02:00',
    endDate: '2026-07-17T12:00:00+02:00',
    referent: 'Claire Dubois',
    isActive: false,
  },
  {
    source: 'event',
    id: 'event-5',
    name: 'Atelier recrutement',
    type: 'Atelier',
    description: 'Préparation CV et entretiens avec des recruteurs partenaires',
    startDate: '2026-07-18T13:00:00+02:00',
    endDate: '2026-07-18T15:00:00+02:00',
    referent: 'Marc Lefèvre',
    isActive: false,
  },
  {
    source: 'event',
    id: 'event-6',
    name: 'Soirée networking',
    type: 'Événement école',
    description: "Rencontre entre étudiants et anciens diplômés",
    startDate: '2026-07-18T18:00:00+02:00',
    endDate: '2026-07-18T21:00:00+02:00',
    referent: 'Nina Castellano',
    isActive: false,
  },
  {
    source: 'event',
    id: 'event-7',
    name: 'Remise de diplômes',
    type: 'Cérémonie',
    description: 'Cérémonie de remise des diplômes de promotion',
    startDate: '2026-07-19T10:00:00+02:00',
    endDate: '2026-07-19T12:00:00+02:00',
    referent: 'Claire Dubois',
    isActive: false,
  },
];

const TODOS = [
  { id: "t1", label: "Finaliser les wireframes", done: true },
  { id: "t2", label: "Préparer le benchmark", done: true },
  { id: "t3", label: "Envoyer les retours au groupe", done: false, due: "Demain" },
  { id: "t4", label: "Déposer le livrable", done: false, due: "Vendredi" },
];

/* -------------------------------------------------------------------------- */

export default function Accueil() {
  return (
    <div className="mx-auto w-full max-w-[480px] font-body">
      {/* ============================ En-tête sombre ======================= */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-56 bg-base"
        />

        <div className="relative px-5 pt-[calc(env(safe-area-inset-top,0px)+1rem)]">
          <header className="flex items-center justify-between">
            <Image
              src="/brand/icon-color.svg"
              alt="Lamarr"
              width={40}
              height={40}
              priority
              className="h-10 w-10"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper transition hover:bg-white/20"
              >
                <BellIcon className="h-5 w-5" />
                <span
                  aria-hidden
                  className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-entreprenariat-500 ring-2 ring-base"
                />
              </button>
              <Link
                href="/profil"
                aria-label="Mon profil"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper transition hover:bg-white/20"
              >
                <UserIcon className="h-5 w-5" />
              </Link>
            </div>
          </header>

          {/* -------------------------- Carte hero ------------------------- */}
          <section className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-entreprenariat-500 to-entreprenariat-700 p-5 text-paper shadow-[0_20px_40px_-24px_rgba(234,25,88,0.7)]">
            <div className="flex min-h-[148px] items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="font-heading text-[1.75rem] font-bold leading-tight">Bonjour Maxime</h1>
                <p className="mt-1 font-body text-sm text-paper/85">Mardi 7 Juillet</p>
                <button
                  type="button"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/15 px-4 font-body text-sm font-medium text-paper backdrop-blur transition hover:bg-white/25"
                >
                  <InfoIcon className="h-4 w-4" />
                  Envoyer attestation
                </button>
              </div>
              <QrDecoration className="h-[4.5rem] w-[4.5rem] shrink-0 self-center text-paper/90" />
            </div>
          </section>
        </div>
      </div>

      {/* ============================ Corps de page ======================== */}
      <div className="flex flex-col gap-9 px-5 pt-6">
        {/* --------------------- Cartes d'action ------------------------- */}
        <section className="grid grid-cols-2 gap-4" aria-label="Actions rapides">
          <button
            type="button"
            className="flex min-h-32 flex-col justify-between rounded-3xl border-2 border-entreprenariat-300 bg-paper p-4 text-left transition hover:bg-paper-soft"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-entreprenariat-100 text-entreprenariat-500">
              <PencilIcon className="h-5 w-5" />
            </span>
            <span className="font-body text-[15px] font-medium text-ink">Signer ma présence</span>
          </button>

          <button
            type="button"
            className="flex min-h-32 flex-col justify-between rounded-3xl border border-border bg-paper p-4 text-left transition hover:bg-paper-soft"
          >
            <span className="font-body text-[15px] font-medium text-ink">
              Emprunter
              <br />
              du matériel
            </span>
            <Image
              src="/images/materiel-h.png"
              alt=""
              aria-hidden
              width={48}
              height={48}
              className="h-12 w-12 self-end object-contain"
            />
          </button>
        </section>

        {/* --------------------- Bandeau questionnaire ------------------- */}
        <button
          type="button"
          className="relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl bg-base p-5 text-left text-paper transition hover:opacity-95"
        >
          {/* Motif décoratif (vagues) évoquant la maquette */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-2/3"
          >
            <span className="absolute -right-6 top-0 h-full w-16 rotate-[18deg] rounded-full bg-white/[0.04]" />
            <span className="absolute right-10 top-0 h-full w-20 rotate-[18deg] rounded-full bg-white/[0.04]" />
            <span className="absolute right-28 top-0 h-full w-14 rotate-[18deg] rounded-full bg-white/[0.03]" />
          </span>
          <span className="relative min-w-0">
            <span className="block font-heading text-[1rem] font-bold leading-snug">
              Questionnaire fin de module
            </span>
            <span className="mt-1 flex items-center gap-2">
              <span aria-hidden className="h-4 w-0.5 rounded bg-tech-500" />
              <span className="font-body text-sm text-paper/70">Gamification</span>
            </span>
          </span>
          <Image
            src="/brand/icon-white.svg"
            alt=""
            aria-hidden
            width={120}
            height={32}
            className="pointer-events-none absolute right-0 top-1/2 w-28 -translate-y-1/2 opacity-25"
          />
          <ArrowRightIcon className="h-6 w-6 shrink-0 text-tech-500" />
        </button>

        <HomeFeed agenda={agendaItems } todos={TODOS} hiddenDone={2} hiddenPending={1} />
      </div>
    </div>
  );
}
