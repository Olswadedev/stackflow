import type { Metadata } from "next";
import { ForgotPasswordConfirmationView } from "@/views/forgot-password/forgot-password-confirmation-view";

export const metadata: Metadata = {
  title: "Réinitialisation",
};

export default function Page() {
  return <ForgotPasswordConfirmationView />;
}
