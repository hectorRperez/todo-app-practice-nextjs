"use client";

import { useState, useRef } from "react";

const initialTasks = [];

export default function SanctuaryPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("todas");
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  const filtered = tasks.filter((t) => {
    if (filter === "pendientes") return !t.done;
    if (filter === "hechas") return t.done;
    return true;
  });

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false },
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="sanctuary-root">
      {/* ── NAV ── */}
      <nav className="nav">
        <button
          className="nav-menu"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          <span className={`hamburger ${menuOpen ? "open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>

        <span className="nav-brand">Sanctuary</span>

        <div className="nav-avatar" aria-hidden="true">
          <div className="avatar-inner" />
        </div>
      </nav>

      {/* ── HEADER ── */}
      <header className="hero">
        <h1 className="hero-title">Mis Tareas</h1>
        <p className="hero-sub">Organiza tu día con calma y precisión.</p>
      </header>

      {/* ── INPUT ── */}
      <div className="input-card">
        <button
          className="input-plus"
          onClick={() => inputRef.current?.focus()}
          aria-label="Nueva tarea"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="9" fill="#3B3FE4" />
            <path
              d="M9 5v8M5 9h8"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <input
          ref={inputRef}
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="¿Qué necesitas hacer?"
        />

        <button className="input-btn" onClick={addTask}>
          Añadir
        </button>
      </div>

      {/* ── TASK LIST ── */}
      <ul className="task-list">
        {filtered.length === 0 && (
          <li className="task-empty">No hay tareas aquí aún.</li>
        )}
        {filtered.map((task) => (
          <li key={task.id} className="task-item">
            <button
              className={`checkbox ${task.done ? "checked" : ""}`}
              onClick={() => toggleTask(task.id)}
              aria-checked={task.done}
              role="checkbox"
            >
              {task.done && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5l3.5 3.5L11 1"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <span className={`task-text ${task.done ? "done" : ""}`}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>

      {/* ── FILTERS ── */}
      <div className="filters">
        {["todas", "pendientes", "hechas"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

