"use client";

import { useState, useEffect } from "react";
import { useSystem } from "@/lib/system-context";
import { PROFILE } from "@/lib/system-data";

export function HeroSystem() {
  const { audienceMode, setAudienceMode, setCommandPaletteOpen } = useSystem();
  const [wakeStage, setWakeStage] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Cinematic wake-up sequence on initial arrival
  useEffect(() => {
    const t1 = setTimeout(() => setWakeStage(1), 100);
    const t2 = setTimeout(() => setWakeStage(2), 350);
    const t3 = setTimeout(() => setWakeStage(3), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Subtle continuous scroll acknowledgement
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / (windowHeight * 0.8)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="system-overview"
      className="relative min-h-[92svh] flex flex-col justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 border-b border-white/10 tech-grid transition-opacity duration-700"
      style={{
        opacity: wakeStage >= 1 ? 1 : 0.85,
        transform: `translateY(${scrollProgress * 10}px)`,
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* System Initialization Header with wake-up state */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-xs text-text-secondary transition-all duration-500">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                wakeStage >= 2 ? "bg-emerald-500 animate-pulse" : "bg-emerald-500/40"
              }`}
            />
            <span className="text-emerald-400 font-semibold tracking-wider">
              {wakeStage >= 3 ? "SYSTEM INITIALIZED // ONLINE" : "INITIALIZING TELEMETRY KERNEL..."}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>NODE: PUNE_IN [UTC+5:30]</span>
            <span className="hidden sm:inline">KERNEL: PROD_SDE_V4</span>
            <span className="text-white/40">ID: 8149716897</span>
          </div>
        </div>

        {/* Main Editorial Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-emerald-400 mb-4">
              <span>●</span>
              <span>ENGINEERING PROFILE · PRAMOD MARGUDRE</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-text-primary leading-[1.05]">
              Distributed Systems,
              <br />
              <span className="italic text-emerald-400 font-sans font-light">Production Backends</span>,
              <br />
              &amp; AI Retrieval Architectures.
            </h1>

            <p className="mt-5 max-w-xl font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">
              Backend Developer Intern shipping live ERP modules at <strong className="text-text-primary font-semibold">Seratek Systems (2026)</strong> with NestJS, Redis, MongoDB &amp; BullMQ. Building sponsored platforms like <strong className="text-text-primary font-semibold">LBO Community Marketplace</strong> and researching AI retrieval architectures.
            </p>

            {/* Audience Lens Filter */}
            <div className="mt-8 rounded-xl border border-white/10 bg-[#0d1117] p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                  TELEMETRY LENS SELECTOR:
                </span>
                <span className="font-mono text-[10px] text-emerald-400 uppercase">
                  ACTIVE: {audienceMode.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAudienceMode("developer")}
                  className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                    audienceMode === "developer"
                      ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="text-base mb-1">⚡</span>
                  <span className="font-mono text-xs font-semibold text-text-primary">DEVELOPER</span>
                  <span className="text-[10px] text-text-secondary mt-0.5 line-clamp-1">APIs, Caching, Incidents</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudienceMode("recruiter")}
                  className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                    audienceMode === "recruiter"
                      ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="text-base mb-1">💼</span>
                  <span className="font-mono text-xs font-semibold text-text-primary">RECRUITER</span>
                  <span className="text-[10px] text-text-secondary mt-0.5 line-clamp-1">Track Record, CGPA 8.4</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudienceMode("researcher")}
                  className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                    audienceMode === "researcher"
                      ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="text-base mb-1">🔬</span>
                  <span className="font-mono text-xs font-semibold text-text-primary">RESEARCHER</span>
                  <span className="text-[10px] text-text-secondary mt-0.5 line-clamp-1">RAG &amp; UEBA ML</span>
                </button>
              </div>

              {/* Dynamic Context Notice */}
              <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-2 font-mono text-[11px] text-text-secondary">
                <span className="text-emerald-400">↳</span>
                {audienceMode === "developer" && (
                  <span>Prioritizing system architecture, database ACID guarantees, Redis distributed locking, and post-mortems.</span>
                )}
                {audienceMode === "recruiter" && (
                  <span>Prioritizing production ERP deliverables, verified credentials, education (B.Tech 8.4 CGPA), and direct contact.</span>
                )}
                {audienceMode === "researcher" && (
                  <span>Prioritizing Universal RAG pipeline layers, dense/lexical retrieval, and chronological UEBA anomaly evaluations.</span>
                )}
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#system-map"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 font-mono text-xs font-semibold text-[#07090d] hover:bg-emerald-400 transition-colors"
              >
                <span>EXPLORE SYSTEM MAP</span>
                <span>→</span>
              </a>

              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2.5 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                <span>[ ⌘K COMMANDS ]</span>
              </button>

              <a
                href="#engineering-incidents"
                className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 font-mono text-xs text-amber-400 hover:bg-amber-500/20 transition-colors"
              >
                <span>POST-MORTEMS</span>
              </a>

              <a
                href="#request-pipeline"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-xs text-text-primary hover:border-white/30 transition-colors"
              >
                <span>REQUEST PIPELINE FLOW</span>
              </a>
            </div>
          </div>

          {/* Right: Live Telemetry Grid & Architecture State */}
          <div className="rounded-xl border border-white/10 bg-[#0d1117] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider">
                ● CORE TELEMETRY METRICS
              </span>
              <span className="font-mono text-[10px] text-white/40">UPTIME: 99.98%</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 font-mono">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-text-secondary">PROD INTERNSHIP</span>
                <p className="mt-1 text-sm font-semibold text-text-primary">SERATEK SYSTEMS</p>
                <p className="text-[10px] text-emerald-400">College ERP (2026)</p>
              </div>

              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-text-secondary">ACADEMIC CGPA</span>
                <p className="mt-1 text-sm font-semibold text-text-primary">8.4 / 10.0</p>
                <p className="text-[10px] text-emerald-400">KIT Kolhapur (2023–2026)</p>
              </div>

              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-text-secondary">SOCKET OPTIMIZATION</span>
                <p className="mt-1 text-sm font-semibold text-text-primary">-80% POLLING</p>
                <p className="text-[10px] text-emerald-400">Socket.IO Event Rooms</p>
              </div>

              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-text-secondary">ALGORITHMS / DSA</span>
                <p className="mt-1 text-sm font-semibold text-text-primary">180+ SOLVED</p>
                <p className="text-[10px] text-emerald-400">HackerRank 4★ Java/SQL</p>
              </div>
            </div>

            {/* Architecture Node Quick Status */}
            <div className="mt-4 rounded-lg border border-white/5 bg-black/40 p-3 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-secondary">BACKEND SERVICES:</span>
                <span className="text-emerald-400 font-semibold">ONLINE (NestJS + Redis)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-secondary">DATABASE INTEGRITY:</span>
                <span className="text-emerald-400 font-semibold">CASCADING TRANSACTIONS</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-secondary">AI PIPELINES:</span>
                <span className="text-cyan-400 font-semibold">UNIVERSAL RAG ACTIVE</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-secondary">ML RESEARCH:</span>
                <span className="text-purple-400 font-semibold">CHRONO UEBA ANOMALY</span>
              </div>
            </div>

            {/* Direct Contact Summary */}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-text-secondary">
              <a href={`mailto:${PROFILE.email}`} className="text-emerald-400 hover:underline">
                {PROFILE.email}
              </a>
              <span>{PROFILE.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
