import Link from "next/link";
import { useTranslations } from "next-intl";

export function AboutPageHero() {
  const t = useTranslations("aboutPage.hero");

  return (
    <section className="bg-canvas pt-20 pb-24 px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">

        {/* Eyebrow */}
        <p className="font-eyebrow text-ink/40 mb-8">
          {t("eyebrow")}
        </p>

        {/* Headline h1 */}
        <h1 className="font-display-xl text-ink mb-8 max-w-[14ch]">
          {t("headline")}
        </h1>

        {/* Tagline */}
        <p className="text-[18px] font-[330] text-ink/65 leading-[1.55] tracking-[-0.015em] max-w-[52ch] mb-12">
          {t("tagline")}
        </p>

        {/* Pills CTA */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-[50px] bg-ink text-canvas text-[15px] font-[480] tracking-[-0.01em] hover:opacity-85 transition-opacity"
          >
            {t("ctaContact")}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-[50px] border border-hairline text-ink text-[15px] font-[480] tracking-[-0.01em] hover:bg-surface transition-colors"
          >
            {t("ctaProjects")}
          </Link>
        </div>
      </div>
    </section>
  );
}
