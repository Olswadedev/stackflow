"use client";

import Link from "next/link";
import { useState } from "react";
import { EspaceView } from "@/views/espace/espace-view";
import { jsPDF } from "jspdf"; // Importation de la bibliothèque

export function DashboardView() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "settings">("dashboard");

  // FONCTION DE TÉLÉCHARGEMENT RÉELLE
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Design simple du PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(139, 92, 246); // Ta couleur violette
    doc.text("RAPPORT D'ACTIVITÉ - SYNTHÈSE", 20, 30);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Généré le : ${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}`, 20, 40);

    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    // Données de l'utilisateur
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Résumé du compte :", 20, 60);

    doc.setFont("helvetica", "normal");
    doc.text("- Statut : En ligne", 25, 70);
    doc.text("- Type de compte : Actif", 25, 80);
    doc.text("- Notifications : 1 nouvelle", 25, 90);
    doc.text("- Activité : Connexion enregistrée aujourd'hui", 25, 100);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Document généré automatiquement par votre Dashboard.", 20, 280);

    // C'est cette ligne qui déclenche le téléchargement dans le navigateur
    doc.save("donnees-activite.pdf");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-30%,rgba(139,92,246,0.45),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(217,70,239,0.2),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">

        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-violet-300">
              Dashboard
            </p>

            <h1 className="text-3xl font-semibold text-white">
              Bonjour
            </h1>

            <p className="mt-2 text-zinc-400">
              ici un aperçu rapide de votre activité
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* BOUTON PDF FONCTIONNEL */}
            <button
              onClick={handleDownloadPDF}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/10 transition-colors"
            >
              Télécharger PDF
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
            >
              Paramètres
            </button>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <>
            {/* STATS */}
            <div className="grid gap-6 md:grid-cols-4 mb-10">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase text-zinc-500">Statut</p>
                <p className="mt-2 text-xl font-semibold text-emerald-400">
                  En ligne
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase text-zinc-500">Compte</p>
                <p className="mt-2 text-white font-semibold">
                  Actif
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase text-zinc-500">Dernière connexion</p>
                <p className="mt-2 text-white font-semibold">
                  Aujourd’hui
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase text-zinc-500">Notifications</p>
                <p className="mt-2 text-violet-400 font-semibold">
                  1 nouvelles
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-white mb-4">
                Accès rapides
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <Link
                  href="/"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 transition hover:bg-red-500/20 text-center"
                >
                  Se déconnecter
                </Link>
              </div>
            </div>

            {/* GRID */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Messages
                </h2>

                <div className="space-y-3">
                  <div className="rounded-lg bg-white/5 p-3 text-sm text-zinc-300">
                    Bienvenue sur Synthèse
                  </div>

                  <div className="rounded-lg bg-white/5 p-3 text-sm text-zinc-300">
                    Votre compte est sécurisé
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Activité récente
                </h2>

                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>Connexion aujourd’hui</li>
                  <li>Accès au dashboard</li>
                  <li>Compte actif</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {/* PARAMÈTRES / ESPACE */}
        {activeTab === "settings" && (
          <EspaceView setActiveTab={setActiveTab} />
        )}
        
      </div>
    </div>
  );
}