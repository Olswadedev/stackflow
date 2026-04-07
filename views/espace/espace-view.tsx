"use client";

import { EspacePanel } from "./espace-panel";

export function EspaceView() {
const setActiveTab = (tab: "dashboard" | "settings") => {
  console.log("Active tab:", tab);
}
  return <EspacePanel setActiveTab={setActiveTab} />;
}