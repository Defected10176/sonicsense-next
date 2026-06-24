export default function Footer() {
  const techStack = [
    { label: "ESP32-S3",      href: null },
    { label: "Python + Flask", href: null },
    { label: "Next.js",       href: null },
  ] as const;

  const datasets = [
    { label: "UrbanSound8K", href: "https://urbansounddataset.weebly.com/urbansound8k.html" },
    { label: "ESC-50",       href: "https://github.com/karolpiczak/ESC-50" },
  ] as const;

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem 1.5rem",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🔊</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--muted)" }}>
            Sonic<span style={{ color: "var(--cyan)" }}>Sense</span>
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {techStack.map(({ label }) => (
            <span key={label} style={{ fontSize: 12, color: "var(--faint)" }}>
              {label}
            </span>
          ))}
          {datasets.map(({ label, href }) => (
            <a key={label} href={href} style={{ fontSize: 12, color: "var(--muted)" }}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
