// ============================================
// PROMPT ENGINE - TEMPLATE RENDERER
// ============================================

import type {
    WizardAnswers,
    ToolId,
    UseCaseId,
    RenderedPrompt,
    Template,
    ToolTemplateSet,
    QualityLevel
} from '@/lib/types';

// Import all templates
import chatgptTemplate from '@/data/templates/chatgpt.json';
import perplexityTemplate from '@/data/templates/perplexity.json';
import claudeTemplate from '@/data/templates/claude.json';
import midjourneyTemplate from '@/data/templates/midjourney.json';
import deeplTemplate from '@/data/templates/deepl.json';
import canvaTemplate from '@/data/templates/canva.json';
import copilotTemplate from '@/data/templates/copilot.json';
import gammaTemplate from '@/data/templates/gamma.json';
import elicitTemplate from '@/data/templates/elicit.json';
import sunoTemplate from '@/data/templates/suno-udio.json';
import notionTemplate from '@/data/templates/notion-ai.json';
import runwayTemplate from '@/data/templates/runway.json';
import imagefxTemplate from '@/data/templates/imagefx.json';
import geminiTemplate from '@/data/templates/gemini.json';

// Template registry
const templateRegistry: Record<ToolId, ToolTemplateSet> = {
    'chatgpt': chatgptTemplate as unknown as ToolTemplateSet,
    'perplexity': perplexityTemplate as unknown as ToolTemplateSet,
    'claude': claudeTemplate as unknown as ToolTemplateSet,
    'midjourney': midjourneyTemplate as unknown as ToolTemplateSet,
    'deepl': deeplTemplate as unknown as ToolTemplateSet,
    'canva': canvaTemplate as unknown as ToolTemplateSet,
    'copilot': copilotTemplate as unknown as ToolTemplateSet,
    'gamma': gammaTemplate as unknown as ToolTemplateSet,
    'elicit': elicitTemplate as unknown as ToolTemplateSet,
    'suno-udio': sunoTemplate as unknown as ToolTemplateSet,
    'notion-ai': notionTemplate as unknown as ToolTemplateSet,
    'runway': runwayTemplate as unknown as ToolTemplateSet,
    'imagefx': imagefxTemplate as unknown as ToolTemplateSet,
    'gemini': geminiTemplate as unknown as ToolTemplateSet,
};

/**
 * Get template for a specific tool and use case
 */
export function getTemplate(toolId: ToolId, useCaseId: UseCaseId): Template {
    const toolTemplates = templateRegistry[toolId];

    // Try to find use-case specific template first
    const useCaseTemplate = toolTemplates.useCases?.[useCaseId];
    if (useCaseTemplate) {
        return useCaseTemplate as Template;
    }

    // Fall back to general template
    return toolTemplates.general as Template;
}

/**
 * Map wizard answers to template variables
 */
function mapAnswersToVariables(answers: WizardAnswers): Record<string, string> {
    return {
        // Basic
        goal: answers.goal || '',

        // Context
        domain: answers.context.domain || '',
        targetAudience: answers.context.targetAudience || '',
        context: answers.context.domain ?
            `${answers.context.domain}${answers.context.targetAudience ? ` für ${answers.context.targetAudience}` : ''}` : '',
        inputMaterial: answers.context.inputMaterial || '',
        inputText: answers.context.inputMaterial || '',

        // Constraints
        tone: answers.constraints.tone || 'sachlich',
        length: answers.constraints.length || 'angemessen',
        format: answers.constraints.format || 'strukturierter Text',
        noGos: answers.constraints.noGos || 'Floskeln, Füllwörter',
        sourceRequirements: answers.constraints.sourceRequirements || '',
        language: answers.constraints.language || 'Deutsch',

        // Derived
        role: `Experte für ${answers.context.domain || 'das Thema'}`,
        task: answers.goal || '',
        mustInclude: answers.constraints.format || 'Relevante Fakten',

        // References
        styleReference: answers.references.styleReference || '',
        examples: answers.references.examples || '',

        // Quality-dependent
        verification: answers.qualityLevel === 'max' ? 'Führe einen detaillierten Selbst-Check durch' : '',
        verificationSteps: answers.qualityLevel !== 'good' ? '3 konkrete Verbesserungsvorschläge' : '',

        // Media defaults
        subject: answers.goal || '',
        environment: answers.context.domain || '',
        lighting: 'natural lighting',
        style: answers.references.styleReference || 'modern',
        aspectRatio: '16:9',
        stylize: '100',
        negatives: 'text, watermark, blur',

        // Code defaults
        techStack: answers.context.domain || '',
        requirements: answers.goal || '',
        codeStyle: 'clean, readable, idiomatic',

        // Research defaults
        timeframe: 'aktuell',
        sourceType: 'seriöse Quellen',
        exclusions: 'keine',
        tableFormat: 'Aspekt | Details | Quelle',
        researchQuestion: answers.goal || '',

        // Presentation defaults
        projectType: answers.context.domain || '',
        slideCount: '8',
        deckStructure: '1) Hook 2) Problem 3) Lösung 4) CTA',

        // Music defaults
        genre: answers.references.styleReference || 'Pop',
        mood: answers.constraints.tone || 'upbeat',
        lyricsContext: answers.goal || '',
        verse1: '',
        chorus: '',

        // Video defaults
        subjectMotion: 'subtle movement',
        cameraMovement: 'static',
        duration: '5s',
        shotType: 'medium shot',
    };
}

/**
 * Simple template variable substitution
 * Supports {{variable}} and {{#conditional}}...{{/conditional}}
 */
function substituteVariables(template: string, variables: Record<string, string>): string {
    let result = template;

    // Handle conditionals first: {{#var}}content{{/var}}
    const conditionalRegex = /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
    result = result.replace(conditionalRegex, (_, varName, content) => {
        const value = variables[varName];
        if (value && value.trim()) {
            // Replace variables inside the conditional block
            return content.replace(/\{\{(\w+)\}\}/g, (__, innerVar) => variables[innerVar] || '');
        }
        return '';
    });

    // Handle regular variables: {{var}}
    result = result.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
        return variables[varName] || `[${varName}]`;
    });

    // Clean up empty lines
    result = result.replace(/\n{3,}/g, '\n\n');

    return result.trim();
}

/**
 * Generate "Why this works" explanation
 */
function generateWhyItWorks(toolId: ToolId, useCaseId: UseCaseId, qualityLevel: QualityLevel): string[] {
    const baseReasons: string[] = [
        'Klare Struktur: Rolle, Kontext, Aufgabe, Output sind getrennt',
        'Constraints definiert: Format, Ton und No-Gos sind explizit',
    ];

    // Tool-specific reasons
    const toolReasons: Record<ToolId, string[]> = {
        'claude': ['XML-Tags ermöglichen saubere Trennung von Kontext und Instruktionen'],
        'perplexity': ['Keine Few-Shot-Beispiele verhindern Verwirrung der Suchfunktion'],
        'midjourney': ['Parameter am Ende (--ar, --s, --no) werden korrekt interpretiert'],
        'copilot': ['Comment-Driven Ansatz gibt dem Modell lokalen Kontext'],
        'chatgpt': ['Iterationsschleifen ermöglichen Verbesserung des Outputs'],
        'deepl': ['"Muss behalten/vermeiden" verhindert Inhaltsverlust'],
        'canva': ['Layout-Constraints führen zu konsistenterem Design'],
        'gamma': ['Klare Deck-Struktur verhindert oberflächliche Inhalte'],
        'elicit': ['Englische Suchbegriffe liefern 10x mehr Ergebnisse'],
        'suno-udio': ['Genre-spezifische Tags verbessern Musikqualität'],
        'notion-ai': ['"UNBEKANNT"-Regel verhindert Halluzinationen'],
        'runway': ['Frame/Motion Trennung gibt präzise Kontrolle'],
        'imagefx': ['Natürliche Sprache und Text-Rendering werden optimal genutzt'],
        'gemini': ['Grounding-Hinweise reduzieren Halluzinationen'],
    };

    // Quality-dependent reasons
    const qualityReasons: Record<QualityLevel, string> = {
        'good': 'Basis-Prüfschritt sichert Mindestqualität',
        'very-good': 'Erweiterte Verification fordert Alternativen ein',
        'max': 'Maximale Verifikation mit detailliertem Selbst-Check',
    };

    return [
        ...baseReasons,
        ...(toolReasons[toolId] || []),
        qualityReasons[qualityLevel],
        'Output-Format ist explizit definiert → reduziert Unklarheiten',
    ].slice(0, 5);
}

/**
 * Main render function
 */
export function renderPrompt(answers: WizardAnswers): RenderedPrompt | null {
    if (!answers.toolId || !answers.useCaseId) {
        return null;
    }

    const template = getTemplate(answers.toolId, answers.useCaseId);
    const variables = mapAnswersToVariables(answers);

    const prompt = substituteVariables(template.template, variables);
    const whyItWorks = generateWhyItWorks(
        answers.toolId,
        answers.useCaseId,
        answers.qualityLevel
    );

    return {
        prompt,
        whyItWorks,
        metadata: {
            toolId: answers.toolId,
            useCaseId: answers.useCaseId,
            qualityLevel: answers.qualityLevel,
            timestamp: new Date().toISOString(),
            moduleApplied: template.moduleId,
        },
    };
}

/**
 * Get all available tools
 */
export function getAllToolIds(): ToolId[] {
    return Object.keys(templateRegistry) as ToolId[];
}

/**
 * Check if a use case has a specialized template for a tool
 */
export function hasSpecializedTemplate(toolId: ToolId, useCaseId: UseCaseId): boolean {
    const toolTemplates = templateRegistry[toolId];
    return !!toolTemplates.useCases?.[useCaseId];
}
