"use server";

import {
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_VALUE,
} from "@/lib/admin-cookie";
import type { AdminLoginState } from "@/types/admin.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const password = String(formData.get("password") ?? "").trim();
  const expected = process.env.ADMIN_DEMO_PASSWORD?.trim() || "OS"

  if (password !== expected) {
    return { error: "Mot de passe administrateur incorrect." };
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/connexion");
}
