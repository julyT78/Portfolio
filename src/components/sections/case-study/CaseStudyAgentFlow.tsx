import type { ProjectData, AgentFlowNode } from "@/data/projects";

type Props = {
  project: ProjectData;
  agentFlowLabel: string;
};

const NODE_STYLES: Record<AgentFlowNode["type"], string> = {
  input:
    "bg-[oklch(0.94_0.06_200)] border-[oklch(0.78_0.10_200)] text-[oklch(0.25_0.04_200)]",
  process:
    "bg-canvas border-ink/15 text-ink",
  output:
    "bg-[oklch(0.94_0.08_145)] border-[oklch(0.78_0.12_145)] text-[oklch(0.25_0.06_145)]",
  decision:
    "bg-[oklch(0.96_0.06_60)] border-[oklch(0.82_0.10_60)] text-[oklch(0.30_0.05_60)]",
};

const NODE_SHAPE: Record<AgentFlowNode["type"], string> = {
  input: "rounded-[50px]",
  process: "rounded-[12px]",
  output: "rounded-[50px]",
  decision: "rounded-[6px] rotate-[2deg]",
};

export function CaseStudyAgentFlow({ project, agentFlowLabel }: Props) {
  if (!project.agentFlow?.length) return null;

  return (
    <section className="bg-canvas py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-10">
          {agentFlowLabel}
        </p>

        {/* Horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row items-center gap-0 overflow-x-auto pb-2">
          {project.agentFlow.map((node, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center gap-0 w-full md:w-auto"
            >
              {/* Node */}
              <div
                className={`flex flex-col items-center justify-center px-5 py-4 min-w-[120px] border text-center ${NODE_STYLES[node.type]} ${NODE_SHAPE[node.type]}`}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] opacity-60 mb-1">
                  {node.node}
                </span>
                <span className="text-[13px] font-[480] leading-[1.3]">
                  {node.label}
                </span>
              </div>

              {/* Connector — hidden after last node */}
              {i < project.agentFlow!.length - 1 && (
                <div
                  aria-hidden="true"
                  className="flex-shrink-0 flex items-center justify-center md:rotate-0 rotate-90"
                >
                  <div className="w-8 md:w-10 h-px md:h-px bg-ink/20" />
                  <div className="border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-ink/20 -ml-px" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
