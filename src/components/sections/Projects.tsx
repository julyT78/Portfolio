"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
    kpi: { value: "-60%", label: "cycle design→code" },
    deepDive: "Conception d'un pipeline IA-first : prompt engineering, génération de composants via Claude, validation design en temps réel. Enjeux : cohérence du design system face à la variabilité des outputs LLM, gestion des hallucinations visuelles, boucle feedback humain-machine.",
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
    kpi: { value: "+8", label: "designers formés" },
    deepDive: "Programme de montée en compétences IA Design : ateliers prompt UX, cartographie des cas d'usage, définition de standards de qualité pour les outputs IA. Transfert de compétences sur les outils d'orchestration (n8n, Claude API) et les patterns d'interface agentique.",
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
    // TODO — KPI à confirmer avec Julie
    kpi: { value: "+6", label: "équipes embarquées" },
    deepDive: "[À compléter — flux d'agents, gestion de la confiance utilisateur, arbres de décision de secours]",
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
    // TODO — KPI à confirmer avec Julie
    kpi: { value: "1", label: "DS unifié groupe" },
    deepDive: "[À compléter — analyse des jeux de données, gestion de la complexité visuelle, alignement Design System groupe]",
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
            <ProjectCard key={project.id} project={project} viewLabel={t("viewCase")} deepDiveLabel={t("deepDive")} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  viewLabel,
  deepDiveLabel,
}: {
  project: (typeof PROJECTS)[0];
  viewLabel: string;
  deepDiveLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group rounded-[24px] overflow-hidden">
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
        <p className="text-[15px] font-[330] text-ink/70 leading-[1.45] mb-5 max-w-[42ch]">
          {project.tagline}
        </p>

        {/* KPI badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[50px] bg-ink/10 mb-5">
          <span className="font-mono text-[13px] font-bold text-ink tracking-[-0.01em]">
            {project.kpi.value}
          </span>
          <span className="text-[12px] font-[330] text-ink/60">
            {project.kpi.label}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-[50px] bg-ink/[0.08] text-ink text-[12px] font-[480] tracking-[0.02em]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA voir le cas */}
        <Link
          href={project.href}
          className="inline-block text-[14px] font-[480] text-ink hover:opacity-60 transition-opacity mb-6"
        >
          {viewLabel}
        </Link>

        {/* ── Accordéon deep-dive ─────────────────────────────────────── */}
        <div className="border-t border-ink/10 pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-left cursor-pointer"
            aria-expanded={expanded}
          >
            <span className="text-[13px] font-[480] text-ink/50 hover:text-ink transition-colors">
              {deepDiveLabel}
            </span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-ink/40 ml-2 flex-shrink-0"
            >
              ↓
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="pt-4 text-[14px] font-[320] text-ink/60 leading-[1.6] max-w-[52ch]">
                  {project.deepDive}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
