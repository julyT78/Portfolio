import Link from "next/link";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="bg-canvas pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">

        {/* Eyebrow */}
        <p className="font-eyebrow text-ink/50 mb-8">
          {t("eyebrow")}
        </p>

        {/* Headline */}
        <h1 className="font-display-xl text-ink max-w-[14ch] mb-8">
          {t("headline")}
        </h1>

        {/* Tagline */}
        <p
          className="text-[20px] font-[330] text-ink/70 leading-[1.4] tracking-[-0.01em] max-w-[54ch] mb-12"
        >
          {t("tagline")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#projets"
            className="inline-flex items-center justify-center px-7 py-3 rounded-[50px] bg-ink text-canvas text-[18px] font-[480] tracking-[-0.01em] hover:opacity-85 transition-opacity"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="#playground"
            className="inline-flex items-center justify-center px-7 py-3 rounded-[50px] border border-hairline text-ink text-[18px] font-[480] tracking-[-0.01em] hover:bg-surface transition-colors"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        {/* Metrics discrètes */}
        <div className="mt-20 pt-8 border-t border-hairline grid grid-cols-2 md:grid-cols-3 gap-8 max-w-[640px]">
          {[
            { value: "19", label: "ans d'expérience" },
            { value: "8+", label: "clients grands comptes" },
            { value: "IA", label: "spécialité depuis 2024" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-[32px] font-[340] text-ink tracking-[-0.02em] leading-none mb-1">
                {value}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink/40">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
