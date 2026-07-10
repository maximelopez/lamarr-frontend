"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { CalendarIcon, CheckIcon, DragHandleIcon } from "@/components/home/icons";

type Todo = {
  id: string;
  text?: string;
  label?: string;
  done: boolean;
  due?: string;
};

const STORAGE_KEY = "lamarr.todos";

function normalizeTodo(value: unknown): Todo | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<Todo>;
  if (typeof candidate.id !== "string" || typeof candidate.done !== "boolean") {
    return null;
  }

  return {
    id: candidate.id,
    done: candidate.done,
    text: typeof candidate.text === "string" ? candidate.text : undefined,
    label: typeof candidate.label === "string" ? candidate.label : undefined,
    due: typeof candidate.due === "string" ? candidate.due : undefined,
  };
}

/**
 * To-do list complète (ajout / suppression / cochage / réordonnancement),
 * persistée en localStorage sous la même clé que la liste de l'accueil :
 * les deux vues restent synchronisées. Style aligné sur la charte
 * (mêmes cases et carte que la section To-do de l'accueil).
 */
export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [draggedTodoId, setDraggedTodoId] = useState<string | null>(null);
  const hasHydratedRef = useRef(false);

  const doneCount = useMemo(() => todos.filter((t) => t.done).length, [todos]);

  // Charge depuis le local storage au montage
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as unknown;
          if (Array.isArray(parsed)) {
            setTodos(parsed.map(normalizeTodo).filter((todo): todo is Todo => todo !== null));
          }
        } catch {
          // ignore les données corrompues
        }
      }

      hasHydratedRef.current = true;
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // Sauvegarde à chaque changement (une fois chargé)
  useEffect(() => {
    if (hasHydratedRef.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: value, done: false },
      ...prev,
    ]);
    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const moveTodo = (activeId: string, targetId: string) => {
    if (activeId === targetId) {
      return;
    }

    setTodos((prev) => {
      const fromIndex = prev.findIndex((todo) => todo.id === activeId);
      const toIndex = prev.findIndex((todo) => todo.id === targetId);

      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
        return prev;
      }

      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section aria-labelledby="todolist-title">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="todolist-title" className="font-heading text-lg font-bold text-ink">
          To-do list
        </h2>
        {todos.length > 0 && (
          <span
            className="rounded-full bg-entreprenariat-100 px-3 py-1 font-body text-sm font-medium text-entreprenariat-700"
            aria-live="polite"
          >
            {doneCount}/{todos.length} terminées
          </span>
        )}
      </div>

      <div className="rounded-3xl border border-border bg-paper p-4 shadow-[0_16px_32px_-24px_rgba(23,10,46,0.35)]">
        <form className="flex gap-2" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Ajouter une tâche…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-11 min-w-0 flex-1 rounded-full border border-border bg-paper px-4 font-body text-sm text-ink outline-none transition focus:border-entreprenariat-500 focus:ring-2 focus:ring-entreprenariat-300/40"
          />
          <button
            type="submit"
            className="flex min-h-11 shrink-0 items-center rounded-full bg-entreprenariat-500 px-5 font-body text-sm font-semibold text-paper transition hover:opacity-90"
          >
            Ajouter
          </button>
        </form>

        <ul className="mt-2 flex flex-col">
          {todos.length === 0 && (
            <li className="px-1 py-3 font-body text-sm text-ink-muted">
              Aucune tâche pour le moment.
            </li>
          )}

          {todos.map((todo, index) => (
            <li key={todo.id}>
              <div
                className={`flex items-center gap-3 px-1 py-3.5 ${
                  index === todos.length - 1 ? "" : "border-b border-border"
                } ${draggedTodoId === todo.id ? "bg-paper-soft" : ""}`}
                draggable
                onDragStart={(event) => {
                  setDraggedTodoId(todo.id);
                  event.dataTransfer.effectAllowed = "move";
                  event.dataTransfer.setData("text/plain", todo.id);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const activeId = event.dataTransfer.getData("text/plain") || draggedTodoId;
                  if (activeId) {
                    moveTodo(activeId, todo.id);
                  }
                }}
                onDragEnd={() => setDraggedTodoId(null)}
              >
                <label className="flex min-h-11 flex-1 cursor-pointer items-center gap-3">
                  <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => toggleTodo(todo.id)}
                      className="peer sr-only"
                    />
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-entreprenariat-500 text-paper transition peer-checked:bg-entreprenariat-500 peer-focus-visible:ring-2 peer-focus-visible:ring-entreprenariat-300 peer-focus-visible:ring-offset-2"
                      aria-hidden
                    >
                      <CheckIcon className={`h-4 w-4 ${todo.done ? "opacity-100" : "opacity-0"}`} />
                    </span>
                  </span>
                  <span
                    className={`font-body text-[15px] ${
                      todo.done ? "text-ink-muted line-through" : "text-ink"
                    }`}
                  >
                    {todo.text ?? todo.label ?? ""}
                  </span>
                </label>

                {todo.due && (
                  <span className="flex items-center gap-1 whitespace-nowrap font-body text-sm text-ink-muted">
                    <CalendarIcon className="h-4 w-4" />
                    {todo.due}
                  </span>
                )}

                <DragHandleIcon className="h-5 w-5 shrink-0 text-ink-muted/60" aria-hidden />

                <button
                  type="button"
                  onClick={() => removeTodo(todo.id)}
                  aria-label={`Supprimer « ${todo.text ?? todo.label ?? "la tâche"} »`}
                  className="flex h-11 w-8 shrink-0 items-center justify-center rounded-full font-body text-xl leading-none text-ink-muted transition hover:bg-paper-soft hover:text-entreprenariat-700"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
