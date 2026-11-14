import { PageTransition } from '../components/common/PageTransition';
import { Hero } from '../sections/Hero';
import { AboutPreview } from '../sections/AboutPreview';
import { FeaturedProjects } from '../sections/FeaturedProjects';
import { JourneySection } from '../sections/JourneySection';
import { SkillsSection } from '../sections/SkillsSection';
import { CertificateShowcase } from '../sections/CertificateShowcase';
import { ContactCTA } from '../sections/ContactCTA';

export default function Home() {
  return (
    <PageTransition keyName="home">
      <Hero />
      <AboutPreview />
      <JourneySection />
      <SkillsSection />
      <FeaturedProjects />
      <CertificateShowcase />
      <ContactCTA />
    </PageTransition>
  );
}
