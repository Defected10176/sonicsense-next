"use client";
// Drop-in replacement for src/components/Footer.tsx

import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "3rem" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "2.5rem 1.5rem", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ display: "block" }}>
            <path d="M0 7 Q2 1,4 7 Q6 13,8 7 Q10 1,12 7 Q14 13,16 7 Q18 1,20 7" stroke="var(--cyan)" strokeWidth={1.5} strokeLinecap="round" fill="none" />
          </svg>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "var(--text)" }}>
            Sonic<span style={{ color: "var(--cyan)" }}>Sense</span>
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>ESP32-S3 · 4× MEMS</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>TinyML · TFLite</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>Whisper + LLM</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>Next.js · React</span>
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--faint)", margin: 0, width: "100%" }}>{t.footerTagline}</p>
      </div>
    </footer>
  );
}
