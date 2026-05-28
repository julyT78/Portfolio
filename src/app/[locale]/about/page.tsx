import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutPageHero } from "@/components/sections/about/AboutPageHero";
import { AboutPivot } from "@/components/sections/about/AboutPivot";
import { AboutTimeline } from "@/components/sections/about/AboutTimeline";
import { AboutSkills } from "@/components/sections/about/AboutSkills";
import { ContactCTA } from "@/components/sections/ContactCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AboutPage() {
  return (
    <>
      <AboutPageHero />
      <AboutPivot />
      <AboutTimeline />
      <AboutSkills />
      <ContactCTA />
    </>
  );
}
