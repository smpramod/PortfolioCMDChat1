"use client";

import { useSystem } from "@/lib/system-context";
import { CURATED_QA } from "@/lib/system-data";

export function AskMyWork() {
  const { activeAnswerId, setActiveAnswerId } = useSystem();

  const activeQA =
    CURATED_QA.find((q) => q.id === activeAnswerId) || CURATED_QA[0];

  return (
    <section id="ask-my-work" className="py-20 border-b border-white/10 bg-[#07090d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
            <span>KNOWLEDGE BASE // VERIFIED FACT RETRIEVAL</span>
            <span>·</span>
            <span>ZERO HALLUCINATIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            Ask My Work
          </h2>
          <p className="mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-2xl">
            Direct, factual answers to frequently asked recruiter and engineering questions—grounded strictly in verified production deliverables and research records.
          </p>
        </div>

        {/* Interactive Query Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 items-start">
          {/* Question List */}
          <div className="space-y-2.5">
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary block mb-2 font-semibold">
              SELECT COMMON INQUIRY:
            </span>
            {CURATED_QA.map((qa) => {
              const isSelected = activeAnswerId === qa.id;
              return (
                <button
                  key={qa.id}
                  type="button"
                  onClick={() => setActiveAnswerId(qa.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-left font-mono text-xs transition-all ${
                    isSelected
                      ? "border-cyan-400/80 bg-cyan-500/10 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      : "border-white/10 bg-[#0d1117] text-text-secondary hover:text-text-primary hover:border-white/20"
                  }`}
                >
                  <span className="line-clamp-1">{qa.question}</span>
                  <span className="text-cyan-400 font-mono text-[10px] ml-2 shrink-0">
                    {isSelected ? "●" : "→"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Answer Console Card */}
          <div className="rounded-xl border border-cyan-500/30 bg-[#0d1117] p-6 lg:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono text-xs text-text-secondary">
              <span className="text-cyan-400 font-bold">QUERY RESULT: {activeQA.id}</span>
              <span className="text-[10px] text-emerald-400">STATUS: VERIFIED GROUND TRUTH</span>
            </div>

            <h3 className="font-serif text-2xl text-text-primary">
              &ldquo;{activeQA.question}&rdquo;
            </h3>

            <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-5">
              <p className="font-sans text-sm text-text-primary/95 leading-relaxed">
                {activeQA.answer}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
              <span className="font-mono text-xs text-text-secondary">
                SECTION: #{activeQA.targetSectionId}
              </span>

              <a
                href={`#${activeQA.targetSectionId}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-mono text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
              >
                <span>JUMP TO SECTION</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
