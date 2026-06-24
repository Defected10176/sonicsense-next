"use client";

export default function Hero() {
  return (
    <section
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "5rem 1.5rem",
        textAlign: "center",
      }}
    >
      <RadarPulse />

      <p className="section-label">Environmental sound awareness</p>

      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -1,
          color: "var(--text)",
          marginBottom: "1.25rem",
        }}
      >
        Hear what you&apos;re missing.
        <br />
        <span style={{ color: "var(--cyan)" }}>Stay aware. Stay safe.</span>
      </h1>

      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "var(--muted)",
          maxWidth: 560,
          margin: "0 auto 2.5rem",
          lineHeight: 1.7,
        }}
      >
        SonicSense uses AI to detect and classify the sounds around you in real
        time — sirens, alarms, voices, and more — and alerts you before it&apos;s
        too late.
      </p>

      <div
        style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
      >
        <a
          href="#demo"
          style={{
            display: "inline-block",
            background: "var(--cyan)",
            color: "var(--bg)",
            fontWeight: 700,
            fontSize: 14,
            padding: "12px 28px",
            borderRadius: 6,
            letterSpacing: 0.3,
          }}
        >
          Try the demo
        </a>
        <a
          href="#how-it-works"
          style={{
            display: "inline-block",
            background: "transparent",
            color: "var(--text)",
            fontWeight: 500,
            fontSize: 14,
            padding: "12px 28px",
            borderRadius: 6,
            border: "1px solid var(--border)",
          }}
        >
          Learn how it works
        </a>
      </div>
    </section>
  );
}

// ─── Sub-component: radar pulse animation ─────────────────────────────────────
function RadarPulse() {
  return (
    <div
      style={{
        position: "relative",
        width: 200,
        height: 200,
        margin: "0 auto 2rem",
      }}
    >
      {/* Expanding rings */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid var(--cyan)",
            opacity: 0,
            animation: `radarPulse 3s ease-out ${i * 0.9}s infinite`,
          }}
        />
      ))}

      {/* Centre mic icon */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "1px solid rgba(0, 212, 255, 0.2)",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--card)",
            border: "2px solid var(--cyan)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          🎙
        </div>
      </div>
    </div>
  );
}
