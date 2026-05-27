"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

const CHALLENGES = [
  { id: "latency",        labelKey: "challenge1" as const },
  { id: "explainability", labelKey: "challenge2" as const },
  { id: "hallucination",  labelKey: "challenge3" as const },
];

type State = "idle" | "streaming" | "done" | "error";

interface PlaygroundProps {
  /** Si true, supprime le wrapper <section> externe (utilisé dans PitchPlayground) */
  embedded?: boolean;
}

export function Playground({ embedded = false }: PlaygroundProps) {
  const t = useTranslations("playground");

  const [selected,       setSelected]       = useState<string | null>(null);
  const [response,       setResponse]       = useState("");
  const [streamState,    setStreamState]    = useState<State>("idle");
  const [temperature,    setTemperature]    = useState(0.7);
  const [hasInteracted,  setHasInteracted]  = useState(false);

  /* ── Appel API ──────────────────────────────────────────────────────────── */
  const run = useCallback(async (challengeLabel: string, temp: number) => {
    setSelected(challengeLabel);
    setResponse("");
    setStreamState("streaming");

    try {
      const res = await fetch("/api/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge: challengeLabel, temperature: temp }),
      });

      if (!res.ok || !res.body) {
        setStreamState("error");
        return;
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setResponse(prev => prev + decoder.decode(value, { stream: true }));
      }

      setStreamState("done");
      setHasInteracted(true);
    } catch {
      setStreamState("error");
    }
  }, []);

  const handleSelect = (label: string) => run(label, temperature);

  const reset = () => {
    setSelected(null);
    setResponse("");
    setStreamState("idle");
  };

  const retry = () => {
    if (selected) run(selected, temperature);
  };

  /* ── Rendu ──────────────────────────────────────────────────────────────── */
  const inner = (
    <div
      className={`bg-lime w-full h-full ${
        embedded
          ? "px-8 py-12 md:px-14 md:py-16"
          : "rounded-[24px] px-8 py-12 md:px-14 md:py-16"
      }`}
    >
      {/* Eyebrow */}
      <p className="font-eyebrow text-ink/50 mb-6">{t("eyebrow")}</p>

      {/* Titre */}
      <h2 className="font-display-lg text-ink mb-4 max-w-[20ch]">
        {t("title")}
      </h2>

      {/* Sous-titre */}
      <p className="text-[15px] font-[330] text-ink/60 mb-8 max-w-[46ch]">
        {t("subtitle")}
      </p>

      {/* ── Curseur Température ─────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink/45">
            {t("temperatureLabel")}
          </span>
          <span className="font-mono text-[11px] text-ink/60">
            {temperature.toFixed(1)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={e => setTemperature(parseFloat(e.target.value))}
          disabled={streamState === "streaming"}
          className="w-full h-[3px] rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed
            bg-ink/20 accent-ink"
          aria-label={t("temperatureLabel")}
        />
        <div className="flex justify-between mt-1.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-ink/35">
            {t("temperaturePrecis")}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-ink/35">
            {t("temperatureCreatif")}
          </span>
        </div>
      </div>

      {/* ── Chips de défi ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-8">
        {CHALLENGES.map(({ id, labelKey }) => {
          const label      = t(labelKey);
          const isSelected = selected === label;
          return (
            <button
              key={id}
              onClick={() => handleSelect(label)}
              disabled={streamState === "streaming"}
              className={`px-5 py-2.5 rounded-[50px] text-[15px] font-[480] tracking-[-0.01em]
                border transition-all cursor-pointer
                disabled:opacity-40 disabled:cursor-not-allowed
                ${isSelected
                  ? "bg-ink text-canvas border-ink"
                  : "bg-canvas/60 text-ink border-ink/20 hover:bg-canvas hover:border-ink/40"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Zone de réponse ─────────────────────────────────────────────── */}
      {streamState !== "idle" && (
        <div className="bg-canvas/70 rounded-[16px] p-6 md:p-8 backdrop-blur-sm">

          {/* État error */}
          {streamState === "error" ? (
            <div>
              <p className="text-[14px] font-[330] text-red-600 mb-4">
                {t("errorMessage")}
              </p>
              <button
                onClick={retry}
                className="text-[13px] font-[480] text-ink/60 hover:text-ink transition-colors cursor-pointer"
              >
                {t("retry")} →
              </button>
            </div>
          ) : (
            <>
              {/* Dot + label */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`w-2 h-2 rounded-full bg-success ${
                    streamState === "streaming" ? "animate-pulse" : ""
                  }`}
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                  {streamState === "streaming" ? t("thinking") : t("responseLabel")}
                </p>
              </div>

              {/* Texte streamé */}
              <p
                className={`text-[16px] font-[330] text-ink leading-[1.6] tracking-[-0.01em] max-w-[58ch]
                  ${streamState === "streaming" ? "cursor-blink" : ""}`}
              >
                {response}
              </p>

              {/* Actions post-done */}
              {streamState === "done" && (
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={reset}
                    className="self-start text-[13px] font-[480] text-ink/45 hover:text-ink transition-colors cursor-pointer"
                  >
                    {t("reset")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── CTA post-interaction ─────────────────────────────────────────── */}
      {hasInteracted && streamState === "done" && (
        <div className="mt-6">
          <Link
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[14px] font-[480] text-ink hover:opacity-60 transition-opacity"
          >
            {t("ctaPostInteraction")} →
          </Link>
        </div>
      )}
    </div>
  );

  if (embedded) return <div className="w-full">{inner}</div>;

  return (
    <section id="playground" className="py-6 px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        {inner}
      </div>
    </section>
  );
}
