'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardStore, useCurrentStepIndex, getTotalSteps, getStepLabel } from '@/lib/store/wizard-store';

// Step Components
import ToolSelector from '@/components/wizard/ToolSelector';
import UseCaseSelector from '@/components/wizard/UseCaseSelector';
import GoalInput from '@/components/wizard/GoalInput';
import ContextInput from '@/components/wizard/ContextInput';
import ConstraintsInput from '@/components/wizard/ConstraintsInput';
import QualitySelector from '@/components/wizard/QualitySelector';
import ReferencesInput from '@/components/wizard/ReferencesInput';
import WizardProgress from '@/components/wizard/WizardProgress';

export default function WizardPage() {
    const router = useRouter();
    const {
        currentStep,
        nextStep,
        prevStep,
        canGoNext,
        canGoPrev,
        isComplete,
        reset
    } = useWizardStore();

    const currentIndex = useCurrentStepIndex();
    const totalSteps = getTotalSteps();

    // Redirect to result when complete
    useEffect(() => {
        if (isComplete) {
            router.push('/result');
        }
    }, [isComplete, router]);

    // Render current step
    const renderStep = () => {
        switch (currentStep) {
            case 'tool':
                return <ToolSelector />;
            case 'use-case':
                return <UseCaseSelector />;
            case 'goal':
                return <GoalInput />;
            case 'context':
                return <ContextInput />;
            case 'constraints':
                return <ConstraintsInput />;
            case 'quality':
                return <QualitySelector />;
            case 'references':
                return <ReferencesInput />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => {
                                reset();
                                router.push('/');
                            }}
                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Zurück zur Startseite
                        </button>
                        <span className="text-slate-500 text-sm">
                            Schritt {currentIndex + 1} von {totalSteps}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <WizardProgress currentStep={currentIndex} totalSteps={totalSteps} />

                    {/* Step Title */}
                    <h1 className="text-3xl font-bold text-white mt-6">
                        {getStepLabel(currentStep)}
                    </h1>
                </header>

                {/* Step Content */}
                <main className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 md:p-8 mb-8">
                    {renderStep()}
                </main>

                {/* Navigation */}
                <footer className="flex justify-between items-center">
                    <button
                        onClick={prevStep}
                        disabled={!canGoPrev()}
                        className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2
              ${canGoPrev()
                                ? 'bg-slate-700 text-white hover:bg-slate-600'
                                : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Zurück
                    </button>

                    <button
                        onClick={nextStep}
                        disabled={!canGoNext()}
                        className={`px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2
              ${canGoNext()
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-purple-500/25'
                                : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                    >
                        {currentIndex === totalSteps - 1 ? 'Prompt generieren' : 'Weiter'}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </footer>
            </div>
        </div>
    );
}
