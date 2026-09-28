"use client";

import { useState } from "react";
import { useSystem } from "@/lib/system-context";
import { SYSTEM_NODES } from "@/lib/system-data";

export function InteractiveSystemMap() {
  const { selectedNodeId, setSelectedNodeId } = useSystem();
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const activeNode =
    SYSTEM_NODES.find((n) => n.id === selectedNodeId) || SYSTEM_NODES[0];

  const categories = [
    { id: "all", label: "ALL ECOSYSTEM" },
    { id: "backend", label: "BACKEND & APIS" },
    { id: "data", label: "DATA & CACHING" },
    { id: "infra", label: "INFRA & QUEUES" },
    { id: "ai", label: "AI & RAG" },
    { id: "research", label: "ML RESEARCH" },
  ];

  const filteredNodes =
    filterCategory === "all"
      ? SYSTEM_NODES
      : SYSTEM_NODES.filter((n) => n.category === filterCategory);

  return (
    <section id="system-map" className="py-20 border-b border-white/10 bg-[#07090d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2">
              <span>02 // ARCHITECTURE</span>
              <span>·</span>
              <span>NO PERCENTAGE BARS · EVIDENCE-FIRST</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
              Interactive System Map
            </h2>
            <p className="mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-2xl">
              Every node represents an operational subsystem. Click or tap any technology below to inspect real-world implementation evidence, production impact, and architectural roles.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`rounded px-2.5 py-1 transition-all ${
                  filterCategory === cat.id
                    ? "bg-emerald-500 text-black font-semibold shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                    : "border border-white/10 bg-white/5 text-text-secondary hover:border-white/20 hover:text-text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tree Schematic View & Evidence Inspector Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
          {/* Left: System Hierarchy Schematic */}
          <div className="rounded-xl border border-white/10 bg-[#0d1117] p-5 sm:p-6 shadow-xl relative overflow-hidden">
            {/* Visual Header / Branch Marker */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 font-mono text-xs text-text-secondary">
              <span className="text-emerald-400">PRAMOD // ENGINEERING ROOT</span>
              <span className="text-[10px] text-white/40">INTERACTIVE GRAPH</span>
            </div>

            {/* Tree Branches Representation */}
            <div className="space-y-6">
              {/* Branch 1: Core Backend & APIs */}
              <div className="relative pl-4 border-l-2 border-emerald-500/30">
                <span className="font-mono text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                  ├── BACKEND &amp; DISTRIBUTED SERVICES
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SYSTEM_NODES.filter((n) => n.category === "backend").map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "border-emerald-400 bg-emerald-500/15 shadow-[0_0_15px_rgba(52,211,153,0.25)]"
                            : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className="font-mono text-xs font-semibold text-text-primary">
                          {node.label}
                        </span>
                        <span className="text-[10px] font-mono text-text-secondary mt-1 line-clamp-1">
                          {node.highlight}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Branch 2: Data, Storage & Caching */}
              <div className="relative pl-4 border-l-2 border-cyan-500/30">
                <span className="font-mono text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
                  ├── DATA ARCHITECTURE &amp; IN-MEMORY CACHING
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SYSTEM_NODES.filter((n) => n.category === "data").map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                            : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className="font-mono text-xs font-semibold text-text-primary">
                          {node.label}
                        </span>
                        <span className="text-[10px] font-mono text-text-secondary mt-1 line-clamp-1">
                          {node.highlight}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Branch 3: Infrastructure & Async Workers */}
              <div className="relative pl-4 border-l-2 border-amber-500/30">
                <span className="font-mono text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-2">
                  ├── INFRASTRUCTURE, CONTAINERS &amp; QUEUES
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SYSTEM_NODES.filter((n) => n.category === "infra").map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "border-amber-400 bg-amber-500/15 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                            : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className="font-mono text-xs font-semibold text-text-primary">
                          {node.label}
                        </span>
                        <span className="text-[10px] font-mono text-text-secondary mt-1 line-clamp-1">
                          {node.highlight}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Branch 4: AI Engine & Research Lab */}
              <div className="relative pl-4 border-l-2 border-purple-500/30">
                <span className="font-mono text-[11px] font-semibold text-purple-400 uppercase tracking-wider block mb-2">
                  └── AI RETRIEVAL &amp; BEHAVIORAL RESEARCH
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SYSTEM_NODES.filter((n) => n.category === "ai" || n.category === "research").map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "border-purple-400 bg-purple-500/15 shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                            : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                        }`}
                      >
                        <span className="font-mono text-xs font-semibold text-text-primary">
                          {node.label}
                        </span>
                        <span className="text-[10px] font-mono text-text-secondary mt-1 line-clamp-1">
                          {node.highlight}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Evidence Inspector Panel */}
          <div className="rounded-xl border border-emerald-500/30 bg-[#0d1117] p-5 sm:p-6 shadow-2xl relative sticky top-24">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  EVIDENCE INSPECTOR
                </span>
              </div>
              <span className="font-mono text-[10px] text-text-secondary uppercase">
                CATEGORY: {activeNode.category}
              </span>
            </div>

            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-2xl sm:text-3xl text-text-primary">
                  {activeNode.label}
                </h3>
                <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] text-emerald-400 uppercase">
                  ACTIVE SUBSYSTEM
                </span>
              </div>

              <p className="mt-2 text-sm text-text-secondary leading-relaxed font-sans">
                {activeNode.summary}
              </p>

              {/* Where I Actually Used It (Evidence Bullets) */}
              <div className="mt-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-secondary block mb-3 font-semibold">
                  // PRODUCTION / RESEARCH EVIDENCE:
                </span>
                <ul className="space-y-2.5">
                  {activeNode.evidence.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-text-primary/90 font-mono">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connected Projects */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-secondary block mb-2 font-semibold">
                  // CONNECTED PROJECTS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeNode.projects.map((proj) => (
                    <span
                      key={proj}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-text-primary"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Result Metric */}
              <div className="mt-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3.5">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block">
                  KEY CAPABILITY / METRIC:
                </span>
                <p className="mt-1 font-mono text-xs font-semibold text-text-primary">
                  {activeNode.highlight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
