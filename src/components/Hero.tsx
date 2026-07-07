"use client";

/*
 * Drop-in replacement for src/components/Hero.tsx
 *
 * Requires these keyframes in src/app/globals.css (add alongside radarPulse / blink):
 *
 *   @keyframes radarSweep { to { transform: rotate(360deg); } }
 *   @keyframes blipPulse  { 0%,100% { transform: translate(-50%,-50%) scale(1);   opacity: 1;   }
 *                            50%     { transform: translate(-50%,-50%) scale(1.6); opacity: .45; } }
 *   @keyframes orbFloat   { 0%,100% { transform: translate(0,0) scale(1); }
 *                            50%     { transform: translate(26px,-30px) scale(1.08); } }
 *   @keyframes floatY     { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
 */

const HERO_STATS = [
  { val: "4-mic",  label: "TDOA array" },
  { val: "8",      label: "Sound classes" },
  { val: "<200ms", label: "On-device" },
  { val: "16kHz",  label: "Sampling" },
] as const;

const BLIPS = [
  { label: "Siren", color: "var(--red)",   top: "20%", left: "78%", dur: "2s",   delay: "0s"   },
  { label: "Voice", color: "#38BDF8",      top: "47%", left: "7%",  dur: "2.4s", delay: "0.6s" },
  { label: "Horn",  color: "var(--amber)", top: "79%", left: "62%", dur: "2.8s", delay: "1.1s" },
] as const;

export default function Hero() {
  return (
    <section style={{ maxWidth: 1040, margin: "0 auto", padding: "4.5rem 1.5rem 4rem", position: "relative" }}>
      {/* ── ambient glow orbs ─────────────────────────────── */}
      <div
        style={{
          position: "absolute", top: -40, left: "4%", width: 260, height: 260, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,212,167,0.18), transparent 70%)",
          filter: "blur(20px)", pointerEvents: "none", animation: "orbFloat 11s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: -60, right: "8%", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.12), transparent 70%)",
          filter: "blur(24px)", pointerEvents: "none", animation: "orbFloat 14s ease-in-out infinite reverse",
        }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* ── left: copy + stats ──────────────────────────── */}
        <div style={{ flex: "1 1 380px", minWidth: 300 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(16,42,34,0.6)", border: "1px solid rgba(45,212,167,0.25)",
              borderRadius: 30, padding: "5px 12px", marginBottom: "1.25rem",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)", animation: "blink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--cyan)" }}>
              Environmental sound awareness
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.3rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: -1, color: "var(--text)", margin: "0 0 1.25rem" }}>
            Hear what you&apos;re missing.
            <br />
            <span style={{ color: "var(--cyan)", textShadow: "0 0 24px rgba(45,212,167,0.45)" }}>Stay aware. Stay safe.</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.12rem)", color: "var(--muted)", maxWidth: 480, margin: "0 0 2rem", lineHeight: 1.7 }}>
            SonicSense uses AI to detect and classify the sounds around you in real time — sirens, alarms, voices, and more — and alerts you before it&apos;s too late.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "2rem" }}>
            <a href="#demo" style={{ display: "inline-block", background: "var(--cyan)", color: "var(--bg)", fontWeight: 700, fontSize: 14, padding: "12px 28px", borderRadius: 6, letterSpacing: 0.3, boxShadow: "0 0 24px rgba(45,212,167,0.3)" }}>
              Try the demo
            </a>
            <a href="#how-it-works" style={{ display: "inline-block", background: "transparent", color: "var(--text)", fontWeight: 500, fontSize: 14, padding: "12px 28px", borderRadius: 6, border: "1px solid var(--border)" }}>
              Learn how it works
            </a>
          </div>

          {/* live spec chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {HERO_STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(16,42,34,0.55)", border: "1px solid var(--border)", borderRadius: 8,
                  padding: "9px 14px", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, fontWeight: 700, color: "var(--cyan)", lineHeight: 1.1 }}>{s.val}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── right: radar visualization ──────────────────── */}
        <div style={{ flex: "0 0 320px", width: 320, height: 320, position: "relative", animation: "floatY 7s ease-in-out infinite" }}>
          {/* outer glow */}
          <div style={{ position: "absolute", inset: 30, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,212,167,0.12), transparent 70%)", filter: "blur(8px)" }} />
          {/* concentric rings */}
          <div style={{ position: "absolute", inset: 0,  borderRadius: "50%", border: "1px solid rgba(45,212,167,0.14)" }} />
          <div style={{ position: "absolute", inset: 48, borderRadius: "50%", border: "1px solid rgba(45,212,167,0.18)" }} />
          <div style={{ position: "absolute", inset: 96, borderRadius: "50%", border: "1px solid rgba(45,212,167,0.22)" }} />
          {/* crosshair */}
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(45,212,167,0.12)" }} />
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(45,212,167,0.12)" }} />
          {/* rotating sweep beam */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", animation: "radarSweep 4s linear infinite" }}>
            <div style={{ position: "absolute", inset: 0, background: "conic-gradient(from 0deg, rgba(45,212,167,0) 0deg, rgba(45,212,167,0.34) 38deg, rgba(45,212,167,0) 62deg)" }} />
          </div>
          {/* expanding pulse rings */}
          {[0.9, 1.8, 2.7].map((d) => (
            <div key={d} style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--cyan)", opacity: 0, animation: `radarPulse 3s ease-out ${d}s infinite` }} />
          ))}
          {/* center mic */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: "var(--card)", border: "2px solid var(--cyan)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, boxShadow: "0 0 28px rgba(45,212,167,0.4)" }}>
              🎙
            </div>
          </div>
          {/* detected-sound blips */}
          {BLIPS.map((b) => (
            <div key={b.label} style={{ position: "absolute", top: b.top, left: b.left, display: "flex", alignItems: "center", gap: 6, transform: "translate(-50%,-50%)" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: b.color, boxShadow: `0 0 12px ${b.color}`, position: "relative", transform: "translate(-50%,-50%)", animation: `blipPulse ${b.dur} ease-in-out ${b.delay} infinite` }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: b.color }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
