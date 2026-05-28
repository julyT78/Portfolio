import type { ProjectData } from "@/data/projects";

type Props = {
  project: ProjectData;
  contextLabel: string;
  roleLabel: string;
  durationLabel: string;
};

export function CaseStudyContext({ project, contextLabel, roleLabel, durationLabel }: Props) {
  return (
    <section className="bg-canvas py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">

          {/* Texte contexte — occupe 2 colonnes */}
          <div className="md:col-span-2">
            <p className="font-eyebrow text-ink/40 mb-5">{contextLabel}</p>
            <p className="text-[17px] font-[330] text-ink/80 leading-[1.7] max-w-[65ch]">
              {project.context}
            </p>
          </div>

          {/* Méta sidebar */}
          <div className="flex flex-col gap-8 pt-1">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/35 mb-2">
                {roleLabel}
              </p>
              <p className="text-[14px] font-[400] text-ink/70 leading-[1.5]">
                {project.role}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/35 mb-2">
                {durationLabel}
              </p>
              <p className="text-[14px] font-[400] text-ink/70">
                {project.duration}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/35 mb-2">
                Client
              </p>
              <p className="text-[14px] font-[400] text-ink/70">
                {project.client}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
