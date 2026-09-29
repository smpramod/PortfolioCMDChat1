"use client";

import { useState, useActionState } from "react";
import { submitContact } from "@/lib/actions";
import { PROFILE, CURATED_QA } from "@/lib/system-data";
import type { ContactFormState } from "@/lib/types";

const initialState: ContactFormState = { ok: false, error: "" };

export function ContactSection() {
  const [state, action, pending] = useActionState(submitContact, initialState);
  const [activeQAId, setActiveQAId] = useState<string>("qa-redis");
  const [showFAQ, setShowFAQ] = useState<boolean>(false);

  const activeQA =
    CURATED_QA.find((q) => q.id === activeQAId) || CURATED_QA[0];

  return (
    <footer id="contact" className="py-20 border-t border-white/10 bg-[#07090d] text-text-primary relative">
      {/* Anchor targets for backward compatibility */}
      <div id="system-endpoint" className="relative -top-24 invisible" />
      <div id="ask-my-work" className="relative -top-24 invisible" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Recruiter & Dev Quick Ground Truth Accordion / Drawer */}
        <div className="mb-10 rounded-xl border border-white/10 bg-[#0d1117] p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                RECRUITER &amp; DEV FACT SHEET // VERIFIED GROUND TRUTH
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowFAQ(!showFAQ)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300 hover:bg-cyan-500/20 transition-colors w-fit"
            >
              <span>{showFAQ ? "▲ COLLAPSE INQUIRY PANEL" : "▼ EXPAND COMMON RECRUITER INQUIRIES"}</span>
            </button>
          </div>

          {showFAQ && (
            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-6 items-start">
              {/* Question Selector */}
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-text-secondary uppercase block mb-1">
                  SELECT COMMON INQUIRY:
                </span>
                {CURATED_QA.map((qa) => {
                  const isSelected = activeQAId === qa.id;
                  return (
                    <button
                      key={qa.id}
                      type="button"
                      onClick={() => setActiveQAId(qa.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left font-mono text-xs transition-all ${
                        isSelected
                          ? "border-cyan-400/80 bg-cyan-500/10 text-cyan-300 font-semibold"
                          : "border-white/5 bg-black/30 text-text-secondary hover:text-text-primary hover:border-white/15"
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

              {/* Answer Box */}
              <div className="rounded-lg border border-cyan-500/30 bg-black/40 p-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 text-text-secondary text-[10px]">
                  <span className="text-cyan-400 font-bold">QUERY: {activeQA.id}</span>
                  <span className="text-emerald-400">GROUND TRUTH VERIFIED</span>
                </div>
                <h4 className="font-serif text-lg text-text-primary mb-2">
                  &ldquo;{activeQA.question}&rdquo;
                </h4>
                <p className="font-sans text-sm text-text-primary/90 leading-relaxed font-normal">
                  {activeQA.answer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* System Completion Header & Direct Message Card */}
        <div className="rounded-xl border border-emerald-500/30 bg-[#0d1117] p-8 lg:p-12 shadow-2xl relative">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs text-emerald-400 font-semibold tracking-wider">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>06 // CONTACT &amp; ENDPOINT // SYSTEM READY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
            {/* Left: Identity & Quick Action Links */}
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight">
                Ready to engineer reliable systems together?
              </h2>

              <p className="mt-4 font-mono text-xs sm:text-sm text-text-secondary max-w-xl leading-relaxed">
                Currently open for Backend Developer, Graduate Engineer Trainee (GET), and Software Engineer roles. Specializing in high-throughput NestJS APIs, Redis caching &amp; locking, MongoDB/PostgreSQL schemas, and RAG retrieval pipelines.
              </p>

              {/* Direct Info */}
              <div className="mt-6 space-y-2 font-mono text-xs text-text-secondary">
                <p>
                  <span className="text-white/40">NAME:</span>{" "}
                  <strong className="text-text-primary font-semibold">{PROFILE.name}</strong>
                </p>
                <p>
                  <span className="text-white/40">DIRECT EMAIL:</span>{" "}
                  <a href={`mailto:${PROFILE.email}`} className="text-emerald-400 hover:underline">
                    {PROFILE.email}
                  </a>
                </p>
                <p>
                  <span className="text-white/40">PHONE:</span>{" "}
                  <a href={PROFILE.phoneHref} className="text-text-primary hover:text-emerald-400">
                    {PROFILE.phone}
                  </a>
                </p>
                <p>
                  <span className="text-white/40">LOCATION:</span> {PROFILE.location} [UTC+5:30]
                </p>
                <p>
                  <span className="text-white/40">ACADEMICS:</span> B.Tech CSBS (KIT Kolhapur, CGPA 8.4 · 2023–2026)
                </p>
              </div>

              {/* Resume & Social Links */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={PROFILE.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-emerald-500 px-5 py-2.5 font-mono text-xs font-bold text-black hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                >
                  VIEW RESUME ↗
                </a>

                <a
                  href={PROFILE.resume}
                  download="Pramod_Margudre_Resume.pdf"
                  className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 font-mono text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                >
                  DOWNLOAD PDF ↓
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors"
                >
                  GITHUB ↗
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors"
                >
                  LINKEDIN ↗
                </a>
              </div>
            </div>

            {/* Right: Functional Direct Message Console */}
            <div className="rounded-xl border border-white/10 bg-[#07090d] p-6 font-mono text-xs shadow-xl">
              <span className="text-emerald-400 font-bold block mb-3 uppercase tracking-wider">
                // TRANSMIT DIRECT MESSAGE:
              </span>

              <form action={action} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="text-text-secondary block mb-1 text-[11px]">
                    SENDER IDENTIFIER (NAME)
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={80}
                    placeholder="Engineering Lead / Recruiter name"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-emerald-500 transition-colors"
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-text-secondary block mb-1 text-[11px]">
                    REPLY-TO ADDRESS (EMAIL)
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    placeholder="your.email@company.com"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-emerald-500 transition-colors"
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-text-secondary block mb-1 text-[11px]">
                    MESSAGE / PROJECT DETAILS
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    minLength={10}
                    maxLength={5000}
                    placeholder="Role details, system challenges, or interview invitation..."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-emerald-500 transition-colors"
                    suppressHydrationWarning
                  />
                </div>

                {/* Honeypot field */}
                <input
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                  suppressHydrationWarning
                />

                {state.error && (
                  <p className="text-xs text-red-400 font-mono leading-relaxed">
                    {state.error}
                  </p>
                )}

                {state.ok && (
                  <p className="text-xs text-emerald-400 font-mono leading-relaxed">
                    ✓ Transmission acknowledged. Message received by Pramod Margudre.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  suppressHydrationWarning
                  className="w-full rounded-lg bg-emerald-500 py-2.5 font-mono text-xs font-bold text-black hover:bg-emerald-400 transition-colors disabled:opacity-50"
                >
                  {pending ? "TRANSMITTING..." : "SEND TRANSMISSION →"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* System Technical Footer */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-text-secondary border-t border-white/10 pt-6">
          <div className="flex items-center gap-2">
            <span>© 2026 PRAMOD MARGUDRE</span>
            <span>·</span>
            <span>SYSTEMS-FIRST PORTFOLIO ARCHITECTURE</span>
          </div>

          <div className="flex items-center gap-4">
            <span>NEXT.JS // TYPESCRIPT // TAILWIND // RESEND</span>
            <a href="#system-overview" className="text-emerald-400 hover:underline">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
