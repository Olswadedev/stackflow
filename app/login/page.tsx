import type { Metadata } from "next";
import { LoginView } from "@/views/login/login-view";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function Page() {
  return <LoginView />;
}
