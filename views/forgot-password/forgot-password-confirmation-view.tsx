import { AuthShell } from "@/components/layout/auth-shell";
import Link from "next/link";

export function ForgotPasswordConfirmationView() {
  return (
    <AuthShell title="Lien envoyé !">
      <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-center backdrop-blur-xl">
        <p className="text-zinc-400">
          Si cet email est enregistré, vous recevrez un lien de réinitialisation d'ici quelques minutes.
        </p>
        <Link href="/login" className="mt-6 block text-sm font-medium text-violet-400 hover:text-violet-300">
          ← Retour à la connexion
        </Link>
      </div>
    </AuthShell>
  );
}