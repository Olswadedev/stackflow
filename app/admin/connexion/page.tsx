import type { Metadata } from "next";
import { AdminConnexionView } from "@/views/admin/admin-connexion-view";

export const metadata: Metadata = {
  title: "Connexion administrateur",
};

export default function Page() {
  return <AdminConnexionView />;
}
