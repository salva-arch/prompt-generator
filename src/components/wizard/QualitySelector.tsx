'use client';

import { useWizardStore } from '@/lib/store/wizard-store';
import type { QualityLevel } from '@/lib/types';

const qualityLevels: { id: QualityLevel; label: string; description: string; icon: string }[] = [
    {
        id: 'good',
        label: 'Good',
        description: 'Basis-Qualität, schnelle Ergebnisse',
        icon: '⭐',
    },
    {
        id: 'very-good',
        label: 'Very Good',
        description: 'Erweiterte Prüfschritte, mehr Struktur',
        icon: '⭐⭐',
    },
    {
        id: 'max',
        label: 'Maximum',
        description: 'Maximale Qualität, detaillierte Verification',
        icon: '⭐⭐⭐',
    },
];

export default function QualitySelector() {
    const { answers, setQualityLevel } = useWizardStore();

    return (
        <div>
            <p className="text-slate-400 mb-6">
                Wähle das gewünschte Qualitätslevel. Höhere Levels fügen mehr Prüfschritte hinzu.
            </p>

            <div className="space-y-4">
                {qualityLevels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => setQualityLevel(level.id)}
                        className={`w-full p-5 rounded-xl text-left transition-all border-2 relative
              ${answers.qualityLevel === level.id
                                ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10'
                                : 'bg-slate-700/30 border-slate-600/50 hover:border-slate-500 hover:bg-slate-700/50'}`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{level.icon}</span>
                            <div className="flex-1">
                                <h3 className={`font-semibold text-lg ${answers.qualityLevel === level.id ? 'text-amber-300' : 'text-white'}`}>
                                    {level.label}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">
                                    {level.description}
                                </p>
                            </div>
                        </div>

                        {/* Selected indicator */}
                        {answers.qualityLevel === level.id && (
                            <div className="absolute top-4 right-4">
                                <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Quality explanation */}
            <div className="mt-6 bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                    ℹ️ Was bedeutet das?
                </h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-medium">Good:</span>
                        <span>Basis-Prompt mit Rolle, Kontext und Aufgabe</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-medium">Very Good:</span>
                        <span>+ Selbst-Check, Alternativen vorschlagen</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-medium">Maximum:</span>
                        <span>+ Detaillierte Verification, Annahmen explizit machen</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
