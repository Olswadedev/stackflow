import type { Metadata } from "next";
import { RegisterView } from "@/views/register/register-view";

export const metadata: Metadata = {
  title: "Inscription",
};

export default function Page() {
  return <RegisterView />;
}
