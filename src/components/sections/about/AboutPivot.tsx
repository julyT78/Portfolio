import { useTranslations } from "next-intl";

export function AboutPivot() {
  const t = useTranslations("aboutPage.pivot");

  return (
    <section className="bg-canvas border-t border-hairline py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Colonne gauche — Récit */}
          <div>
            <p className="font-eyebrow text-ink/40 mb-6">{t("eyebrow")}</p>
            <h2 className="font-display-lg text-ink mb-10 max-w-[20ch]">
              {t("title")}
            </h2>
            <div className="space-y-5">
              {(["body1", "body2", "body3", "body4"] as const).map((key) => (
                <p
                  key={key}
                  className="text-[16px] font-[330] text-ink/70 leading-[1.65] tracking-[-0.01em] max-w-[48ch]"
                >
                  {t(key)}
                </p>
              ))}
            </div>
          </div>

          {/* Colonne droite — Citation */}
          <div className="bg-lilac rounded-[24px] px-10 py-14 flex flex-col justify-between min-h-[360px]">
            <blockquote className="font-display-lg text-ink leading-[1.15] max-w-[18ch]">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50 mt-10">
              {t("quoteYear")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
