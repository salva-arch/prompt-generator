'use client';

import { useWizardStore } from '@/lib/store/wizard-store';

export default function ConstraintsInput() {
    const { answers, setConstraints } = useWizardStore();

    return (
        <div>
            <p className="text-slate-400 mb-6">
                Definiere Einschränkungen und Vorgaben für die Ausgabe.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tone */}
                <div>
                    <label htmlFor="tone" className="block text-sm font-medium text-slate-300 mb-2">
                        Ton / Schreibstil
                    </label>
                    <select
                        id="tone"
                        value={answers.constraints.tone}
                        onChange={(e) => setConstraints({ tone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                    >
                        <option value="">Auswählen...</option>
                        <option value="sachlich">Sachlich / Neutral</option>
                        <option value="formell">Formell / Geschäftlich</option>
                        <option value="locker">Locker / Umgangssprachlich</option>
                        <option value="freundlich">Freundlich / Warm</option>
                        <option value="direkt">Direkt / Auf den Punkt</option>
                        <option value="akademisch">Akademisch / Wissenschaftlich</option>
                        <option value="kreativ">Kreativ / Inspirierend</option>
                        <option value="technisch">Technisch / Präzise</option>
                    </select>
                </div>

                {/* Length */}
                <div>
                    <label htmlFor="length" className="block text-sm font-medium text-slate-300 mb-2">
                        Länge
                    </label>
                    <select
                        id="length"
                        value={answers.constraints.length}
                        onChange={(e) => setConstraints({ length: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                    >
                        <option value="">Auswählen...</option>
                        <option value="sehr kurz">Sehr kurz (1-2 Sätze)</option>
                        <option value="kurz">Kurz (1 Absatz)</option>
                        <option value="mittel">Mittel (2-3 Absätze)</option>
                        <option value="ausführlich">Ausführlich (mehrere Absätze)</option>
                        <option value="detailliert">Detailliert (umfassend)</option>
                    </select>
                </div>

                {/* Format */}
                <div>
                    <label htmlFor="format" className="block text-sm font-medium text-slate-300 mb-2">
                        Output-Format
                    </label>
                    <select
                        id="format"
                        value={answers.constraints.format}
                        onChange={(e) => setConstraints({ format: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                    >
                        <option value="">Auswählen...</option>
                        <option value="Fließtext">Fließtext</option>
                        <option value="Bulletpoints">Bulletpoints / Liste</option>
                        <option value="Nummerierte Liste">Nummerierte Liste</option>
                        <option value="Tabelle">Tabelle</option>
                        <option value="Markdown">Markdown</option>
                        <option value="Code">Code</option>
                        <option value="JSON">JSON</option>
                        <option value="Schritt-für-Schritt">Schritt-für-Schritt Anleitung</option>
                    </select>
                </div>

                {/* Language */}
                <div>
                    <label htmlFor="language" className="block text-sm font-medium text-slate-300 mb-2">
                        Sprache
                    </label>
                    <select
                        id="language"
                        value={answers.constraints.language}
                        onChange={(e) => setConstraints({ language: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                    >
                        <option value="Deutsch">Deutsch</option>
                        <option value="English">English</option>
                        <option value="Französisch">Französisch</option>
                        <option value="Spanisch">Spanisch</option>
                    </select>
                </div>

                {/* No-Gos */}
                <div className="md:col-span-2">
                    <label htmlFor="noGos" className="block text-sm font-medium text-slate-300 mb-2">
                        No-Gos / Was vermeiden?
                    </label>
                    <input
                        id="noGos"
                        type="text"
                        value={answers.constraints.noGos}
                        onChange={(e) => setConstraints({ noGos: e.target.value })}
                        placeholder="z.B. Floskeln, Wiederholungen, technischer Jargon, Marketing-Sprache..."
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                    />
                </div>

                {/* Source Requirements */}
                <div className="md:col-span-2">
                    <label htmlFor="sources" className="block text-sm font-medium text-slate-300 mb-2">
                        Quellenanforderungen <span className="text-slate-500">(für Recherche)</span>
                    </label>
                    <input
                        id="sources"
                        type="text"
                        value={answers.constraints.sourceRequirements}
                        onChange={(e) => setConstraints({ sourceRequirements: e.target.value })}
                        placeholder="z.B. nur akademische Quellen, ab 2020, keine Wikipedia..."
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl 
              text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                    />
                </div>
            </div>
        </div>
    );
}
