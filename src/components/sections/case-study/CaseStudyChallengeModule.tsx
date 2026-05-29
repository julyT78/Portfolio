import Image from "next/image";
import type { ProjectData } from "@/data/projects";

type Props = {
  project: ProjectData;
  challengeLabel: string;
  flawLabel: string;
  solutionLabel: string;
};

export function CaseStudyChallengeModule({
  project,
  challengeLabel,
  flawLabel,
  solutionLabel,
}: Props) {
  if (!project.challenges?.length) return null;

  return (
    <section className="bg-canvas py-20" aria-label={challengeLabel}>
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-12">
          {challengeLabel}
        </p>

        <div className="flex flex-col gap-10">
          {project.challenges.map((challenge, i) => (
            <article
              key={i}
              className="grid md:grid-cols-2 gap-0 rounded-[24px] overflow-hidden"
            >
              {/* Colonne gauche — Faille IA */}
              <div className="bg-[oklch(0.96_0.01_30)] p-8 md:p-10 flex flex-col gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/40">
                  {flawLabel}
                </p>
                <h3 className="text-[20px] font-[540] text-ink leading-[1.3] tracking-[-0.01em]">
                  {challenge.flaw}
                </h3>
                <p className="text-[15px] font-[330] text-ink/70 leading-[1.65]">
                  {challenge.flawDetail}
                </p>
              </div>

              {/* Colonne droite — Solution UX */}
              <div className="bg-[oklch(0.97_0.04_160)] p-8 md:p-10 flex flex-col gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/40">
                  {solutionLabel}
                </p>
                <h3 className="text-[20px] font-[540] text-ink leading-[1.3] tracking-[-0.01em]">
                  {challenge.solution}
                </h3>
                <p className="text-[15px] font-[330] text-ink/70 leading-[1.65]">
                  {challenge.solutionDetail}
                </p>
                {challenge.image && (
                  <div className="relative mt-2 w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-ink/5">
                    <Image
                      src={challenge.image}
                      alt={`Solution UX : ${challenge.solution}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
