import type { Metadata } from "next";
import { ForgotPasswordView } from "@/views/forgot-password/forgot-password-view";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
};

export default function Page() {
  return <ForgotPasswordView />;
}
