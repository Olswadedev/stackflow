"use server";

import { MOCK_USERS_INITIAL } from "@/lib/data/users.mock";
import type { MockUser } from "@/types/user.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type UserLoginState = { error?: string } | null;
export type UserRegisterState = { error?: string; success?: boolean } | null;

const USER_COOKIE_NAME = "user_session";
const USERS = [...MOCK_USERS_INITIAL]; // Mutable mock DB

export async function loginUser(
  _prev: UserLoginState,
  formData: FormData,
): Promise<UserLoginState> {
  const identifier = String(formData.get("identifier") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();

  if (!identifier || !password) {
    return { error: "Email et mot de passe requis." };
  }

  const user = USERS.find(u => u.email.toLowerCase() === identifier || u.email.toLowerCase() === identifier);
  if (!user || user.actif === false) {
    return { error: "Utilisateur non trouvé ou inactif." };
  }

  // Mock password check - in real app, hash/compare
  if (password.length < 4) { // Simple mock
    return { error: "Mot de passe incorrect." };
  }

  const jar = await cookies();
  jar.set(USER_COOKIE_NAME, user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  if (user.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function registerUser(
  _prev: UserRegisterState,
  formData: FormData,
): Promise<UserRegisterState> {
  const lastName = String(formData.get("lastName") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();

  if (!lastName || !firstName || !email || !password) {
    return { error: "Tous les champs sont requis." };
  }

  if (!email.includes('@')) {
    return { error: "Email invalide." };
  }

  if (password.length < 6) {
    return { error: "Mot de passe trop court (min 6 caractères)." };
  }

  if (USERS.find(u => u.email.toLowerCase() === email)) {
    return { error: "Email déjà utilisé." };
  }

  const newUser: MockUser = {
    id: crypto.randomUUID(),
    nom: lastName,
    prenom: firstName,
    email,
    enLigne: true,
    derniereConnexion: new Date().toISOString(),
    role: "user",
    actif: true,
  };

  USERS.push(newUser);

  const jar = await cookies();
  jar.set(USER_COOKIE_NAME, newUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  // New user is always "user" role, redirect to dashboard
  redirect("/dashboard");

}

export async function logoutUser() {
  const jar = await cookies();
  jar.delete(USER_COOKIE_NAME);
  redirect("/");
}
