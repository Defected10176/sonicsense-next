import { USE_CASES } from "@/lib/constants";

export default function UseCases() {
  return (
    <section
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "5rem 1.5rem",
      }}
    >
      <p className="section-label">Designed for everyone</p>
      <h2 className="section-heading">Not just for one kind of person</h2>
      <p className="section-body">
        Missing important sounds isn&apos;t limited to one group of people.
        SonicSense is built for anyone whose hearing is limited by circumstance,
        not just condition.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 16,
        }}
      >
        {USE_CASES.map(({ icon, title, desc }) => (
          <div key={title} className="card" style={{ padding: "1.25rem" }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
            <p
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: "var(--text)",
                marginBottom: 6,
              }}
            >
              {title}
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
