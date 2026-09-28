"use client";

import { useState } from "react";
import { RAG_LAYERS } from "@/lib/system-data";

export function UniversalRagDeepDive() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const selectedLayer =
    RAG_LAYERS.find((l) => l.step === activeStep) || RAG_LAYERS[0];

  return (
    <section id="ai-research" className="py-20 border-b border-white/10 bg-[#07090d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-purple-400 uppercase tracking-widest mb-2">
            <span>06 // AI RESEARCH &amp; PIPELINES</span>
            <span>·</span>
            <span>SYSTEMS-FIRST AI ARCHITECTURE</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
                Universal RAG Knowledge Base &amp; AI Engine
              </h2>
              <p className="mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-2xl">
                A reusable backend retrieval engine engineered from the ground up to query heterogeneous enterprise documentation without naive vector search pitfalls or hallucinations.
              </p>
            </div>
            <div className="shrink-0">
              <span className="rounded-lg border border-purple-500/40 bg-purple-500/10 px-3 py-1.5 font-mono text-xs text-purple-300 font-semibold">
                [ AI RESEARCH &amp; PROTOTYPE ]
              </span>
            </div>
          </div>
        </div>

        {/* The 7-Layer Pipeline Interactive Stepper */}
        <div className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 border border-white/10 rounded-xl bg-[#0d1117] p-2.5">
            {RAG_LAYERS.map((layer) => {
              const isSelected = activeStep === layer.step;
              return (
                <button
                  key={layer.step}
                  type="button"
                  onClick={() => setActiveStep(layer.step)}
                  className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-purple-400 bg-purple-500/15 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                      : "border-white/5 bg-white/5 hover:border-white/20 text-text-secondary"
                  }`}
                >
                  <span className="font-mono text-[10px] text-purple-400 font-bold mb-1">
                    LAYER 0{layer.step}
                  </span>
                  <span className="font-mono text-xs font-semibold text-text-primary line-clamp-1">
                    {layer.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Layer Architectural Breakdown */}
        <div className="mt-8 rounded-xl border border-purple-500/30 bg-[#0d1117] p-6 lg:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
            {/* Left: Layer Specs */}
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-purple-400">
                <span>STAGE 0{selectedLayer.step} OF 07</span>
                <span>//</span>
                <span>{selectedLayer.name}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-text-primary">
                {selectedLayer.title}
              </h3>

              <p className="mt-3 text-sm text-text-secondary leading-relaxed font-sans">
                {selectedLayer.role}
              </p>

              {/* Engineering Details */}
              <div className="mt-6 rounded-lg border border-white/10 bg-black/40 p-4">
                <span className="font-mono text-[11px] text-purple-300 uppercase font-semibold block mb-1">
                  // DEEP ARCHITECTURAL IMPLEMENTATION:
                </span>
                <p className="font-mono text-xs text-text-primary/90 leading-relaxed">
                  {selectedLayer.engineeringDetails}
                </p>
              </div>

              {/* Engineering Trade-offs */}
              <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                <span className="font-mono text-[11px] text-amber-300 uppercase font-semibold block mb-1">
                  // TRADE-OFFS &amp; DESIGN DECISION:
                </span>
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  {selectedLayer.tradeoffs}
                </p>
              </div>
            </div>

            {/* Right: Technical Diagram / Component Visualization */}
            <div className="rounded-xl border border-white/10 bg-[#07090d] p-5 flex flex-col justify-between font-mono text-xs">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-text-secondary">
                  <span className="text-purple-400">rag_engine_layer_0{selectedLayer.step}.schematic</span>
                  <span>STATUS: ACTIVE</span>
                </div>

                {/* Conceptual Schematic Flow */}
                <div className="space-y-3 py-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <div>
                      <span className="text-text-primary font-bold">HYBRID RETRIEVAL:</span>
                      <p className="text-[11px] text-text-secondary">Dense (Cosine) + Sparse (BM25) via Reciprocal Rank Fusion</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <div>
                      <span className="text-text-primary font-bold">RERANKER PIPELINE:</span>
                      <p className="text-[11px] text-text-secondary">Cross-Encoder scoring filters out false-positive chunks</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    <div>
                      <span className="text-text-primary font-bold">STRICT HALLUCINATION GUARD:</span>
                      <p className="text-[11px] text-text-secondary">Prompt bounds synthesis strictly to cited chunk evidence</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setActiveStep(Math.max(1, selectedLayer.step - 1))}
                  disabled={selectedLayer.step === 1}
                  className="rounded px-3 py-1.5 border border-white/10 bg-white/5 text-text-secondary hover:text-text-primary disabled:opacity-30"
                >
                  ← PREV LAYER
                </button>
                <span className="text-[11px] text-text-secondary">
                  LAYER {selectedLayer.step} OF 7
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep(Math.min(RAG_LAYERS.length, selectedLayer.step + 1))
                  }
                  disabled={selectedLayer.step === RAG_LAYERS.length}
                  className="rounded px-3 py-1.5 border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 disabled:opacity-30"
                >
                  NEXT LAYER →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
