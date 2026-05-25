# 🫁 PulmoAI — Medical Lung Scan Analysis Dashboard

> AI-powered thoracic radiograph analysis using Google Gemini Vision. Upload a chest X-ray or lung CT scan and receive an instant clinical diagnostic report.


---

## 📋 Overview

PulmoAI is a full-stack medical diagnostic web application that leverages Google Gemini's multimodal vision capabilities to analyze thoracic radiographs. It classifies lung scans into four categories — **Pneumonia**, **Tuberculosis**, **Lung Opacity**, or **Healthy / Normal** — and generates a detailed radiology-style clinical report complete with confidence scores, vitals estimates, and actionable clinical recommendations.

> ⚠️ **Disclaimer:** PulmoAI is intended for educational and research purposes only. It is **not** a certified medical device and should **not** replace professional medical diagnosis.

---

## ✨ Features

- 🔬 **AI-Powered Diagnosis** — Uses `gemini-2.5-flash` to analyze chest X-rays and lung CT scans
- 📊 **Structured Clinical Reports** — Outputs diagnosis, confidence %, radiological findings, and recommendations in Markdown
- 💓 **Vitals Estimation** — Provides realistic Heart Rate (bpm) and SpO₂ (%) estimates
- 🛡️ **Scan Validation** — Rejects non-thoracic images (e.g., hand X-rays, photos, documents) before analysis
- 🔁 **Graceful Fallback Mode** — Works without a Gemini API key using a heuristic simulation engine
- ⚡ **Vite + React Frontend** — Fast SPA with hot module replacement during development
- 🖥️ **Express Backend** — REST API server with 15 MB payload support for base64 image transfer

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 6, Tailwind CSS 4 |
| Backend | Node.js, Express 4, TypeScript |
| AI Model | Google Gemini (`gemini-2.5-flash`) via `@google/genai` |
| Animations | Motion (Framer Motion) |
| Charts | Recharts |
| Icons | Lucide React |
| Markdown | react-markdown |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/pulmoai.git
   cd pulmoai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example env file and add your Gemini API key:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local`:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

---

## 📁 Project Structure

```
pulmoai/
├── index.html              # HTML entry point
├── main.tsx                # React app entry
├── server.ts               # Express + Vite dev server
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json
├── .env.example            # Environment variable template
└── .gitignore
```

---

## 🔌 API Reference

### `POST /api/analyze`

Analyzes a base64-encoded medical scan image.

**Request Body**

```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQ...",
  "filename": "chest_xray.jpg",
  "mimeType": "image/jpeg"
}
```

**Success Response (200)**

```json
{
  "success": true,
  "mode": "real-time-ai",
  "data": {
    "isValidLungsScan": true,
    "validationFeedback": "",
    "diagnosis": "Pneumonia",
    "confidence": 91,
    "notes": "### Clinical Analysis Report\n...",
    "symptoms": ["Productive cough", "High fever"],
    "heartRate": 104,
    "oxygenSaturation": 92
  }
}
```

**Error Response (400) — Invalid Image**

```json
{
  "success": false,
  "error": "The uploaded image depicts a canine photograph instead of a human thoracic chest X-ray."
}
```

---

## 🧠 Diagnosis Categories

| Diagnosis | Description |
|---|---|
| **Pneumonia** | Patchy consolidations, air bronchograms, bilateral infiltrates |
| **Tuberculosis** | Apical cavitations, fibronodular lesions, upper lobe pathologies |
| **Lung Opacity** | Non-specific volume loss, localized fluid, ground-glass opacities |
| **Healthy / Normal** | Clear lung fields, sharp cardiophrenic angles, normal vasculature |

---

## ⚙️ Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server (Vite + Express) |
| `npm run build` | Build the frontend and bundle the server for production |
| `npm run start` | Run the production server from `dist/` |
| `npm run lint` | TypeScript type-check (no emit) |
| `npm run clean` | Remove the `dist/` build folder |

---

## 🌐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Optional | Your Google Gemini API key. If omitted, the app runs in simulation/fallback mode. |
| `NODE_ENV` | Optional | Set to `production` to serve static files from `dist/`. Defaults to development. |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change, then submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Google AI Studio](https://aistudio.google.com/) for the Gemini API and project scaffolding
- [Lucide](https://lucide.dev/) for the icon set
- [Recharts](https://recharts.org/) for charting components

---

## 👨‍💻 Developer

Built by **Aftab Patel**
