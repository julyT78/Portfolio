import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-canvas border-t border-hairline">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

          {/* Marque */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-mono text-[20px] font-bold text-ink mb-3">JT</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-4">
              {t("nav")}
            </p>
            <ul className="space-y-2">
              {["#projets", "#about", "#playground", "#contact"].map(
                (href, i) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[14px] font-[330] text-ink hover:opacity-60 transition-opacity"
                    >
                      {["Projets", "À propos", "Playground", "Contact"][i]}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Projets */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-4">
              {t("projects")}
            </p>
            <ul className="space-y-2">
              {[
                "Dashboard PULSE",
                "Labo IA Design",
                "Chantier IA",
                "Outil Power BI",
              ].map((project) => (
                <li key={project}>
                  <Link
                    href="#projets"
                    className="text-[14px] font-[330] text-ink hover:opacity-60 transition-opacity"
                  >
                    {project}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40 mb-4">
              {t("legal")}
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-[14px] font-[330] text-ink hover:opacity-60 transition-opacity"
                >
                  {t("mentions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-[14px] font-[330] text-ink hover:opacity-60 transition-opacity"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/julie-t-542a6215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-[330] text-ink hover:opacity-60 transition-opacity"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-6 border-t border-hairline">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
