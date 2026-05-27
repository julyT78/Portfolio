import Link from "next/link";
import { useTranslations } from "next-intl";

const SKILLS = [
  "Figma",
  "N8N",
  "Claude Code",
  "Design System",
  "Ateliers UX",
  "Vibe Coding",
  "Prompt Engineering",
  "Green IT",
  "Accessibilité",
];

export function AboutTeaser() {
  const t = useTranslations("about");

  return (
    <section id="about" className="bg-canvas py-24 border-t border-hairline">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Texte */}
          <div>
            <p className="font-eyebrow text-ink/40 mb-6">{t("eyebrow")}</p>
            <h2 className="font-display-lg text-ink mb-8 max-w-[16ch]">
              {t("title")}
            </h2>
            <p className="text-[18px] font-[320] text-ink/70 leading-[1.55] tracking-[-0.015em] max-w-[55ch] mb-10">
              {t("bio")}
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center text-[16px] font-[480] text-ink hover:opacity-60 transition-opacity"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Compétences */}
          <div className="pt-4 md:pt-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-6">
              COMPÉTENCES & OUTILS
            </p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-[50px] border border-hairline text-ink text-[14px] font-[480] tracking-[0.01em] hover:bg-surface transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-5">
                CERTIFICATIONS RÉCENTES
              </p>
              <ul className="space-y-3">
                {[
                  { year: "2026", label: 'Ambassadrice "Bataille de l\'IA"' },
                  { year: "2026", label: "Secnum ANSSI" },
                  { year: "2025", label: "Gen AI for futur UX UI Design" },
                  { year: "2025", label: "Chef de projet Numérique Responsable" },
                ].map(({ year, label }) => (
                  <li key={label} className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-ink/30 tabular-nums min-w-[36px]">
                      {year}
                    </span>
                    <span className="text-[14px] font-[330] text-ink/70">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
