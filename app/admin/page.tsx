import type { Metadata } from "next";
import { AdminDashboardView } from "@/views/admin/admin-dashboard-view";

export const metadata: Metadata = {
  title: "Administration",
  description: "Gestion des utilisateurs.",
};

export default function Page() {
  return <AdminDashboardView />;
}
