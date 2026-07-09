"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { CalendarIcon, CheckIcon, DragHandleIcon } from "./icons";

type Task = {
  id: string;
  label?: string;
  text?: string;
  done: boolean;
  due?: string;
};

const STORAGE_KEY = "lamarr.todos";

function normalizeTask(value: unknown): Task | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<Task>;
  if (typeof candidate.id !== "string" || typeof candidate.done !== "boolean") {
    return null;
  }

  return {
    id: candidate.id,
    done: candidate.done,
    label: typeof candidate.label === "string" ? candidate.label : undefined,
    text: typeof candidate.text === "string" ? candidate.text : undefined,
    due: typeof candidate.due === "string" ? candidate.due : undefined,
  };
}

/**
 * Section « To-do list » de l'accueil.
 * Rend le titre + un badge de comptage qui reste synchronisé avec l'état des
 * cases, puis la liste (vraies <input> pour l'accessibilité).
 * Volontairement distincte du composant `TodoList` global (design maquette,
 * pas d'ajout/suppression ici).
 */
export default function HomeTodoList({
  initialTasks,
  hiddenDone = 0,
  hiddenPending = 0,
}: {
  initialTasks: Task[];
  /** Tâches terminées non affichées (comptées dans le badge). */
  hiddenDone?: number;
  /** Tâches en cours non affichées (comptées dans le badge). */
  hiddenPending?: number;
}) {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const hasHydratedRef = useRef(false);
  const doneCount = useMemo(
    () => tasks.filter((t) => t.done).length + hiddenDone,
    [tasks, hiddenDone]
  );
  const total = tasks.length + hiddenDone + hiddenPending;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as unknown;
          if (Array.isArray(parsed)) {
            setTasks(parsed.map(normalizeTask).filter((task): task is Task => task !== null));
          }
        } catch {
          // ignore les données corrompues
        }
      }

      hasHydratedRef.current = true;
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (hasHydratedRef.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const moveTask = (activeId: string, targetId: string) => {
    if (activeId === targetId) {
      return;
    }

    setTasks((prev) => {
      const fromIndex = prev.findIndex((task) => task.id === activeId);
      const toIndex = prev.findIndex((task) => task.id === targetId);

      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
        return prev;
      }

      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  return (
    <section aria-labelledby="todo-title">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="todo-title" className="font-heading text-xl font-bold text-ink">
          To-do list
        </h2>
        <span
          className="rounded-full bg-entreprenariat-100 px-3 py-1 font-body text-sm font-medium text-entreprenariat-700"
          aria-live="polite"
        >
          {doneCount}/{total} terminées
        </span>
      </div>

      <div className="rounded-3xl border border-border bg-paper p-2 shadow-[0_16px_32px_-24px_rgba(23,10,46,0.35)]">
        <ul className="flex flex-col">
          {tasks.map((task, index) => (
            <li key={task.id}>
              <div
                className={`flex items-center gap-3 px-3 py-3.5 ${
                  index === tasks.length - 1 ? "" : "border-b border-border"
                } ${draggedTaskId === task.id ? "bg-paper-soft" : ""}`}
                draggable
                onDragStart={(event) => {
                  setDraggedTaskId(task.id);
                  event.dataTransfer.effectAllowed = "move";
                  event.dataTransfer.setData("text/plain", task.id);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const activeId = event.dataTransfer.getData("text/plain") || draggedTaskId;
                  if (activeId) {
                    moveTask(activeId, task.id);
                  }
                }}
                onDragEnd={() => setDraggedTaskId(null)}
              >
                <label className="flex min-h-11 flex-1 cursor-pointer items-center gap-3">
                  <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggle(task.id)}
                      className="peer sr-only"
                    />
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-entreprenariat-500 text-paper transition peer-checked:bg-entreprenariat-500 peer-focus-visible:ring-2 peer-focus-visible:ring-entreprenariat-300 peer-focus-visible:ring-offset-2"
                      aria-hidden
                    >
                      <CheckIcon className={`h-4 w-4 ${task.done ? "opacity-100" : "opacity-0"}`} />
                    </span>
                  </span>
                  <span
                    className={`font-body text-[15px] ${
                      task.done ? "text-ink-muted line-through" : "text-ink"
                    }`}
                  >
                    {task.label ?? task.text ?? ""}
                  </span>
                </label>

                {task.due && (
                  <span className="flex items-center gap-1 whitespace-nowrap font-body text-sm text-ink-muted">
                    <CalendarIcon className="h-4 w-4" />
                    {task.due}
                  </span>
                )}

                <DragHandleIcon className="h-5 w-5 shrink-0 text-ink-muted/60" aria-hidden />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
