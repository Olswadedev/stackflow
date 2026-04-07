"use client";

import { FORM_FIELD } from "@/lib/form-classes";
import { loginAdmin } from "@/server/actions/admin-auth.actions";
import type { AdminLoginState } from "@/types/admin.types";
import { useActionState } from "react";

export function AdminConnexionView() {
  const [state, formAction, pending] = useActionState<
    AdminLoginState,
    FormData
  >(loginAdmin, null);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Connexion administrateur
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Mot de passe par défaut :{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-violet-200">
            admin
          </code>
        </p>
      </div>

      <form
        action={formAction}
        className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl"
      >
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-zinc-300"
        >
          Mot de passe admin
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={FORM_FIELD}
          placeholder="••••••••"
        />

        {state?.error ? (
          <p className="mt-4 text-sm text-red-400" role="alert">
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-8 w-full rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:brightness-110 disabled:opacity-50"
        >
          {pending ? "Vérification…" : "Accéder à l’administration"}
        </button>
      </form>
    </main>
  );
}
