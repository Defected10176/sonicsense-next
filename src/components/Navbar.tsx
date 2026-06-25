"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10, 14, 23, 0.55)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(0, 212, 255, 0.18)",
        boxShadow:
          "0 4px 32px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(0,212,255,0.08) inset",
        padding: "0 1.5rem",
      }}
    >
      {/* Glowing top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.7) 20%, var(--cyan) 50%, rgba(0,212,255,0.7) 80%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* ── Logo ─────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "rgba(0,212,255,0.4)",
            }}
          >
            [
          </span>

          {/* Waveform icon */}
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            style={{ display: "block", flexShrink: 0 }}
          >
            <path
              d="M0 7 Q2 1,4 7 Q6 13,8 7 Q10 1,12 7 Q14 13,16 7 Q18 1,20 7"
              stroke="var(--cyan)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 2,
              color: "var(--text)",
              textTransform: "uppercase",
              textShadow: "0 0 12px rgba(0,212,255,0.25)",
            }}
          >
            Sonic
            <span
              style={{
                color: "var(--cyan)",
                textShadow: "0 0 10px rgba(0,212,255,0.6)",
              }}
            >
              Sense
            </span>
          </span>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "rgba(0,212,255,0.4)",
            }}
          >
            ]
          </span>
        </div>

        {/* ── Center status ─────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 8px var(--green), 0 0 2px var(--green)",
              animation: "blink 2.4s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            SYS·ACTIVE
          </span>
        </div>

        {/* ── Nav links ─────────────────────────────────── */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {NAV_LINKS.map(({ label, href }) => {
            const isHovered = hovered === href;
            return (
              <a
                key={href}
                href={href}
                onMouseEnter={() => setHovered(href)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: isHovered ? "var(--cyan)" : "var(--muted)",
                  textShadow: isHovered
                    ? "0 0 10px rgba(0,212,255,0.7)"
                    : "none",
                  transition: "color 0.2s ease, text-shadow 0.2s ease",
                }}
              >
                <span
                  style={{
                    color: "rgba(0,212,255,0.4)",
                    fontWeight: 400,
                    fontSize: 9,
                  }}
                >
                  //
                </span>
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
