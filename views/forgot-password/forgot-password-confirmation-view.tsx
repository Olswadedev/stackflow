import { AuthShell } from "@/components/layout/auth-shell";
import Link from "next/link";

export function ForgotPasswordConfirmationView() {
  return (
    <AuthShell
      title="E-mail de réinitialisation"
      
    >
      <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
        <p className="text-sm leading-relaxed text-zinc-300">
          Vous recevrez un lien pour choisir un nouveau mot de passe.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
        >
          Retour à la connexion
        </Link>
      </div>
    </AuthShell>
  );
}
