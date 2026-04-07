export type UserRole = "user" | "admin";

export type UserLoginState = { error?: string } | null;
export type UserRegisterState = { error?: string; success?: boolean } | null;
export type ProfileState = { error?: string; success?: boolean } | null;

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
