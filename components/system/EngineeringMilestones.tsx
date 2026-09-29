"use client";

import { useState, useEffect, useRef } from "react";
import { MILESTONES } from "@/lib/system-data";

export function EngineeringMilestones() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeMilestone = MILESTONES[selectedIdx];

  const gitCommitLog = [
    { year: "2026", hash: "9a2f1c", message: "feat(seratek): live ERP backend modules, soft-delete & BullMQ", tag: "PROD", milestoneIdx: 0 },
    { year: "2026", hash: "8b7e4d", message: "research(rag): hybrid dense/sparse retrieval with reranker", tag: "AI", milestoneIdx: 0 },
    { year: "2025", hash: "4d91e2", message: "feat(lbo): community marketplace with Spring Boot & Firebase", tag: "PROD", milestoneIdx: 1 },
    { year: "2023", hash: "1f73b9", message: "init(csbs): B.Tech Computer Science & Business Systems (2023-2026)", tag: "EDU", milestoneIdx: 6 },
    { year: "2022", hash: "3c82d1", message: "feat(clinic): Gurudatta Clinic Android app & local SQLite storage", tag: "PROD", milestoneIdx: 2 },
    { year: "2022", hash: "2e84a0", message: "feat(iot): embedded firmware & live sensor telemetry", tag: "IOT", milestoneIdx: 3 },
  ];

  return (
    <section ref={sectionRef} id="experience" className="py-20 border-b border-white/10 bg-[#07090d] relative">
      {/* Anchor target for backward compatibility */}
      <div id="career-milestones" className="relative -top-24 invisible" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2">
            <span>05 // EXPERIENCE</span>
            <span>·</span>
            <span>ENGINEERING MILESTONES &amp; CREDENTIALS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            Experience &amp; Milestones
          </h2>
          <p className="mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-2xl">
            A chronological record of production software delivery, professional engineering responsibilities, academic rigor, and verified cloud certifications.
          </p>
        </div>

        {/* Git-Inspired Interactive Commit Bar */}
        <div className="mt-8 rounded-xl border border-white/10 bg-[#0d1117] p-4 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 text-text-secondary text-[11px]">
            <span className="text-emerald-400 font-semibold">git log --graph --oneline // CAREER REPOSITORY</span>
            <span>CLICK COMMIT TO INSPECT RECORD</span>
          </div>
          <div className="space-y-1.5 min-w-[640px]">
            {gitCommitLog.map((c) => (
              <button
                key={c.hash}
                type="button"
                onClick={() => setSelectedIdx(c.milestoneIdx)}
                className="w-full flex items-center gap-3 text-left text-text-secondary hover:text-emerald-300 hover:bg-white/[0.03] p-1 rounded transition-colors"
              >
                <span className="text-emerald-500 font-bold">*</span>
                <span className="text-amber-400/90">{c.hash}</span>
                <span className="text-white/40">[{c.year}]</span>
                <span className="rounded bg-white/5 border border-white/10 px-1.5 py-0.2 text-[9px] text-emerald-400">
                  {c.tag}
                </span>
                <span className="text-text-primary/90 font-mono text-[11px]">{c.message}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Milestones Master-Detail Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 items-start">
          {/* Milestones List */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary block mb-2">
              SELECT RECORD:
            </span>
            {MILESTONES.map((m, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={`${m.role}-${m.organization}`}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_20px_rgba(52,211,153,0.18)]"
                      : "border-white/10 bg-[#0d1117] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1 font-mono text-[10px]">
                    <span className="text-emerald-400 font-bold">{m.year}</span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-text-secondary">
                      {m.type}
                    </span>
                  </div>
                  <span className="font-serif text-lg text-text-primary">
                    {m.role}
                  </span>
                  <span className="font-mono text-xs text-text-secondary mt-0.5">
                    {m.organization}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Milestone Detail Inspector */}
          <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6 lg:p-8 shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-2">
              <div>
                <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 font-bold uppercase">
                  {activeMilestone.type}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-text-primary mt-2">
                  {activeMilestone.role}
                </h3>
                <p className="font-mono text-xs text-emerald-400 mt-1">
                  {activeMilestone.organization} · {activeMilestone.period}
                </p>
              </div>

              {activeMilestone.credentialUrl && (
                <a
                  href={activeMilestone.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-emerald-500 px-3.5 py-2 font-mono text-xs font-bold text-black hover:bg-emerald-400 transition-colors"
                >
                  VIEW VERIFIED CREDENTIAL ↗
                </a>
              )}
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <span className="font-mono text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2">
                  // SCOPE &amp; SUMMARY:
                </span>
                <p className="text-sm text-text-secondary font-sans leading-relaxed">
                  {activeMilestone.summary}
                </p>
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-3">
                  // KEY RESPONSIBILITIES &amp; DELIVERABLES:
                </span>
                <ul className="space-y-2.5">
                  {activeMilestone.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-mono text-xs text-text-primary/95">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="font-mono text-[11px] text-text-secondary uppercase tracking-wider block mb-2 font-semibold">
                  TECHNOLOGIES &amp; METHODOLOGY:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeMilestone.technologies.map((t) => (
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
