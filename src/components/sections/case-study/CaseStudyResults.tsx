import type { ProjectData } from "@/data/projects";

type Props = {
  project: ProjectData;
  resultsLabel: string;
};

export function CaseStudyResults({ project, resultsLabel }: Props) {
  return (
    <section className="bg-canvas py-20 border-t border-ink/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* KPI mis en avant */}
          <div>
            <p className="font-eyebrow text-ink/40 mb-8">{resultsLabel}</p>
            <div className="flex flex-col gap-4">
              {project.results.map((result, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-ink/40 flex-shrink-0" />
                  <p className="text-[16px] font-[330] text-ink/75 leading-[1.6]">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep dive complet */}
          <div className="bg-ink/[0.04] rounded-[20px] p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/35 mb-4">
              Analyse complète
            </p>
            <p className="text-[15px] font-[320] text-ink/65 leading-[1.7]">
              {project.deepDive}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
