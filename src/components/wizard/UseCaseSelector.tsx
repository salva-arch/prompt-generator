'use client';

import { useWizardStore } from '@/lib/store/wizard-store';
import type { UseCaseId } from '@/lib/types';
import useCases from '@/data/use-cases.json';

export default function UseCaseSelector() {
    const { answers, setUseCase } = useWizardStore();

    return (
        <div>
            <p className="text-slate-400 mb-6">
                Wähle die Art der Aufgabe, die du erledigen möchtest.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {useCases.map((useCase) => (
                    <button
                        key={useCase.id}
                        onClick={() => setUseCase(useCase.id as UseCaseId)}
                        className={`p-5 rounded-xl text-left transition-all border-2 relative
              ${answers.useCaseId === useCase.id
                                ? 'bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/10'
                                : 'bg-slate-700/30 border-slate-600/50 hover:border-slate-500 hover:bg-slate-700/50'}`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">{useCase.icon}</span>
                            <div>
                                <h3 className={`font-semibold text-lg ${answers.useCaseId === useCase.id ? 'text-purple-300' : 'text-white'}`}>
                                    {useCase.name}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">
                                    {useCase.description}
                                </p>
                            </div>
                        </div>

                        {/* Formula badge */}
                        <div className="mt-4">
                            <span className={`text-xs px-2 py-1 rounded-full 
                ${answers.useCaseId === useCase.id
                                    ? 'bg-purple-500/30 text-purple-300'
                                    : 'bg-slate-600/50 text-slate-400'}`}>
                                {getFormulaLabel(useCase.applicableFormula)}
                            </span>
                        </div>

                        {/* Selected indicator */}
                        {answers.useCaseId === useCase.id && (
                            <div className="absolute top-3 right-3">
                                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

function getFormulaLabel(formula: string): string {
    const labels: Record<string, string> = {
        'universal': '📋 Universal-Formel',
        'research': '🔍 Research-Formel',
        'media': '🎨 Media-Formel',
        'coding': '💻 Coding-Formel',
    };
    return labels[formula] || formula;
}
