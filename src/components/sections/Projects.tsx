import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PROJECTS = [
  {
    id: "pulse",
    client: "Softeam",
    year: "2026",
    title: "Dashboard PULSE",
    tagline: "Piloter l'IA pour fusionner design et code en temps réel",
    tags: ["IA Design", "Vibe Coding", "POC"],
    color: "bg-coral",
    image: "/images/book/2.png",
    href: "#projets",
  },
  {
    id: "labo-ia",
    client: "Softeam",
    year: "2025",
    title: "Laboratoire d'expertise IA Design",
    tagline: "Transformer l'IA en levier de valeur stratégique",
    tags: ["IA Design", "Coaching", "R&D"],
    color: "bg-lilac",
    image: "/images/book/4.png",
    href: "#projets",
  },
  {
    id: "chantier-ia",
    client: "Softeam",
    year: "2025–2026",
    title: "Chantier IA transverse",
    tagline: "Accélérer l'adoption de l'IA, sans perdre confiance",
    tags: ["IA Design", "Ateliers", "Design thinking"],
    color: "bg-mint",
    image: "/images/book/6.png",
    href: "#projets",
  },
  {
    id: "power-bi",
    client: "La Poste",
    year: "2026",
    title: "Outil Power BI",
    tagline: "UI pour données complexes alignée aux Design Systems groupe",
    tags: ["UI Design", "Data viz", "Prototypes"],
    color: "bg-cream",
    image: "/images/book/8.png",
    href: "#projets",
  },
];

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projets" className="bg-canvas py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="font-eyebrow text-ink/40 mb-4">{t("eyebrow")}</p>
          <h2 className="font-display-lg text-ink max-w-[18ch]">{t("title")}</h2>
        </div>

        {/* Grille 2×2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} viewLabel={t("viewCase")} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  viewLabel,
}: {
  project: (typeof PROJECTS)[0];
  viewLabel: string;
}) {
  return (
    <Link href={project.href} className="group block rounded-[24px] overflow-hidden">
      <div className={`${project.color} p-8 md:p-10`}>

        {/* Meta */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
            {project.client}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40">
            {project.year}
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden mb-8 bg-ink/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={project.id === "pulse"}
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* Titre + tagline */}
        <h3 className="text-[22px] font-[540] text-ink tracking-[-0.01em] leading-[1.3] mb-2">
          {project.title}
        </h3>
        <p className="text-[15px] font-[330] text-ink/70 leading-[1.45] mb-6 max-w-[42ch]">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-[50px] bg-ink/10 text-ink text-[12px] font-[480] tracking-[0.02em]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <p className="text-[14px] font-[480] text-ink group-hover:opacity-60 transition-opacity">
          {viewLabel}
        </p>
      </div>
    </Link>
  );
}
