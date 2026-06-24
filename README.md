# SonicSense

Real-time environmental sound awareness for anyone who can't fully hear their surroundings — visually impaired users, headphone wearers, deaf and hard-of-hearing individuals, and parents.

## What it does

SonicSense detects and classifies sounds in real time using a 3-layer pipeline:

- **Layer 1 — Direction finding (TDOA):** A 4-microphone array on an ESP32-S3 calculates which direction a sound is coming from using Time Difference of Arrival.
- **Layer 2 — Sound classification (TinyML):** A lightweight CNN model classifies the sound as a priority alert (siren, car horn, baby crying, glass breaking, etc.) or background noise to be ignored.
- **Layer 3 — Speech understanding:** When speech is detected, Whisper transcribes it and an LLM summarises what matters — is someone calling your name? Is there a warning?

## Tech stack

| Part | Technology |
|---|---|
| Hardware | ESP32-S3, 4x MEMS microphones |
| Edge AI | Python, TinyML, TensorFlow Lite |
| Backend | Python, Flask |
| Frontend | Next.js 15, React 19, TypeScript |
| Datasets | UrbanSound8K, ESC-50 |

## Running the website locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project structure
src/

├── app/

│   ├── globals.css       # Design tokens and base styles

│   ├── layout.tsx        # Root layout and metadata

│   └── page.tsx          # Composes all sections

└── components/

├── Navbar.tsx

├── Hero.tsx

├── UseCases.tsx

├── HowItWorks.tsx

├── Demo.tsx

├── Sounds.tsx

└── Footer.tsx

## Current limitations

- The website demo runs **simulated** classification — real mic input and backend connection coming in v2
- Layer 1 direction-finding requires the physical ESP32-S3 hardware
- `walk_signal_beep` and `speech` classes need separately sourced training data (not in UrbanSound8K or ESC-50)

## Datasets

- [UrbanSound8K](https://urbansounddataset.weebly.com/urbansound8k.html) — street and outdoor sounds
- [ESC-50](https://github.com/karolpiczak/ESC-50) — home and domestic sounds (CC BY-NC 3.0)



