"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: "fr" | "en") => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      role="group"
      aria-label="Langue / Language"
      className="flex items-center gap-0.5"
    >
      <button
        onClick={() => switchTo("fr")}
        aria-label="Passer en français"
        aria-current={locale === "fr" ? "true" : undefined}
        className={`font-mono text-[12px] tracking-[0.06em] px-1.5 py-0.5 rounded transition-opacity cursor-pointer ${
          locale === "fr"
            ? "font-[600] text-ink"
            : "font-[400] text-ink/35 hover:text-ink/60"
        }`}
      >
        FR
      </button>
      <span className="text-ink/20 text-[10px] select-none" aria-hidden="true">
        |
      </span>
      <button
        onClick={() => switchTo("en")}
        aria-label="Switch to English"
        aria-current={locale === "en" ? "true" : undefined}
        className={`font-mono text-[12px] tracking-[0.06em] px-1.5 py-0.5 rounded transition-opacity cursor-pointer ${
          locale === "en"
            ? "font-[600] text-ink"
            : "font-[400] text-ink/35 hover:text-ink/60"
        }`}
      >
        EN
      </button>
    </div>
  );
}
