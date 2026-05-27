import Link from "next/link";
import { useTranslations } from "next-intl";

/**
 * PresentationHero — section hero principale (remplace Hero.tsx)
 * Tâche 2 : stub fonctionnel · Tâche 3 : portrait SVG + cards flottantes
 */
export function PresentationHero() {
  const t = useTranslations("presentationHero");

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
        <p className="text-[20px] font-[330] text-ink/70 leading-[1.4] tracking-[-0.01em] max-w-[54ch] mb-12">
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
      </div>
    </section>
  );
}
