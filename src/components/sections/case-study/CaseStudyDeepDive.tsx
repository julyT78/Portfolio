"use client";

import { useState } from "react";
import type { ProjectData } from "@/data/projects";

type Props = {
  project: ProjectData;
  deepDiveLabel: string;
};

export function CaseStudyDeepDive({ project, deepDiveLabel }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!project.deepDiveSections?.length) return null;

  return (
    <section className="bg-[oklch(0.98_0.005_270)] py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-10">
          {deepDiveLabel}
        </p>

        <div className="flex flex-col divide-y divide-ink/10">
          {project.deepDiveSections.map((section, i) => {
            const isOpen = openIndex === i;
            const bodyId = `deep-dive-body-${i}`;

            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={bodyId}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-[17px] font-[480] text-ink leading-[1.4] tracking-[-0.01em] group-hover:text-ink/70 transition-colors">
                    {section.title}
                  </span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-ink/8 text-ink text-[12px] font-bold transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={bodyId}
                  role="region"
                  aria-hidden={!isOpen}
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[600px] pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-[15px] font-[330] text-ink/70 leading-[1.7] max-w-[72ch]">
                    {section.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
