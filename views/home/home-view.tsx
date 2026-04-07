import { LogoMark } from "@/components/layout/logo-mark";
import Link from "next/link";

export function HomeView() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-30%,rgba(139,92,246,0.45),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(217,70,239,0.2),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <LogoMark className="text-white" />
        <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/espace"
            className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Mon espace
          </Link>
          <Link
            href="/admin/connexion"
            className="rounded-full border border-amber-500/35 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-400/50 hover:bg-amber-500/15"
          >
            Admin
          </Link>
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition hover:bg-zinc-100"
          >
            S&apos;inscrire
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-8 sm:pt-16 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-violet-300">
            Bienvenue à Synthèse
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Pilotez les utilisateurs{" "}
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              connectés
            </span>{" "}
            en un coup d&apos;œil.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Synthèse illustre une plateforme de suivi des utilisateurs connectés.
            Vous pouvez voir en temps réel les utilisateurs actifs et inactifs.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-8 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 transition hover:brightness-110"
            >
              Commencer gratuitement
            </Link>
           
          </div>

          <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-10 sm:gap-10">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Temps réel
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-white">Live</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Sécurité
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-white">Contrôlée</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Interface
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-white">Interactive</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
