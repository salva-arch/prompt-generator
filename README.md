# Prompt Generator MVP

Ein Wizard-basierter Prompt-Generator für 14 KI-Tools mit tool-spezifischen Templates, Lint-Report und Export-Funktionen.

## 🚀 Quick Start

```bash
# In das Projektverzeichnis wechseln
cd prompt-generator

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## ✨ Features

- **14 unterstützte Tools**: ChatGPT, Claude, Perplexity, Midjourney, Copilot, DeepL, Canva, Gamma, Elicit, Suno/Udio, Notion AI, Runway, ImageFX, Gemini
- **7-Schritt Wizard**: Tool → Use-Case → Ziel → Kontext → Constraints → Qualität → Referenzen
- **Tool-spezifische Optimierungen**:
  - Claude: XML-Tags für Kontext/Instruktionen
  - Perplexity: Keine Few-Shot-Beispiele
  - Midjourney: Parameter am Ende (--ar, --s, --no)
  - Copilot: Comment-Driven Development
- **4 Prompt-Formeln**: Universal, Research, Media, Coding
- **Qualitäts-Lint**: Automatische Prüfung mit Verbesserungsvorschlägen
- **Export**: Markdown-Export und Copy-to-Clipboard

## 📁 Projektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing Page
│   ├── wizard/page.tsx    # Wizard UI
│   └── result/page.tsx    # Ergebnis-Seite
├── components/wizard/      # Wizard-Schritt-Komponenten
├── data/
│   ├── tools.json         # Tool-Definitionen
│   ├── use-cases.json     # Use-Case-Kategorien
│   └── templates/         # 14 Tool-Templates
├── lib/
│   ├── engine/
│   │   ├── renderer.ts    # Prompt-Rendering
│   │   └── lint.ts        # Qualitäts-Linting
│   ├── store/
│   │   └── wizard-store.ts # Zustand State
│   ├── types/
│   │   └── index.ts       # TypeScript-Typen
│   └── utils/
│       └── export.ts      # Export-Funktionen
```

## 🔧 Templates hinzufügen/bearbeiten

Templates befinden sich in `src/data/templates/`. Jedes Tool hat eine eigene JSON-Datei mit:

```json
{
  "toolId": "tool-name",
  "general": {
    "id": "tool-general",
    "name": "Tool General Template",
    "template": "Prompt mit {{variablen}}...",
    "slots": [...],
    "moduleId": "optional-module"
  },
  "useCases": {
    "coding": { ... },
    "research": { ... }
  }
}
```

### Template-Variablen

- `{{variable}}` - Einfache Substitution
- `{{#conditional}}...{{/conditional}}` - Bedingte Blöcke

### Verfügbare Variablen

| Variable | Beschreibung |
|----------|-------------|
| `{{goal}}` | Ziel/Outcome |
| `{{domain}}` | Fachgebiet |
| `{{targetAudience}}` | Zielgruppe |
| `{{context}}` | Kontextbeschreibung |
| `{{inputMaterial}}` | Input-Material |
| `{{tone}}` | Schreibstil |
| `{{format}}` | Output-Format |
| `{{length}}` | Gewünschte Länge |
| `{{noGos}}` | Was vermeiden |
| `{{language}}` | Sprache |

## 🧪 Tests

```bash
# Unit Tests ausführen
npm test

# E2E Tests (Playwright)
npm run test:e2e
```

## 📋 Lint-Regeln

Das System prüft automatisch auf:

- ✅ Ziel definiert
- ✅ Kontext vorhanden
- ✅ Output-Format spezifiziert
- ✅ Sprache definiert
- ✅ Constraints vorhanden
- ✅ Tool-spezifische Regeln (z.B. "Keine Few-Shots für Perplexity")

## 🔒 Datenschutz

- Alle Daten bleiben lokal im Browser (localStorage)
- Keine externen API-Calls
- Keine Tracking-Cookies

## 📚 Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)

## 📝 Lizenz

MIT
