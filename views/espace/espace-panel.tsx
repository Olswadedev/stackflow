"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function EspacePanel() {
  const [editing, setEditing] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPhotoPreview(null);
      return;
    }
    setPhotoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  const initials = `${firstName.charAt(0) || "?"}${
    lastName.charAt(0) || "?"
  }`;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-xl sm:p-8">
        <h2 className="text-lg font-semibold text-white">Profil</h2>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-800">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-lg font-semibold text-zinc-400">
                  {initials}
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-zinc-500">
                Photo de profil 
              </label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onPhotoChange}
                className="mt-2 block w-full max-w-xs text-xs text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-600/20 file:px-3 file:py-2 file:text-sm file:font-medium file:text-violet-200 hover:file:bg-violet-600/30"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Nom
                </span>
                {editing ? (
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/40"
                  />
                ) : (
                  <p className="mt-1.5 text-sm text-zinc-200">{lastName}</p>
                )}
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Prénom
                </span>
                {editing ? (
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/40"
                  />
                ) : (
                  <p className="mt-1.5 text-sm text-zinc-200">{firstName}</p>
                )}
              </div>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                E-mail
              </span>
              {editing ? (
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  inputMode="email"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              ) : (
                <p className="mt-1.5 truncate text-sm text-zinc-200">{email}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="mt-8 w-full rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10 sm:w-auto sm:px-8"
        >
          {editing ? "Enregistrer" : "Modifier le profil"}
        </button>
      </section>

      <section className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-xl sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Messages</h2>
        </div>
        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
          <li className="rounded-xl border border-white/5 bg-zinc-950/50 px-4 py-3">
            <span className="font-medium text-zinc-200">Équipe Synthèse</span>
            <p className="mt-1 text-zinc-400">
              Bienvenue sur votre espace — vos messages
            </p>
          </li>
          <li className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-zinc-500">
            Pas de message aujourd'hui.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-xl sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
          <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-medium text-violet-200">
            2
          </span>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex gap-3 rounded-xl border border-white/5 bg-zinc-950/50 px-4 py-3">
            <span
              className="mt-1 size-2 shrink-0 rounded-full bg-violet-500"
              aria-hidden
            />
            <div>
              <p className="font-medium text-zinc-200">Session active</p>
              <p className="text-zinc-400">
               Dernière activité enregistrée.
              </p>
            </div>
          </li>
          <li className="flex gap-3 rounded-xl border border-white/5 bg-zinc-950/50 px-4 py-3">
            <span
              className="mt-1 size-2 shrink-0 rounded-full bg-zinc-600"
              aria-hidden
            />
            <div>
              <p className="font-medium text-zinc-200">Rappel</p>
              <p className="text-zinc-400">
                N'oubliez pas de consulter régulièrement votre espace personnel afin de rester informé de vos dernières activités, messages et notifications.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
        >
          Accueil
        </Link>
        
      </div>
    </div>
  );
}
