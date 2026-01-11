# Prompt Generator ⚡

> Generate structured, consistent prompts for AI interactions – stop reinventing the wheel every conversation.

![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![Status](https://img.shields.io/badge/status-active-green)
![License](https://img.shields.io/badge/license-MIT-blue)

**🇩🇪 Language:** German UI (target audience: German-speaking professionals)

---

## 📸 Preview

A wizard-guided prompt generator with tool-specific optimizations and quality checking.

---

## 🎯 Problem

Every AI conversation starts from scratch:
- **Wasted time** – Crafting the same context, role definitions, output formats
- **Inconsistent results** – Prompts vary wildly between sessions
- **Tool blindness** – Same prompt for ChatGPT, Claude, and Midjourney (they each need different approaches!)
- **No quality control** – Missing context, unclear format, no examples

## 💡 Solution

A wizard-based web application that:
- Provides **tool-specific templates** for 14 AI tools
- Ensures **consistent structure** using 4 proven prompt formulas
- Includes a **Quality Lint** to catch common mistakes
- Keeps all data **local** – nothing sent to external servers

---

## ✨ Key Features

### 🎯 14 Supported Tools
Optimized templates for each tool's unique requirements:

| Category | Tools |
|----------|-------|
| **Text & Chat** | ChatGPT, Claude, Gemini, Notion AI |
| **Research** | Perplexity, Elicit |
| **Image & Video** | Midjourney, Runway, ImageFX, Canva |
| **Coding** | GitHub Copilot |
| **Translation** | DeepL |
| **Presentation** | Gamma |
| **Audio** | Suno |

### ⚡ Tool-Specific Rules
Each tool gets optimized prompts:
- **Claude** → XML tags for structured input
- **Perplexity** → No few-shot examples (search-optimized)
- **Midjourney** → Parameters at the end (--ar 16:9, --v 6)
- **ChatGPT** → Full universal formula with role, context, constraints

### 📋 4 Proven Prompt Formulas

| Formula | Structure |
|---------|-----------|
| **Universal** | Role → Context → Task → Constraints → Output → Verification |
| **Research** | Goal → Scope → Sources → Tables → Recommendation |
| **Media** | Motif → Style → Light → Camera → Motion → Negatives |
| **Coding** | Context-first → Requirements → Tests → Code-only output |

### ✅ Quality Lint
Automatic quality check showing:
- Missing context warnings
- No format specified alerts
- Improvement suggestions

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.1 |
| Frontend | React 19 |
| Language | TypeScript 5 |
| Styling | TailwindCSS 4 |
| State Management | Zustand |
| Build Tool | Turbopack (Next.js) |

---

## 🏗 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── wizard/           # Step-by-step generator
│   └── result/           # Generated prompt display
├── components/
│   └── wizard/           # Wizard step components
├── data/
│   ├── tools.json        # Tool configurations
│   ├── use-cases.json    # Use case templates
│   └── templates/        # Prompt templates
└── lib/
    └── ...               # Utilities & store
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/salva-arch/prompt-generator.git
cd prompt-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

---

## 🗺 Roadmap

- [ ] English language version
- [ ] CLI interface for terminal users
- [ ] More prompt formulas (negotiations, emails, etc.)
- [ ] Template marketplace/sharing
- [ ] VS Code extension
- [ ] Prompt chaining support
- [ ] A/B testing for prompt effectiveness
- [ ] Export to clipboard/file

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

### Development
```bash
npm run dev     # Start dev server
npm run lint    # Run ESLint
npm run build   # Production build
```

---

## 📄 License

MIT – see [LICENSE](LICENSE)

---

Built by [Salvatore Docimo](https://github.com/salva-arch) | [LinkedIn](https://www.linkedin.com/in/salvatore-docimo-15bb47200/) | [neudenken.io](https://neudenken.io)
