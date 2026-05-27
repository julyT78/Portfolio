import Link from "next/link";
import { useTranslations } from "next-intl";

export function ContactCTA() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-6 px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="rounded-[24px] bg-navy px-8 py-16 md:px-14 md:py-20">

          {/* Eyebrow */}
          <p className="font-eyebrow text-canvas/40 mb-8">{t("eyebrow")}</p>

          {/* Headline */}
          <h2 className="font-display-lg text-canvas mb-4 max-w-[18ch]">
            {t("title")}
          </h2>

          {/* Sous-titre */}
          <p className="text-[18px] font-[330] text-canvas/60 leading-[1.4] tracking-[-0.01em] mb-12 max-w-[40ch]">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:julie.tyrode@gmail.com"
              className="inline-flex items-center justify-center px-7 py-3 rounded-[50px] bg-canvas text-ink text-[17px] font-[480] tracking-[-0.01em] hover:opacity-90 transition-opacity"
            >
              {t("cta")}
            </Link>
            <a
              href="https://www.linkedin.com/in/julie-t-542a6215/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-[50px] border border-canvas/30 text-canvas text-[17px] font-[480] tracking-[-0.01em] hover:border-canvas/60 transition-colors"
            >
              {t("linkedin")} ↗
            </a>
          </div>

          {/* Email discret */}
          <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.06em] text-canvas/25">
            julie.tyrode@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
