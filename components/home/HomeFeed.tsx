"use client";

import Image from "next/image";
import { useState } from "react";

import FilterChips from "./FilterChips";
import HomeTodoList from "./HomeTodoList";
import { CalendarIcon } from "./icons";
import SchoolLifeTimeline from "./SchoolLifeWidget";
import { mockSchoolLifeEvents } from "@/app/(dashboard)/hub-news/mock-school-life-events";
import Agenda from "../Agenda";

const FILTERS = ["Tous", "Agenda", "Actualités", "Food truck", "Todo list"];

type HomeFeedProps = {
  agenda: AgendaItem[];
  todos: Parameters<typeof HomeTodoList>[0]["initialTasks"];
  hiddenDone?: number;
  hiddenPending?: number;
  schoolLifeEvent: AgendaItem[];
};

export default function HomeFeed({
  agenda,
  todos,
  hiddenDone = 0,
  hiddenPending = 0,
  schoolLifeEvent
}: HomeFeedProps) {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const isVisible = (section: string) => activeFilter === "Tous" || activeFilter === section;

  return (
    <div className="flex flex-col gap-8 px-5 pt-6 pb-4">
      <FilterChips filters={FILTERS} active={activeFilter} onChange={setActiveFilter} />

      {isVisible("Agenda") && (
        <section aria-labelledby="agenda-title">
          <Agenda title={"Mon Agenda"} type="course" items={agenda} ></Agenda>
        </section>
      )}

      {isVisible("Actualités") && (
        <section aria-labelledby="news-title">
          <h2 id="news-title" className="mb-3 font-heading text-xl font-bold text-ink">
            A la une aujourd&apos;hui
          </h2>
          <article className="overflow-hidden rounded-3xl border border-border bg-paper shadow-[0_16px_32px_-24px_rgba(23,10,46,0.35)]">
            <div className="relative h-40 w-full">
              <Image
                src="/images/news-digital-summer.jpg"
                alt="Étudiants réunis sur le campus au coucher du soleil"
                fill
                sizes="(max-width: 480px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-heading text-lg font-bold text-entreprenariat-700">
                My digital Summer
              </h3>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-body text-sm text-ink-muted">
                    Rendez-vous le mardi 7 juillet à partir de 18h sur le campus pour une soirée
                    estivale
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 font-body text-sm font-medium text-entreprenariat-500">
                    <CalendarIcon className="h-4 w-4" />
                    Le 7 Juillet à partir de 18h
                  </p>
                </div>
                <button
                  type="button"
                  className="flex min-h-11 shrink-0 items-center rounded-full bg-entreprenariat-500 px-4 font-body text-sm font-semibold text-paper transition hover:opacity-90"
                >
                  M&apos;inscrire
                </button>
              </div>
            </div>
          </article>
        </section>
      )}

      {isVisible("Food truck") && (
        <section aria-labelledby="foodtruck-title">
          <h2 id="foodtruck-title" className="mb-3 font-heading text-xl font-bold text-ink">
            Food-truck
          </h2>
          <div className="relative overflow-visible rounded-3xl bg-gradient-to-br from-creativite-300 to-creativite-100 p-5 pr-28">
            <div className="relative z-10 max-w-[60%]">
              <h3 className="font-heading text-2xl font-bold text-ink">Pizza Pepone</h3>
              <button
                type="button"
                className="mt-3 inline-flex min-h-11 items-center rounded-full bg-paper px-4 font-body text-sm font-semibold text-ink shadow-sm transition hover:bg-paper-soft"
              >
                Commander
              </button>
            </div>
            <Image
              src="/images/food-truck.png"
              alt="Food truck Pizza Pepone"
              width={176}
              height={128}
              className="absolute -bottom-8 right-[-12px] h-32 w-44 object-contain drop-shadow-sm"
            />
          </div>
        </section>
      )}
      
      {isVisible("School Life") && (
        <section aria-labelledby="school-title">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 id="school-title" className="font-heading text-xl font-bold text-ink">
              A venir
            </h2>
            <a href="#" className="font-body text-sm font-medium text-ink-muted transition hover:text-ink">
              Tout voir
            </a>
          </div>
          <SchoolLifeTimeline events={mockSchoolLifeEvents} />
        </section>
      )}

      {isVisible("Todo list") && (
        <HomeTodoList initialTasks={todos} hiddenDone={hiddenDone} hiddenPending={hiddenPending} />
      )}
    </div>
  );
}