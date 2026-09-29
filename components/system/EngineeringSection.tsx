"use client";

import { useState, useEffect, useRef } from "react";
import { useSystem } from "@/lib/system-context";
import { SYSTEM_NODES, PIPELINE_STAGES } from "@/lib/system-data";

// Relationship topology graph mapping each technology to its upstream, dependent, and project relationships
const NODE_RELATIONSHIPS: Record<string, { upstream?: string; dependencies: string[]; projects: string[] }> = {
  nestjs: {
    dependencies: ["Redis Caching", "MongoDB Transactions", "BullMQ Queues"],
    projects: ["College ERP", "Black & White Cafe"],
  },
  redis: {
    upstream: "NestJS Controllers",
    dependencies: ["BullMQ Queues", "Distributed Locks", "Cache-Aside"],
    projects: ["College ERP", "Black & White Cafe"],
  },
  bullmq: {
    upstream: "Redis Memory Store",
    dependencies: ["Isolated Worker Threads", "Dead Letter Queues"],
    projects: ["College ERP Marksheet Pipeline"],
  },
  mongodb: {
    upstream: "NestJS Repository Layer",
    dependencies: ["Replica Sets", "Aggregation Pipelines", "Soft-Delete Hooks"],
    projects: ["College ERP", "Black & White Cafe"],
  },
  sql: {
    upstream: "ACID Relational Storage",
    dependencies: ["Indexed Joins", "Structured Schemas"],
    projects: ["Gurudatta Clinic Management", "LBO Community Marketplace"],
  },
  docker: {
    dependencies: ["Node.js Containers", "Redis Sandbox", "Railway Cloud"],
    projects: ["Local Sandbox", "Production Staging"],
  },
  socketio: {
    upstream: "NestJS WebSocket Gateway",
    dependencies: ["Event Rooms", "Real-time Order State"],
    projects: ["Black & White Cafe"],
  },
  rag: {
    dependencies: ["BM25 Sparse Tokens", "pgvector Embeddings", "Cross-Encoder"],
    projects: ["Universal RAG Engine"],
  },
  ueba: {
    dependencies: ["Feature Engine", "Isolation Forest", "Chronological Split"],
    projects: ["Adaptive UEBA Anomaly Lab"],
  },
};

export function EngineeringSection() {
  const {
    selectedNodeId,
    setSelectedNodeId,
    hoveredNodeId,
    setHoveredNodeId,
    visitedNodes,
    markNodeVisited,
    activePipelineStage,
    setActivePipelineStage,
  } = useSystem();

  // Tab mode within Engineering: "architecture" vs "pipeline"
  const [activeTab, setActiveTab] = useState<"architecture" | "pipeline">("architecture");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isSimulating, setIsSimulating] = useState(false);

  // Progressive construction state: reveals branches progressively on entry
  const [buildStep, setBuildStep] = useState<number>(4); // Default to full build if already in session
  const [hasTriggeredBuild, setHasTriggeredBuild] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hasTriggeredBuild) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasTriggeredBuild(true);
          setBuildStep(1);
          setTimeout(() => setBuildStep(2), 200);
          setTimeout(() => setBuildStep(3), 400);
          setTimeout(() => setBuildStep(4), 600);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasTriggeredBuild]);

  // Active node for architecture inspector
  const activeNode =
    SYSTEM_NODES.find((n) => n.id === selectedNodeId) || SYSTEM_NODES[0];

  // Active stage for request pipeline
  const currentStage =
    PIPELINE_STAGES.find((s) => s.step === activePipelineStage) ||
    PIPELINE_STAGES[0];

  const categories = [
    { id: "all", label: "ALL SUBSYSTEMS" },
    { id: "backend", label: "BACKEND & APIS" },
    { id: "data", label: "DATA & CACHING" },
    { id: "infra", label: "INFRA & QUEUES" },
    { id: "ai", label: "AI & RETRIEVAL" },
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let step = 1;
    setActivePipelineStage(1);

    const interval = setInterval(() => {
      step++;
      if (step <= PIPELINE_STAGES.length) {
        setActivePipelineStage(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1100);
  };

  const handleSelectNode = (id: string) => {
    setSelectedNodeId(id);
    markNodeVisited(id);
  };

  const currentRel = NODE_RELATIONSHIPS[activeNode.id] || {
    dependencies: [],
    projects: activeNode.projects,
  };

  return (
    <section ref={sectionRef} id="engineering" className="py-20 border-b border-white/10 bg-[#07090d] relative">
      {/* Anchor targets for backward compatibility */}
      <div id="system-map" className="relative -top-24 invisible" />
      <div id="request-pipeline" className="relative -top-24 invisible" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2">
              <span>02 // ENGINEERING</span>
              <span>·</span>
              <span>ARCHITECTURE &amp; EXECUTION LIFECYCLE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
              Engineering Systems &amp; Architecture
            </h2>
            <p className="mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
              How I architect, persist, and execute distributed backend systems. Grounded in concrete subsystem implementations and verifiable request lifecycles—no generic skill percentage bars.
            </p>
          </div>

          {/* Primary View Switcher: Subsystem Architecture vs Execution Pipeline */}
          <div className="flex items-center rounded-xl border border-white/10 bg-[#0d1117] p-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-all ${
                activeTab === "architecture"
                  ? "bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              <span>🏛</span>
              <span>SUBSYSTEMS &amp; EVIDENCE</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pipeline")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-all ${
                activeTab === "pipeline"
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              <span>⚡</span>
              <span>REQUEST LIFECYCLE (FLOW)</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: SUBSYSTEM ARCHITECTURE & EVIDENCE INSPECTOR */}
        {activeTab === "architecture" && (
          <div className="mt-8">
            {/* Sub-header & Category Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <span className="font-mono text-xs text-text-secondary uppercase">
                HOVER TO DISCOVER RELATIONSHIPS · TAP TO AUDIT EVIDENCE:
              </span>

              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilterCategory(cat.id)}
                    className={`rounded px-2.5 py-1 transition-all ${
                      filterCategory === cat.id
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-semibold"
                        : "border border-white/10 bg-white/5 text-text-secondary hover:border-white/20 hover:text-text-primary"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tree Schematic & Evidence Inspector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
              {/* Left: System Hierarchy Schematic */}
              <div className="rounded-xl border border-white/10 bg-[#0d1117] p-5 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 font-mono text-xs text-text-secondary">
                  <span className="text-emerald-400 font-semibold">PRAMOD // ENGINEERING ROOT</span>
                  <span className="text-[10px] text-white/40">
                    {visitedNodes.length} SUBSYSTEMS AUDITED IN MEMORY
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Branch 1: Core Backend & APIs (Appears in buildStep 1) */}
                  <div
                    className={`relative pl-4 border-l-2 border-emerald-500/30 transition-all duration-500 ${
                      buildStep >= 1 ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-2"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                        ├── 01 // BACKEND &amp; DISTRIBUTED SERVICES
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400/60">LAYER ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {SYSTEM_NODES.filter((n) => n.category === "backend").map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        const isHovered = hoveredNodeId === node.id;
                        const isVisited = visitedNodes.includes(node.id);
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => handleSelectNode(node.id)}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all relative ${
                              isSelected
                                ? "border-emerald-400 bg-emerald-500/15 shadow-[0_0_15px_rgba(52,211,153,0.25)]"
                                : isHovered
                                ? "border-emerald-400/60 bg-emerald-500/10"
                                : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-mono text-xs font-semibold text-text-primary">
                                {node.label}
                              </span>
                              {isVisited && (
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" title="Audited in session" />
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-text-secondary mt-1 line-clamp-1">
                              {node.highlight}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Branch 2: Data, Storage & Caching (Appears in buildStep 2) */}
                  <div
                    className={`relative pl-4 border-l-2 border-cyan-500/30 transition-all duration-500 ${
                      buildStep >= 2 ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-2"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                        ├── 02 // DATA ARCHITECTURE &amp; IN-MEMORY CACHING
                      </span>
                      <span className="text-[9px] font-mono text-cyan-400/60">LAYER ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {SYSTEM_NODES.filter((n) => n.category === "data").map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        const isHovered = hoveredNodeId === node.id;
                        const isVisited = visitedNodes.includes(node.id);
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => handleSelectNode(node.id)}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all relative ${
                              isSelected
                                ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                                : isHovered
                                ? "border-cyan-400/60 bg-cyan-500/10"
                                : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-mono text-xs font-semibold text-text-primary">
                                {node.label}
                              </span>
                              {isVisited && (
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" title="Audited in session" />
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-text-secondary mt-1 line-clamp-1">
                              {node.highlight}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Branch 3: Infrastructure & Async Queues (Appears in buildStep 3) */}
                  <div
                    className={`relative pl-4 border-l-2 border-amber-500/30 transition-all duration-500 ${
                      buildStep >= 3 ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-2"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                        ├── 03 // INFRASTRUCTURE, CONTAINERS &amp; QUEUES
                      </span>
                      <span className="text-[9px] font-mono text-amber-400/60">LAYER ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {SYSTEM_NODES.filter((n) => n.category === "infra").map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        const isHovered = hoveredNodeId === node.id;
                        const isVisited = visitedNodes.includes(node.id);
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => handleSelectNode(node.id)}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all relative ${
                              isSelected
                                ? "border-amber-400 bg-amber-500/15 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                                : isHovered
                                ? "border-amber-400/60 bg-amber-500/10"
                                : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-mono text-xs font-semibold text-text-primary">
                                {node.label}
                              </span>
                              {isVisited && (
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" title="Audited in session" />
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-text-secondary mt-1 line-clamp-1">
                              {node.highlight}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Branch 4: AI Retrieval & Behavioral Analytics (Appears in buildStep 4) */}
                  <div
                    className={`relative pl-4 border-l-2 border-purple-500/30 transition-all duration-500 ${
                      buildStep >= 4 ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-2"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                        └── 04 // AI RETRIEVAL &amp; BEHAVIORAL ANALYTICS
                      </span>
                      <span className="text-[9px] font-mono text-purple-400/60">LAYER ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {SYSTEM_NODES.filter((n) => n.category === "ai" || n.category === "research").map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        const isHovered = hoveredNodeId === node.id;
                        const isVisited = visitedNodes.includes(node.id);
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => handleSelectNode(node.id)}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all relative ${
                              isSelected
                                ? "border-purple-400 bg-purple-500/15 shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                                : isHovered
                                ? "border-purple-400/60 bg-purple-500/10"
                                : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-mono text-xs font-semibold text-text-primary">
                                {node.label}
                              </span>
                              {isVisited && (
                                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" title="Audited in session" />
                              )}
                            </div>
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

                  {/* Production Evidence Bullets */}
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

                  {/* Subsystem Relationship Discovery Block */}
                  <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3.5 font-mono text-xs">
                    <span className="text-[10px] text-cyan-400 uppercase tracking-wider block mb-2 font-bold">
                      // ARCHITECTURAL RELATIONSHIPS:
                    </span>
                    <div className="space-y-1.5 text-[11px] text-text-secondary">
                      {currentRel.upstream && (
                        <div className="flex items-center gap-2">
                          <span className="text-white/40">▲ UPSTREAM:</span>
                          <span className="text-text-primary font-semibold">{currentRel.upstream}</span>
                        </div>
                      )}
                      {currentRel.dependencies && currentRel.dependencies.length > 0 && (
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400">▼ DEPENDENCIES:</span>
                          <span className="text-text-primary">{currentRel.dependencies.join(" · ")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Verified Result Metric */}
                  <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3.5">
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
        )}

        {/* VIEW 2: REQUEST EXECUTION PIPELINE */}
        {activeTab === "pipeline" && (
          <div className="mt-8">
            {/* Sub-header & Simulation Trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <span className="font-mono text-xs text-text-secondary uppercase">
                INSPECT PACKET TRAVERSAL FROM CLIENT INGRESS TO PERSISTENCE &amp; WORKERS:
              </span>

              <button
                type="button"
                onClick={handleSimulate}
                disabled={isSimulating}
                className="flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-mono text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <span>{isSimulating ? "SIMULATING FLOW..." : "▶ SIMULATE REQUEST PACKET"}</span>
              </button>
            </div>

            {/* Stepper Pipeline Visual */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 border border-white/10 rounded-xl bg-[#0d1117] p-2.5">
              {PIPELINE_STAGES.map((stage) => {
                const isActive = activePipelineStage === stage.step;
                const isPast = activePipelineStage > stage.step;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActivePipelineStage(stage.step)}
                    className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all relative ${
                      isActive
                        ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                        : isPast
                        ? "border-white/15 bg-white/5 text-text-primary"
                        : "border-transparent text-text-secondary hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-mono text-[10px] text-cyan-400 font-bold">
                        STEP 0{stage.step}
                      </span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                      )}
                    </div>
                    <span className="font-mono text-xs font-semibold text-text-primary line-clamp-1">
                      {stage.name.split(" ")[0]}
                    </span>
                    <span className="text-[10px] font-mono text-text-secondary line-clamp-1 mt-0.5">
                      {stage.layer}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Stage Inspector */}
            <div className="mt-6 rounded-xl border border-white/10 bg-[#0d1117] p-6 lg:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
                {/* Left: Stage Deep Dive */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-0.5 font-mono text-xs font-bold text-cyan-300">
                      STEP 0{currentStage.step} OF 07
                    </span>
                    <span className="font-mono text-xs text-text-secondary uppercase">
                      LAYER: {currentStage.layer}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-text-primary mt-3">
                    {currentStage.name}
                  </h3>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-cyan-400">
                    <span className="text-white/40">TECH:</span>
                    <span>{currentStage.stack}</span>
                  </div>

                  <p className="mt-4 text-sm text-text-secondary leading-relaxed font-sans">
                    {currentStage.roleDescription}
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                      <span className="font-mono text-[11px] text-cyan-400 uppercase font-semibold block mb-1">
                        // ENGINEERING MECHANISM:
                      </span>
                      <p className="font-mono text-xs text-text-primary/90 leading-relaxed">
                        {currentStage.mechanism}
                      </p>
                    </div>

                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                      <span className="font-mono text-[11px] text-amber-400 uppercase font-semibold block mb-1">
                        // FAILURE GUARD &amp; CIRCUIT RECOVERY:
                      </span>
                      <p className="font-mono text-xs text-text-secondary leading-relaxed">
                        {currentStage.failureGuard}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Code Implementation Snippet */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#090d13] px-4 py-2.5 rounded-t-xl font-mono text-xs text-text-secondary">
                    <span className="text-cyan-400">pipeline_stage_0{currentStage.step}.ts</span>
                    <span>PRAMOD // IMPLEMENTATION</span>
                  </div>
                  <div className="flex-1 rounded-b-xl border border-t-0 border-white/10 bg-[#05070a] p-4 font-mono text-xs text-text-primary overflow-x-auto leading-relaxed">
                    <pre className="text-emerald-300">
                      <code>{currentStage.codeSnippet}</code>
                    </pre>
                  </div>

                  {/* Navigation between steps */}
                  <div className="mt-4 flex items-center justify-between font-mono text-xs">
                    <button
                      type="button"
                      onClick={() =>
                        setActivePipelineStage(Math.max(1, currentStage.step - 1))
                      }
                      disabled={currentStage.step === 1}
                      className="rounded px-3 py-1.5 border border-white/10 bg-white/5 text-text-secondary hover:text-text-primary disabled:opacity-30"
                    >
                      ← PREV STAGE
                    </button>
                    <span className="text-text-secondary text-[11px]">
                      STEP {currentStage.step} / 7
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePipelineStage(
                          Math.min(PIPELINE_STAGES.length, currentStage.step + 1)
                        )
                      }
                      disabled={currentStage.step === PIPELINE_STAGES.length}
                      className="rounded px-3 py-1.5 border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-30"
                    >
                      NEXT STAGE →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
