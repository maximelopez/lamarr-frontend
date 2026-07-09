import Image from "next/image";

import VirtualStudentCard, { type StudentCardData } from "@/components/VirtualStudentCard";

const STUDENT_CARD: StudentCardData = {
  firstName: "Maxime",
  lastName: "Dupont",
  birthDate: "14 février 2001",
  program: "Master Développement Full Stack",
  school: "Lamarr",
  schoolYear: "2025 / 2026",
  qrValue: "lamarr://student/maxime-dupont-2025-2026",
  initialPhotoSrc: null,
};

const PROFILE_FIELDS = [
  { label: "Nom", value: STUDENT_CARD.lastName },
  { label: "Prénom", value: STUDENT_CARD.firstName },
  { label: "Date de naissance", value: STUDENT_CARD.birthDate },
  { label: "Formation", value: STUDENT_CARD.program },
  { label: "École", value: STUDENT_CARD.school },
  { label: "Année scolaire", value: STUDENT_CARD.schoolYear },
];

export default function Profil() {
  return (
    <div className="mx-auto w-full max-w-[480px] font-body">
      <div className="relative">
        <div aria-hidden className="absolute inset-x-0 top-0 h-64 bg-base" />

        <div className="relative px-5 pt-[calc(env(safe-area-inset-top,0px)+1rem)]">
          <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-paper/55">
                Mon profil
              </p>
              <h1 className="mt-2 font-heading text-3xl font-bold text-paper">
                Carte étudiante virtuelle
              </h1>
              <p className="mt-2 max-w-[20rem] text-sm leading-6 text-paper/75">
                Ajoute ta photo, retrouve ton QR code et retourne la carte pour voir le verso.
              </p>
            </div>

            <div className="rounded-[26px] bg-white/10 p-3 backdrop-blur">
              <Image
                src="/brand/icon-white.svg"
                alt=""
                aria-hidden
                width={48}
                height={48}
                unoptimized
                className="h-12 w-12"
              />
            </div>
          </header>

          <section className="mt-6 overflow-hidden rounded-[32px] bg-gradient-to-br from-entreprenariat-500 to-entreprenariat-700 p-5 text-paper shadow-[0_22px_44px_-26px_rgba(234,25,88,0.75)]">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-paper/70">
              Étudiant
            </p>
            <p className="mt-3 font-heading text-2xl font-bold leading-tight text-paper">
              {STUDENT_CARD.firstName} {STUDENT_CARD.lastName}
            </p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-paper/85">{STUDENT_CARD.program}</p>
                <p className="mt-1 text-sm text-paper/65">
                  {STUDENT_CARD.school} - {STUDENT_CARD.schoolYear}
                </p>
              </div>
              <div className="shrink-0 whitespace-nowrap rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-paper">
                Carte active
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-5 py-6">
        <section className="rounded-[32px] border border-border bg-paper p-5 shadow-[0_18px_36px_-26px_rgba(23,10,46,0.35)]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="font-heading text-xl font-bold text-ink">
                Mon justificatif étudiant
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-muted">
                La photo se charge depuis tes fichiers locaux au clic sur le placeholder.
                L&apos;icône permet de retourner la carte pour afficher le verso officiel.
              </p>
            </div>
            <span className="rounded-full bg-entreprenariat-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-entreprenariat-700">
              Lamarr
            </span>
          </div>

          <div className="mt-5">
            <VirtualStudentCard student={STUDENT_CARD} />
          </div>
        </section>

        <section className="rounded-[32px] border border-border bg-paper-soft p-5">
          <h2 className="font-heading text-xl font-bold text-ink">Informations affichées</h2>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROFILE_FIELDS.map((field) => (
              <div
                key={field.label}
                className="rounded-[22px] border border-border bg-paper px-4 py-3.5"
              >
                <dt className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-muted">
                  {field.label}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-ink">{field.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
