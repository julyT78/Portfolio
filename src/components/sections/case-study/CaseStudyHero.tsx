import Link from "next/link";
import Image from "next/image";
import type { ProjectData } from "@/data/projects";

type Props = {
  project: ProjectData;
  backLabel: string;
};

export function CaseStudyHero({ project, backLabel }: Props) {
  return (
    <section className={`${project.color} pt-10 pb-16`}>
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">

        {/* Retour */}
        <Link
          href={`/#projets`}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50 hover:text-ink transition-colors mb-10"
        >
          ← {backLabel}
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
            {project.client}
          </span>
          <span className="text-ink/30">·</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40">
            {project.year}
          </span>
          <span className="text-ink/30">·</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40">
            {project.duration}
          </span>
        </div>

        {/* Titre */}
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-[600] text-ink tracking-[-0.02em] leading-[1.1] mb-4 max-w-[20ch]">
          {project.title}
        </h1>
        <p className="text-[18px] font-[330] text-ink/70 leading-[1.5] mb-8 max-w-[52ch]">
          {project.tagline}
        </p>

        {/* KPI + Tags */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[50px] bg-ink/15">
            <span className="font-mono text-[15px] font-bold text-ink tracking-[-0.01em]">
              {project.kpi.value}
            </span>
            <span className="text-[13px] font-[330] text-ink/60">
              {project.kpi.label}
            </span>
          </div>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-[50px] bg-ink/[0.08] text-ink text-[12px] font-[480] tracking-[0.02em]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Image hero */}
        <div className="relative w-full aspect-[16/7] rounded-[20px] overflow-hidden bg-ink/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
