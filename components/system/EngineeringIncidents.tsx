"use client";

import { useSystem } from "@/lib/system-context";
import { INCIDENTS } from "@/lib/system-data";

export function EngineeringIncidents() {
  const { activeIncidentId, setActiveIncidentId } = useSystem();

  const selectedIncident =
    INCIDENTS.find((i) => i.id === activeIncidentId) || INCIDENTS[0];

  return (
    <section id="engineering-incidents" className="py-20 border-b border-white/10 bg-[#07090d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
            <span>05 // PROBLEM SOLVING</span>
            <span>·</span>
            <span>REAL POST-MORTEMS &amp; SYSTEM DEBUGGING</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            When Systems Break: Engineering Post-Mortems
          </h2>
          <p className="mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-3xl">
            Software engineering is defined by how we diagnose and prevent failure under real operating conditions. Below are four real incidents from my production experience—and the architectural principles engineered to solve them permanently.
          </p>
        </div>

        {/* Incidents Master-Detail Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 items-start">
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
                  className={`w-full flex flex-col items-start p-4 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? "border-amber-400/80 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
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
            {/* Terminal Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                  POST-MORTEM REPORT: {selectedIncident.id}
                </span>
              </div>
              <span className="font-mono text-[11px] text-text-secondary">
                SEVERITY: PRODUCTION CRITICAL // STATUS: RECTIFIED
              </span>
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

              {/* 1. Problem / Symptom */}
              <div className="rounded-lg border border-red-500/25 bg-red-500/5 p-4">
                <div className="flex items-center gap-2 text-red-400 font-bold mb-1.5">
                  <span>[!] SYMPTOM OBSERVED:</span>
                </div>
                <p className="text-text-primary/90 leading-relaxed font-sans text-sm">
                  {selectedIncident.symptom}
                </p>
              </div>

              {/* 2. Investigation */}
              <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1.5">
                  <span>[?] INVESTIGATION &amp; LOG AUDIT:</span>
                </div>
                <p className="text-text-secondary leading-relaxed font-sans text-sm">
                  {selectedIncident.investigation}
                </p>
              </div>

              {/* 3. Root Cause */}
              <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
                  <span>[x] IDENTIFIED ROOT CAUSE:</span>
                </div>
                <p className="text-text-primary/90 leading-relaxed font-sans text-sm">
                  {selectedIncident.rootCause}
                </p>
              </div>

              {/* 4. Solution Implemented */}
              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1.5">
                  <span>[✓] ARCHITECTURAL SOLUTION IMPLEMENTED:</span>
                </div>
                <p className="text-text-primary/90 leading-relaxed font-sans text-sm">
                  {selectedIncident.solution}
                </p>
              </div>

              {/* 5. Prevention & Result Metric */}
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
    </section>
  );
}
