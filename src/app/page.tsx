import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
            <span className="text-blue-400 text-sm font-medium">✨ Prompt Generator MVP</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Der beste Prompt für
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> jedes KI-Tool</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Wizard-geführte Prompt-Erstellung für ChatGPT, Claude, Midjourney, Perplexity und 10 weitere Tools.
            Mit tool-spezifischen Optimierungen und Qualitäts-Check.
          </p>

          <Link
            href="/wizard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
              text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 
              transition-all shadow-lg shadow-purple-500/25 text-lg"
          >
            Prompt erstellen
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </header>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">14 Tools unterstützt</h3>
            <p className="text-slate-400 text-sm">
              Von ChatGPT über Midjourney bis Runway – jedes Tool bekommt optimierte Templates.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Tool-spezifische Regeln</h3>
            <p className="text-slate-400 text-sm">
              Claude bekommt XML-Tags, Perplexity keine Few-Shots, Midjourney Parameter am Ende.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Qualitäts-Lint</h3>
            <p className="text-slate-400 text-sm">
              Automatischer Check: Fehlt Kontext? Kein Format? Der Lint-Report zeigt Verbesserungen.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Unterstützte Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: '🤖', name: 'ChatGPT' },
              { icon: '🔎', name: 'Perplexity' },
              { icon: '🧠', name: 'Claude' },
              { icon: '🎨', name: 'Midjourney' },
              { icon: '🗣️', name: 'DeepL' },
              { icon: '🖼️', name: 'Canva' },
              { icon: '⌨️', name: 'Copilot' },
              { icon: '📊', name: 'Gamma' },
              { icon: '🔬', name: 'Elicit' },
              { icon: '🎵', name: 'Suno' },
              { icon: '📝', name: 'Notion AI' },
              { icon: '🎬', name: 'Runway' },
              { icon: '🍌', name: 'ImageFX' },
              { icon: '✨', name: 'Gemini' },
            ].map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50"
              >
                <span>{tool.icon}</span>
                <span className="text-slate-300 text-sm">{tool.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Formulas */}
        <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            4 bewährte Prompt-Formeln
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <h3 className="font-semibold text-blue-300 mb-2">📋 Universal-Formel</h3>
              <p className="text-slate-400 text-sm">Rolle → Kontext → Aufgabe → Constraints → Output → Prüfschritt</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <h3 className="font-semibold text-green-300 mb-2">🔍 Research-Formel</h3>
              <p className="text-slate-400 text-sm">Ziel → Scope → Quellen → Tabellen → Empfehlung</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <h3 className="font-semibold text-purple-300 mb-2">🎨 Media-Formel</h3>
              <p className="text-slate-400 text-sm">Motiv → Style → Light → Camera → Motion → Negatives</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <h3 className="font-semibold text-amber-300 mb-2">💻 Coding-Formel</h3>
              <p className="text-slate-400 text-sm">Kontext-first → Anforderungen → Tests → Output nur Code</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 text-slate-500 text-sm">
          <p>Entwickelt für produktive Prompt-Erstellung • Alle Daten bleiben lokal</p>
        </footer>
      </div>
    </div>
  );
}
