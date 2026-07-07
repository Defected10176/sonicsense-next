"use client";
// Drop-in replacement for src/components/Demo.tsx
// Frontend-only simulated demo. Swap startDemo()'s SIM-driven timers for real
// mic capture + API calls when you wire up the backend.

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

type AlertType = "danger" | "warning" | "info" | "bg";
interface SimEvent { type: AlertType; conf: number; delayMs: number; }
interface AlertItem { id: string; labelIdx: number; type: AlertType; conf: number; ts: string; }

const SIM: SimEvent[] = [
  { type: "danger", conf: 0.85, delayMs: 0 },
  { type: "bg", conf: 0.8, delayMs: 2200 },
  { type: "danger", conf: 0.91, delayMs: 5000 },
  { type: "info", conf: 0.78, delayMs: 8500 },
  { type: "warning", conf: 0.83, delayMs: 12000 },
  { type: "bg", conf: 0.72, delayMs: 15500 },
  { type: "danger", conf: 0.88, delayMs: 19000 },
  { type: "bg", conf: 0.75, delayMs: 22000 },
];

const STYLE_MAP: Record<Exclude<AlertType, "bg">, { bg: string; border: string; color: string; bar: string }> = {
  danger: { bg: "#3D1010", border: "#FF4444", color: "#FF4444", bar: "#FF4444" },
  warning: { bg: "#2D1F05", border: "#F59E0B", color: "#F59E0B", bar: "#F59E0B" },
  info: { bg: "#0A2A3A", border: "#38BDF8", color: "#38BDF8", bar: "#38BDF8" },
};

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function Demo({ autoRunDemo = false, demoLoop = false }: { autoRunDemo?: boolean; demoLoop?: boolean }) {
  const { t } = useLanguage();
  const [recording, setRecording] = useState(false);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [elapsed, setElapsed] = useState(0);

  const waveRef = useRef<HTMLCanvasElement>(null);
  const specRef = useRef<HTMLCanvasElement>(null);
  const recordingRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf1 = useRef(0);
  const raf2 = useRef(0);

  useEffect(() => { recordingRef.current = recording; }, [recording]);

  const clearTimers = () => {
    if (tickTimer.current) clearInterval(tickTimer.current);
    if (stopTimer.current) clearTimeout(stopTimer.current);
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const stopDemo = () => { clearTimers(); setRecording(false); };

  const startDemo = () => {
    clearTimers();
    setAlerts([]);
    setElapsed(0);
    setRecording(true);

    tickTimer.current = setInterval(() => setElapsed((e) => e + 100), 100);

    timers.current = SIM.map((a, i) =>
      setTimeout(() => {
        if (a.type === "bg") return;
        const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setAlerts((prev) => [{ id: `${Date.now()}-${Math.random()}`, labelIdx: i, type: a.type, conf: a.conf, ts }, ...prev].slice(0, 20));
      }, a.delayMs)
    );

    stopTimer.current = setTimeout(() => {
      if (demoLoop) startDemo();
      else stopDemo();
    }, 26000);
  };

  const toggle = () => (recording ? stopDemo() : startDemo());

  // waveform
  useEffect(() => {
    const cv = waveRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const W = cv.width, H = cv.height;
    let phase = 0;
    const draw = () => {
      const active = recordingRef.current;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#07140F";
      ctx.fillRect(0, 0, W, H);

      const ys: number[] = [];
      for (let x = 0; x < W; x++) {
        const tt = x / W;
        let y = H / 2;
        if (active) {
          y += Math.sin(tt * 14 + phase) * 22 + Math.sin(tt * 7 + phase * 1.3) * 12 + Math.sin(tt * 23 + phase * 0.7) * 6 + (Math.random() - 0.5) * 4;
        } else {
          y += Math.sin(tt * 4 + phase * 0.2) * 3;
        }
        ys.push(y);
      }

      ctx.beginPath();
      ctx.moveTo(0, ys[0]);
      for (let x = 1; x < W; x++) ctx.lineTo(x, ys[x]);
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      if (active) { grad.addColorStop(0, "rgba(45,212,167,0.38)"); grad.addColorStop(1, "rgba(45,212,167,0)"); }
      else { grad.addColorStop(0, "rgba(35,74,61,0.35)"); grad.addColorStop(1, "rgba(35,74,61,0)"); }
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = active ? "#2DD4A7" : "#234A3D";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < W; x++) (x === 0 ? ctx.moveTo(x, ys[x]) : ctx.lineTo(x, ys[x]));
      ctx.stroke();

      phase += active ? 0.15 : 0.02;
      raf1.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf1.current);
  }, []);

  // spectrogram
  useEffect(() => {
    const cv = specRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = "#07140F";
    ctx.fillRect(0, 0, W, H);
    const draw = () => {
      const img = ctx.getImageData(1, 0, W - 1, H);
      ctx.putImageData(img, 0, 0);
      ctx.fillStyle = "#07140F";
      ctx.fillRect(W - 1, 0, 1, H);
      if (recordingRef.current) {
        for (let y = 0; y < H; y++) {
          const freq = 1 - y / H;
          let energy = (freq > 0.6 ? Math.random() * 0.2 : 0) + (freq > 0.3 && freq < 0.6 ? Math.random() * 0.6 : 0) + (freq < 0.3 ? Math.random() * 0.3 : 0);
          energy = Math.min(energy, 1);
          ctx.fillStyle = `rgba(${Math.floor(energy * 70)},${Math.floor(energy * 220)},${Math.floor(energy * 165)},${energy})`;
          ctx.fillRect(W - 1, y, 1, 1);
        }
      }
      raf2.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf2.current);
  }, []);

  useEffect(() => {
    if (autoRunDemo) startDemo();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recDotColor = recording ? "#FF4444" : "var(--muted)";
  const recStatusText = recording ? `${t.recRecording} ${fmt(elapsed)}` : t.recStandby;

  return (
    <section id="demo" style={{ maxWidth: 980, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "var(--cyan)", margin: "0 0 0.75rem", opacity: 0.8 }}>
        {t.demoEyebrow}
      </p>
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, color: "var(--text)", margin: "0 0 0.75rem", lineHeight: 1.2 }}>{t.demoHeading}</h2>
      <p style={{ color: "var(--muted)", lineHeight: 1.7, maxWidth: 560, margin: "0 0 2rem" }}>{t.demoIntro}</p>

      <div style={{ display: "inline-flex", alignItems: "center", flexWrap: "wrap", gap: 8, background: "#2D1F05", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 4, padding: "6px 12px", marginBottom: "1.5rem" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#F59E0B" }}>{t.demoBadge}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 16, alignItems: "start" }}>
        {/* scope */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: recDotColor, display: "inline-block", animation: recording ? "blink 1s ease-in-out infinite" : undefined }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: recDotColor }}>{recStatusText}</span>
            </div>
            <button
              onClick={toggle}
              style={{
                background: recording ? "#3D1010" : "#0A2C24", border: `1px solid ${recording ? "#FF4444" : "var(--cyan)"}`,
                color: recording ? "#FF4444" : "var(--cyan)", borderRadius: 4, padding: "5px 14px", cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: "var(--font-mono)", letterSpacing: 1,
              }}
            >
              {recording ? t.recBtnStop : t.recBtnRecord}
            </button>
          </div>

          <div style={{ padding: "12px 14px 8px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", margin: "0 0 6px", letterSpacing: 1 }}>{t.waveformLabel}</p>
            <canvas ref={waveRef} width={460} height={90} style={{ width: "100%", height: 90, borderRadius: 4, display: "block" }} />
          </div>

          <div style={{ padding: "8px 14px 14px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", margin: "0 0 6px", letterSpacing: 1 }}>{t.spectrogramLabel}</p>
            <canvas ref={specRef} width={460} height={80} style={{ width: "100%", height: 80, borderRadius: 4, display: "block" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              {["0", "1k", "2k", "4k", "8k"].map((f) => (
                <span key={f} style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)" }}>{f}</span>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", padding: "10px 14px", display: "flex", gap: 16 }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 1, margin: 0 }}>{t.sampleRateLabel}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", margin: 0 }}>16kHz</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 1, margin: 0 }}>{t.windowLabel}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", margin: 0 }}>512ms</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 1, margin: 0 }}>{t.modelLabel}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)", margin: 0 }}>{t.modelValue}</p>
            </div>
          </div>
        </div>

        {/* alert feed */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>{t.alertFeedLabel}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", background: "var(--faint)", padding: "2px 8px", borderRadius: 3 }}>{alerts.length}</span>
          </div>
          <div style={{ height: 340, overflowY: "auto", padding: "8px 0" }}>
            {alerts.length > 0 ? (
              alerts.map((a) => {
                const s = a.type === "bg" ? STYLE_MAP.info : STYLE_MAP[a.type];
                const pct = Math.round(a.conf * 100);
                const badgeLabel = a.type === "info" ? t.badgeInfo : t.badgeAlert;
                return (
                  <div key={a.id} style={{ padding: "10px 14px", borderBottom: "1px solid rgba(30,45,66,0.5)", animation: "alertIn 0.3s ease" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "2px 6px", borderRadius: 3, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
                        {badgeLabel}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>{a.ts}</span>
                    </div>
                    <p style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", margin: "0 0 4px" }}>{t.simLabels[a.labelIdx]}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ flex: 1, height: 3, borderRadius: 2, background: "var(--faint)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: s.bar, borderRadius: 2, transition: "width 0.4s ease" }} />
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", minWidth: 36 }}>{pct}%</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8 }}>
                <div style={{ fontSize: 28, opacity: 0.3 }}>📡</div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", textAlign: "center", whiteSpace: "pre-line" }}>
                  {recording ? t.emptyListening : t.emptyPressRecord}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
