// ============================================
// WIZARD STATE STORE (Zustand)
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
    WizardAnswers,
    WizardStep,
    WizardState,
    ToolId,
    UseCaseId,
    QualityLevel,
    Preset
} from '@/lib/types';

// Initial empty answers
const initialAnswers: WizardAnswers = {
    toolId: null,
    useCaseId: null,
    goal: '',
    context: {
        domain: '',
        targetAudience: '',
        inputMaterial: '',
    },
    constraints: {
        tone: '',
        length: '',
        format: '',
        noGos: '',
        sourceRequirements: '',
        language: 'Deutsch',
    },
    qualityLevel: 'good',
    references: {
        styleReference: '',
        examples: '',
    },
};

// Step order
const stepOrder: WizardStep[] = [
    'tool',
    'use-case',
    'goal',
    'context',
    'constraints',
    'quality',
    'references',
    'result',
];

// ============================================
// WIZARD STORE
// ============================================

interface WizardStore extends WizardState {
    // Navigation
    goToStep: (step: WizardStep) => void;
    nextStep: () => void;
    prevStep: () => void;
    canGoNext: () => boolean;
    canGoPrev: () => boolean;

    // Answer updates
    setTool: (toolId: ToolId) => void;
    setUseCase: (useCaseId: UseCaseId) => void;
    setGoal: (goal: string) => void;
    setContext: (context: Partial<WizardAnswers['context']>) => void;
    setConstraints: (constraints: Partial<WizardAnswers['constraints']>) => void;
    setQualityLevel: (level: QualityLevel) => void;
    setReferences: (references: Partial<WizardAnswers['references']>) => void;

    // Presets
    presets: Preset[];
    saveAsPreset: (name: string, description: string) => void;
    loadPreset: (presetId: string) => void;
    deletePreset: (presetId: string) => void;

    // Reset
    reset: () => void;
}

export const useWizardStore = create<WizardStore>()(
    persist(
        (set, get) => ({
            // Initial state
            currentStep: 'tool',
            answers: initialAnswers,
            isComplete: false,
            presets: [],

            // Navigation
            goToStep: (step) => set({ currentStep: step }),

            nextStep: () => {
                const { currentStep } = get();
                const currentIndex = stepOrder.indexOf(currentStep);
                if (currentIndex < stepOrder.length - 1) {
                    const nextStep = stepOrder[currentIndex + 1];
                    set({
                        currentStep: nextStep,
                        isComplete: nextStep === 'result',
                    });
                }
            },

            prevStep: () => {
                const { currentStep } = get();
                const currentIndex = stepOrder.indexOf(currentStep);
                if (currentIndex > 0) {
                    set({ currentStep: stepOrder[currentIndex - 1] });
                }
            },

            canGoNext: () => {
                const { currentStep, answers } = get();
                switch (currentStep) {
                    case 'tool':
                        return !!answers.toolId;
                    case 'use-case':
                        return !!answers.useCaseId;
                    case 'goal':
                        return answers.goal.length > 5;
                    case 'context':
                        return !!answers.context.domain || !!answers.context.targetAudience;
                    case 'constraints':
                        return true; // Optional
                    case 'quality':
                        return true;
                    case 'references':
                        return true;
                    case 'result':
                        return false;
                    default:
                        return false;
                }
            },

            canGoPrev: () => {
                const { currentStep } = get();
                return stepOrder.indexOf(currentStep) > 0;
            },

            // Answer updates
            setTool: (toolId) =>
                set((state) => ({
                    answers: { ...state.answers, toolId }
                })),

            setUseCase: (useCaseId) =>
                set((state) => ({
                    answers: { ...state.answers, useCaseId }
                })),

            setGoal: (goal) =>
                set((state) => ({
                    answers: { ...state.answers, goal }
                })),

            setContext: (context) =>
                set((state) => ({
                    answers: {
                        ...state.answers,
                        context: { ...state.answers.context, ...context }
                    }
                })),

            setConstraints: (constraints) =>
                set((state) => ({
                    answers: {
                        ...state.answers,
                        constraints: { ...state.answers.constraints, ...constraints }
                    }
                })),

            setQualityLevel: (qualityLevel) =>
                set((state) => ({
                    answers: { ...state.answers, qualityLevel }
                })),

            setReferences: (references) =>
                set((state) => ({
                    answers: {
                        ...state.answers,
                        references: { ...state.answers.references, ...references }
                    }
                })),

            // Presets
            saveAsPreset: (name, description) => {
                const { answers, presets } = get();
                const newPreset: Preset = {
                    id: `preset-${Date.now()}`,
                    name,
                    description,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    answers: { ...answers },
                };
                set({ presets: [...presets, newPreset] });
            },

            loadPreset: (presetId) => {
                const { presets } = get();
                const preset = presets.find(p => p.id === presetId);
                if (preset && preset.answers) {
                    set({
                        answers: {
                            ...initialAnswers,
                            ...preset.answers
                        },
                        currentStep: 'tool',
                    });
                }
            },

            deletePreset: (presetId) => {
                const { presets } = get();
                set({ presets: presets.filter(p => p.id !== presetId) });
            },

            // Reset
            reset: () => set({
                currentStep: 'tool',
                answers: initialAnswers,
                isComplete: false,
            }),
        }),
        {
            name: 'prompt-generator-wizard',
            partialize: (state) => ({
                presets: state.presets,
                // Don't persist current wizard state
            }),
        }
    )
);

// ============================================
// HELPER HOOKS
// ============================================

export function useCurrentStepIndex(): number {
    const currentStep = useWizardStore((state) => state.currentStep);
    return stepOrder.indexOf(currentStep);
}

export function getTotalSteps(): number {
    return stepOrder.length - 1; // Exclude 'result'
}

export function getStepLabel(step: WizardStep): string {
    const labels: Record<WizardStep, string> = {
        'tool': 'Tool',
        'use-case': 'Use-Case',
        'goal': 'Ziel',
        'context': 'Kontext',
        'constraints': 'Constraints',
        'quality': 'Qualität',
        'references': 'Referenzen',
        'result': 'Ergebnis',
    };
    return labels[step];
}
