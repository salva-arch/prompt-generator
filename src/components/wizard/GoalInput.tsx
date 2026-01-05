'use client';

import { useWizardStore } from '@/lib/store/wizard-store';

export default function GoalInput() {
    const { answers, setGoal } = useWizardStore();

    return (
        <div>
            <p className="text-slate-400 mb-6">
                Beschreibe in 1-2 Sätzen, was du erreichen möchtest. Sei so konkret wie möglich.
            </p>

            <div className="space-y-6">
                <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-slate-300 mb-2">
                        Dein Ziel / Gewünschtes Ergebnis
                    </label>
                    <textarea
                        id="goal"
                        value={answers.goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="z.B. Erstelle eine Zusammenfassung des Artikels über KI in der Bildung mit den 5 wichtigsten Punkten..."
                        className="w-full h-32 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all resize-none"
                    />
                    <p className="mt-2 text-sm text-slate-500">
                        {answers.goal.length} Zeichen
                    </p>
                </div>

                {/* Tips */}
                <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                    <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        💡 Tipps für ein gutes Ziel
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Sei spezifisch: &quot;Schreibe eine E-Mail&quot; → &quot;Schreibe eine höfliche Absage-E-Mail an einen Lieferanten&quot;</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Beschreibe das gewünschte Ergebnis, nicht den Prozess</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Füge messbare Kriterien hinzu: &quot;mit 5 Punkten&quot;, &quot;in 200 Wörtern&quot;</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
