// ============================================
// PROMPT ENGINE - LINT SYSTEM
// ============================================

import type {
    WizardAnswers,
    LintRule,
    LintResult,
    LintReport,
    ToolId,
    QualityLevel
} from '@/lib/types';

// ============================================
// LINT RULES
// ============================================

const universalRules: LintRule[] = [
    {
        id: 'has-goal',
        name: 'Ziel definiert',
        description: 'Ein klares Ziel ist essentiell für gute Ergebnisse',
        severity: 'error',
        check: (_, answers) => !!answers.goal && answers.goal.length > 10,
        suggestion: 'Definiere ein klares Ziel mit mindestens 2-3 Sätzen',
    },
    {
        id: 'has-context',
        name: 'Kontext vorhanden',
        description: 'Kontext hilft dem Modell, relevante Antworten zu geben',
        severity: 'warning',
        check: (_, answers) => !!answers.context.domain || !!answers.context.targetAudience,
        suggestion: 'Füge Domain oder Zielgruppe hinzu',
    },
    {
        id: 'has-format',
        name: 'Output-Format spezifiziert',
        description: 'Ein klares Format reduziert unstrukturierte Antworten',
        severity: 'warning',
        check: (_, answers) => !!answers.constraints.format && answers.constraints.format.length > 3,
        suggestion: 'Definiere ein Output-Format (z.B. "Tabelle", "Bulletpoints", "Markdown")',
    },
    {
        id: 'has-language',
        name: 'Sprache definiert',
        description: 'Explizite Sprachangabe verhindert Sprachwechsel',
        severity: 'info',
        check: (_, answers) => !!answers.constraints.language,
        suggestion: 'Gib die gewünschte Ausgabesprache an',
    },
    {
        id: 'has-constraints',
        name: 'Constraints vorhanden',
        description: 'Constraints (Ton, Länge, No-Gos) verbessern Qualität',
        severity: 'info',
        check: (_, answers) =>
            !!answers.constraints.tone ||
            !!answers.constraints.length ||
            !!answers.constraints.noGos,
        suggestion: 'Füge Ton, Länge oder No-Gos hinzu',
    },
];

const qualityRules: LintRule[] = [
    {
        id: 'verification-for-quality',
        name: 'Prüfschritt für hohe Qualität',
        description: 'Bei "Very Good" oder "Max" sollte ein Prüfschritt definiert sein',
        severity: 'warning',
        check: (_, answers) => {
            if (answers.qualityLevel === 'good') return true;
            return !!answers.constraints.format; // Proxy for verification
        },
        suggestion: 'Füge einen Prüfschritt zum Prompt hinzu',
    },
];

// Tool-specific rules
const toolSpecificRules: Record<ToolId, LintRule[]> = {
    'perplexity': [
        {
            id: 'perplexity-no-examples',
            name: 'Keine Few-Shot-Beispiele',
            description: 'Perplexity funktioniert besser ohne Beispiele im Prompt',
            severity: 'error',
            check: (_, answers) => !answers.references.examples || answers.references.examples.length < 50,
            suggestion: 'Entferne Few-Shot-Beispiele - Perplexity sucht sonst nach ähnlichen Texten',
            applicableTo: ['perplexity'],
        },
        {
            id: 'perplexity-clear-question',
            name: 'Klare Forschungsfrage',
            description: 'Eine präzise Frage liefert bessere Ergebnisse',
            severity: 'warning',
            check: (_, answers) => answers.goal.includes('?') || answers.goal.length > 30,
            suggestion: 'Formuliere das Ziel als klare Frage',
            applicableTo: ['perplexity'],
        },
    ],
    'claude': [
        {
            id: 'claude-xml-structure',
            name: 'XML-Struktur empfohlen',
            description: 'Claude verarbeitet XML-Tags besonders gut',
            severity: 'info',
            check: () => true, // Always pass - template handles this
            suggestion: 'Das Template nutzt bereits XML-Tags für optimale Ergebnisse',
            applicableTo: ['claude'],
        },
    ],
    'midjourney': [
        {
            id: 'midjourney-english',
            name: 'Englische Prompts empfohlen',
            description: 'Midjourney funktioniert am besten mit englischen Prompts',
            severity: 'warning',
            check: (_, answers) => {
                const text = answers.goal + answers.context.domain;
                // Simple check for German umlauts/words
                return !/[äöüß]/i.test(text) || text.toLowerCase().includes('english');
            },
            suggestion: 'Nutze englische Begriffe für bessere Bildqualität',
            applicableTo: ['midjourney'],
        },
        {
            id: 'midjourney-negatives',
            name: 'Negatives definiert',
            description: '--no Parameter verbessern Bildqualität',
            severity: 'info',
            check: (_, answers) => !!answers.constraints.noGos,
            suggestion: 'Definiere No-Gos für --no Parameter (z.B. "text, blur, watermark")',
            applicableTo: ['midjourney'],
        },
    ],
    'copilot': [
        {
            id: 'copilot-context',
            name: 'Code-Kontext vorhanden',
            description: 'Lokaler Dateikontext verbessert Vorschläge',
            severity: 'warning',
            check: (_, answers) => !!answers.context.inputMaterial || !!answers.context.domain,
            suggestion: 'Beschreibe den lokalen Code-Kontext (Datei, Modul, Stack)',
            applicableTo: ['copilot'],
        },
        {
            id: 'copilot-tests',
            name: 'Tests angefordert',
            description: 'Tests sollten immer mit angefordert werden',
            severity: 'info',
            check: () => true, // Template includes tests
            suggestion: 'Template fordert automatisch Tests an',
            applicableTo: ['copilot'],
        },
    ],
    'chatgpt': [],
    'deepl': [
        {
            id: 'deepl-preserve',
            name: 'Behalte-Regeln definiert',
            description: 'Was muss im Text bleiben?',
            severity: 'warning',
            check: (_, answers) => !!answers.constraints.format,
            suggestion: 'Definiere, welche Elemente beibehalten werden müssen (Fakten, Namen)',
            applicableTo: ['deepl'],
        },
    ],
    'canva': [],
    'gamma': [],
    'elicit': [
        {
            id: 'elicit-english',
            name: 'Englische Suchbegriffe',
            description: 'Englische Queries liefern mehr Ergebnisse',
            severity: 'info',
            check: () => true,
            suggestion: 'Übersetze Forschungsfragen ins Englische für 10x mehr Treffer',
            applicableTo: ['elicit'],
        },
    ],
    'suno-udio': [],
    'notion-ai': [],
    'runway': [
        {
            id: 'runway-motion',
            name: 'Motion definiert',
            description: 'Bewegungsbeschreibung verbessert Video-Qualität',
            severity: 'info',
            check: (_, answers) => !!answers.goal,
            suggestion: 'Beschreibe die gewünschte Bewegung explizit',
            applicableTo: ['runway'],
        },
    ],
    'imagefx': [],
    'gemini': [],
};

// ============================================
// LINT FUNCTIONS
// ============================================

/**
 * Get all applicable rules for a tool and quality level
 */
function getApplicableRules(toolId: ToolId, qualityLevel: QualityLevel): LintRule[] {
    const rules: LintRule[] = [...universalRules];

    // Add quality rules for higher levels
    if (qualityLevel !== 'good') {
        rules.push(...qualityRules);
    }

    // Add tool-specific rules
    const toolRules = toolSpecificRules[toolId] || [];
    rules.push(...toolRules);

    return rules;
}

/**
 * Run lint on prompt and answers
 */
export function lintPrompt(prompt: string, answers: WizardAnswers): LintReport {
    if (!answers.toolId) {
        return {
            results: [],
            score: 0,
            summary: { passed: 0, failed: 0, warnings: 0 },
        };
    }

    const rules = getApplicableRules(answers.toolId, answers.qualityLevel);
    const results: LintResult[] = [];

    for (const rule of rules) {
        const passed = rule.check(prompt, answers);

        results.push({
            ruleId: rule.id,
            ruleName: rule.name,
            passed,
            severity: rule.severity,
            message: passed ? `✓ ${rule.name}` : `✗ ${rule.name}: ${rule.description}`,
            suggestion: passed ? undefined : rule.suggestion,
        });
    }

    // Calculate score
    const passedCount = results.filter(r => r.passed).length;
    const errorsFailed = results.filter(r => !r.passed && r.severity === 'error').length;
    const warningsFailed = results.filter(r => !r.passed && r.severity === 'warning').length;

    // Score: 100 - (errors * 20) - (warnings * 10)
    const score = Math.max(0, 100 - (errorsFailed * 20) - (warningsFailed * 10));

    return {
        results,
        score,
        summary: {
            passed: passedCount,
            failed: errorsFailed,
            warnings: warningsFailed,
        },
    };
}

/**
 * Get lint score color
 */
export function getLintScoreColor(score: number): string {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
}

/**
 * Get lint score label
 */
export function getLintScoreLabel(score: number): string {
    if (score >= 90) return 'Exzellent';
    if (score >= 80) return 'Sehr gut';
    if (score >= 60) return 'Gut';
    if (score >= 40) return 'Verbesserungswürdig';
    return 'Kritisch';
}
