"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

const CHALLENGES = [
  { id: "latency", labelKey: "challenge1" as const },
  { id: "explainability", labelKey: "challenge2" as const },
  { id: "hallucination", labelKey: "challenge3" as const },
];

type State = "idle" | "streaming" | "done";

export function Playground() {
  const t = useTranslations("playground");
  const [selected, setSelected] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [streamState, setStreamState] = useState<State>("idle");

  const handleSelect = useCallback(async (challengeLabel: string) => {
    setSelected(challengeLabel);
    setResponse("");
    setStreamState("streaming");

    try {
      const res = await fetch("/api/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge: challengeLabel }),
      });

      if (!res.ok || !res.body) {
        setResponse("Une erreur est survenue. Veuillez réessayer.");
        setStreamState("done");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setResponse((prev) => prev + text);
      }

      setStreamState("done");
    } catch {
      setResponse("Erreur de connexion. Veuillez réessayer.");
      setStreamState("done");
    }
  }, []);

  const reset = () => {
    setSelected(null);
    setResponse("");
    setStreamState("idle");
  };

  return (
    <section id="playground" className="py-6 px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div
          className="rounded-[24px] bg-lime px-8 py-12 md:px-14 md:py-16"
        >
          {/* Eyebrow */}
          <p className="font-eyebrow text-ink/50 mb-6">{t("eyebrow")}</p>

          {/* Titre */}
          <h2 className="font-display-lg text-ink mb-4 max-w-[20ch]">
            {t("title")}
          </h2>

          {/* Sous-titre */}
          <p className="text-[16px] font-[330] text-ink/60 mb-10 max-w-[50ch]">
            {t("subtitle")}
          </p>

          {/* Boutons de défi */}
          <div className="flex flex-wrap gap-3 mb-10">
            {CHALLENGES.map(({ id, labelKey }) => {
              const label = t(labelKey);
              const isSelected = selected === label;
              return (
                <button
                  key={id}
                  onClick={() => handleSelect(label)}
                  disabled={streamState === "streaming"}
                  className={`px-5 py-2.5 rounded-[50px] text-[15px] font-[480] tracking-[-0.01em] border transition-all cursor-pointer
                    ${
                      isSelected
                        ? "bg-ink text-canvas border-ink"
                        : "bg-canvas/60 text-ink border-ink/20 hover:bg-canvas hover:border-ink/40"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Zone de réponse */}
          {(streamState !== "idle" || response) && (
            <div className="bg-canvas/70 rounded-[16px] p-6 md:p-8 backdrop-blur-sm">
              {/* Header de réponse */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                  {streamState === "streaming" ? t("thinking") : "Approche de design"}
                </p>
              </div>

              {/* Texte streamé */}
              <p
                className={`text-[17px] font-[330] text-ink leading-[1.55] tracking-[-0.01em] max-w-[65ch]
                  ${streamState === "streaming" ? "cursor-blink" : ""}`}
              >
                {response}
              </p>

              {/* Reset */}
              {streamState === "done" && (
                <button
                  onClick={reset}
                  className="mt-6 text-[14px] font-[480] text-ink/50 hover:text-ink transition-colors cursor-pointer"
                >
                  {t("reset")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
