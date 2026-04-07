"use client";

import {
  FORM_BTN_PRIMARY,
  FORM_FIELD,
  FORM_FIELD_ERROR,
} from "@/lib/form-classes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setEmailError(false);
    const form = e.currentTarget;
    const email = (
      form.elements.namedItem("identifier") as HTMLInputElement
    ).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (!email.includes("@")) {
      setEmailError(true);
      setError("L’e-mail doit contenir un @.");
      return;
    }
    if (!password) {
      setError("Saisissez votre mot de passe.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl"
      noValidate
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="identifier"
            className="mb-1.5 block text-sm font-medium text-zinc-300"
          >
            E-mail
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            inputMode="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
            onChange={() => setEmailError(false)}
            className={`${FORM_FIELD} ${emailError ? FORM_FIELD_ERROR : ""}`}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-zinc-300"
          >
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className={FORM_FIELD}
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className={FORM_BTN_PRIMARY}>
        Se connecter
      </button>

      <p className="mt-6 text-center text-sm">
        <Link
          href="/forgot-password"
          className="text-violet-400 underline-offset-4 transition hover:text-violet-300 hover:underline"
        >
          Mot de passe oublié ?
        </Link>
      </p>

      <p className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
        Pas encore de compte ?{" "}
        <Link
          href="/register"
          className="font-medium text-violet-400 hover:text-violet-300 hover:underline"
        >
          S&apos;inscrire
        </Link>
      </p>
    </form>
  );
}
