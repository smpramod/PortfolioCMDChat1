"use client";

import { useState, useEffect, useRef } from "react";
import { RAG_LAYERS, UEBA_RESEARCH } from "@/lib/system-data";
import { SectionTransitionMarker } from "./SectionTransitionMarker";

export function ResearchSection() {
  const [activeResearchTab, setActiveResearchTab] = useState<"rag" | "ueba">("rag");
  const [activeRagStep, setActiveRagStep] = useState<number>(1);
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

  const selectedLayer =
    RAG_LAYERS.find((l) => l.step === activeRagStep) || RAG_LAYERS[0];

  return (
    <section ref={sectionRef} id="research" className="py-20 border-b border-white/10 bg-[#07090d] relative">
      {/* Anchor targets for backward compatibility */}
      <div id="ai-research" className="relative -top-24 invisible" />
      <div id="research-lab" className="relative -top-24 invisible" />

      {/* Visual Chapter Continuity Conduit from Projects */}
      <SectionTransitionMarker
        fromLabel="03 // PROJECTS"
        toLabel="04 // RESEARCH"
        descriptor="DETERMINISTIC SYSTEMS ──→ EXPLORATORY & EXPERIMENTAL TOPOLOGY"
        theme="purple"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Arrival */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div
              className={`inline-flex items-center gap-2 font-mono text-xs text-purple-400 uppercase tracking-widest mb-2 transition-all duration-300 ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <span>04 // AI &amp; SYSTEMS RESEARCH</span>
              <span>·</span>
              <span>SCIENTIFIC RIGOR &amp; ADVANCED RETRIEVAL</span>
            </div>
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary transition-all duration-500 delay-100 ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Applied AI &amp; Machine Learning Research
            </h2>
            <p
              className={`mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed transition-all duration-500 delay-200 ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Moving past naive vector search and heuristic baselines: multi-stage retrieval pipelines with rerankers and chronological behavioral anomaly detection evaluated without lookahead bias.
            </p>
          </div>

          {/* Research Subject Switcher */}
          <div
            className={`flex items-center rounded-xl border border-white/10 bg-[#0d1117] p-1.5 shrink-0 transition-all duration-500 delay-300 ${
              hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveResearchTab("rag")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-all ${
                activeResearchTab === "rag"
                  ? "bg-purple-500 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              <span>🧠</span>
              <span>UNIVERSAL RAG ENGINE</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveResearchTab("ueba")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-all ${
                activeResearchTab === "ueba"
                  ? "bg-purple-500 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              <span>🛡</span>
              <span>ADAPTIVE UEBA LAB</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: UNIVERSAL RAG DEEP DIVE */}
        {activeResearchTab === "rag" && (
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <span className="font-mono text-xs text-text-secondary uppercase">
                BRANCHING RETRIEVAL TOPOLOGY (TAP ANY LAYER TO INSPECT MECHANISM):
              </span>
              <span className="rounded bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 font-mono text-[10px] text-purple-300 w-fit">
                EXPLORATORY SYSTEMS RESEARCH
              </span>
            </div>

            {/* Branching Pipeline Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 border border-white/10 rounded-xl bg-[#0d1117] p-2.5">
              {RAG_LAYERS.map((layer) => {
                const isSelected = activeRagStep === layer.step;
                const isPassed = activeRagStep >= layer.step;
                return (
                  <button
                    key={layer.step}
                    type="button"
                    onClick={() => setActiveRagStep(layer.step)}
                    className={`card-interactive flex flex-col items-start p-3 rounded-lg border text-left transition-all relative ${
                      isSelected
                        ? "border-purple-400 bg-purple-500/15 shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-[1.02] z-10"
                        : isPassed
                        ? "border-purple-500/30 bg-purple-500/5 text-purple-200"
                        : "border-white/5 bg-white/5 hover:border-white/20 text-text-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-mono text-[10px] text-purple-400 font-bold">
                        LAYER 0{layer.step}
                      </span>
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                      )}
                    </div>
                    <span className="font-mono text-xs font-semibold text-text-primary line-clamp-1">
                      {layer.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Layer Architectural Breakdown */}
            <div className="mt-6 rounded-xl border border-purple-500/30 bg-[#0d1117] p-6 lg:p-8 shadow-2xl transition-all duration-300">
              <div key={selectedLayer.step} className="reveal-enter grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
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

                  <div className="mt-6 rounded-lg border border-white/10 bg-black/40 p-4">
                    <span className="font-mono text-[11px] text-purple-300 uppercase font-semibold block mb-1">
                      // DEEP ARCHITECTURAL IMPLEMENTATION:
                    </span>
                    <p className="font-mono text-xs text-text-primary/90 leading-relaxed">
                      {selectedLayer.engineeringDetails}
                    </p>
                  </div>

                  <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <span className="font-mono text-[11px] text-amber-300 uppercase font-semibold block mb-1">
                      // TRADE-OFFS &amp; DESIGN DECISION:
                    </span>
                    <p className="font-mono text-xs text-text-secondary leading-relaxed">
                      {selectedLayer.tradeoffs}
                    </p>
                  </div>
                </div>

                {/* Right: Technical Diagram with Active Step Branching */}
                <div className="rounded-xl border border-white/10 bg-[#07090d] p-5 flex flex-col justify-between font-mono text-xs">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-text-secondary">
                      <span className="text-purple-400 font-bold">rag_engine_flow.schematic</span>
                      <span className="text-emerald-400">EVAL: ROUGE-L 0.78</span>
                    </div>

                    <div className="space-y-3 py-2">
                      <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        activeRagStep <= 2 ? "border-purple-400 bg-purple-500/10 shadow-[0_0_12px_rgba(139,92,246,0.2)]" : "border-white/5 bg-white/[0.02]"
                      }`}>
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        <div>
                          <span className="text-text-primary font-bold">01. INGESTION &amp; BOUNDARIES:</span>
                          <p className="text-[11px] text-text-secondary mt-0.5">
                            Parses unstructured headers and segments text along semantic sentence boundaries.
                          </p>
                        </div>
                      </div>

                      <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        activeRagStep >= 3 && activeRagStep <= 5 ? "border-purple-400 bg-purple-500/10 shadow-[0_0_12px_rgba(139,92,246,0.2)]" : "border-white/5 bg-white/[0.02]"
                      }`}>
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <div>
                          <span className="text-text-primary font-bold">02. HYBRID FUSION &amp; RERANK:</span>
                          <p className="text-[11px] text-text-secondary mt-0.5">
                            BM25 lexical + pgvector 1536-dim dense fused via RRF, then ms-marco-MiniLM reranker scores top-5.
                          </p>
                        </div>
                      </div>

                      <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        activeRagStep >= 6 ? "border-purple-400 bg-purple-500/10 shadow-[0_0_12px_rgba(139,92,246,0.2)]" : "border-white/5 bg-white/[0.02]"
                      }`}>
                        <span className="h-2 w-2 rounded-full bg-purple-400" />
                        <div>
                          <span className="text-text-primary font-bold">03. SYNTHESIS &amp; CITATIONS:</span>
                          <p className="text-[11px] text-text-secondary mt-0.5">
                            Bounded LLM answer with direct span citations and zero hallucination pass.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-text-secondary">
                    <span>STEP {selectedLayer.step} OF 07</span>
                    <span className="text-emerald-400 font-semibold">RTT LATENCY: &lt;420ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ADAPTIVE UEBA RESEARCH LAB WITH SIGNAL-TO-INTELLIGENCE FLOW */}
        {activeResearchTab === "ueba" && (
          <div className="mt-8 space-y-10">
            {/* Context & Abstract */}
            <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
                <span className="text-purple-400 font-bold uppercase tracking-widest">
                  BEHAVIORAL ANOMALY DETECTION // ENTERPRISE AUDIT LOGS
                </span>
                <span className="text-white/30">·</span>
                <span className="rounded bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-purple-300 text-[10px] font-bold">
                  {UEBA_RESEARCH.status}
                </span>
              </div>

              <p className="text-sm text-text-secondary font-sans leading-relaxed mt-2">
                {UEBA_RESEARCH.abstract}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/5 px-3 py-1.5 font-mono text-xs text-purple-300">
                <span>ℹ</span>
                <span>{UEBA_RESEARCH.credibilityNotice}</span>
              </div>
            </div>

            {/* CINEMATIC RAW SIGNALS TO STRUCTURED INTELLIGENCE PIPELINE */}
            <div className="rounded-xl border border-purple-500/40 bg-[#090d14] p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="font-mono text-xs text-purple-400 uppercase tracking-wider font-bold">
                    // SIGNAL-TO-INTELLIGENCE PIPELINE ARCHITECTURE
                  </span>
                  <p className="text-xs text-text-secondary font-sans mt-0.5">
                    How high-entropy audit trails are transformed into calibrated anomaly risk classifications.
                  </p>
                </div>
                <span className="rounded bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-[10px] text-text-secondary">
                  CHRONOLOGICAL EVALUATION
                </span>
              </div>

              {/* 4-Stage Horizontal Transformation Flow with Flow Conduits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Stage 1: Raw Signals */}
                <div className="card-interactive rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400 font-bold">01 / RAW LOG SIGNALS</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                    </div>
                    <div className="space-y-1.5 text-[11px] text-text-secondary">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span>• AUTH_LOGIN</span>
                        <span className="text-white/40">Timestamp</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span>• HTTP_REQUEST</span>
                        <span className="text-white/40">Payload Size</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span>• FILE_EXPORT</span>
                        <span className="text-white/40">Resource ID</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• ACCESS_TIME</span>
                        <span className="text-white/40">Off-Hours</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-purple-400/80 font-mono">
                    <span>EMBEDDING FLOW</span>
                    <span className="animate-pulse">──→</span>
                  </div>
                </div>

                {/* Stage 2: Feature Engineering */}
                <div className="card-interactive rounded-lg border border-cyan-500/30 bg-cyan-950/15 p-4 font-mono text-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-300 font-bold">02 / FEATURE ENGINE</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                    <p className="text-[11px] text-text-secondary font-sans leading-relaxed">
                      Transforms raw time-series into 3 multi-dimensional vectors: Temporal Deviations, Entropy of Resource Access, and Peer-Group Baseline Variance.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[9px] text-cyan-400/80 font-mono">
                    <span>VECTOR CALIBRATION</span>
                    <span className="animate-pulse">──→</span>
                  </div>
                </div>

                {/* Stage 3: ML Ensemble */}
                <div className="card-interactive rounded-lg border border-amber-500/30 bg-amber-950/15 p-4 font-mono text-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-300 font-bold">03 / ENSEMBLE MODELS</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    </div>
                    <ul className="space-y-1.5 text-[11px]">
                      <li className="text-text-primary">↳ Isolation Forest</li>
                      <li className="text-text-primary">↳ One-Class SVM</li>
                      <li className="text-text-primary">↳ Gradient Boosted Trees</li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[9px] text-amber-400/80 font-mono">
                    <span>WEIGHTED FUSION</span>
                    <span className="animate-pulse">──→</span>
                  </div>
                </div>

                {/* Stage 4: Risk Calibration */}
                <div className="card-interactive rounded-lg border border-emerald-500/40 bg-emerald-950/20 p-4 font-mono text-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emerald-300 font-bold">04 / RISK FUSION</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="rounded border border-emerald-500/30 bg-black/60 p-2.5 mt-2">
                      <span className="text-[10px] text-white/40 block">OUTPUT METRIC:</span>
                      <span className="text-xs text-emerald-400 font-bold block mt-0.5">
                        FUSED SCORE: 0.12 [BASELINE NORMAL]
                      </span>
                      <span className="text-[10px] text-amber-400 block mt-1">
                        THRESHOLD: &gt;0.75 [TRIGGER AUDIT]
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[9px] text-emerald-400/80 font-mono">
                    <span>ZERO LOOKAHEAD LEAKAGE</span>
                    <span>[VERIFIED]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Engineering Pillars */}
            <div>
              <span className="font-mono text-xs text-text-secondary uppercase tracking-wider block mb-4 font-semibold">
                02 // MULTI-DIMENSIONAL FEATURE ENGINEERING PILLARS:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {UEBA_RESEARCH.featurePillars.map((pillar, idx) => (
                  <div
                    key={pillar.name}
                    className="card-interactive rounded-xl border border-white/10 bg-[#0d1117] p-5 shadow-xl relative hover:border-purple-400/40 transition-all"
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
                <span>RESEARCH DIRECTION: APPLIED AI</span>
                <span className="text-purple-400 font-semibold">STATUS: PROTOTYPE TESTING</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
