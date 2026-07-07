"use client";
// Drop-in replacement for src/components/Sounds.tsx

import { useLanguage } from "../i18n/LanguageContext";

const PRIORITY_META = [
  { icon: "🚨", c: "danger" as const },
  { icon: "🚗", c: "danger" as const },
  { icon: "👶", c: "warning" as const },
  { icon: "🚪", c: "warning" as const },
  { icon: "💥", c: "danger" as const },
  { icon: "⏰", c: "warning" as const },
  { icon: "💬", c: "cyan" as const },
  { icon: "🚶", c: "cyan" as const },
];

const SOUND_COLORS = {
  danger: { dim: "#3D1010", border: "rgba(255,68,68,0.3)" },
  warning: { dim: "#2D1F05", border: "rgba(245,158,11,0.3)" },
  cyan: { dim: "#0A2C24", border: "rgba(45,212,167,0.3)" },
};

export default function Sounds() {
  const { t } = useLanguage();

  return (
    <section id="sounds" style={{ maxWidth: 980, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--cyan)", margin: "0 0 0.75rem", opacity: 0.8 }}>
        {t.soundsEyebrow}
      </p>
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, color: "var(--text)", margin: "0 0 0.75rem", lineHeight: 1.2 }}>
        {t.soundsHeading}
      </h2>
      <p style={{ color: "var(--muted)", lineHeight: 1.7, maxWidth: 560, margin: "0 0 2rem" }}>{t.soundsIntro}</p>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)", margin: "0 0 12px" }}>
        {t.priorityLabel}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, marginBottom: "2rem" }}>
        {t.prioritySounds.map((label, i) => {
          const colors = SOUND_COLORS[PRIORITY_META[i].c];
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, background: colors.dim, border: `1px solid ${colors.border}`, borderRadius: 6, padding: "10px 12px" }}>
              <span style={{ fontSize: 18 }}>{PRIORITY_META[i].icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{label}</span>
            </div>
          );
        })}
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)", margin: "0 0 12px" }}>
        {t.backgroundLabel}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {t.backgroundSounds.map((bg) => (
          <span key={bg} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "6px 14px" }}>
            {bg}
          </span>
        ))}
      </div>
    </section>
  );
}
