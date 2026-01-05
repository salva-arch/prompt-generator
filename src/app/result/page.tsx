'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardStore } from '@/lib/store/wizard-store';
import { renderPrompt } from '@/lib/engine/renderer';
import { lintPrompt, getLintScoreColor, getLintScoreLabel } from '@/lib/engine/lint';
import { copyToClipboard, generateMarkdownExport, downloadAsFile } from '@/lib/utils/export';
import type { RenderedPrompt, LintReport } from '@/lib/types';

export default function ResultPage() {
    const router = useRouter();
    const { answers, reset } = useWizardStore();
    const [prompt, setPrompt] = useState<RenderedPrompt | null>(null);
    const [lintReport, setLintReport] = useState<LintReport | null>(null);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'prompt' | 'why' | 'lint'>('prompt');

    useEffect(() => {
        if (!answers.toolId || !answers.useCaseId) {
            router.push('/wizard');
            return;
        }

        const rendered = renderPrompt(answers);
        if (rendered) {
            setPrompt(rendered);
            setLintReport(lintPrompt(rendered.prompt, answers));
        }
    }, [answers, router]);

    const handleCopy = async () => {
        if (prompt) {
            const success = await copyToClipboard(prompt.prompt);
            if (success) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    };

    const handleExport = () => {
        if (prompt && lintReport) {
            const markdown = generateMarkdownExport(prompt, lintReport, answers);
            downloadAsFile(markdown, `prompt-${answers.toolId}-${Date.now()}.md`);
        }
    };

    const handleNewPrompt = () => {
        reset();
        router.push('/wizard');
    };

    if (!prompt || !lintReport) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-slate-400">Laden...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={handleNewPrompt}
                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Neuer Prompt
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">{getToolIcon(answers.toolId!)}</span>
                            <span className="text-slate-300 font-medium">{answers.toolId}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Dein Prompt ist fertig! 🎉
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Kopiere den Prompt und füge ihn in {answers.toolId} ein.
                    </p>
                </header>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={handleCopy}
                        className={`flex-1 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2
              ${copied
                                ? 'bg-green-500 text-white'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-purple-500/25'}`}
                    >
                        {copied ? (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Kopiert!
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Prompt kopieren
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleExport}
                        className="px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('prompt')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all
              ${activeTab === 'prompt'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'text-slate-400 hover:text-white'}`}
                    >
                        Prompt
                    </button>
                    <button
                        onClick={() => setActiveTab('why')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all
              ${activeTab === 'why'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'text-slate-400 hover:text-white'}`}
                    >
                        Why it works
                    </button>
                    <button
                        onClick={() => setActiveTab('lint')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2
              ${activeTab === 'lint'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'text-slate-400 hover:text-white'}`}
                    >
                        Lint Report
                        <span className={`text-sm ${getLintScoreColor(lintReport.score)}`}>
                            {lintReport.score}%
                        </span>
                    </button>
                </div>

                {/* Content */}
                <main className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                    {activeTab === 'prompt' && (
                        <div className="p-6">
                            <pre className="whitespace-pre-wrap text-slate-200 font-mono text-sm leading-relaxed">
                                {prompt.prompt}
                            </pre>
                        </div>
                    )}

                    {activeTab === 'why' && (
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                Warum dieser Prompt funktioniert
                            </h3>
                            <ul className="space-y-3">
                                {prompt.whyItWorks.map((reason, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-green-400 mt-0.5">✓</span>
                                        <span className="text-slate-300">{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'lint' && (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-white">
                                    Qualitäts-Check
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className={`text-3xl font-bold ${getLintScoreColor(lintReport.score)}`}>
                                        {lintReport.score}
                                    </span>
                                    <span className="text-slate-400">/100</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getLintScoreColor(lintReport.score)} bg-slate-700`}>
                                        {getLintScoreLabel(lintReport.score)}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {lintReport.results.map((result) => (
                                    <div
                                        key={result.ruleId}
                                        className={`p-4 rounded-xl border ${result.passed
                                                ? 'bg-green-500/10 border-green-500/20'
                                                : result.severity === 'error'
                                                    ? 'bg-red-500/10 border-red-500/20'
                                                    : result.severity === 'warning'
                                                        ? 'bg-yellow-500/10 border-yellow-500/20'
                                                        : 'bg-blue-500/10 border-blue-500/20'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className={`mt-0.5 ${result.passed
                                                    ? 'text-green-400'
                                                    : result.severity === 'error'
                                                        ? 'text-red-400'
                                                        : result.severity === 'warning'
                                                            ? 'text-yellow-400'
                                                            : 'text-blue-400'
                                                }`}>
                                                {result.passed ? '✓' : result.severity === 'error' ? '✗' : '⚠'}
                                            </span>
                                            <div>
                                                <h4 className={`font-medium ${result.passed ? 'text-green-300' : 'text-white'
                                                    }`}>
                                                    {result.ruleName}
                                                </h4>
                                                {!result.passed && result.suggestion && (
                                                    <p className="text-sm text-slate-400 mt-1">
                                                        💡 {result.suggestion}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {/* Metadata */}
                <footer className="mt-6 text-center text-sm text-slate-500">
                    Tool: {prompt.metadata.toolId} • Use-Case: {prompt.metadata.useCaseId} •
                    Qualität: {prompt.metadata.qualityLevel}
                    {prompt.metadata.moduleApplied && ` • Modul: ${prompt.metadata.moduleApplied}`}
                </footer>
            </div>
        </div>
    );
}

function getToolIcon(toolId: string): string {
    const icons: Record<string, string> = {
        'chatgpt': '🤖',
        'perplexity': '🔎',
        'claude': '🧠',
        'midjourney': '🎨',
        'deepl': '🗣️',
        'canva': '🖼️',
        'copilot': '⌨️',
        'gamma': '📊',
        'elicit': '🔬',
        'suno-udio': '🎵',
        'notion-ai': '📝',
        'runway': '🎬',
        'imagefx': '🍌',
        'gemini': '✨',
    };
    return icons[toolId] || '🤖';
}
