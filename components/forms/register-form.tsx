"use client";

import { FORM_BTN_PRIMARY, FORM_FIELD } from "@/lib/form-classes";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [success]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
      .value.trim();
    const firstName = (
      form.elements.namedItem("firstName") as HTMLInputElement
    ).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
      .trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirm = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (!lastName || !firstName || !email || !password || !confirm) {
      setSuccess(false);
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!email.includes("@")) {
      setSuccess(false);
      setError("L’e-mail doit contenir un @.");
      return;
    }

    if (password !== confirm) {
      setSuccess(false);
      setError("La confirmation ne correspond pas au mot de passe.");
      return;
    }

    setSuccess(true);
    setError(null);
    form.reset();

      setTimeout(() => {
        router.push("/");
      }, 1500);
  }

  return (
    <div>
      {success ? (
        <div
          className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-medium text-emerald-300"
          role="status"
        >
          Inscription réussie
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="lastName"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Nom
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              className={FORM_FIELD}
            />
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Prénom
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              className={FORM_FIELD}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
              className={FORM_FIELD}
            />
          </div>
          <div className="sm:col-span-2">
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
              autoComplete="new-password"
              className={FORM_FIELD}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Confirmation du mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
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
          S&apos;inscrire
        </button>

        <p className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="font-medium text-violet-400 hover:text-violet-300 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
}
