"use client";

import { UEBA_RESEARCH } from "@/lib/system-data";

export function UebaResearchLab() {
  return (
    <section id="research-lab" className="py-20 border-b border-white/10 bg-[#07090d] tech-grid">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
            <span className="text-purple-400 font-bold uppercase tracking-widest">
              RESEARCH LAB // APPLIED MACHINE LEARNING
            </span>
            <span className="text-white/30">·</span>
            <span className="rounded bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-purple-300 text-[10px] font-bold">
              {UEBA_RESEARCH.status}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            Adaptive AI-Powered UEBA System
          </h2>

          <p className="mt-3 text-sm text-text-secondary font-sans max-w-3xl leading-relaxed">
            {UEBA_RESEARCH.abstract}
          </p>

          {/* Credibility Notice */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/5 px-3 py-1.5 font-mono text-xs text-purple-300">
            <span>ℹ</span>
            <span>{UEBA_RESEARCH.credibilityNotice}</span>
          </div>
        </div>

        {/* Feature Engineering Pillars */}
        <div className="mt-10">
          <span className="font-mono text-xs text-text-secondary uppercase tracking-wider block mb-4 font-semibold">
            01 // MULTI-DIMENSIONAL FEATURE ENGINEERING PILLARS:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UEBA_RESEARCH.featurePillars.map((pillar, idx) => (
              <div
                key={pillar.name}
                className="rounded-xl border border-white/10 bg-[#0d1117] p-5 shadow-xl relative"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 font-mono text-xs">
                  <span className="text-purple-400 font-bold">PILLAR 0{idx + 1}</span>
                  <span className="text-text-secondary text-[10px]">VECTOR SPACE</span>
                </div>
                <h3 className="font-serif text-xl text-text-primary">
                  {pillar.name}
                </h3>
                <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
                  {pillar.description}
                </p>
                <ul className="mt-4 space-y-2 border-t border-white/5 pt-3">
                  {pillar.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 font-mono text-[11px] text-text-primary/90">
                      <span className="text-purple-400 font-bold">›</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Model Pipeline & Evaluation Methodology */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Machine Learning Model Ensembles */}
          <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6 shadow-xl">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-wider block mb-4 font-semibold">
              02 // ENSEMBLE CLASSIFICATION &amp; ANOMALY DETECTION:
            </span>

            <div className="space-y-3 font-mono text-xs">
              {UEBA_RESEARCH.modelPipeline.map((m) => (
                <div
                  key={m.model}
                  className="rounded-lg border border-white/5 bg-black/40 p-4"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-text-primary text-sm">{m.model}</span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-purple-300">
                      {m.type}
                    </span>
                  </div>
                  <p className="text-text-secondary text-[11px] leading-relaxed mt-1 font-sans">
                    {m.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chronological Evaluation Rigor */}
          <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6 shadow-xl space-y-6">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
              03 // SCIENTIFIC RIGOR: CHRONOLOGICAL EVALUATION:
            </span>

            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 font-mono text-xs">
              <span className="font-bold text-emerald-400 block mb-1">
                PREVENTING LOOKAHEAD DATA LEAKAGE:
              </span>
              <p className="text-text-secondary leading-relaxed font-sans text-xs">
                {UEBA_RESEARCH.methodology}
              </p>
            </div>

            {/* Visual Timeline Split Diagram */}
            <div className="rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-text-secondary mb-2">
                <span>HISTORIC AUDIT INTERVAL (TRAIN)</span>
                <span>FUTURE LOGS (TEST)</span>
              </div>
              <div className="h-6 w-full rounded flex overflow-hidden border border-white/10">
                <div className="w-[70%] bg-emerald-500/25 flex items-center justify-center text-[10px] text-emerald-300 font-bold border-r border-emerald-500/40">
                  TRAIN SPLIT (70%)
                </div>
                <div className="w-[30%] bg-purple-500/25 flex items-center justify-center text-[10px] text-purple-300 font-bold">
                  TEST SPLIT (30%)
                </div>
              </div>
              <p className="mt-2 text-[10px] text-text-secondary">
                Strict sequential boundary prevents future user habits from leaking into baseline normal profiles.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-text-secondary">
              <span>RESEARCH DIRECTION: AI &amp; UEBA</span>
              <span className="text-purple-400">STATUS: PROTOTYPE TESTING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
