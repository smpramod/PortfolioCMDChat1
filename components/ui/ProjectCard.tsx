"use client";

import { useRef, type MouseEvent } from "react";
import type { Project } from "@/lib/types";

const covers: Record<string, { label: string; accent: string }> = {
  "cafe-platform": { label: "CAFE", accent: "#3ecfc0" },
  "clinic-management": { label: "CLINIC", accent: "#5ee0d0" },
  "smartcrop-ai": { label: "AI", accent: "#7ad4c4" },
};

function ProjectCover({ id }: { id: string }) {
  const tone = covers[id] ?? covers["cafe-platform"];

  if (id === "clinic-management") {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#0a151b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#113038,transparent_60%)]" />
        <div className="relative h-[82%] w-[44%] rounded-[1.75rem] border border-accent/35 bg-[#0e1c22] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-white/15" />
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-md bg-accent/20 px-2 py-1">
              <span className="font-mono text-[9px] text-accent">PATIENT #042</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            </div>
            <div className="h-6 rounded-md bg-white/8" />
            <div className="h-6 rounded-md bg-white/8" />
            <div className="h-14 rounded-md border border-accent/20 bg-accent/10 p-1.5">
              <div className="h-2 w-12 rounded bg-accent/40" />
              <div className="mt-1 h-1.5 w-20 rounded bg-white/15" />
            </div>
          </div>
        </div>
        <span className="absolute right-4 bottom-4 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
          {tone.label}
        </span>
      </div>
    );
  }

  if (id === "smartcrop-ai") {
    return (
      <div className="relative h-full overflow-hidden bg-[#091512]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,#143828,transparent_50%),radial-gradient(circle_at_75%_65%,#1b4834,transparent_45%)]" />
        <div className="absolute inset-5 rounded-xl border border-emerald-500/25 bg-[#0c1f19]/80 p-3 sm:p-4">
          <div className="flex items-center justify-between font-mono text-[10px] text-emerald-400">
            <span>CNN INFERENCE</span>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px]">88% ACC</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="aspect-square rounded border border-emerald-500/30 bg-emerald-500/10 p-1 flex items-center justify-center">
              <span className="font-mono text-[9px] text-emerald-300">CROP</span>
            </div>
            <div className="col-span-2 space-y-1.5">
              <div className="h-2 w-full rounded bg-emerald-400/40" />
              <div className="h-2 w-3/4 rounded bg-white/10" />
              <div className="h-2 w-5/6 rounded bg-white/10" />
              <div className="h-2 w-1/2 rounded bg-emerald-400/20" />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="h-1.5 w-16 rounded-full bg-emerald-400/60" />
            <span className="h-1.5 w-8 rounded-full bg-white/20" />
          </div>
        </div>
        <span className="absolute right-4 bottom-4 font-mono text-[10px] tracking-[0.2em] text-emerald-400 uppercase">
          {tone.label}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-[#0c1418]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#1b3a40,transparent_45%),radial-gradient(circle_at_70%_70%,#163038,transparent_40%)]" />
      <div className="absolute inset-4 grid grid-cols-[0.32fr_0.68fr] gap-3 rounded-xl border border-white/8 bg-[#10181c] p-3">
        <div className="space-y-2 rounded-lg bg-black/30 p-2">
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-[8px] text-accent">LIVE SOCK</span>
          </div>
          <div className="h-2 w-10 rounded bg-accent/50" />
          <div className="h-2 w-14 rounded bg-white/10" />
          <div className="h-2 w-12 rounded bg-white/10" />
          <div className="h-5 rounded bg-accent/15" />
        </div>
        <div className="grid grid-rows-[auto_1fr] gap-2">
          <div className="flex items-center justify-between rounded-lg bg-accent/15 px-2.5 py-1">
            <span className="font-mono text-[9px] text-accent">ORDER #108</span>
            <span className="font-mono text-[9px] text-warm font-semibold">PREPARING</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white/6 p-2 space-y-1">
              <div className="h-2 w-10 rounded bg-white/20" />
              <div className="h-2 w-12 rounded bg-white/10" />
            </div>
            <div className="rounded-lg bg-white/6 p-2 space-y-1">
              <div className="h-2 w-8 rounded bg-white/20" />
              <div className="h-2 w-10 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </div>
      <span className="absolute right-4 bottom-4 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
        {tone.label}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const node = cardRef.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    node.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 8}deg)`;
  };

  const reset = () => {
    const node = cardRef.current;
    if (node) node.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="glass-panel group flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-200 will-change-transform"
      data-cursor="interactive"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProjectCover id={project.id} />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {project.status === "building" && (
            <span className="rounded-full bg-void/70 px-2 py-1 font-mono text-[10px] tracking-wider text-accent uppercase backdrop-blur">
              Currently Building
            </span>
          )}
          {project.private && (
            <span className="rounded-full bg-void/70 px-2 py-1 font-mono text-[10px] tracking-wider text-text-primary uppercase backdrop-blur">
              Private Repo
            </span>
          )}
          {project.liveUrl && (
            <span className="rounded-full bg-void/70 px-2 py-1 font-mono text-[10px] tracking-wider text-warm uppercase backdrop-blur">
              Live Demo
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-4 p-4 sm:p-6">
        <div>
          <h3 className="font-serif text-xl text-text-primary sm:text-2xl">{project.title}</h3>
          <p className="mt-2 text-sm text-text-secondary">{project.description}</p>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          {project.bullets.slice(0, 3).map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {bullet}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 px-2 py-1 font-mono text-[length:var(--text-mono)] text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="interactive"
              className="font-mono text-[length:var(--text-mono)] text-warm transition-colors hover:text-text-primary"
            >
              Live Demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="interactive"
              className="font-mono text-[length:var(--text-mono)] text-accent transition-colors hover:text-text-primary"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
