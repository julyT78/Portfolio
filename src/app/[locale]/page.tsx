import { Hero } from "@/components/sections/Hero";
import { MarqueeStrip } from "@/components/layout/MarqueeStrip";
import { Playground } from "@/components/sections/Playground";
import { Projects } from "@/components/sections/Projects";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Playground />
      <Projects />
      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
