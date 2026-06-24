"use client";

import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10, 14, 23, 0.9)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(8px)",
        padding: "0 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🔊</span>
          <span
            style={{ fontWeight: 700, fontSize: 16, letterSpacing: -0.3, color: "var(--text)" }}
          >
            Sonic<span style={{ color: "var(--cyan)" }}>Sense</span>
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "2rem" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{ fontSize: 13, color: "var(--muted)" }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
