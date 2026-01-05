'use client';

interface WizardProgressProps {
    currentStep: number;
    totalSteps: number;
}

export default function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Step indicators */}
            <div className="flex justify-between mt-3">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all
              ${index < currentStep
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : index === currentStep
                                    ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-500'
                                    : 'bg-slate-700/50 text-slate-500 border border-slate-600'}`}
                    >
                        {index < currentStep ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            index + 1
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
