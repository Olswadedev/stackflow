// src/lib/users.mock.ts

export interface MockUser {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  enLigne: boolean;
  derniereConnexion: string;
  role: "user" | "admin";
  actif: boolean;
  archived?: boolean;
}

export const MOCK_USERS_INITIAL: MockUser[] = [
  {
    id: "1",
    nom: "Martin",
    prenom: "Camille",
    email: "camille.martin@exemple.com",
    enLigne: true,
    derniereConnexion: "2026-04-04T09:15:00",
    role: "user",
    actif: true,
  },
  {
    id: "2",
    nom: "Bernard",
    prenom: "Lucas",
    email: "lucas.bernard@exemple.com",
    enLigne: false,
    derniereConnexion: "2026-04-02T18:40:00",
    role: "user",
    actif: true,
  },
  {
    id: "3",
    nom: "Admin",
    prenom: "Système",
    email: "admin@synthese.local",
    enLigne: true,
    derniereConnexion: "2026-04-04T10:00:00",
    role: "admin",
    actif: true,
  },
  {
    id: "4",
    nom: "Petit",
    prenom: "Sarah",
    email: "sarah.petit@exemple.com",
    enLigne: false,
    derniereConnexion: "2026-03-28T11:22:00",
    role: "user",
    actif: false,
    archived: false,
  },
  {
    id: "5",
    nom: "Kouassi",
    prenom: "Jordan",
    email: "jordan.kouassi@exemple.com",
    enLigne: true,
    derniereConnexion: "2026-04-04T08:05:00",
    role: "user",
    actif: true,
  },
];