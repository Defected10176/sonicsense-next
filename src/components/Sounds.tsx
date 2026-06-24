import { PRIORITY_SOUNDS, BACKGROUND_SOUNDS } from "@/lib/constants";

export default function Sounds() {
  return (
    <section
      id="sounds"
      style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 1.5rem" }}
    >
      <p className="section-label">Classification scope</p>
      <h2 className="section-heading">What SonicSense listens for</h2>

      {/* Priority sounds */}
      <p
        className="mono"
        style={{
          fontSize: 11,
          color: "var(--red)",
          letterSpacing: 2,
          marginBottom: "1rem",
          marginTop: "2rem",
        }}
      >
        PRIORITY ALERTS
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 10,
          marginBottom: "2rem",
        }}
      >
        {PRIORITY_SOUNDS.map(({ label, icon, colorVar, dimVar }) => (
          <div
            key={label}
            style={{
              background: dimVar,
              border: `1px solid ${colorVar}40`,
              borderRadius: 6,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Background sounds */}
      <p
        className="mono"
        style={{
          fontSize: 11,
          color: "var(--muted)",
          letterSpacing: 2,
          marginBottom: "1rem",
        }}
      >
        BACKGROUND (SUPPRESSED)
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {BACKGROUND_SOUNDS.map((s) => (
          <span
            key={s}
            style={{
              fontSize: 12,
              color: "var(--muted)",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              padding: "5px 12px",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Dataset credits */}
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: "1.5rem", lineHeight: 1.6 }}>
        Trained on{" "}
        <a href="https://urbansounddataset.weebly.com/urbansound8k.html">
          UrbanSound8K
        </a>{" "}
        (street/outdoor sounds) and{" "}
        <a href="https://github.com/karolpiczak/ESC-50">ESC-50</a>{" "}
        (home/domestic sounds, CC BY-NC 3.0).
        <br />
        Missing from both datasets: pedestrian crossing signal and speech —
        these require separately sourced data.
      </p>
    </section>
  );
}
