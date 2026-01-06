# Prompt Generator ⚡

> Generate structured, consistent prompts for AI interactions – stop reinventing the wheel every conversation.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Status](https://img.shields.io/badge/status-active-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Problem

Every AI conversation starts from scratch. You waste time crafting the same context, role definitions, and output formats. Results are inconsistent because prompts vary wildly between sessions.

## 💡 Solution

A TypeScript-based tool that:
- Provides **reusable prompt templates** for common use cases
- Ensures **consistent structure** across all AI interactions
- Supports **variable injection** for dynamic content
- Exports prompts in **multiple formats** (plain text, JSON, YAML)

## ✨ Features

- 📝 Template library for common scenarios
- 🔧 Variable substitution system
- 📋 Clipboard integration
- 💾 Export to JSON/YAML/Markdown
- 🎨 Customizable output formatting
- 🔗 Chain multiple templates together

## 🚀 Quick Start
```bash
# Clone the repository
git clone https://github.com/salva-arch/prompt-generator.git
cd prompt-generator

# Install dependencies
npm install

# Build the project
npm run build

# Run the generator
npm start
```

## 📖 Usage
```typescript
import { PromptGenerator } from './generator';

const generator = new PromptGenerator();

// Load a template
const prompt = generator.fromTemplate('code-review', {
  language: 'TypeScript',
  context: 'REST API endpoint',
  focus: 'security and performance'
});

console.log(prompt.render());
```

## 📁 Template Structure
```
templates/
├── analysis/
│   ├── code-review.yaml
│   └── data-analysis.yaml
├── creative/
│   ├── writing-assistant.yaml
│   └── brainstorming.yaml
└── technical/
    ├── debugging.yaml
    └── architecture.yaml
```

## 🗺 Roadmap

- [ ] CLI interface for quick generation
- [ ] Web UI for non-technical users
- [ ] Template marketplace/sharing
- [ ] Integration with VS Code
- [ ] Support for prompt chaining
- [ ] A/B testing for prompt effectiveness

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

MIT – see [LICENSE](LICENSE)

---

Built by [Salvatore Docimo](https://github.com/salva-arch) | [LinkedIn](https://www.linkedin.com/in/salvatore-docimo-15bb47200/)
