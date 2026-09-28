import { SystemProvider } from "@/lib/system-context";
import { SystemHeader } from "@/components/system/SystemHeader";
import { HeroSystem } from "@/components/system/HeroSystem";
import { InteractiveSystemMap } from "@/components/system/InteractiveSystemMap";
import { RequestPipeline } from "@/components/system/RequestPipeline";
import { ProjectCaseStudies } from "@/components/system/ProjectCaseStudies";
import { EngineeringIncidents } from "@/components/system/EngineeringIncidents";
import { UniversalRagDeepDive } from "@/components/system/UniversalRagDeepDive";
import { UebaResearchLab } from "@/components/system/UebaResearchLab";
import { EngineeringMilestones } from "@/components/system/EngineeringMilestones";
import { AskMyWork } from "@/components/system/AskMyWork";
import { SystemEndpoint } from "@/components/system/SystemEndpoint";
import { CommandPalette } from "@/components/system/CommandPalette";

export default function HomePage() {
  return (
    <SystemProvider>
      {/* Top Engineering Telemetry HUD Bar */}
      <SystemHeader />

      {/* ⌘K Command Palette Modal */}
      <CommandPalette />

      <main className="min-h-screen bg-[#07090d] text-text-primary selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* 01 // System Overview & Initialization */}
        <HeroSystem />

        {/* 02 // Interactive System Map & Evidence-First Subsystems */}
        <InteractiveSystemMap />

        {/* 03 // From Request to Production Interactive Flow */}
        <RequestPipeline />

        {/* 04 // In-Depth Production Case Studies */}
        <ProjectCaseStudies />

        {/* 05 // When Systems Break: Post-Mortems & Debugging */}
        <EngineeringIncidents />

        {/* 06 // Flagship AI: Universal RAG Engine Architecture */}
        <UniversalRagDeepDive />

        {/* 06.5 // AI Research Lab: Adaptive UEBA Anomaly ML */}
        <UebaResearchLab />

        {/* 07 // Career Milestones & Verified Credentials */}
        <EngineeringMilestones />

        {/* Knowledge Base: Ask My Work Q&A */}
        <AskMyWork />

        {/* 08 // System Completion, Contact Form & Resume */}
        <SystemEndpoint />
      </main>
    </SystemProvider>
  );
}
