"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AudienceMode } from "./system-data";

interface SystemContextValue {
  audienceMode: AudienceMode;
  setAudienceMode: (mode: AudienceMode) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
  visitedNodes: string[];
  markNodeVisited: (id: string) => void;
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
  activeSection: string;
  setActiveSection: (sec: string) => void;
  hoveredProjectId: string | null;
  setHoveredProjectId: (id: string | null) => void;
  visitedProjects: string[];
  markProjectVisited: (id: string) => void;
}

const SystemContext = createContext<SystemContextValue | null>(null);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [audienceMode, setAudienceMode] = useState<AudienceMode>("developer");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("nestjs");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>(["nestjs"]);
  const [activePipelineStage, setActivePipelineStage] = useState<number>(1);
  const [activeIncidentId, setActiveIncidentId] = useState<string>("cascading-soft-delete");
  const [activeRagStage, setActiveRagStage] = useState<number>(1);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [activeAnswerId, setActiveAnswerId] = useState<string | null>("qa-redis");
  const [activeSection, setActiveSection] = useState<string>("system-overview");
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [visitedProjects, setVisitedProjects] = useState<string[]>(["college-erp"]);

  const markNodeVisited = (id: string) => {
    setVisitedNodes((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const markProjectVisited = (id: string) => {
    setVisitedProjects((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

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
        hoveredNodeId,
        setHoveredNodeId,
        visitedNodes,
        markNodeVisited,
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
        activeSection,
        setActiveSection,
        hoveredProjectId,
        setHoveredProjectId,
        visitedProjects,
        markProjectVisited,
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
