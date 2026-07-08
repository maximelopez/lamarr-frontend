"use client";

import { useState } from "react";
import Link from "next/link";
import type { SubmitEvent } from "react";

import FormField from "@/components/FormField";
import "../../styles/Auth.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormError("");

    const nextErrors: typeof errors = {};

    if (!email) {
      nextErrors.email = "L'email est requis.";
    }

    if (!password) {
      nextErrors.password = "Le mot de passe est requis.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      // Exemple futur :
      //
      // await fetch("/api/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });

      await new Promise((resolve) =>
        setTimeout(resolve, 600)
      );

    } catch {
      setFormError(
        "Email ou mot de passe incorrect."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">
          Connexion
        </h1>

        {formError && (
          <p className="auth-form-error">
            {formError}
          </p>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <FormField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e: any) =>
              setEmail(e.target.value)
            }
            error={errors.email}
          />

          <FormField
            label="Mot de passe"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            error={errors.password}
          />

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Connexion..."
              : "Se connecter"}
          </button>
        </form>

        <p className="auth-switch">
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="auth-link"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}