"use client";

import { useState, useEffect, useRef } from "react";
import { useSystem } from "@/lib/system-context";
import { PROFILE } from "@/lib/system-data";

export function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setAudienceMode,
    setSelectedNodeId,
    setActiveIncidentId,
  } = useSystem();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const commands = [
    {
      label: "01 // Home & System Telemetry",
      group: "Navigation",
      action: () => {
        window.location.hash = "#system-overview";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "02 // Engineering (Subsystems & Request Lifecycle)",
      group: "Navigation",
      action: () => {
        window.location.hash = "#engineering";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "03 // Projects (Case Studies & Post-Mortems)",
      group: "Navigation",
      action: () => {
        window.location.hash = "#projects";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "04 // Research (Universal RAG & UEBA Anomaly ML)",
      group: "Navigation",
      action: () => {
        window.location.hash = "#research";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "05 // Experience (Milestones & Credentials)",
      group: "Navigation",
      action: () => {
        window.location.hash = "#experience";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "06 // Contact & Recruiter Fact Sheet",
      group: "Navigation",
      action: () => {
        window.location.hash = "#contact";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Inspect Incident: Cascading Soft-Delete Dilemma",
      group: "Incidents",
      action: () => {
        setActiveIncidentId("cascading-soft-delete");
        window.location.hash = "#engineering-incidents";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Inspect Incident: Socket Connection Avalanche",
      group: "Incidents",
      action: () => {
        setActiveIncidentId("socket-avalanche");
        window.location.hash = "#engineering-incidents";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Explore Universal RAG Architecture",
      group: "AI Research",
      action: () => {
        window.location.hash = "#ai-research";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Explore Adaptive UEBA Anomaly Research",
      group: "AI Research",
      action: () => {
        window.location.hash = "#research-lab";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "View Career Milestones & Credentials",
      group: "Timeline",
      action: () => {
        window.location.hash = "#career-milestones";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Ask My Work (Instant Q&A)",
      group: "Knowledge Base",
      action: () => {
        window.location.hash = "#ask-my-work";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Switch to Developer Telemetry Lens",
      group: "Mode",
      action: () => {
        setAudienceMode("developer");
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Switch to Recruiter Telemetry Lens",
      group: "Mode",
      action: () => {
        setAudienceMode("recruiter");
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Switch to AI Researcher Telemetry Lens",
      group: "Mode",
      action: () => {
        setAudienceMode("researcher");
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Inspect NestJS Architecture Node",
      group: "Nodes",
      action: () => {
        setSelectedNodeId("nestjs");
        window.location.hash = "#system-map";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Inspect Redis Caching & Locking Node",
      group: "Nodes",
      action: () => {
        setSelectedNodeId("redis");
        window.location.hash = "#system-map";
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "View Verified Resume (PDF)",
      group: "Action",
      action: () => {
        window.open(PROFILE.resume, "_blank");
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Open GitHub Profile (smpramod)",
      group: "External",
      action: () => {
        window.open(PROFILE.github, "_blank");
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Open LinkedIn Profile (Pramod Margudre)",
      group: "External",
      action: () => {
        window.open(PROFILE.linkedin, "_blank");
        setCommandPaletteOpen(false);
      },
    },
    {
      label: "Send Email (margudrep@gmail.com)",
      group: "Action",
      action: () => {
        window.location.href = `mailto:${PROFILE.email}`;
        setCommandPaletteOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.group.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div
        className="w-full max-w-2xl rounded-xl border border-white/15 bg-[#0d1117] shadow-2xl overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 bg-[#07090d]">
          <span className="text-emerald-400 font-bold">⌘</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, technology, or section to navigate..."
            className="w-full bg-transparent text-text-primary placeholder:text-text-secondary/50 outline-none"
          />
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(false)}
            className="rounded border border-white/10 px-2 py-0.5 text-[10px] text-text-secondary hover:text-text-primary"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-text-secondary">
              No matching commands or sections found.
            </div>
          ) : (
            filteredCommands.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={c.action}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-white/5 hover:text-emerald-400 transition-colors group"
              >
                <span className="text-text-primary group-hover:text-emerald-300">
                  {c.label}
                </span>
                <span className="rounded bg-white/5 border border-white/10 px-1.5 py-0.5 text-[9px] text-text-secondary">
                  {c.group}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="border-t border-white/10 bg-[#07090d] px-4 py-2 flex items-center justify-between text-[10px] text-text-secondary">
          <span>NAVIGATION // FUZZY SEARCH</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
