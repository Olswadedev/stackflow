"use client";
import EspacePanel from "./espace-panel";

// On accepte la fonction en provenance du Dashboard
export function EspaceView({ setActiveTab }: { setActiveTab: (tab: "dashboard" | "settings") => void }) {
  return <EspacePanel setActiveTab={setActiveTab} />;
}