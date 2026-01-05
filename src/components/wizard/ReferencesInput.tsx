'use client';

import { useWizardStore } from '@/lib/store/wizard-store';

export default function ReferencesInput() {
    const { answers, setReferences } = useWizardStore();

    return (
        <div>
            <p className="text-slate-400 mb-6">
                Optionale Referenzen und Beispiele, die den Output beeinflussen sollen.
            </p>

            <div className="space-y-6">
                {/* Style Reference */}
                <div>
                    <label htmlFor="style" className="block text-sm font-medium text-slate-300 mb-2">
                        Stil-Referenz <span className="text-slate-500">(optional)</span>
                    </label>
                    <input
                        id="style"
                        type="text"
                        value={answers.references.styleReference}
                        onChange={(e) => setReferences({ styleReference: e.target.value })}
                        placeholder="z.B. 'im Stil von The Economist', 'minimalistisch', 'wie Apple Keynotes'..."
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                    />
                    <p className="mt-2 text-sm text-slate-500">
                        Beschreibe einen Stil ohne urheberrechtlich geschützte Inhalte zu kopieren
                    </p>
                </div>

                {/* Examples */}
                <div>
                    <label htmlFor="examples" className="block text-sm font-medium text-slate-300 mb-2">
                        Beispiele <span className="text-slate-500">(optional)</span>
                    </label>
                    <textarea
                        id="examples"
                        value={answers.references.examples}
                        onChange={(e) => setReferences({ examples: e.target.value })}
                        placeholder="z.B. Beispiel-Output, der als Vorlage dienen soll..."
                        className="w-full h-24 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all resize-none"
                    />
                </div>

                {/* Warning for Perplexity */}
                {answers.toolId === 'perplexity' && answers.references.examples && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <span className="text-yellow-400 text-xl">⚠️</span>
                            <div>
                                <h4 className="font-medium text-yellow-300">Hinweis für Perplexity</h4>
                                <p className="text-sm text-yellow-200/70 mt-1">
                                    Perplexity funktioniert besser <strong>ohne</strong> Few-Shot-Beispiele.
                                    Beispiele können die Suchergebnisse verfälschen.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Skip hint */}
                <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                    <p className="text-sm text-slate-400 flex items-center gap-2">
                        <span className="text-blue-400">💡</span>
                        Dieser Schritt ist optional. Du kannst direkt zum Ergebnis weitergehen.
                    </p>
                </div>
            </div>
        </div>
    );
}
