export type UserRole = "user" | "admin";

export interface MockUser {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  enLigne: boolean;
  derniereConnexion: string;
  role: UserRole;
  actif: boolean;
}
