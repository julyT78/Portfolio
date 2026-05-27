const CLIENTS = [
  "Softeam",
  "La Poste",
  "Société Générale",
  "Numspot",
  "Docaposte",
  "Canal+",
  "BPCE",
  "TSI Payment",
  "Healthways",
  "DILA",
  "Syctom",
  "BazarChic",
];

export function MarqueeStrip() {
  const items = [...CLIENTS, ...CLIENTS]; // double pour boucle seamless

  return (
    <div
      className="bg-ink overflow-hidden h-9 flex items-center"
      aria-hidden="true"
    >
      <div className="animate-marquee flex whitespace-nowrap gap-0">
        {items.map((client, i) => (
          <span
            key={i}
            className="font-mono text-canvas text-[12px] tracking-[0.08em] uppercase px-8"
          >
            {client}
            <span className="ml-8 opacity-40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
