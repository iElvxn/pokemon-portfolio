import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { StarField } from '@/components/game/StarField';
import { KonamiCode } from '@/components/game/KonamiCode';
import { SoundProvider } from '@/components/game/SoundManager';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { AboutSection } from '@/components/sections/AboutSection';

export default function Home() {
  return (
    <SoundProvider>
      {/* Fixed star field — shows through all dark sections */}
      <StarField />
      <Navigation />
      <KonamiCode />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </SoundProvider>
  );
}
