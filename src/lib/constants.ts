// ─── Use cases ────────────────────────────────────────────────────────────────
export const USE_CASES = [
  {
    icon: "👓",
    title: "Visual impairment",
    desc: "Know what's happening around you — sirens, traffic, someone calling your name.",
  },
  {
    icon: "🎧",
    title: "Headphone wearers",
    desc: "Hear critical alerts even with noise-cancelling headphones on.",
  },
  {
    icon: "👂",
    title: "Deaf & hard of hearing",
    desc: "Real-time visual and haptic alerts for sounds you can't hear.",
  },
  {
    icon: "👶",
    title: "Parents",
    desc: "Monitor baby cries, door knocks, and alarms from anywhere in the home.",
  },
] as const;

// ─── How it works ─────────────────────────────────────────────────────────────
export const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    color: "var(--cyan)",
    title: "Direction finding (TDOA)",
    sub: "Hardware layer · ESP32-S3 + 4-mic array",
    desc: "Four microphones capture sound simultaneously. The microsecond differences in arrival time (Time Difference of Arrival) pinpoint what direction the sound is coming from — left, right, behind, ahead.",
  },
  {
    num: "02",
    color: "var(--amber)",
    title: "Sound classification",
    sub: "AI layer · TinyML CNN on-device",
    desc: "A lightweight neural network classifies the sound in real time. Priority sounds (sirens, alarms, glass breaking) trigger an alert immediately. Background noise is silently filtered to prevent alert fatigue.",
  },
  {
    num: "03",
    color: "var(--green)",
    title: "Speech understanding",
    sub: "Context layer · Whisper + LLM",
    desc: "When speech is detected, a speech-to-text engine transcribes it and an LLM summarises what matters: is someone calling your name? Is there an urgent warning? Only the relevant part is surfaced.",
  },
] as const;

// ─── Sound categories ─────────────────────────────────────────────────────────
export const PRIORITY_SOUNDS = [
  { label: "Siren",            icon: "🚨", colorVar: "var(--red)",   dimVar: "var(--red-dim)"   },
  { label: "Car horn",         icon: "🚗", colorVar: "var(--red)",   dimVar: "var(--red-dim)"   },
  { label: "Baby crying",      icon: "👶", colorVar: "var(--amber)", dimVar: "var(--amber-dim)" },
  { label: "Door knock",       icon: "🚪", colorVar: "var(--amber)", dimVar: "var(--amber-dim)" },
  { label: "Glass breaking",   icon: "💥", colorVar: "var(--red)",   dimVar: "var(--red-dim)"   },
  { label: "Clock alarm",      icon: "⏰", colorVar: "var(--amber)", dimVar: "var(--amber-dim)" },
  { label: "Speech",           icon: "💬", colorVar: "var(--cyan)",  dimVar: "var(--cyan-dim)"  },
  { label: "Crossing signal",  icon: "🚶", colorVar: "var(--cyan)",  dimVar: "var(--cyan-dim)"  },
] as const;

export const BACKGROUND_SOUNDS = [
  "Traffic noise",
  "Engine idling",
  "Wind",
  "Footsteps",
  "Construction",
  "Engine hum",
  "Silence",
] as const;

// ─── Demo: simulated alert timeline ──────────────────────────────────────────
export type AlertType = "danger" | "warning" | "info" | "bg";

export interface SimulatedAlert {
  label: string;
  type: AlertType;
  conf: number;
  delayMs: number;
}

export const SIMULATED_ALERTS: SimulatedAlert[] = [
  { label: "Car horn",        type: "danger",  conf: 0.85, delayMs: 0     },
  { label: "Traffic noise",   type: "bg",      conf: 0.80, delayMs: 2200  },
  { label: "Siren",           type: "danger",  conf: 0.91, delayMs: 5000  },
  { label: "Speech detected", type: "info",    conf: 0.78, delayMs: 8500  },
  { label: "Baby crying",     type: "warning", conf: 0.83, delayMs: 12000 },
  { label: "Footsteps",       type: "bg",      conf: 0.72, delayMs: 15500 },
  { label: "Glass breaking",  type: "danger",  conf: 0.88, delayMs: 19000 },
  { label: "Traffic noise",   type: "bg",      conf: 0.75, delayMs: 22000 },
];

// ─── Nav links ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Demo",         href: "#demo"         },
  { label: "Sounds",       href: "#sounds"       },
] as const;
