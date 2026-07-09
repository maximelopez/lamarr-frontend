"use client";

import Image from "next/image";
import type { ChangeEvent, SVGProps } from "react";
import { useEffect, useRef, useState } from "react";

import { UserIcon } from "@/components/home/icons";

import styles from "./virtual-student-card.module.css";

const PHOTO_STORAGE_KEY = "lamarr.virtual-student-card.photo";
const QR_SIZE = 25;

export type StudentCardData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  program: string;
  school: string;
  schoolYear: string;
  qrValue: string;
  initialPhotoSrc?: string | null;
};

type VirtualStudentCardProps = {
  student: StudentCardData;
  className?: string;
};

export default function VirtualStudentCard({
  student,
  className = "",
}: VirtualStudentCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [photoSrc, setPhotoSrc] = useState<string | null>(student.initialPhotoSrc ?? null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const storedPhoto = window.localStorage.getItem(PHOTO_STORAGE_KEY);
        if (storedPhoto) {
          setPhotoSrc(storedPhoto);
        }
      } catch {
        // Ignore local storage access issues.
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const fullName = `${student.firstName} ${student.lastName}`;

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setPhotoSrc(reader.result);
      try {
        window.localStorage.setItem(PHOTO_STORAGE_KEY, reader.result);
      } catch {
        // Ignore storage quota or browser restrictions.
      }
    };
    reader.readAsDataURL(file);

    event.target.value = "";
  };

  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-end">
        <button
          type="button"
          aria-label={isFlipped ? "Voir le recto" : "Voir le verso"}
          aria-pressed={isFlipped}
          onClick={() => setIsFlipped((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-paper text-ink shadow-[0_14px_30px_-24px_rgba(23,10,46,0.5)] transition hover:bg-paper-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-entreprenariat-300 focus-visible:ring-offset-2"
        >
          <RotateIcon className="h-5 w-5" />
        </button>
      </div>

      <div className={styles.scene}>
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ""} aspect-[85.6/54] w-full`}>
          {/* ============================ Recto ============================ */}
          <section
            inert={isFlipped || undefined}
            className={`${styles.face} overflow-hidden rounded-[24px] bg-gradient-to-br from-base via-[#24114a] to-entreprenariat-700 p-4 text-paper shadow-[0_28px_48px_-30px_rgba(23,10,46,0.8)]`}
            aria-label="Recto de la carte étudiante"
          >
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              <span className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/12 blur-2xl" />
              <span className="absolute -bottom-16 left-2 h-44 w-44 rounded-full bg-ia-500/25 blur-3xl" />
              <span className="absolute inset-y-0 right-8 w-20 rotate-[18deg] rounded-full bg-white/[0.05]" />
              <span className="absolute inset-y-0 right-24 w-12 rotate-[18deg] rounded-full bg-white/[0.04]" />
            </div>

            <div className="relative flex h-full flex-col justify-between gap-2.5">
              {/* En-tête : marque + année */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.55rem] font-medium uppercase tracking-[0.28em] text-paper/60">
                    Carte étudiante
                  </p>
                  <Image
                    src="/brand/logo-white-color.svg"
                    alt="Lamarr"
                    width={156}
                    height={42}
                    unoptimized
                    className="mt-1.5 h-5 w-auto"
                  />
                </div>
                <div className="shrink-0 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-paper/80 backdrop-blur">
                  {student.schoolYear}
                </div>
              </div>

              {/* Corps paysage : photo | infos (le QR est en absolu, centré) */}
              <div className="flex min-h-0 flex-1 items-center gap-3 pr-[4.75rem]">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="group relative flex aspect-[3/4] h-full max-h-[7.5rem] shrink-0 flex-col items-center justify-center self-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-2 text-center backdrop-blur transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                >
                  {photoSrc ? (
                    <>
                      <Image
                        src={photoSrc}
                        alt={`Photo de ${fullName}`}
                        fill
                        unoptimized
                        sizes="120px"
                        className="object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-base/85 to-transparent pb-1.5 pt-5">
                        <span className="rounded-full bg-paper/20 px-2 py-0.5 text-[0.55rem] font-semibold text-paper backdrop-blur">
                          Modifier
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]"
                      />
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-paper/15 text-paper">
                        <UserIcon className="h-4 w-4" />
                      </span>
                      <span className="relative mt-1.5 text-[0.6rem] font-semibold leading-tight text-paper/90">
                        Ajouter une photo
                      </span>
                    </>
                  )}
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handlePhotoChange}
                />

                {/* Infos */}
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                  <p className="truncate font-heading text-base font-bold leading-tight text-paper">
                    {fullName}
                  </p>
                  <div className="min-w-0">
                    <p className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-paper/55">
                      Formation
                    </p>
                    <p className="line-clamp-2 text-xs font-semibold leading-snug text-paper">
                      {student.program}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-paper/55">
                      Naissance · École
                    </p>
                    <p className="truncate text-xs font-semibold text-paper">
                      {student.birthDate} · {student.school}
                    </p>
                  </div>
                </div>

              </div>

              {/* QR : carré, centré verticalement sur toute la hauteur de la carte */}
              <div className="absolute right-0 top-1/2 aspect-square h-[46%] max-h-[4.5rem] min-h-[3rem] -translate-y-1/2 rounded-2xl bg-paper p-1.5 shadow-[0_18px_30px_-20px_rgba(0,0,0,0.45)]">
                <StudentQrCode value={student.qrValue} className="h-full w-full text-ink" />
              </div>
            </div>
          </section>

          {/* ============================ Verso ============================ */}
          <section
            inert={!isFlipped || undefined}
            className={`${styles.face} ${styles.back} overflow-hidden rounded-[24px] bg-gradient-to-br from-base via-[#231040] to-[#39176b] p-4 text-paper shadow-[0_28px_48px_-30px_rgba(23,10,46,0.8)]`}
            aria-label="Verso de la carte étudiante"
          >
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              <span className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-structure-data-500/18 blur-3xl" />
              <span className="absolute -right-10 top-4 h-36 w-36 rounded-full bg-entreprenariat-500/18 blur-3xl" />
              <span className="absolute inset-y-0 left-12 w-16 rotate-[-18deg] rounded-full bg-white/[0.04]" />
              <span className="absolute inset-y-0 left-28 w-10 rotate-[-18deg] rounded-full bg-white/[0.03]" />
            </div>

            <div className="relative flex h-full flex-col justify-between gap-2">
              <div className="flex items-center justify-end">
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-paper/80 backdrop-blur">
                  Lamarr
                </span>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur">
                  <Image
                    src="/brand/logo-white-color.svg"
                    alt="Logo complet Lamarr"
                    width={320}
                    height={100}
                    unoptimized
                    className="mx-auto h-auto w-[68%]"
                  />
                </div>
              </div>

              <p className="text-[0.6rem] leading-relaxed text-paper/75">
                Carte nominative réservée à un usage étudiant sur le campus. En cas de perte, merci
                de la rapporter à l&apos;accueil de l&apos;école.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StudentQrCode({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const matrix = buildQrVisual(value);

  return (
    <svg
      viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
      role="img"
      aria-label="QR étudiant"
      className={className}
      fill="currentColor"
    >
      <rect width={QR_SIZE} height={QR_SIZE} fill="white" />
      {matrix.flatMap((row, y) =>
        row.map((cell, x) =>
          cell ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null
        )
      )}
    </svg>
  );
}

function buildQrVisual(value: string) {
  const matrix = Array.from({ length: QR_SIZE }, () => Array.from({ length: QR_SIZE }, () => false));
  const reserved = Array.from({ length: QR_SIZE }, () =>
    Array.from({ length: QR_SIZE }, () => false)
  );

  const setCell = (x: number, y: number, isDark: boolean, isReserved = false) => {
    if (x < 0 || y < 0 || x >= QR_SIZE || y >= QR_SIZE) {
      return;
    }

    matrix[y][x] = isDark;
    if (isReserved) {
      reserved[y][x] = true;
    }
  };

  const reserveArea = (startX: number, startY: number, size: number) => {
    for (let y = startY; y < startY + size; y += 1) {
      for (let x = startX; x < startX + size; x += 1) {
        if (x >= 0 && y >= 0 && x < QR_SIZE && y < QR_SIZE) {
          reserved[y][x] = true;
        }
      }
    }
  };

  const drawFinder = (startX: number, startY: number) => {
    reserveArea(startX - 1, startY - 1, 9);
    for (let y = 0; y < 7; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const isOuter = x === 0 || x === 6 || y === 0 || y === 6;
        const isInner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        setCell(startX + x, startY + y, isOuter || isInner, true);
      }
    }
  };

  const drawAlignment = (startX: number, startY: number) => {
    reserveArea(startX - 1, startY - 1, 7);
    for (let y = 0; y < 5; y += 1) {
      for (let x = 0; x < 5; x += 1) {
        const isOuter = x === 0 || x === 4 || y === 0 || y === 4;
        const isCenter = x === 2 && y === 2;
        setCell(startX + x, startY + y, isOuter || isCenter, true);
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(QR_SIZE - 7, 0);
  drawFinder(0, QR_SIZE - 7);
  drawAlignment(QR_SIZE - 9, QR_SIZE - 9);

  for (let index = 8; index < QR_SIZE - 8; index += 1) {
    if (!reserved[6][index]) {
      setCell(index, 6, index % 2 === 0, true);
    }
    if (!reserved[index][6]) {
      setCell(6, index, index % 2 === 0, true);
    }
  }

  let seed = hashValue(value);
  for (let y = 0; y < QR_SIZE; y += 1) {
    for (let x = 0; x < QR_SIZE; x += 1) {
      if (reserved[y][x]) {
        continue;
      }

      seed = xorshift32(seed + x * 17 + y * 31);
      matrix[y][x] = (seed & 1) === 1;
    }
  }

  return matrix;
}

function hashValue(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function xorshift32(value: number) {
  let state = value || 1;
  state ^= state << 13;
  state ^= state >>> 17;
  state ^= state << 5;
  return state >>> 0;
}

function RotateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      width={24}
      height={24}
      aria-hidden
      focusable={false}
      {...props}
    >
      <path d="M105.1 202.6c7.7 5.2 18.1 3.2 23.3-4.5C155.8 157.7 202.6 128 256 128c39.6 0 75.6 16.3 101.5 42.5L320 208c-9.2 9.2-2.7 25 10.3 25H456c8.8 0 16-7.2 16-16V91.3c0-13-15.8-19.5-25-10.3l-44.7 44.7C367.4 88.7 314.5 64 256 64c-74.2 0-139 39.8-174.2 99.3c-5.2 7.7-3.2 18.1 4.5 23.3zM406.9 309.4c-7.7-5.2-18.1-3.2-23.3 4.5C356.2 354.3 309.4 384 256 384c-39.6 0-75.6-16.3-101.5-42.5L192 304c9.2-9.2 2.7-25-10.3-25H56c-8.8 0-16 7.2-16 16V420.7c0 13 15.8 19.5 25 10.3l44.7-44.7C144.6 423.3 197.5 448 256 448c74.2 0 139-39.8 174.2-99.3c5.2-7.7 3.2-18.1-4.5-23.3z" />
    </svg>
  );
}
