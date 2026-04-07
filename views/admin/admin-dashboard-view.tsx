"use client";

import { MOCK_USERS_INITIAL } from "@/lib/data/users.mock";
import type { AdminPresenceFilter } from "@/types/admin.types";
import type { MockUser, UserRole } from "@/types/user.types";
import { useMemo, useState } from "react";

function formatDateFr(iso: string) {
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function fullName(u: MockUser) {
  return `${u.prenom} ${u.nom}`.trim();
}

export function AdminDashboardView() {
  const [users, setUsers] = useState<MockUser[]>(() => [...MOCK_USERS_INITIAL]);
  const [search, setSearch] = useState("");
  const [presence, setPresence] = useState<AdminPresenceFilter>("tous");
  const [editing, setEditing] = useState<MockUser | null>(null);

  const stats = useMemo(() => {
    const total = users.length;
    const connectes = users.filter((u) => u.enLigne && u.actif).length;
    return { total, connectes };
  }, [users]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      const name = fullName(u).toLowerCase();
      const mail = u.email.toLowerCase();
      const matchSearch = !q || name.includes(q) || mail.includes(q);

      let matchPresence = true;
      if (presence === "en_ligne") matchPresence = u.enLigne && u.actif;
      if (presence === "hors_ligne") matchPresence = !u.enLigne;

      return matchSearch && matchPresence;
    });
  }, [users, search, presence]);

  function saveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const form = e.currentTarget;
    const prenom = (
      form.elements.namedItem("prenom") as HTMLInputElement
    ).value.trim();
    const nom = (form.elements.namedItem("nom") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
      .trim();
    const role = (form.elements.namedItem("role") as HTMLSelectElement)
      .value as UserRole;

    setUsers((list) =>
      list.map((u) =>
        u.id === editing.id ? { ...u, prenom, nom, email, role } : u,
      ),
    );
    setEditing(null);
  }

  function toggleActif(id: string) {
    setUsers((list) =>
      list.map((u) => (u.id === id ? { ...u, actif: !u.actif } : u)),
    );
  }

  function removeUser(id: string) {
    if (!confirm("Supprimer cet utilisateur de la liste ?")) return;
    setUsers((list) => list.filter((u) => u.id !== id));
  }

  const filterTabs: [AdminPresenceFilter, string][] = [
    ["tous", "Tous"],
    ["en_ligne", "Connectés uniquement"],
    ["hors_ligne", "Hors ligne (inactifs)"],
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
          Gestion des utilisateurs
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Liste réservée aux administrateurs authentifiés.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Total utilisateurs
          </p>
          <p className="mt-1 text-3xl font-semibold text-white">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Utilisateurs connectés
          </p>
          <p className="mt-1 text-3xl font-semibold text-emerald-400">
            {stats.connectes}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-md flex-1">
          <label
            htmlFor="search-users"
            className="mb-1.5 block text-sm font-medium text-zinc-300"
          >
            Recherche
          </label>
          <input
            id="search-users"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom ou e-mail…"
            className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-2.5 text-sm text-white outline-none ring-violet-500/30 focus:ring-2"
          />
        </div>
        <div>
          <p className="mb-1.5 text-sm font-medium text-zinc-300">Filtres</p>
          <div className="flex flex-wrap gap-2">
            {filterTabs.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPresence(key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                  presence === key
                    ? "bg-violet-600 text-white"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/40">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">E-mail</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Dernière connexion</th>
              <th className="px-4 py-3 font-medium">Rôle</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-zinc-500"
                >
                  Aucun utilisateur ne correspond à votre recherche ou à vos
                  filtres.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr
                  key={u.id}
                  className={`border-b border-white/5 transition hover:bg-white/[0.03] ${
                    !u.actif ? "opacity-60" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-zinc-200">
                    {fullName(u)}
                    {!u.actif ? (
                      <span className="ml-2 rounded bg-zinc-700 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-zinc-300">
                        Désactivé
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{u.email}</td>
                  <td className="px-4 py-3">
                    {u.enLigne && u.actif ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                        <span
                          className="size-1.5 rounded-full bg-emerald-400"
                          aria-hidden
                        />
                        En ligne
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-600/30 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                        <span
                          className="size-1.5 rounded-full bg-zinc-500"
                          aria-hidden
                        />
                        Hors ligne
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {formatDateFr(u.derniereConnexion)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-amber-500/15 text-amber-200"
                          : "bg-zinc-600/25 text-zinc-300"
                      }`}
                    >
                      {u.role === "admin" ? "admin" : "user"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditing(u)}
                        className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-zinc-200 hover:bg-white/10"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleActif(u.id)}
                        className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-zinc-200 hover:bg-white/10"
                      >
                        {u.actif ? "Désactiver" : "Réactiver"}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeUser(u.id)}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-300 hover:bg-red-500/20"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-user-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <h2
              id="edit-user-title"
              className="text-lg font-semibold text-white"
            >
              Modifier l&apos;utilisateur
            </h2>
            <form onSubmit={saveEdit} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Prénom
                  </label>
                  <input
                    name="prenom"
                    defaultValue={editing.prenom}
                    required
                    className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/40"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Nom
                  </label>
                  <input
                    name="nom"
                    defaultValue={editing.nom}
                    required
                    className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/40"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-400">
                  E-mail
                </label>
                <input
                  name="email"
                  type="email"
                  defaultValue={editing.email}
                  required
                  className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-400">
                  Rôle
                </label>
                <select
                  name="role"
                  defaultValue={editing.role}
                  className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/40"
                >
                  <option value="user">user (utilisateur)</option>
                  <option value="admin">admin (administrateur)</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="flex-1 rounded-xl border border-white/15 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
