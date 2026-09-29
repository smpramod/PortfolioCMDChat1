"use client";

import { useState, useEffect } from "react";
import { useSystem } from "@/lib/system-context";
import { PROFILE, type AudienceMode } from "@/lib/system-data";

export function SystemHeader() {
  const { audienceMode, setAudienceMode, setCommandPaletteOpen, activeSection, setActiveSection } = useSystem();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<number>(0);

  const navItems = [
    { id: "system-overview", label: "01//HOME", href: "#system-overview", chapter: "01", name: "HOME" },
    { id: "engineering", label: "02//ENGINEERING", href: "#engineering", chapter: "02", name: "ENGINEERING" },
    { id: "projects", label: "03//PROJECTS", href: "#projects", chapter: "03", name: "PROJECTS" },
    { id: "research", label: "04//RESEARCH", href: "#research", chapter: "04", name: "RESEARCH" },
    { id: "experience", label: "05//EXPERIENCE", href: "#experience", chapter: "05", name: "EXPERIENCE" },
    { id: "contact", label: "06//CONTACT", href: "#contact", chapter: "06", name: "CONTACT" },
  ];

  const currentNav = navItems.find((n) => n.id === activeSection) || navItems[0];

  // Scroll spy to highlight active section according to visitor scroll position
  useEffect(() => {
    const sectionIds = navItems.map((n) => n.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-15% 0px -55% 0px",
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  // Real-time smooth section progress calculation
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      animId = requestAnimationFrame(() => {
        const activeEl = document.getElementById(activeSection);
        if (activeEl) {
          const rect = activeEl.getBoundingClientRect();
          const totalHeight = rect.height;
          const scrolledPast = -rect.top;
          const sectionPct = Math.min(100, Math.max(0, (scrolledPast / (totalHeight - window.innerHeight * 0.35)) * 100));
          setSectionProgress(sectionPct);
        }

        const winScroll = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pagePct = totalHeight > 0 ? Math.min(100, Math.max(0, (winScroll / totalHeight) * 100)) : 0;
        setTotalProgress(pagePct);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const modes: { id: AudienceMode; label: string; icon: string }[] = [
    { id: "developer", label: "DEV", icon: "⚡" },
    { id: "recruiter", label: "RECRUITER", icon: "💼" },
    { id: "researcher", label: "RESEARCH", icon: "🔬" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#07090d]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6 sm:py-2.5">
        {/* Left: System Status & Brand */}
        <a
          href="#system-overview"
          onClick={(e) => handleNavClick(e, "system-overview", "#system-overview")}
          className="group flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-text-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold text-text-primary group-hover:text-emerald-400 transition-colors">
            PRAMOD MARGUDRE
          </span>
          <span className="hidden text-white/30 sm:inline">//</span>
          <span className="hidden font-normal text-text-secondary md:inline text-[11px]">
            SYS.BACKEND_V4
          </span>
          {/* Real-time Chapter Telemetry Badge */}
          <span className="hidden xl:inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.5 text-[9px] text-emerald-400 font-mono">
            <span>CH.{currentNav.chapter}</span>
            <span className="text-white/30">·</span>
            <span>{Math.round(sectionProgress)}%</span>
          </span>
        </a>

        {/* Center: Monospace Nav Links with Scroll-Aware Active State & Progress Line */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id, item.href)}
                className={`relative overflow-hidden rounded px-2.5 py-1 font-mono text-[11px] transition-all ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(52,211,153,0.2)] font-semibold"
                    : "text-text-secondary hover:bg-white/5 hover:text-emerald-400 border border-transparent"
                }`}
              >
                <span>{item.label}</span>
                {/* Thin Sub-Item Section Progress Indicator */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 h-[2px] bg-emerald-400 transition-all duration-150 rounded-full"
                    style={{ width: `${Math.max(8, sectionProgress)}%` }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Audience Lens & ⌘K & Resume */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audience Mode Switcher */}
          <div className="flex items-center rounded-lg border border-white/10 bg-black/40 p-0.5">
            {modes.map((m) => {
              const active = audienceMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setAudienceMode(m.id)}
                  title={`Switch to ${m.label} lens`}
                  className={`flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] font-medium tracking-wider transition-all ${
                    active
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(52,211,153,0.2)]"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span className="text-[10px]">{m.icon}</span>
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* ⌘K Trigger Button */}
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-secondary hover:border-white/20 hover:text-text-primary transition-colors"
          >
            <span>⌘K</span>
            <span className="text-[10px] text-white/40">Search</span>
          </button>

          {/* Quick Resume Link */}
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-colors"
          >
            <span>CV</span>
            <span className="hidden sm:inline">↓</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-text-secondary lg:hidden hover:text-text-primary"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#07090d] px-4 py-3 lg:hidden space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-white/5 bg-white/5 px-3 py-2 font-mono text-xs text-text-secondary hover:text-emerald-400 hover:border-emerald-500/30"
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setCommandPaletteOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 font-mono text-xs text-text-primary"
          >
            <span>⌘K Command & Search Menu</span>
          </button>
        </div>
      )}

      {/* 1px Hairline Portfolio Progression Bar */}
      <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
        <div
          className="h-full bg-emerald-500/80 transition-all duration-150 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
          style={{ width: `${totalProgress}%` }}
        />
      </div>
    </header>
  );
}
