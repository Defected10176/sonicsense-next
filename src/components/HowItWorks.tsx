"use client";
// Drop-in replacement for src/components/HowItWorks.tsx

import { useLanguage } from "../i18n/LanguageContext";

const META = [
  { num: "01", color: "#2DD4A7", glow: "rgba(45,212,167,0.4)" },
  { num: "02", color: "#F59E0B", glow: "rgba(245,158,11,0.4)" },
  { num: "03", color: "#38BDF8", glow: "rgba(56,189,248,0.4)" },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" style={{ maxWidth: 980, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--cyan)", margin: "0 0 0.75rem", opacity: 0.8 }}>
        {t.howEyebrow}
      </p>
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, color: "var(--text)", margin: "0 0 0.75rem", lineHeight: 1.2 }}>
        {t.howHeading}
      </h2>
      <p style={{ color: "var(--muted)", lineHeight: 1.7, maxWidth: 560, margin: "0 0 2.5rem" }}>{t.howIntro}</p>

      <div style={{ display: "grid", gap: 14 }}>
        {t.steps.map((step, i) => (
          <div key={step.title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, padding: "22px 24px", display: "flex", gap: 22, alignItems: "flex-start" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 700, color: META[i].color, lineHeight: 1, flexShrink: 0, width: 48, textShadow: `0 0 16px ${META[i].glow}` }}>
              {META[i].num}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", margin: "0 0 4px" }}>{step.title}</h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 0.5, color: META[i].color, margin: "0 0 10px", opacity: 0.85 }}>{step.sub}</p>
              <p style={{ fontSize: 14, color: "var(--muted)", margin: 0, lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
