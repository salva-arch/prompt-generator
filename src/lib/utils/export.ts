// ============================================
// EXPORT UTILITIES
// ============================================

import type { RenderedPrompt, LintReport, WizardAnswers, ExportData } from '@/lib/types';

/**
 * Generate Markdown export of prompt and lint report
 */
export function generateMarkdownExport(
    prompt: RenderedPrompt,
    lintReport: LintReport,
    answers: WizardAnswers
): string {
    const lines: string[] = [];

    // Header
    lines.push('# Prompt Generator Export');
    lines.push('');
    lines.push(`**Erstellt:** ${new Date().toLocaleString('de-DE')}`);
    lines.push(`**Tool:** ${answers.toolId}`);
    lines.push(`**Use-Case:** ${answers.useCaseId}`);
    lines.push(`**Qualitätslevel:** ${answers.qualityLevel}`);
    lines.push('');

    // Prompt
    lines.push('## Finaler Prompt');
    lines.push('');
    lines.push('```');
    lines.push(prompt.prompt);
    lines.push('```');
    lines.push('');

    // Why it works
    lines.push('## Warum dieser Prompt funktioniert');
    lines.push('');
    for (const reason of prompt.whyItWorks) {
        lines.push(`- ${reason}`);
    }
    lines.push('');

    // Lint Report
    lines.push('## Qualitäts-Check');
    lines.push('');
    lines.push(`**Score:** ${lintReport.score}/100`);
    lines.push('');

    // Passed rules
    const passed = lintReport.results.filter(r => r.passed);
    if (passed.length > 0) {
        lines.push('### ✅ Erfüllt');
        for (const rule of passed) {
            lines.push(`- ${rule.ruleName}`);
        }
        lines.push('');
    }

    // Failed rules
    const failed = lintReport.results.filter(r => !r.passed);
    if (failed.length > 0) {
        lines.push('### ⚠️ Verbesserungspotential');
        for (const rule of failed) {
            lines.push(`- **${rule.ruleName}**: ${rule.suggestion}`);
        }
        lines.push('');
    }

    // Input summary
    lines.push('## Eingaben');
    lines.push('');
    lines.push(`- **Ziel:** ${answers.goal}`);
    if (answers.context.domain) {
        lines.push(`- **Domain:** ${answers.context.domain}`);
    }
    if (answers.context.targetAudience) {
        lines.push(`- **Zielgruppe:** ${answers.context.targetAudience}`);
    }
    if (answers.constraints.tone) {
        lines.push(`- **Ton:** ${answers.constraints.tone}`);
    }
    if (answers.constraints.format) {
        lines.push(`- **Format:** ${answers.constraints.format}`);
    }

    return lines.join('\n');
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            return true;
        } catch {
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

/**
 * Download text as file
 */
export function downloadAsFile(content: string, filename: string, mimeType: string = 'text/markdown'): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Generate export data object
 */
export function generateExportData(
    prompt: RenderedPrompt,
    lintReport: LintReport,
    answers: WizardAnswers
): ExportData {
    return {
        prompt,
        lintReport,
        answers,
        exportedAt: new Date().toISOString(),
    };
}
