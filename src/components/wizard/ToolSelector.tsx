'use client';

import { useWizardStore } from '@/lib/store/wizard-store';
import type { ToolId } from '@/lib/types';
import tools from '@/data/tools.json';

export default function ToolSelector() {
    const { answers, setTool } = useWizardStore();

    return (
        <div>
            <p className="text-slate-400 mb-6">
                Wähle das KI-Tool, für das du einen Prompt erstellen möchtest.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setTool(tool.id as ToolId)}
                        className={`p-4 rounded-xl text-left transition-all border-2 group
              ${answers.toolId === tool.id
                                ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/10'
                                : 'bg-slate-700/30 border-slate-600/50 hover:border-slate-500 hover:bg-slate-700/50'}`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{tool.icon}</span>
                            <div className="flex-1 min-w-0">
                                <h3 className={`font-semibold truncate ${answers.toolId === tool.id ? 'text-blue-300' : 'text-white'}`}>
                                    {tool.name}
                                </h3>
                                <p className="text-sm text-slate-400 line-clamp-2 mt-1">
                                    {tool.description}
                                </p>
                            </div>
                        </div>

                        {/* Category badge */}
                        <div className="mt-3">
                            <span className={`text-xs px-2 py-1 rounded-full 
                ${answers.toolId === tool.id
                                    ? 'bg-blue-500/30 text-blue-300'
                                    : 'bg-slate-600/50 text-slate-400'}`}>
                                {getCategoryLabel(tool.category)}
                            </span>
                        </div>

                        {/* Selected indicator */}
                        {answers.toolId === tool.id && (
                            <div className="absolute top-3 right-3">
                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
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

function getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
        'text-chat': 'Text & Chat',
        'research': 'Recherche',
        'coding': 'Coding',
        'image': 'Bild',
        'video': 'Video',
        'audio': 'Audio',
        'presentation': 'Präsentation',
    };
    return labels[category] || category;
}
