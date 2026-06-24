import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "5rem 1.5rem",
      }}
    >
      <p className="section-label">Architecture</p>
      <h2 className="section-heading">Three layers working together</h2>
      <p className="section-body">
        Each layer has a distinct job. The first two run on-device; the third
        only activates when speech is detected.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {HOW_IT_WORKS_STEPS.map(({ num, color, title, sub, desc }) => (
          <div
            key={num}
            className="card"
            style={{
              display: "flex",
              gap: 20,
              padding: "1.25rem",
            }}
          >
            {/* Step number */}
            <div
              className="mono"
              style={{
                fontSize: 22,
                fontWeight: 700,
                color,
                minWidth: 44,
                paddingTop: 2,
                opacity: 0.9,
              }}
            >
              {num}
            </div>

            {/* Content */}
            <div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "var(--text)",
                  marginBottom: 4,
                }}
              >
                {title}
              </p>
              <p
                className="mono"
                style={{
                  fontSize: 11,
                  color,
                  marginBottom: 10,
                  opacity: 0.8,
                }}
              >
                {sub}
              </p>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p
        className="mono"
        style={{
          marginTop: "1.5rem",
          fontSize: 12,
          color: "var(--muted)",
          opacity: 0.7,
        }}
      >
        Note: this website demo runs Layer 2 only (classification via browser
        mic). Layer 1 direction-finding requires the physical 4-mic ESP32-S3
        array.
      </p>
    </section>
  );
}
