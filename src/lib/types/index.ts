// ============================================
// PROMPT GENERATOR - TYPE DEFINITIONS
// ============================================

// ----- TOOL TYPES -----

export type ToolId = 
  | 'chatgpt'
  | 'perplexity'
  | 'claude'
  | 'midjourney'
  | 'deepl'
  | 'canva'
  | 'copilot'
  | 'gamma'
  | 'elicit'
  | 'suno-udio'
  | 'notion-ai'
  | 'runway'
  | 'imagefx'
  | 'gemini';

export interface Tool {
  id: ToolId;
  name: string;
  category: ToolCategory;
  icon: string;
  url: string;
  description: string;
  strengths: string[];
  limitations: string[];
  specialRules: string[];
}

export type ToolCategory = 
  | 'text-chat'
  | 'research'
  | 'coding'
  | 'image'
  | 'video'
  | 'audio'
  | 'presentation';

// ----- USE CASE TYPES -----

export type UseCaseId = 
  | 'chat-writing'
  | 'research'
  | 'coding'
  | 'image'
  | 'video'
  | 'audio-music'
  | 'slides-docs';

export interface UseCase {
  id: UseCaseId;
  name: string;
  description: string;
  icon: string;
  applicableFormula: PromptFormula;
}

export type PromptFormula = 
  | 'universal'    // Rolle → Kontext → Aufgabe → Constraints → Output → Prüfschritt
  | 'research'     // Ziel/Scope/Quellen/Tabellen/Empfehlung
  | 'media'        // Motiv/Style/Light/Camera/Motion/Negatives/Parameter
  | 'coding';      // Kontext-first, Anforderungen, Tests, Output nur Code/patch

// ----- QUALITY LEVELS -----

export type QualityLevel = 'good' | 'very-good' | 'max';

export interface QualityConfig {
  level: QualityLevel;
  label: string;
  description: string;
  lintStrictness: number; // 1-3
  requireVerification: boolean;
  requireExamples: boolean;
}

// ----- WIZARD ANSWERS -----

export interface WizardAnswers {
  // Step 1: Tool
  toolId: ToolId | null;
  
  // Step 2: Use Case
  useCaseId: UseCaseId | null;
  
  // Step 3: Goal/Outcome
  goal: string;
  
  // Step 4: Context
  context: {
    domain: string;
    targetAudience: string;
    inputMaterial: string;
  };
  
  // Step 5: Constraints
  constraints: {
    tone: string;
    length: string;
    format: string;
    noGos: string;
    sourceRequirements: string;
    language: string;
  };
  
  // Step 6: Quality Level
  qualityLevel: QualityLevel;
  
  // Step 7: Optional References
  references: {
    styleReference: string;
    examples: string;
  };
}

// ----- TEMPLATE TYPES -----

export interface TemplateSlot {
  name: string;
  key: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface Template {
  id: string;
  toolId: ToolId;
  useCaseId: UseCaseId | 'general';
  name: string;
  description: string;
  template: string;
  slots: TemplateSlot[];
  moduleId: string | null;
}

export interface ToolTemplateSet {
  toolId: ToolId;
  general: Template;
  useCases: Partial<Record<UseCaseId, Template>>;
}

// ----- PROMPT ENGINE TYPES -----

export interface RenderedPrompt {
  prompt: string;
  whyItWorks: string[];
  metadata: {
    toolId: ToolId;
    useCaseId: UseCaseId;
    qualityLevel: QualityLevel;
    timestamp: string;
    moduleApplied: string | null;
  };
}

// ----- LINT TYPES -----

export type LintSeverity = 'error' | 'warning' | 'info';

export interface LintRule {
  id: string;
  name: string;
  description: string;
  severity: LintSeverity;
  check: (prompt: string, answers: WizardAnswers) => boolean;
  suggestion: string;
  applicableTo?: ToolId[];
}

export interface LintResult {
  ruleId: string;
  ruleName: string;
  passed: boolean;
  severity: LintSeverity;
  message: string;
  suggestion?: string;
}

export interface LintReport {
  results: LintResult[];
  score: number; // 0-100
  summary: {
    passed: number;
    failed: number;
    warnings: number;
  };
}

// ----- PRESET TYPES -----

export interface Preset {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  answers: Partial<WizardAnswers>;
}

// ----- EXPORT TYPES -----

export interface ExportData {
  prompt: RenderedPrompt;
  lintReport: LintReport;
  answers: WizardAnswers;
  exportedAt: string;
}

// ----- MODULE TYPES -----

export interface PromptModule {
  id: string;
  name: string;
  toolId: ToolId;
  processTemplate: (template: string, answers: WizardAnswers) => string;
  getSpecialRules: () => LintRule[];
  getWhyItWorks: (answers: WizardAnswers) => string[];
}

// ----- WIZARD STATE -----

export type WizardStep = 
  | 'tool'
  | 'use-case'
  | 'goal'
  | 'context'
  | 'constraints'
  | 'quality'
  | 'references'
  | 'result';

export interface WizardState {
  currentStep: WizardStep;
  answers: WizardAnswers;
  isComplete: boolean;
}
