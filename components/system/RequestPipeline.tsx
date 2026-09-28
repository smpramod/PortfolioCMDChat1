"use client";

import { useState } from "react";
import { useSystem } from "@/lib/system-context";
import { PIPELINE_STAGES } from "@/lib/system-data";

export function RequestPipeline() {
  const { activePipelineStage, setActivePipelineStage } = useSystem();
  const [isSimulating, setIsSimulating] = useState(false);

  const currentStage =
    PIPELINE_STAGES.find((s) => s.step === activePipelineStage) ||
    PIPELINE_STAGES[0];

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
    }, 1200);
  };

  return (
    <section
      id="request-pipeline"
      className="py-20 border-b border-white/10 bg-[#07090d] tech-grid relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
              <span>03 // SIGNATURE INTERACTION</span>
              <span>·</span>
              <span>LIFECYCLE OF A PRODUCTION REQUEST</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
              From Request to Production
            </h2>
            <p className="mt-2 font-mono text-xs sm:text-sm text-text-secondary max-w-2xl">
              An interactive end-to-end architectural flow demonstrating how requests transition through API guards, service layers, cache invalidation, database persistence, and asynchronous worker queues.
            </p>
          </div>

          {/* Simulate Execution Trigger */}
          <button
            type="button"
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 font-mono text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <span>{isSimulating ? "SIMULATING FLOW..." : "▶ SIMULATE REQUEST PACKET"}</span>
          </button>
        </div>

        {/* Stepper Pipeline Visual */}
        <div className="mt-10">
          {/* Desktop/Tablet Horizontal Pipeline Stages */}
          <div className="hidden lg:grid grid-cols-7 gap-2 border border-white/10 rounded-xl bg-[#0d1117] p-2.5">
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

          {/* Mobile Step Buttons */}
          <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]">
            {PIPELINE_STAGES.map((stage) => {
              const isActive = activePipelineStage === stage.step;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActivePipelineStage(stage.step)}
                  className={`shrink-0 rounded-lg px-3 py-2 border font-mono text-xs transition-all ${
                    isActive
                      ? "border-cyan-400 bg-cyan-500/15 text-cyan-300 font-bold"
                      : "border-white/10 bg-white/5 text-text-secondary"
                  }`}
                >
                  0{stage.step} {stage.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Inspector */}
        <div className="mt-8 rounded-xl border border-white/10 bg-[#0d1117] p-6 lg:p-8 shadow-2xl">
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

              {/* Technologies Applied */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-cyan-400">
                <span className="text-white/40">TECH:</span>
                <span>{currentStage.stack}</span>
              </div>

              <p className="mt-4 text-sm text-text-secondary leading-relaxed font-sans">
                {currentStage.roleDescription}
              </p>

              {/* Engineering Mechanism */}
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
    </section>
  );
}
