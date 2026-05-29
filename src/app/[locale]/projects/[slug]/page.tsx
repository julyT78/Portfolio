import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PROJECTS, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { CaseStudyHero } from "@/components/sections/case-study/CaseStudyHero";
import { CaseStudyContext } from "@/components/sections/case-study/CaseStudyContext";
import { CaseStudyApproach } from "@/components/sections/case-study/CaseStudyApproach";
import { CaseStudyAgentFlow } from "@/components/sections/case-study/CaseStudyAgentFlow";
import { CaseStudyChallengeModule } from "@/components/sections/case-study/CaseStudyChallengeModule";
import { CaseStudyGallery } from "@/components/sections/case-study/CaseStudyGallery";
import { CaseStudyDeepDive } from "@/components/sections/case-study/CaseStudyDeepDive";
import { CaseStudyResults } from "@/components/sections/case-study/CaseStudyResults";
import { CaseStudyNav } from "@/components/sections/case-study/CaseStudyNav";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ["fr", "en"];
  return PROJECTS.flatMap((project) =>
    locales.map((locale) => ({ locale, slug: project.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "caseStudy" });

  return {
    title: `${project.title} — Julie Tyrode`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const t = await getTranslations({ locale, namespace: "caseStudy" });

  return (
    <>
      <CaseStudyHero
        project={project}
        backLabel={t("back")}
      />
      <CaseStudyContext
        project={project}
        contextLabel={t("context")}
        roleLabel={t("role")}
        durationLabel={t("duration")}
      />
      <CaseStudyApproach
        project={project}
        approachLabel={t("approach")}
      />
      <CaseStudyAgentFlow
        project={project}
        agentFlowLabel={t("agentFlow")}
      />
      <CaseStudyChallengeModule
        project={project}
        challengeLabel={t("challenge")}
        flawLabel={t("flawLabel")}
        solutionLabel={t("solutionLabel")}
      />
      <CaseStudyGallery
        project={project}
        galleryLabel={t("gallery")}
      />
      <CaseStudyDeepDive
        project={project}
        deepDiveLabel={t("deepDive")}
      />
      <CaseStudyResults
        project={project}
        resultsLabel={t("results")}
      />
      <CaseStudyNav
        prev={prev}
        next={next}
        prevLabel={t("prevProject")}
        nextLabel={t("nextProject")}
        backLabel={t("backToProjects")}
      />
    </>
  );
}
