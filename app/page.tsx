import { SystemProvider } from "@/lib/system-context";
import { SystemHeader } from "@/components/system/SystemHeader";
import { HeroSystem } from "@/components/system/HeroSystem";
import { EngineeringSection } from "@/components/system/EngineeringSection";
import { ProjectsSection } from "@/components/system/ProjectsSection";
import { ResearchSection } from "@/components/system/ResearchSection";
import { EngineeringMilestones } from "@/components/system/EngineeringMilestones";
import { ContactSection } from "@/components/system/ContactSection";
import { CommandPalette } from "@/components/system/CommandPalette";
import { InteractivePointerHalo } from "@/components/system/InteractivePointerHalo";

export default function HomePage() {
  return (
    <SystemProvider>
      {/* Top Engineering Telemetry HUD Bar */}
      <SystemHeader />

      {/* Subtle Desktop Pointer Halo */}
      <InteractivePointerHalo />

      {/* ⌘K Command Palette Modal */}
      <CommandPalette />

      <main className="min-h-screen bg-[#07090d] text-text-primary selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* 01 // HOME: System Overview & Telemetry Initialization */}
        <HeroSystem />

        {/* 02 // ENGINEERING: Subsystem Architecture & Request Lifecycle */}
        <EngineeringSection />

        {/* 03 // PROJECTS: Production Case Studies & Incident Post-Mortems */}
        <ProjectsSection />

        {/* 04 // RESEARCH: Universal RAG Engine & Adaptive UEBA Anomaly ML */}
        <ResearchSection />

        {/* 05 // EXPERIENCE: Career Milestones, Commit Log & Credentials */}
        <EngineeringMilestones />

        {/* 06 // CONTACT: System Endpoint, Direct Message & Recruiter FAQ */}
        <ContactSection />
      </main>
    </SystemProvider>
  );
}
