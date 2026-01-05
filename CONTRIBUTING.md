# Contributing to Prompt Generator

Danke für dein Interesse am Projekt! 🎉

## 🚀 Schnellstart für Entwickler

```bash
# Repository klonen
git clone https://github.com/salva-arch/prompt-generator.git
cd prompt-generator

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## 📁 Projektstruktur

```
src/
├── app/                    # Next.js Pages
├── components/wizard/      # Wizard UI Components
├── data/
│   ├── tools.json         # Tool-Definitionen
│   ├── use-cases.json     # Use-Case-Kategorien
│   └── templates/         # Tool-spezifische Templates
└── lib/
    ├── engine/            # Prompt-Rendering & Lint
    ├── store/             # Zustand State
    └── types/             # TypeScript-Typen
```

## 🔧 Neue Templates hinzufügen

1. Erstelle eine neue JSON-Datei in `src/data/templates/`
2. Folge dem Schema:

```json
{
  "toolId": "neues-tool",
  "general": {
    "id": "neues-tool-general",
    "name": "Neues Tool Template",
    "template": "Dein Template mit {{variablen}}...",
    "slots": [
      { "name": "Variable", "key": "variable", "description": "...", "required": true }
    ],
    "moduleId": null
  },
  "useCases": {}
}
```

3. Füge das Tool in `src/data/tools.json` hinzu
4. Importiere das Template in `src/lib/engine/renderer.ts`

## 🧪 Tests

```bash
npm test
```

## 📝 Commit-Konventionen

- `feat:` Neue Features
- `fix:` Bugfixes
- `docs:` Dokumentation
- `style:` Formatierung
- `refactor:` Code-Refactoring
- `test:` Tests hinzufügen/ändern

## 🐛 Bugs melden

Öffne ein Issue mit:
- Beschreibung des Problems
- Schritte zur Reproduktion
- Erwartetes vs. tatsächliches Verhalten
