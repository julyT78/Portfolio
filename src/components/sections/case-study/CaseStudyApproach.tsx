import type { ProjectData } from "@/data/projects";

type Props = {
  project: ProjectData;
  approachLabel: string;
};

export function CaseStudyApproach({ project, approachLabel }: Props) {
  if (!project.approach || project.approach.length === 0) return null;

  return (
    <section className="bg-canvas py-20 border-t border-ink/[0.06]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <p className="font-eyebrow text-ink/40 mb-12">{approachLabel}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {project.approach.map((step) => (
            <div key={step.step} className="flex flex-col gap-3">
              {/* Numéro d'étape */}
              <div className="w-8 h-8 rounded-full bg-ink/8 flex items-center justify-center">
                <span className="font-mono text-[12px] font-bold text-ink/50">
                  {step.step}
                </span>
              </div>
              {/* Titre */}
              <h3 className="text-[15px] font-[540] text-ink leading-[1.3]">
                {step.title}
              </h3>
              {/* Corps */}
              <p className="text-[14px] font-[320] text-ink/60 leading-[1.6]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
