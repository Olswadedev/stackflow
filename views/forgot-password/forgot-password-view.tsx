import { AuthShell } from "@/components/layout/auth-shell";
import { FORM_BTN_PRIMARY, FORM_FIELD } from "@/lib/form-classes";
import Link from "next/link";

export function ForgotPasswordView() {
  return (
    <AuthShell title="Mot de passe oublié">
      <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-zinc-300"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            placeholder="vous@exemple.com"
            className={FORM_FIELD}
          />
        </div>

        <Link href="/forgot-password/confirmation" className={FORM_BTN_PRIMARY}>
          Envoyer le lien
        </Link>

        <p className="mt-6 text-center text-sm">
          <Link
            href="/login"
            className="text-zinc-400 underline-offset-4 transition hover:text-white hover:underline"
          >
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
