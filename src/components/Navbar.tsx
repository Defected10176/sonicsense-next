"use client";
// Drop-in replacement for src/components/Navbar.tsx

import { useState } from "react";
import { LANGS } from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: t.nav[0], href: "#how-it-works" },
    { label: t.nav[1], href: "#demo" },
    { label: t.nav[2], href: "#sounds" },
  ];

  return (
    <nav
      style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,14,23,0.55)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(45,212,167,0.18)", boxShadow: "0 4px 32px rgba(0,0,0,0.5)", padding: "0 1.5rem",
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(45,212,167,0.7) 20%, #2DD4A7 50%, rgba(45,212,167,0.7) 80%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 980, margin: "0 auto", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        {/* brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(45,212,167,0.4)" }}>[</span>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ display: "block", flexShrink: 0 }}>
            <path d="M0 7 Q2 1,4 7 Q6 13,8 7 Q10 1,12 7 Q14 13,16 7 Q18 1,20 7" stroke="var(--cyan)" strokeWidth={1.5} strokeLinecap="round" fill="none" />
          </svg>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, letterSpacing: 2, color: "var(--text)", textTransform: "uppercase", textShadow: "0 0 12px rgba(45,212,167,0.25)" }}>
            Sonic<span style={{ color: "var(--cyan)", textShadow: "0 0 10px rgba(45,212,167,0.6)" }}>Sense</span>
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(45,212,167,0.4)" }}>]</span>
        </div>

        {/* nav links + language switcher */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", color: "var(--muted)",
              }}
            >
              <span style={{ color: "rgba(45,212,167,0.4)", fontWeight: 400, fontSize: 9 }}>//</span>
              {link.label}
            </a>
          ))}

          {/* language switcher */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              style={{
                display: "flex", alignItems: "center", gap: 6, background: "rgba(16,42,34,0.6)", border: "1px solid var(--border)",
                borderRadius: 5, padding: "6px 10px", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: 1, textTransform: "uppercase", color: "var(--text)",
              }}
            >
              <span style={{ fontSize: 12, lineHeight: 1 }}>🌐</span>
              {lang}
              <span style={{ fontSize: 8, color: "var(--muted)" }}>▾</span>
            </button>

            {langOpen && (
              <div
                style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0, minWidth: 150, background: "var(--surface)",
                  border: "1px solid var(--border)", borderRadius: 8, boxShadow: "0 12px 32px rgba(0,0,0,0.5)", overflow: "hidden", zIndex: 200,
                }}
              >
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, width: "100%",
                      padding: "10px 14px", background: l.code === lang ? "rgba(45,212,167,0.08)" : "transparent",
                      border: "none", borderBottom: "1px solid var(--border)", cursor: "pointer", textAlign: "left",
                      fontFamily: "system-ui, sans-serif", fontSize: 13, color: "var(--text)",
                    }}
                  >
                    <span>{l.name}</span>
                    {l.code === lang && <span style={{ color: "var(--cyan)" }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
