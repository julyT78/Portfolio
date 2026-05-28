import Link from "next/link";
import type { ProjectData } from "@/data/projects";

type Props = {
  prev: ProjectData;
  next: ProjectData;
  prevLabel: string;
  nextLabel: string;
  backLabel: string;
};

export function CaseStudyNav({ prev, next, prevLabel, nextLabel, backLabel }: Props) {
  return (
    <nav className="bg-canvas border-t border-ink/[0.06] py-12">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center gap-4">

          {/* Précédent */}
          <Link
            href={prev.href}
            className="group flex flex-col gap-1"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/35 group-hover:text-ink/60 transition-colors">
              ← {prevLabel}
            </span>
            <span className="text-[14px] font-[480] text-ink/60 group-hover:text-ink transition-colors leading-[1.3]">
              {prev.title}
            </span>
            <span className="font-mono text-[10px] text-ink/35">{prev.client}</span>
          </Link>

          {/* Retour homepage */}
          <div className="flex justify-center">
            <Link
              href="/#projets"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 hover:text-ink transition-colors px-4 py-2 rounded-[50px] border border-ink/10 hover:border-ink/30"
            >
              {backLabel}
            </Link>
          </div>

          {/* Suivant */}
          <Link
            href={next.href}
            className="group flex flex-col gap-1 text-right ml-auto"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/35 group-hover:text-ink/60 transition-colors">
              {nextLabel} →
            </span>
            <span className="text-[14px] font-[480] text-ink/60 group-hover:text-ink transition-colors leading-[1.3]">
              {next.title}
            </span>
            <span className="font-mono text-[10px] text-ink/35">{next.client}</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}
