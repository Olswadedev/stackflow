import type { Metadata } from "next";
import { EspaceView } from "@/views/espace/espace-view";

export const metadata: Metadata = {
  title: "Mon espace",
  description: "Profil, messages et notifications.",
};

export default function Page() {
  return <EspaceView />;
}
