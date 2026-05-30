import { useTranslations } from "next-intl";

const SKILLS = {
  fr: {
    design:  ["Figma", "Design System", "Prototypage", "Design Tokens", "Accessibilité", "Green IT"],
    ai:      ["Claude API", "N8N", "Prompt Engineering", "Vibe Coding", "LLM UX", "Agent Workflows"],
    methods: ["Discovery UX", "Ateliers co-conception", "User Research", "Design Thinking", "Lean UX"],
  },
  en: {
    design:  ["Figma", "Design System", "Prototyping", "Design Tokens", "Accessibility", "Green IT"],
    ai:      ["Claude API", "N8N", "Prompt Engineering", "Vibe Coding", "LLM UX", "Agent Workflows"],
    methods: ["Discovery UX", "Co-design workshops", "User Research", "Design Thinking", "Lean UX"],
  },
} as const;

const CERTS = [1, 2, 3, 4, 5] as const;

type Props = { locale: string };

export function AboutSkills({ locale }: Props) {
  const t = useTranslations("aboutPage.skills");
  const skills = SKILLS[locale as "fr" | "en"] ?? SKILLS.fr;

  const categories = [
    { key: "design",  label: t("catDesign"),  items: skills.design },
    { key: "ai",      label: t("catAI"),      items: skills.ai },
    { key: "methods", label: t("catMethod"),  items: skills.methods },
  ];

  return (
    <section className="bg-surface border-t border-hairline py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">

        {/* Header */}
        <div className="mb-14">
          <p className="font-eyebrow text-ink/40 mb-4">{t("eyebrow")}</p>
          <h2 className="font-display-lg text-ink max-w-[18ch]">{t("title")}</h2>
        </div>

        {/* Grille compétences par catégorie */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {categories.map(({ key, label, items }) => (
            <div key={key}>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-5">
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-[50px] border border-hairline bg-canvas text-ink text-[14px] font-[480] tracking-[0.01em] hover:bg-surface transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-hairline pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-7">
            {t("certsLabel")}
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
            {CERTS.map((n) => (
              <li key={n} className="flex items-baseline gap-5">
                <span className="font-mono text-[11px] text-ink/30 tabular-nums min-w-[36px]">
                  {t(`cert${n}Year`)}
                </span>
                <div>
                  <p className="text-[14px] font-[480] text-ink/80 leading-[1.3]">
                    {t(`cert${n}Label`)}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink/35 mt-0.5">
                    {t(`cert${n}Org`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
