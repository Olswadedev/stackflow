"use client";

import { LogoMark } from "@/components/layout/logo-mark";
import type { AdminChromeProps } from "@/types/layout.types";
import { logoutAdmin } from "@/server/actions/admin-auth.actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminChrome({ children }: AdminChromeProps) {
  const pathname = usePathname();
  const isConnexion = pathname === "/admin/connexion";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <LogoMark className="text-white" />
            <span className="rounded-md bg-amber-500/15 px-2 py-1 text-xs font-semibold text-amber-200">
              Espace admin
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Accueil
            </Link>
            {!isConnexion ? (
              <form action={logoutAdmin}>
                <button
                  type="submit"
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Déconnexion
                </button>
              </form>
            ) : null}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
