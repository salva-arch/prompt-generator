'use client';

import { useWizardStore } from '@/lib/store/wizard-store';

export default function ContextInput() {
    const { answers, setContext } = useWizardStore();

    return (
        <div>
            <p className="text-slate-400 mb-6">
                Gib dem KI-Tool Kontext, damit es relevantere Antworten liefern kann.
            </p>

            <div className="space-y-6">
                {/* Domain */}
                <div>
                    <label htmlFor="domain" className="block text-sm font-medium text-slate-300 mb-2">
                        Domain / Fachgebiet
                    </label>
                    <input
                        id="domain"
                        type="text"
                        value={answers.context.domain}
                        onChange={(e) => setContext({ domain: e.target.value })}
                        placeholder="z.B. Marketing, Softwareentwicklung, Bildung, Medizin..."
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                    />
                </div>

                {/* Target Audience */}
                <div>
                    <label htmlFor="audience" className="block text-sm font-medium text-slate-300 mb-2">
                        Zielgruppe
                    </label>
                    <input
                        id="audience"
                        type="text"
                        value={answers.context.targetAudience}
                        onChange={(e) => setContext({ targetAudience: e.target.value })}
                        placeholder="z.B. Geschäftsführer, Schüler 10. Klasse, technische Entwickler..."
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                    />
                </div>

                {/* Input Material */}
                <div>
                    <label htmlFor="material" className="block text-sm font-medium text-slate-300 mb-2">
                        Input-Material <span className="text-slate-500">(optional)</span>
                    </label>
                    <textarea
                        id="material"
                        value={answers.context.inputMaterial}
                        onChange={(e) => setContext({ inputMaterial: e.target.value })}
                        placeholder="z.B. bestehender Text, Code-Snippet, Thema eines Dokuments, URL..."
                        className="w-full h-24 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all resize-none"
                    />
                    <p className="mt-2 text-sm text-slate-500">
                        Füge hier Text ein, der als Grundlage dient (z.B. zu überarbeitender Text, Code zum Debuggen)
                    </p>
                </div>
            </div>
        </div>
    );
}
