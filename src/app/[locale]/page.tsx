import { PresentationHero } from "@/components/sections/PresentationHero";
import { PitchPlayground } from "@/components/sections/PitchPlayground";
import { MarqueeStrip } from "@/components/layout/MarqueeStrip";
import { Projects } from "@/components/sections/Projects";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <PresentationHero />
      <PitchPlayground />
      <MarqueeStrip />
      <Projects />
      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
