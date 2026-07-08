"use client";

import { useEffect, useState } from "react";

import "../styles/TodoList.css";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const STORAGE_KEY = "lamarr.todos";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Charge depuis le local storage au montage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setTodos(JSON.parse(raw));
      } catch {
        // ignore les données corrompues
      }
    }
    setLoaded(true);
  }, []);

  // Sauvegarde à chaque changement (une fois chargé)
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, loaded]);

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
          <li key={todo.id} className="todo__item">
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
                {todo.text}
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
