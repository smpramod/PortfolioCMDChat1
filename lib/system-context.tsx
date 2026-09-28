"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AudienceMode } from "./system-data";

interface SystemContextValue {
  audienceMode: AudienceMode;
  setAudienceMode: (mode: AudienceMode) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  activePipelineStage: number;
  setActivePipelineStage: (step: number) => void;
  activeIncidentId: string;
  setActiveIncidentId: (id: string) => void;
  activeRagStage: number;
  setActiveRagStage: (step: number) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  activeAnswerId: string | null;
  setActiveAnswerId: (id: string | null) => void;
}

const SystemContext = createContext<SystemContextValue | null>(null);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [audienceMode, setAudienceMode] = useState<AudienceMode>("developer");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("nestjs");
  const [activePipelineStage, setActivePipelineStage] = useState<number>(1);
  const [activeIncidentId, setActiveIncidentId] = useState<string>("cascading-soft-delete");
  const [activeRagStage, setActiveRagStage] = useState<number>(1);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [activeAnswerId, setActiveAnswerId] = useState<string | null>("qa-redis");

  // Global keyboard listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SystemContext.Provider
      value={{
        audienceMode,
        setAudienceMode,
        selectedNodeId,
        setSelectedNodeId,
        activePipelineStage,
        setActivePipelineStage,
        activeIncidentId,
        setActiveIncidentId,
        activeRagStage,
        setActiveRagStage,
        commandPaletteOpen,
        setCommandPaletteOpen,
        activeAnswerId,
        setActiveAnswerId,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const ctx = useContext(SystemContext);
  if (!ctx) {
    throw new Error("useSystem must be used within a SystemProvider");
  }
  return ctx;
}
