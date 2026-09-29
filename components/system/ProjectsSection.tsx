"use client";

import { useState, useEffect, useRef } from "react";
import { useSystem } from "@/lib/system-context";
import { CASE_STUDIES, INCIDENTS } from "@/lib/system-data";
import { SectionTransitionMarker } from "./SectionTransitionMarker";

export function ProjectsSection() {
  const {
    activeIncidentId,
    setActiveIncidentId,
    hoveredProjectId,
    setHoveredProjectId,
    visitedProjects,
    markProjectVisited,
  } = useSystem();

  // Tab mode within Projects: "case-studies" vs "incidents"
  const [viewMode, setViewMode] = useState<"case-studies" | "incidents">("case-studies");
  const [activeStudyId, setActiveStudyId] = useState<string>("college-erp");
  const [traceMode, setTraceMode] = useState<"failure" | "rectified">("failure");
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeStudy =
    CASE_STUDIES.find((c) => c.id === activeStudyId) || CASE_STUDIES[0];

  const selectedIncident =
    INCIDENTS.find((i) => i.id === activeIncidentId) || INCIDENTS[0];

  // Helper to map which incidents belong to which project
  const projectIncidentMap: Record<string, string[]> = {
    "college-erp": ["cascading-soft-delete", "pdf-event-loop-block"],
    "lbo-marketplace": ["webhook-idempotency"],
    "cafe-platform": ["socket-avalanche"],
    "clinic-management": ["webhook-idempotency"],
  };

  const handleJumpToIncident = (incidentId: string) => {
    setActiveIncidentId(incidentId);
    setViewMode("incidents");
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 border-b border-white/10 bg-[#07090d] relative">
      {/* Anchor targets for backward compatibility */}
      <div id="case-studies" className="relative -top-24 invisible" />
      <div id="engineering-incidents" className="relative -top-24 invisible" />

      {/* Visual Chapter Continuity Conduit from Engineering */}
      <SectionTransitionMarker
        fromLabel="02 // ENGINEERING"
        toLabel="03 // PROJECTS"
        descriptor="ARCHITECTURE SPECIFICATION ──→ PRODUCTION DELIVERABLES"
        theme="emerald"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Arrival */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div
              className={`inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2 transition-all duration-300 ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <span>03 // PROJECTS &amp; INCIDENTS</span>
              <span>·</span>
              <span>PRODUCTION DELIVERABLES &amp; DEBUGGING</span>
            </div>
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary transition-all duration-500 delay-100 ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Production Projects &amp; Incident Dossiers
            </h2>
            <p
              className={`mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed transition-all duration-500 delay-200 ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Full-scale applications shipped to users, coupled with technical post-mortems of how critical edge-case failures and performance bottlenecks were diagnosed and permanently engineered away.
            </p>
          </div>

          {/* Primary View Switcher: Case Studies vs Post-Mortems */}
          <div
            className={`flex items-center rounded-xl border border-white/10 bg-[#0d1117] p-1.5 shrink-0 transition-all duration-500 delay-300 ${
              hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <button
              type="button"
              onClick={() => setViewMode("case-studies")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-all ${
                viewMode === "case-studies"
                  ? "bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              <span>🚀</span>
              <span>CASE STUDIES ({CASE_STUDIES.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("incidents")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-all ${
                viewMode === "incidents"
                  ? "bg-amber-500 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              <span>🛠</span>
              <span>POST-MORTEMS ({INCIDENTS.length})</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: PRODUCTION CASE STUDIES */}
        {viewMode === "case-studies" && (
          <div className="mt-8">
            {/* Study Selector Tabs with Focus Mode */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
              {CASE_STUDIES.map((study) => {
                const isSelected = activeStudyId === study.id;
                const isHovered = hoveredProjectId === study.id;
                const isVisited = visitedProjects.includes(study.id);
                const isAnyHovered = hoveredProjectId !== null;
                const isDimmed = isAnyHovered && !isHovered && !isSelected;

                return (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => {
                      setActiveStudyId(study.id);
                      markProjectVisited(study.id);
                    }}
                    onMouseEnter={() => setHoveredProjectId(study.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    className={`card-interactive flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-all duration-300 ${
                      isSelected
                        ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold shadow-[0_0_15px_rgba(52,211,153,0.25)] scale-[1.02] z-10"
                        : isHovered
                        ? "border-emerald-400/60 bg-emerald-500/10 text-text-primary scale-[1.01] z-10"
                        : isDimmed
                        ? "opacity-50 border-white/5 bg-[#0d1117] text-text-secondary"
                        : "border border-white/10 bg-[#0d1117] text-text-secondary hover:text-text-primary hover:border-white/20"
                    }`}
                  >
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-400">
                      {study.type}
                    </span>
                    <span>{study.title}</span>
                    {isVisited && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ml-1" title="Explored in session" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Case Study Layout with Smooth Expansion */}
            <div className="mt-8 rounded-xl border border-white/10 bg-[#0d1117] p-6 lg:p-10 shadow-2xl transition-all duration-500">
              <div key={activeStudy.id} className="reveal-enter">
                {/* Header Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] text-emerald-400 font-bold uppercase">
                      {activeStudy.type} CASE STUDY
                    </span>
                    {activeStudy.badges.map((b) => (
                      <span
                        key={b}
                        className="rounded bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[10px] text-text-secondary"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-text-primary">
                    {activeStudy.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary font-sans max-w-3xl leading-relaxed">
                    {activeStudy.summary}
                  </p>
                </div>

                {/* External Links */}
                <div className="flex flex-wrap items-center gap-3">
                  {activeStudy.liveUrl && (
                    <a
                      href={activeStudy.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 font-mono text-xs font-bold text-black hover:bg-emerald-400 transition-colors shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                    >
                      <span>LIVE PLATFORM ↗</span>
                    </a>
                  )}
                  {activeStudy.githubUrl && (
                    <a
                      href={activeStudy.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-text-primary hover:border-white/30 transition-colors"
                    >
                      <span>GITHUB REPO ↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Project Incidents Quick Bridge Bar */}
              {projectIncidentMap[activeStudy.id] && projectIncidentMap[activeStudy.id].length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 font-mono text-xs">
                  <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                    <span>⚠</span>
                    <span>INCIDENTS SOLVED IN THIS SYSTEM:</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {projectIncidentMap[activeStudy.id].map((incId) => {
                      const incObj = INCIDENTS.find((i) => i.id === incId);
                      if (!incObj) return null;
                      return (
                        <button
                          key={incId}
                          type="button"
                          onClick={() => handleJumpToIncident(incId)}
                          className="rounded border border-amber-400/40 bg-black/40 px-2.5 py-1 text-[11px] text-amber-300 hover:bg-amber-500/20 transition-all flex items-center gap-1"
                        >
                          <span>{incObj.title.split(":")[0]}</span>
                          <span>→</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Structured Progressive Disclosure Grid */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left Column: Problem, Architecture & Decisions */}
                <div className="space-y-6">
                  {/* 1. Problem & Context */}
                  <div className="rounded-lg border border-white/10 bg-black/30 p-5 transition-all hover:border-amber-400/30">
                    <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                      01 // THE CORE PROBLEM &amp; SYSTEM CONTEXT:
                    </span>
                    <p className="text-sm text-text-secondary leading-relaxed font-sans">
                      {activeStudy.problem}
                    </p>
                  </div>

                  {/* 2. System Architecture */}
                  <div className="rounded-lg border border-white/10 bg-black/30 p-5 transition-all hover:border-cyan-400/30">
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                      02 // SYSTEM ARCHITECTURE &amp; DATA FLOW:
                    </span>
                    <p className="text-sm text-text-secondary leading-relaxed font-sans">
                      {activeStudy.architecture}
                    </p>
                  </div>

                  {/* 3. Technical Decisions & Tradeoffs */}
                  <div className="rounded-lg border border-white/10 bg-black/30 p-5 transition-all hover:border-purple-400/30">
                    <span className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">
                      03 // ARCHITECTURAL DECISIONS &amp; TRADEOFFS:
                    </span>
                    <ul className="space-y-2 text-xs font-mono text-text-secondary">
                      {activeStudy.decisions.map((dec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-400">↳</span>
                          <span className="leading-relaxed">{dec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Contributions, Challenges & Result */}
                <div className="space-y-6">
                  {/* 4. My Engineering Contribution */}
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-5">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-3">
                      04 // CORE CONTRIBUTIONS &amp; RESPONSIBILITIES:
                    </span>
                    <ul className="space-y-2.5">
                      {activeStudy.contribution.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs font-mono text-text-primary/95">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 5. Key Challenges & Solution */}
                  <div className="rounded-lg border border-white/10 bg-black/30 p-5">
                    <span className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider block mb-2">
                      05 // CRITICAL CHALLENGES ENCOUNTERED:
                    </span>
                    <p className="text-xs font-mono text-text-secondary leading-relaxed">
                      {activeStudy.challenges}
                    </p>
                  </div>

                  {/* 6. Measurable Result */}
                  <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-5">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                      06 // MEASURABLE OUTCOME &amp; RESULT:
                    </span>
                    <p className="text-sm font-sans font-medium text-text-primary leading-relaxed">
                      {activeStudy.result}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="pt-2">
                    <span className="font-mono text-[11px] text-text-secondary uppercase tracking-wider block mb-2">
                      TECH STACK EMPLOYED:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeStudy.tech.map((t) => {
                        const isCoreTech = ["NestJS", "MongoDB", "Redis", "BullMQ", "TypeScript", "Docker", "PostgreSQL", "Socket.io", "pgvector"].includes(t);
                        return (
                          <span
                            key={t}
                            className={`rounded px-2.5 py-1 font-mono text-xs transition-all ${
                              isCoreTech
                                ? "border border-emerald-400/50 bg-emerald-500/10 text-emerald-300 font-semibold shadow-[0_0_10px_rgba(52,211,153,0.15)]"
                                : "border border-white/10 bg-white/5 text-text-secondary hover:text-text-primary hover:border-emerald-400/40"
                            }`}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: REAL PRODUCTION INCIDENTS & POST-MORTEMS WITH REQUEST FAILURE TRACE */}
        {viewMode === "incidents" && (
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 items-start">
              {/* Incident Selector Tabs */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-text-secondary block mb-2">
                  SELECT INCIDENT DOSSIER:
                </span>
                {INCIDENTS.map((incident, idx) => {
                  const isSelected = activeIncidentId === incident.id;
                  return (
                    <button
                      key={incident.id}
                      type="button"
                      onClick={() => setActiveIncidentId(incident.id)}
                      className={`card-interactive w-full flex flex-col items-start p-4 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? "border-amber-400/80 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)] z-10"
                          : "border-white/10 bg-[#0d1117] hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5 font-mono text-[10px]">
                        <span className="text-amber-400 font-bold">
                          INCIDENT #0{idx + 1}
                        </span>
                        <span className="text-text-secondary">RESOLVED</span>
                      </div>
                      <span className="font-serif text-lg text-text-primary leading-snug">
                        {incident.title}
                      </span>
                      <span className="mt-1.5 font-mono text-[11px] text-text-secondary line-clamp-1">
                        System: {incident.system}
                      </span>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {incident.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[10px] text-text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Incident Post-Mortem Terminal Document */}
              <div className="rounded-xl border border-amber-500/30 bg-[#0d1117] p-6 lg:p-8 shadow-2xl relative">
                <div key={selectedIncident.id} className="reveal-enter">
                  {/* Terminal Bar */}
                  <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                        POST-MORTEM REPORT: {selectedIncident.id}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-text-secondary">
                      SEVERITY: CRITICAL // STATUS: RECTIFIED
                    </span>
                  </div>

                  {/* CINEMATIC REQUEST TRACE: FAILURE VS RECTIFIED */}
                  <div className={`mt-6 rounded-lg border p-4 font-mono text-xs transition-all ${
                    traceMode === "failure" ? "border-red-500/30 bg-red-950/20" : "border-emerald-500/30 bg-emerald-950/20"
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${traceMode === "failure" ? "bg-red-400 animate-ping" : "bg-emerald-400 animate-ping"}`} />
                        <span className={`text-[11px] font-bold ${traceMode === "failure" ? "text-red-300" : "text-emerald-300"}`}>
                          {traceMode === "failure" ? "EXECUTION TRACE AT MOMENT OF CRASH" : "RECTIFIED EXECUTION TRACE (POST-FIX)"}
                        </span>
                      </div>
                      {/* Interactive Mode Switcher */}
                      <div className="flex items-center rounded border border-white/10 bg-black/50 p-0.5 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setTraceMode("failure")}
                          className={`px-2 py-0.5 rounded transition-all ${
                            traceMode === "failure" ? "bg-red-500 text-black font-bold" : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          CRASH TRACE
                        </button>
                        <button
                          type="button"
                          onClick={() => setTraceMode("rectified")}
                          className={`px-2 py-0.5 rounded transition-all ${
                            traceMode === "rectified" ? "bg-emerald-500 text-black font-bold" : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          RESOLVED FIX
                        </button>
                      </div>
                    </div>

                    {/* Horizontal Trace Route with Animated Conduits */}
                    {traceMode === "failure" ? (
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center text-center">
                        <div className="rounded border border-white/10 bg-black/40 p-2">
                          <span className="text-[9px] text-text-secondary block">01 / INGRESS</span>
                          <span className="text-[11px] text-text-primary font-semibold">HTTP Request</span>
                        </div>
                        <div className="rounded border border-white/10 bg-black/40 p-2">
                          <span className="text-[9px] text-text-secondary block">02 / GATEWAY</span>
                          <span className="text-[11px] text-cyan-300 font-semibold">Auth Guard</span>
                        </div>
                        <div className="rounded border border-white/10 bg-black/40 p-2">
                          <span className="text-[9px] text-text-secondary block">03 / SERVICE</span>
                          <span className="text-[11px] text-amber-300 font-semibold">Domain Logic</span>
                        </div>
                        <div className="rounded border border-white/10 bg-black/40 p-2">
                          <span className="text-[9px] text-text-secondary block">04 / RESOURCE</span>
                          <span className="text-[11px] text-purple-300 font-semibold">DB / Socket</span>
                        </div>
                        <div className="rounded border border-red-500/60 bg-red-500/20 p-2 sm:col-span-1 col-span-2 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
                          <span className="text-[9px] text-red-300 block">05 / FAILURE</span>
                          <span className="text-[11px] text-red-400 font-bold">X INVARIANT BROKEN</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center text-center">
                        <div className="rounded border border-white/10 bg-black/40 p-2">
                          <span className="text-[9px] text-text-secondary block">01 / INGRESS</span>
                          <span className="text-[11px] text-text-primary font-semibold">HTTP Request</span>
                        </div>
                        <div className="rounded border border-white/10 bg-black/40 p-2">
                          <span className="text-[9px] text-text-secondary block">02 / SAFEGUARD</span>
                          <span className="text-[11px] text-cyan-300 font-semibold">Idempotency Guard</span>
                        </div>
                        <div className="rounded border border-white/10 bg-black/40 p-2">
                          <span className="text-[9px] text-text-secondary block">03 / ISOLATION</span>
                          <span className="text-[11px] text-amber-300 font-semibold">Worker Thread / Hook</span>
                        </div>
                        <div className="rounded border border-white/10 bg-black/40 p-2">
                          <span className="text-[9px] text-text-secondary block">04 / ATOMIC MUTATION</span>
                          <span className="text-[11px] text-purple-300 font-semibold">Safe DB Lock</span>
                        </div>
                        <div className="rounded border border-emerald-500/60 bg-emerald-500/20 p-2 sm:col-span-1 col-span-2 shadow-[0_0_12px_rgba(52,211,153,0.25)]">
                          <span className="text-[9px] text-emerald-300 block">05 / VERIFIED OK</span>
                          <span className="text-[11px] text-emerald-400 font-bold">✓ INVARIANT PRESERVED</span>
                        </div>
                      </div>
                    )}

                    <p className="mt-3 text-[11px] text-text-secondary font-mono">
                      {traceMode === "failure" ? (
                        <span className="text-red-300">↳ Root Failure Invariant: {selectedIncident.symptom}</span>
                      ) : (
                        <span className="text-emerald-300">↳ Verified Architectural Fix: {selectedIncident.solution}</span>
                      )}
                    </p>
                  </div>

                  <div className="mt-6 space-y-6 font-mono text-xs">
                    {/* Title & Target Subsystem */}
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-text-primary">
                        {selectedIncident.title}
                      </h3>
                      <p className="mt-1 text-xs text-amber-300/80">
                        Target System: {selectedIncident.system}
                      </p>
                    </div>

                    {/* 1. Investigation */}
                    <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1.5">
                        <span>[?] INVESTIGATION &amp; LOG AUDIT:</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed font-sans text-sm">
                        {selectedIncident.investigation}
                      </p>
                    </div>

                    {/* 2. Root Cause */}
                    <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-4">
                      <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
                        <span>[x] IDENTIFIED ROOT CAUSE:</span>
                      </div>
                      <p className="text-text-primary/90 leading-relaxed font-sans text-sm">
                        {selectedIncident.rootCause}
                      </p>
                    </div>

                    {/* 3. Architectural Solution Implemented */}
                    <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-4">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1.5">
                        <span>[✓] ARCHITECTURAL SOLUTION IMPLEMENTED:</span>
                      </div>
                      <p className="text-text-primary/90 leading-relaxed font-sans text-sm">
                        {selectedIncident.solution}
                      </p>
                    </div>

                    {/* 4. Prevention & Result Metric */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                        <span className="text-text-secondary text-[11px] font-bold block mb-1">
                          PERMANENT DEFENSIVE SAFEGUARD:
                        </span>
                        <p className="text-text-secondary font-sans text-xs leading-relaxed">
                          {selectedIncident.prevention}
                        </p>
                      </div>

                      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                        <span className="text-emerald-400 text-[11px] font-bold block mb-1">
                          VERIFIED RESULT METRIC:
                        </span>
                        <p className="text-text-primary font-mono text-xs font-semibold leading-relaxed">
                          {selectedIncident.metricsResult}
                        </p>
                      </div>
                    </div>
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
