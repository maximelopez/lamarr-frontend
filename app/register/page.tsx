"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import Link from "next/link";

import FormField from "@/components/FormField";
import "../../styles/Auth.css"

type Errors = Partial<
  Record<
    "name" | "email" | "password" | "confirmPassword",
    string
  >
>;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormError("");

    const nextErrors: Errors = {};

    if (!name) {
      nextErrors.name = "Le nom est requis.";
    }

    if (!email) {
      nextErrors.email = "L'email est requis.";
    }

    if (!password) {
      nextErrors.password = "Le mot de passe est requis.";
    } else if (password.length < 8) {
      nextErrors.password = "8 caractères minimum.";
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword =
        "Les mots de passe ne correspondent pas.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      // Plus tard :
      //
      // await fetch("/api/auth/register", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     password,
      //   }),
      // });

      await new Promise((resolve) =>
        setTimeout(resolve, 600)
      );

    } catch {
      setFormError(
        "Impossible de créer le compte pour le moment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
     <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">
          Créer un compte
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
            label="Nom complet"
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            error={errors.name}
          />

          <FormField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            error={errors.email}
          />

          <FormField
            label="Mot de passe"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            error={errors.password}
          />

          <FormField
            label="Confirmer le mot de passe"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e: any) =>
              setConfirmPassword(e.target.value)
            }
            error={errors.confirmPassword}
          />

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Création..."
              : "Créer mon compte"}
          </button>
        </form>

        <p className="auth-switch">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="auth-link"
          >
            Se connecter
          </Link>
        </p>
      </div>
     </main>
  );
}