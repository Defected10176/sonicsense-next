"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SIMULATED_ALERTS, type AlertType } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Alert {
  id: number;
  label: string;
  type: AlertType;
  conf: number;
  ts: string;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Demo() {
  const [recording, setRecording] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [elapsed, setElapsed] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const alertTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopDemo = useCallback(() => {
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    alertTimersRef.current.forEach(clearTimeout);
    if (stopRef.current) clearTimeout(stopRef.current);
  }, []);

  const startDemo = useCallback(() => {
    if (recording) return;
    setRecording(true);
    setAlerts([]);
    setElapsed(0);

    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 100);
    }, 100);

    alertTimersRef.current = SIMULATED_ALERTS.map((a) =>
      setTimeout(() => {
        if (a.type !== "bg") {
          setAlerts((prev) =>
            [
              {
                id: Date.now(),
                label: a.label,
                type: a.type,
                conf: a.conf,
                ts: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }),
              },
              ...prev,
            ].slice(0, 20)
          );
        }
      }, a.delayMs)
    );

    stopRef.current = setTimeout(stopDemo, 26000);
  }, [recording, stopDemo]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      alertTimersRef.current.forEach(clearTimeout);
      if (stopRef.current) clearTimeout(stopRef.current);
    };
  }, []);

  const fmtElapsed = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <section
      id="demo"
      style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 1.5rem" }}
    >
      <p className="section-label">Live demo</p>
      <h2 className="section-heading">Hear it in action</h2>
      <p className="section-body">
        Press record and make some noise — talk, play a video, or try honking.
        The system classifies what it hears in real time.
      </p>

      {/* Demo mode badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--amber-dim)",
          border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: 4,
          padding: "6px 12px",
          marginBottom: "1.5rem",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--amber)",
            display: "inline-block",
          }}
        />
        <span className="mono" style={{ fontSize: 12, color: "var(--amber)" }}>
          Demo mode · Simulated classification · Real mic in v2
        </span>
      </div>

      {/* Dashboard grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* Left panel */}
        <div className="card" style={{ overflow: "hidden" }}>
          <DemoTopBar
            recording={recording}
            elapsed={fmtElapsed(elapsed)}
            onStart={startDemo}
            onStop={stopDemo}
          />
          <Waveform active={recording} />
          <Spectrogram active={recording} />
          <DemoStatusBar />
        </div>

        {/* Right panel: alert feed */}
        <AlertFeed alerts={alerts} recording={recording} />
      </div>
    </section>
  );
}

// ─── DemoTopBar ───────────────────────────────────────────────────────────────
function DemoTopBar({
  recording,
  elapsed,
  onStart,
  onStop,
}: {
  recording: boolean;
  elapsed: string;
  onStart: () => void;
  onStop: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: recording ? "var(--red)" : "var(--muted)",
            display: "inline-block",
            animation: recording ? "blink 1s ease-in-out infinite" : "none",
          }}
        />
        <span
          className="mono"
          style={{
            fontSize: 12,
            color: recording ? "var(--red)" : "var(--muted)",
          }}
        >
          {recording ? `REC ${elapsed}` : "STANDBY"}
        </span>
      </div>

      <button
        onClick={recording ? onStop : onStart}
        style={{
          background: recording ? "var(--red-dim)" : "var(--cyan-dim)",
          border: `1px solid ${recording ? "var(--red)" : "var(--cyan)"}`,
          color: recording ? "var(--red)" : "var(--cyan)",
          borderRadius: 4,
          padding: "5px 14px",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "var(--font-mono)",
          letterSpacing: 1,
        }}
      >
        {recording ? "⏹ STOP" : "⏺ RECORD"}
      </button>
    </div>
  );
}

// ─── Waveform canvas ──────────────────────────────────────────────────────────
function Waveform({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0A0E17";
      ctx.fillRect(0, 0, W, H);

      ctx.beginPath();
      ctx.strokeStyle = active ? "#00D4FF" : "#2A3B50";
      ctx.lineWidth = 1.5;

      for (let x = 0; x < W; x++) {
        const t = x / W;
        let y = H / 2;
        if (active) {
          y +=
            Math.sin(t * 14 + phaseRef.current) * 22 +
            Math.sin(t * 7 + phaseRef.current * 1.3) * 12 +
            Math.sin(t * 23 + phaseRef.current * 0.7) * 6 +
            (Math.random() - 0.5) * 4;
        } else {
          y += Math.sin(t * 4 + phaseRef.current * 0.2) * 3;
        }
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      phaseRef.current += active ? 0.15 : 0.02;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <div style={{ padding: "12px 14px 8px" }}>
      <p
        className="mono"
        style={{ fontSize: 10, color: "var(--muted)", marginBottom: 6, letterSpacing: 1 }}
      >
        WAVEFORM
      </p>
      <canvas
        ref={canvasRef}
        width={460}
        height={90}
        style={{ width: "100%", height: 90, borderRadius: 4, display: "block" }}
      />
    </div>
  );
}

// ─── Spectrogram canvas ───────────────────────────────────────────────────────
function Spectrogram({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;
    ctx.fillStyle = "#0A0E17";
    ctx.fillRect(0, 0, W, H);

    const draw = () => {
      const imgData = ctx.getImageData(1, 0, W - 1, H);
      ctx.putImageData(imgData, 0, 0);
      ctx.fillStyle = "#0A0E17";
      ctx.fillRect(W - 1, 0, 1, H);

      if (active) {
        for (let y = 0; y < H; y++) {
          const freq = 1 - y / H;
          let energy =
            (freq > 0.6 ? Math.random() * 0.2 : 0) +
            (freq > 0.3 && freq < 0.6 ? Math.random() * 0.6 : 0) +
            (freq < 0.3 ? Math.random() * 0.3 : 0);
          energy = Math.min(energy, 1);
          ctx.fillStyle = `rgba(0,${Math.floor(energy * 180)},${Math.floor(energy * 255)},${energy})`;
          ctx.fillRect(W - 1, y, 1, 1);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <div style={{ padding: "8px 14px 14px" }}>
      <p
        className="mono"
        style={{ fontSize: 10, color: "var(--muted)", marginBottom: 6, letterSpacing: 1 }}
      >
        SPECTROGRAM · 0Hz → 8kHz
      </p>
      <canvas
        ref={canvasRef}
        width={460}
        height={80}
        style={{ width: "100%", height: 80, borderRadius: 4, display: "block" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        {["0", "1k", "2k", "4k", "8k"].map((f) => (
          <span key={f} className="mono" style={{ fontSize: 9, color: "var(--muted)" }}>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── DemoStatusBar ────────────────────────────────────────────────────────────
function DemoStatusBar() {
  const stats = [
    ["SAMPLE RATE", "16kHz"],
    ["WINDOW",      "512ms"],
    ["MODEL",       "CNN · Mock"],
  ] as const;

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        padding: "10px 14px",
        display: "flex",
        gap: 16,
      }}
    >
      {stats.map(([key, val]) => (
        <div key={key}>
          <p className="mono" style={{ fontSize: 9, color: "var(--muted)", letterSpacing: 1 }}>
            {key}
          </p>
          <p className="mono" style={{ fontSize: 12, color: "var(--cyan)" }}>
            {val}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── AlertFeed ────────────────────────────────────────────────────────────────
const ALERT_STYLES: Record<AlertType, { bg: string; border: string; color: string; label: string }> = {
  danger:  { bg: "var(--red-dim)",   border: "var(--red)",   color: "var(--red)",   label: "ALERT" },
  warning: { bg: "var(--amber-dim)", border: "var(--amber)", color: "var(--amber)", label: "ALERT" },
  info:    { bg: "var(--cyan-dim)",  border: "var(--cyan)",  color: "var(--cyan)",  label: "INFO"  },
  bg:      { bg: "#1A2332",          border: "#2A3B50",      color: "#6B8FAF",      label: "BG"   },
};

function AlertFeed({ alerts, recording }: { alerts: Alert[]; recording: boolean }) {
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>
          ALERT FEED
        </span>
        <span
          className="mono"
          style={{
            fontSize: 10,
            color: "var(--muted)",
            background: "var(--faint)",
            padding: "2px 8px",
            borderRadius: 3,
          }}
        >
          {alerts.length}
        </span>
      </div>

      {/* Feed */}
      <div style={{ height: 340, overflowY: "auto", padding: "8px 0" }}>
        {alerts.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 28, opacity: 0.3 }}>📡</div>
            <p
              className="mono"
              style={{ fontSize: 11, color: "var(--muted)", textAlign: "center" }}
            >
              {recording ? "Listening..." : "Press RECORD\nto start demo"}
            </p>
          </div>
        ) : (
          alerts.map((a) => {
            const s = ALERT_STYLES[a.type];
            const barColor =
              a.type === "danger" ? "var(--red)" :
              a.type === "warning" ? "var(--amber)" : "var(--cyan)";

            return (
              <div
                key={a.id}
                style={{
                  padding: "10px 14px",
                  borderBottom: "1px solid rgba(30,45,66,0.5)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      padding: "2px 6px",
                      borderRadius: 3,
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      color: s.color,
                    }}
                  >
                    {s.label}
                  </span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>
                    {a.ts}
                  </span>
                </div>

                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: "var(--text)",
                    marginBottom: 4,
                  }}
                >
                  {a.label}
                </p>

                {/* Confidence bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      flex: 1,
                      height: 3,
                      borderRadius: 2,
                      background: "var(--faint)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.round(a.conf * 100)}%`,
                        background: barColor,
                        borderRadius: 2,
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                  <span className="mono" style={{ fontSize: 10, color: "var(--muted)", minWidth: 36 }}>
                    {Math.round(a.conf * 100)}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
