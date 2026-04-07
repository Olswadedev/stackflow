"use client";

import { FORM_BTN_PRIMARY, FORM_FIELD } from "@/lib/form-classes";
import Link from "next/link";
import { registerUser, type UserRegisterState } from "@/server/actions/user-auth.actions";
import { useActionState } from "react";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<UserRegisterState, FormData>(registerUser, null);

  return (
    <div>
      {state?.success ? (
        <div
          className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-medium text-emerald-300"
          role="status"
        >
          Inscription réussie
        </div>
      ) : null}

      <form
        action={formAction}
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

        {state?.error ? (
          <p className="mt-4 text-sm text-red-400" role="alert">
            {state.error}
          </p>
        ) : null}

        <button type="submit" className={FORM_BTN_PRIMARY} disabled={pending}>
          {pending ? "Inscription..." : "S'inscrire"}
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
