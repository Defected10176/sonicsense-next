"use client";
// Drop-in replacement for src/components/UseCases.tsx

import { useLanguage } from "../i18n/LanguageContext";

const ICONS = ["👓", "🎧", "👂", "👶"];

export default function UseCases() {
  const { t } = useLanguage();

  return (
    <section style={{ maxWidth: 980, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--cyan)", margin: "0 0 0.75rem", opacity: 0.8 }}>
        {t.useCasesEyebrow}
      </p>
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, color: "var(--text)", margin: "0 0 2rem", lineHeight: 1.2 }}>
        {t.useCasesHeading}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
        {t.useCases.map((uc, i) => (
          <div key={uc.title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 30, marginBottom: 12 }}>{ICONS[i]}</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: "0 0 6px" }}>{uc.title}</h3>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>{uc.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
