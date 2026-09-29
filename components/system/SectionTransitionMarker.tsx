"use client";

import React from "react";

interface SectionTransitionMarkerProps {
  fromLabel: string;
  toLabel: string;
  descriptor?: string;
  theme?: "emerald" | "cyan" | "purple" | "amber";
}

export function SectionTransitionMarker({
  fromLabel,
  toLabel,
  descriptor,
  theme = "emerald",
}: SectionTransitionMarkerProps) {
  const themeColors = {
    emerald: {
      border: "border-emerald-500/25",
      badge: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
      line: "stroke-emerald-400/40",
      dot: "fill-emerald-400",
      glow: "rgba(52, 211, 153, 0.2)",
    },
    cyan: {
      border: "border-cyan-500/25",
      badge: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
      line: "stroke-cyan-400/40",
      dot: "fill-cyan-400",
      glow: "rgba(6, 182, 212, 0.2)",
    },
    purple: {
      border: "border-purple-500/25",
      badge: "border-purple-500/30 text-purple-400 bg-purple-500/5",
      line: "stroke-purple-400/40",
      dot: "fill-purple-400",
      glow: "rgba(139, 92, 246, 0.2)",
    },
    amber: {
      border: "border-amber-500/25",
      badge: "border-amber-500/30 text-amber-400 bg-amber-500/5",
      line: "stroke-amber-400/40",
      dot: "fill-amber-400",
      glow: "rgba(245, 158, 11, 0.2)",
    },
  }[theme];

  return (
    <div className="relative w-full py-8 overflow-hidden pointer-events-none select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Subtle Top Trace Line */}
        <div className="w-full flex items-center justify-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Centered Chapter Transition Node */}
          <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-wider text-text-secondary">
            <span className="opacity-60">{fromLabel}</span>
            <span className="text-white/30">──→</span>
            <span className={`px-2 py-0.5 rounded border font-semibold ${themeColors.badge}`}>
              {toLabel}
            </span>
          </div>

          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Vertical Transition Conduit with animated pulse */}
        <div className="flex flex-col items-center mt-2">
          <svg className="w-4 h-8" viewBox="0 0 16 32" fill="none">
            <line
              x1="8"
              y1="0"
              x2="8"
              y2="32"
              stroke="currentColor"
              className={themeColors.line}
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />
            <circle
              cx="8"
              cy="16"
              r="2"
              className={`${themeColors.dot} pulse-dot`}
            />
          </svg>
          {descriptor && (
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-1">
              {descriptor}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
