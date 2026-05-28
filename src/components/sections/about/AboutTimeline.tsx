import { useTranslations } from "next-intl";

const ENTRIES = [1, 2, 3, 4, 5] as const;

export function AboutTimeline() {
  const t = useTranslations("aboutPage.timeline");

  return (
    <section className="bg-canvas border-t border-hairline py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">

        {/* Header */}
        <div className="mb-14">
          <p className="font-eyebrow text-ink/40 mb-4">{t("eyebrow")}</p>
          <h2 className="font-display-lg text-ink max-w-[20ch]">{t("title")}</h2>
        </div>

        {/* Timeline */}
        <ol className="space-y-0">
          {ENTRIES.map((n, idx) => {
            const year    = t(`entry${n}Year`);
            const role    = t(`entry${n}Role`);
            const company = t(`entry${n}Company`);
            const desc    = t(`entry${n}Desc`);
            const isLast  = idx === ENTRIES.length - 1;

            return (
              <li
                key={n}
                className={`grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-8 ${
                  !isLast ? "border-b border-hairline" : ""
                }`}
              >
                {/* Année */}
                <div className="pt-0.5">
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-ink/40 tabular-nums">
                    {year}
                  </span>
                </div>

                {/* Contenu */}
                <div>
                  <p className="text-[18px] font-[540] text-ink tracking-[-0.01em] leading-[1.3] mb-1">
                    {role}
                  </p>
                  <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-ink/45 mb-3">
                    {company}
                  </p>
                  <p className="text-[15px] font-[330] text-ink/60 leading-[1.55] max-w-[60ch]">
                    {desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
