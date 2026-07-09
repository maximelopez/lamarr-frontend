"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SubmitEvent, ChangeEvent } from "react";

import FormField from "@/components/FormField";
import RedirectIfAuthed from "@/components/RedirectIfAuthed";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const nextErrors: typeof errors = {};
    if (!email) nextErrors.email = "L'email est requis.";
    if (!password) nextErrors.password = "Le mot de passe est requis.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await login(email, password);
      router.replace("/");
    } catch {
      setFormError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RedirectIfAuthed>
      <main className="min-h-screen flex items-center justify-center bg-paper-soft px-6">
        <div className="w-full max-w-sm rounded-2xl bg-paper border border-border p-8 shadow-sm">
          <h1 className="mb-6 font-heading text-2xl font-bold text-ink">
            Connexion
          </h1>

          {formError && (
            <p className="mb-4 rounded-lg bg-entreprenariat-100 px-3 py-2 text-sm text-entreprenariat-700">
              {formError}
            </p>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <FormField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              error={errors.email}
            />

            <FormField
              label="Mot de passe"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              error={errors.password}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-1 rounded-xl bg-base py-2.5 font-body font-semibold text-white transition hover:opacity-85 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </main>
    </RedirectIfAuthed>
  );
}