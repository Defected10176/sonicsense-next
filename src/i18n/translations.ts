// src/i18n/translations.ts
// Drop this file into src/i18n/translations.ts

export type LangCode = "EN" | "TH";

export const LANGS: { code: LangCode; name: string }[] = [
  { code: "EN", name: "English" },
  { code: "TH", name: "ไทย" },
];

export interface UseCase { title: string; desc: string; }
export interface Step { title: string; sub: string; desc: string; }

export interface Translations {
  nav: [string, string, string]; // How it works, Demo, Sounds

  heroPill: string;
  heroLine1: string;
  heroLine2: string;
  heroDesc: string;
  ctaDemo: string;
  ctaLearn: string;
  blipSiren: string;
  blipVoice: string;
  blipHorn: string;

  useCasesEyebrow: string;
  useCasesHeading: string;
  useCases: UseCase[];

  howEyebrow: string;
  howHeading: string;
  howIntro: string;
  steps: Step[];

  demoEyebrow: string;
  demoHeading: string;
  demoIntro: string;
  demoBadge: string;
  waveformLabel: string;
  spectrogramLabel: string;
  sampleRateLabel: string;
  windowLabel: string;
  modelLabel: string;
  modelValue: string;
  alertFeedLabel: string;
  emptyListening: string;
  emptyPressRecord: string;
  recStandby: string;
  recRecording: string;
  recBtnRecord: string;
  recBtnStop: string;
  badgeAlert: string;
  badgeInfo: string;
  simLabels: string[];

  uploadMicLabel: string[]; // labels for mic1..mic4 upload slots
  uploadHint: string;
  analyzeBtn: string;
  analyzingLabel: string;
  uploadErrorMissing: string;
  uploadErrorFailed: string;
  directionLabel: string;
  speechLabel: string;
  mockNotice: string;

  soundsEyebrow: string;
  soundsHeading: string;
  soundsIntro: string;
  priorityLabel: string;
  backgroundLabel: string;
  prioritySounds: string[];
  backgroundSounds: string[];

  footerTagline: string;
}

export const TRANSLATIONS: Record<LangCode, Translations> = {
  EN: {
    nav: ["How it works", "Demo", "Sounds"],
    heroPill: "Environmental sound awareness",
    heroLine1: "Hear what you're missing.",
    heroLine2: "Stay aware. Stay safe.",
    heroDesc:
      "SonicSense uses AI to detect and classify the sounds around you in real time — sirens, alarms, voices, and more — and alerts you before it's too late.",
    ctaDemo: "Try the demo",
    ctaLearn: "Learn how it works",
    blipSiren: "Siren",
    blipVoice: "Voice",
    blipHorn: "Horn",

    useCasesEyebrow: "Who it's for",
    useCasesHeading: "Built for anyone who can't catch every sound.",
    useCases: [
      { title: "Visual impairment", desc: "Know what's happening around you — sirens, traffic, someone calling your name." },
      { title: "Headphone wearers", desc: "Hear critical alerts even with noise-cancelling headphones on." },
      { title: "Deaf & hard of hearing", desc: "Real-time visual and haptic alerts for sounds you can't hear." },
      { title: "Parents", desc: "Monitor baby cries, door knocks, and alarms from anywhere in the home." },
    ],

    howEyebrow: "How it works",
    howHeading: "A three-layer pipeline.",
    howIntro:
      "Each layer narrows raw audio down to the one thing that matters to you — where it came from, what it was, and whether it needs your attention.",
    steps: [
      {
        title: "Direction finding (TDOA)",
        sub: "Hardware layer · ESP32-S3 + 4-mic array",
        desc: "Four microphones capture sound simultaneously. The microsecond differences in arrival time (Time Difference of Arrival) pinpoint what direction the sound is coming from — left, right, behind, ahead.",
      },
      {
        title: "Sound classification",
        sub: "AI layer · TinyML CNN on-device",
        desc: "A lightweight neural network classifies the sound in real time. Priority sounds (sirens, alarms, glass breaking) trigger an alert immediately. Background noise is silently filtered to prevent alert fatigue.",
      },
      {
        title: "Speech understanding",
        sub: "Context layer · Whisper + LLM",
        desc: "When speech is detected, a speech-to-text engine transcribes it and an LLM summarises what matters: is someone calling your name? Is there an urgent warning? Only the relevant part is surfaced.",
      },
    ],

    demoEyebrow: "Live demo",
    demoHeading: "Hear it in action",
    demoIntro:
      "Press record and watch the pipeline classify a simulated stream of city and home sounds in real time — priority alerts surface, background noise stays quiet.",
    demoBadge: "Demo mode · Simulated classification · Real mic in v2",
    waveformLabel: "WAVEFORM",
    spectrogramLabel: "SPECTROGRAM · 0Hz → 8kHz",
    sampleRateLabel: "SAMPLE RATE",
    windowLabel: "WINDOW",
    modelLabel: "MODEL",
    modelValue: "CNN · Mock",
    alertFeedLabel: "ALERT FEED",
    emptyListening: "Listening...",
    emptyPressRecord: "Press RECORD\nto start demo",
    recStandby: "STANDBY",
    recRecording: "REC",
    recBtnRecord: "⏺ RECORD",
    recBtnStop: "⏹ STOP",
    badgeAlert: "ALERT",
    badgeInfo: "INFO",
    simLabels: ["Car horn", "Traffic noise", "Siren", "Speech detected", "Baby crying", "Footsteps", "Glass breaking", "Traffic noise"],

    uploadMicLabel: ["MIC 1 · FRONT", "MIC 2 · RIGHT", "MIC 3 · BACK", "MIC 4 · LEFT"],
    uploadHint: "Upload 4 mono WAV files captured from the front, right, back, and left mics.",
    analyzeBtn: "▶ ANALYZE",
    analyzingLabel: "ANALYZING...",
    uploadErrorMissing: "Please upload all 4 mic files first.",
    uploadErrorFailed: "Couldn't reach the backend. Is it running at localhost:5000?",
    directionLabel: "DIRECTION",
    speechLabel: "SPEECH",
    mockNotice: "Mock classifier · Real GCC-PHAT direction finding",

    soundsEyebrow: "Sound library",
    soundsHeading: "What it listens for.",
    soundsIntro:
      "Trained on UrbanSound8K and ESC-50. Priority sounds raise an alert; everything else is filtered out to prevent alert fatigue.",
    priorityLabel: "Priority · alerts you",
    backgroundLabel: "Background · filtered out",
    prioritySounds: ["Siren", "Car horn", "Baby crying", "Door knock", "Glass breaking", "Clock alarm", "Speech", "Crossing signal"],
    backgroundSounds: ["Traffic noise", "Engine idling", "Wind", "Footsteps", "Construction", "Engine hum", "Silence"],

    footerTagline: "© 2026 SonicSense · Real-time environmental sound awareness · Demo build",
  },

  TH: {
    nav: ["หลักการทำงาน", "เดโม", "เสียง"],
    heroPill: "การรับรู้เสียงแวดล้อม",
    heroLine1: "ได้ยินสิ่งที่คุณพลาดไป",
    heroLine2: "ตื่นตัวไว้ ปลอดภัยไว้",
    heroDesc:
      "SonicSense ใช้ AI ตรวจจับและจำแนกเสียงรอบตัวคุณแบบเรียลไทม์ — เสียงไซเรน สัญญาณเตือน เสียงพูด และอื่นๆ — พร้อมแจ้งเตือนคุณก่อนจะสายเกินไป",
    ctaDemo: "ลองใช้เดโม",
    ctaLearn: "ดูวิธีการทำงาน",
    blipSiren: "ไซเรน",
    blipVoice: "เสียงพูด",
    blipHorn: "แตร",

    useCasesEyebrow: "เหมาะสำหรับใคร",
    useCasesHeading: "ออกแบบมาเพื่อทุกคนที่อาจพลาดฟังเสียงสำคัญ",
    useCases: [
      { title: "ผู้บกพร่องทางการมองเห็น", desc: "รับรู้สิ่งที่เกิดขึ้นรอบตัว — เสียงไซเรน การจราจร หรือมีคนเรียกชื่อคุณ" },
      { title: "คนที่ใส่หูฟัง", desc: "ได้ยินการแจ้งเตือนสำคัญแม้สวมหูฟังตัดเสียงรบกวนอยู่" },
      { title: "ผู้บกพร่องทางการได้ยิน", desc: "แจ้งเตือนแบบเห็นภาพและสั่นแบบเรียลไทม์สำหรับเสียงที่คุณไม่ได้ยิน" },
      { title: "พ่อแม่ผู้ปกครอง", desc: "เฝ้าระวังเสียงลูกร้องไห้ เคาะประตู หรือสัญญาณเตือนจากทุกมุมบ้าน" },
    ],

    howEyebrow: "หลักการทำงาน",
    howHeading: "กระบวนการสามชั้น",
    howIntro:
      "แต่ละชั้นจะกลั่นกรองเสียงดิบให้เหลือเพียงสิ่งที่สำคัญกับคุณ — มาจากทิศทางไหน คือเสียงอะไร และต้องให้ความสนใจหรือไม่",
    steps: [
      {
        title: "หาทิศทางเสียง (TDOA)",
        sub: "ชั้นฮาร์ดแวร์ · ESP32-S3 + ไมโครโฟน 4 ตัว",
        desc: "ไมโครโฟนสี่ตัวจับเสียงพร้อมกัน ความต่างของเวลาที่เสียงมาถึงในระดับไมโครวินาที (Time Difference of Arrival) ช่วยระบุทิศทางของเสียง — ซ้าย ขวา ด้านหลัง หรือด้านหน้า",
      },
      {
        title: "การจำแนกประเภทเสียง",
        sub: "ชั้น AI · TinyML CNN บนอุปกรณ์",
        desc: "โครงข่ายประสาทเทียมขนาดเล็กจำแนกเสียงแบบเรียลไทม์ เสียงสำคัญ (ไซเรน สัญญาณเตือน กระจกแตก) จะแจ้งเตือนทันที ส่วนเสียงพื้นหลังจะถูกกรองออกเงียบๆ เพื่อลดความเมื่อยล้าจากการแจ้งเตือน",
      },
      {
        title: "การเข้าใจคำพูด",
        sub: "ชั้นบริบท · Whisper + LLM",
        desc: "เมื่อตรวจพบเสียงพูด ระบบแปลงเสียงเป็นข้อความและ LLM จะสรุปสิ่งที่สำคัญ: มีคนเรียกชื่อคุณไหม มีคำเตือนเร่งด่วนหรือไม่ แสดงเฉพาะส่วนที่เกี่ยวข้อง",
      },
    ],

    demoEyebrow: "เดโมสด",
    demoHeading: "ดูการทำงานจริง",
    demoIntro:
      "กดบันทึกเพื่อดูระบบจำแนกเสียงจำลองจากเมืองและบ้านแบบเรียลไทม์ — การแจ้งเตือนสำคัญจะปรากฏขึ้น ส่วนเสียงพื้นหลังจะเงียบไว้",
    demoBadge: "โหมดเดโม · การจำแนกจำลอง · ไมโครโฟนจริงในเวอร์ชัน 2",
    waveformLabel: "คลื่นเสียง",
    spectrogramLabel: "สเปกโตรแกรม · 0Hz → 8kHz",
    sampleRateLabel: "อัตราสุ่มตัวอย่าง",
    windowLabel: "หน้าต่างเวลา",
    modelLabel: "โมเดล",
    modelValue: "CNN · จำลอง",
    alertFeedLabel: "รายการแจ้งเตือน",
    emptyListening: "กำลังฟัง...",
    emptyPressRecord: "กด บันทึก\nเพื่อเริ่มเดโม",
    recStandby: "สแตนด์บาย",
    recRecording: "กำลังบันทึก",
    recBtnRecord: "⏺ บันทึก",
    recBtnStop: "⏹ หยุด",
    badgeAlert: "แจ้งเตือน",
    badgeInfo: "ข้อมูล",
    simLabels: ["เสียงแตรรถ", "เสียงจราจร", "เสียงไซเรน", "ตรวจพบเสียงพูด", "เสียงเด็กร้องไห้", "เสียงฝีเท้า", "เสียงกระจกแตก", "เสียงจราจร"],

    uploadMicLabel: ["ไมค์ 1 · หน้า", "ไมค์ 2 · ขวา", "ไมค์ 3 · หลัง", "ไมค์ 4 · ซ้าย"],
    uploadHint: "อัปโหลดไฟล์ WAV โมโนทั้ง 4 ไฟล์ จากไมค์หน้า ขวา หลัง และซ้าย",
    analyzeBtn: "▶ วิเคราะห์",
    analyzingLabel: "กำลังวิเคราะห์...",
    uploadErrorMissing: "กรุณาอัปโหลดไฟล์ไมค์ให้ครบทั้ง 4 ไฟล์ก่อน",
    uploadErrorFailed: "เชื่อมต่อ backend ไม่ได้ ตรวจสอบว่ารันอยู่ที่ localhost:5000 หรือไม่",
    directionLabel: "ทิศทาง",
    speechLabel: "คำพูด",
    mockNotice: "ตัวจำแนกเป็นแบบจำลอง · การหาทิศทางด้วย GCC-PHAT เป็นของจริง",

    soundsEyebrow: "คลังเสียง",
    soundsHeading: "เสียงที่ระบบรับฟัง",
    soundsIntro:
      "ฝึกด้วยชุดข้อมูล UrbanSound8K และ ESC-50 เสียงสำคัญจะแจ้งเตือน ส่วนเสียงอื่นจะถูกกรองออกเพื่อลดความเมื่อยล้าจากการแจ้งเตือน",
    priorityLabel: "สำคัญ · แจ้งเตือนคุณ",
    backgroundLabel: "พื้นหลัง · ถูกกรองออก",
    prioritySounds: ["ไซเรน", "แตรรถ", "เด็กร้องไห้", "เคาะประตู", "กระจกแตก", "นาฬิกาปลุก", "เสียงพูด", "สัญญาณข้ามถนน"],
    backgroundSounds: ["เสียงจราจร", "เครื่องยนต์เดินเบา", "ลม", "เสียงฝีเท้า", "งานก่อสร้าง", "เสียงเครื่องยนต์", "ความเงียบ"],

    footerTagline: "© 2026 SonicSense · การรับรู้เสียงแวดล้อมแบบเรียลไทม์ · เวอร์ชันเดโม",
  },
};
