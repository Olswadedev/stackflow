"use server";

import { MOCK_USERS_INITIAL } from "@/lib/data/users.mock";
import type { MockUser } from "@/types/user.types";
import { cookies } from "next/headers";
import { USER_COOKIE_NAME } from "@/lib/user-cookie";

let USERS = [...MOCK_USERS_INITIAL]; // Shared mutable mock DB with auth

export type ProfileState = { error?: string; success?: boolean } | null;

export async function getCurrentUser(): Promise<MockUser | null> {
  const jar = await cookies();
  const userId = jar.get(USER_COOKIE_NAME)?.value;
  if (!userId) return null;
  const user = USERS.find(u => u.id === userId);
  return user || null;
}

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const jar = await cookies();
  const userId = jar.get(USER_COOKIE_NAME)?.value;
  if (!userId) {
    return { error: "Session utilisateur non trouvée." };
  }

  const userIndex = USERS.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return { error: "Utilisateur non trouvé." };
  }

  const lastName = String(formData.get("lastName") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!lastName || !firstName || !email) {
    return { error: "Champs nom, prénom et email requis." };
  }

  if (!email.includes('@')) {
    return { error: "Email invalide." };
  }

  USERS[userIndex] = {
    ...USERS[userIndex],
    nom: lastName,
    prenom: firstName,
    email,
    derniereConnexion: new Date().toISOString(),
  };

  return { success: true };
}
