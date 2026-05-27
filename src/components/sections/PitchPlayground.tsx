import { useTranslations } from "next-intl";
import { Playground } from "./Playground";

/**
 * PitchPlayground — grille 50/50 : pitch gauche + Playground droite
 * Tâche 2 : structure et câblage · Tâche 4 : styling complet
 */
export function PitchPlayground() {
  const t = useTranslations("pitchPlayground");

  return (
    <section id="playground" className="bg-canvas border-t border-hairline">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid md:grid-cols-2">

          {/* Colonne gauche — pitch */}
          <div className="px-6 lg:px-8 py-16 md:py-20 border-b md:border-b-0 md:border-r border-hairline">
            <p className="font-eyebrow text-ink/40 mb-6">
              {t("eyebrow")}
            </p>
            <h2 className="font-display-lg text-ink mb-6 max-w-[18ch]">
              {t("title")}
            </h2>
            <p className="text-[17px] font-[320] text-ink/65 leading-[1.6] tracking-[-0.015em] max-w-[38ch]">
              {t("body")}
            </p>

            {/* Métriques */}
            <div className="mt-12 pt-8 border-t border-hairline grid grid-cols-3 gap-6">
              {(
                [
                  { value: t("metric1Value"), label: t("metric1Label") },
                  { value: t("metric2Value"), label: t("metric2Label") },
                  { value: t("metric3Value"), label: t("metric3Label") },
                ] as const
              ).map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[32px] font-[340] text-ink tracking-[-0.02em] leading-none mb-1">
                    {value}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink/40 leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite — Playground */}
          <div className="flex items-stretch">
            <Playground embedded />
          </div>
        </div>
      </div>
    </section>
  );
}
