"use client";

import { useEffect, useRef, useState } from "react";

import "../styles/TodoList.css";

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

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [draggedTodoId, setDraggedTodoId] = useState<string | null>(null);
  const hasHydratedRef = useRef(false);

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
    <div className="todo">
      <form className="todo__form" onSubmit={addTodo}>
        <input
          className="todo__input"
          type="text"
          placeholder="Ajouter une tâche…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="todo__add" type="submit">
          Ajouter
        </button>
      </form>

      <ul className="todo__list">
        {todos.length === 0 && (
          <li className="todo__empty">Aucune tâche pour le moment.</li>
        )}

        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo__item ${draggedTodoId === todo.id ? "todo__item--dragging" : ""}`}
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
            <label className="todo__label">
              <input
                type="checkbox"
                className="todo__check"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                className={
                  todo.done ? "todo__text todo__text--done" : "todo__text"
                }
              >
                {todo.text ?? todo.label ?? ""}
              </span>
            </label>
            <button
              className="todo__remove"
              type="button"
              onClick={() => removeTodo(todo.id)}
              aria-label="Supprimer"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
