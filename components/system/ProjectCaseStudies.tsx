"use client";

import { useState } from "react";
import { CASE_STUDIES } from "@/lib/system-data";

export function ProjectCaseStudies() {
  const [activeStudyId, setActiveStudyId] = useState<string>("college-erp");

  const activeStudy =
    CASE_STUDIES.find((c) => c.id === activeStudyId) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-20 border-b border-white/10 bg-[#07090d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2">
            <span>04 // SYSTEM DELIVERABLES</span>
            <span>·</span>
            <span>IN-DEPTH ARCHITECTURAL CASE STUDIES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            Production Engineering Case Studies
          </h2>
          <p className="mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-3xl">
            Detailed dissections of systems delivered to production. Each case study documents the business problem, architectural design, core engineering contributions, trade-off decisions, and measurable outcomes.
          </p>
        </div>

        {/* Study Selector Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {CASE_STUDIES.map((study) => {
            const isSelected = activeStudyId === study.id;
            return (
              <button
                key={study.id}
                type="button"
                onClick={() => setActiveStudyId(study.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-all ${
                  isSelected
                    ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                    : "border border-white/10 bg-[#0d1117] text-text-secondary hover:text-text-primary hover:border-white/20"
                }`}
              >
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-400">
                  {study.type}
                </span>
                <span>{study.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Layout */}
        <div className="mt-8 rounded-xl border border-white/10 bg-[#0d1117] p-6 lg:p-10 shadow-2xl">
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
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 font-mono text-xs font-bold text-black hover:bg-emerald-400 transition-colors"
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

          {/* Structured Case Study Sections */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column: Problem, Architecture & Decisions */}
            <div className="space-y-6">
              {/* 1. Problem & Context */}
              <div className="rounded-lg border border-white/10 bg-black/30 p-5">
                <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  01 // THE CORE PROBLEM &amp; SYSTEM CONTEXT:
                </span>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  {activeStudy.problem}
                </p>
              </div>

              {/* 2. System Architecture */}
              <div className="rounded-lg border border-white/10 bg-black/30 p-5">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                  02 // SYSTEM ARCHITECTURE &amp; DATA FLOW:
                </span>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  {activeStudy.architecture}
                </p>
              </div>

              {/* 3. Technical Decisions & Tradeoffs */}
              <div className="rounded-lg border border-white/10 bg-black/30 p-5">
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
                  04 // MY CORE CONTRIBUTIONS &amp; RESPONSIBILITIES:
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
                  {activeStudy.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
