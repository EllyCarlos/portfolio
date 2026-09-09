"use client";

import AnimatedBackground from "@/components/animated-background";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";

function MainPage() {
  return (
    <main className="bg-slate-100 dark:bg-transparent">
      <div className="top-0 z-0 fixed w-full h-screen">
        <AnimatedBackground />
      </div>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

export default MainPage;
