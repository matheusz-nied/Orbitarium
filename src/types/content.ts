export type Level = "Iniciante" | "Intermediário" | "Avançado";

export type VisualId =
  | "newton-motion"
  | "static-dynamic"
  | "secant-tangent"
  | "area-under-curve"
  | "derivative-integral-flow"
  | "fluxions-flow"
  | "falling-orbit"
  | "newton-leibniz"
  | "timeline"
  | "summary";

export type InteractiveId =
  | "secant-tangent"
  | "integral-rectangles"
  | "derivative-integral-toggle"
  | "newton-leibniz-comparison"
  | "timeline"
  | "quiz"
  | "glossary"
  | "summary-cards";

export type LessonBlockType =
  | "definition"
  | "example"
  | "insight"
  | "mistake"
  | "formula";

export interface Category {
  id: string;
  name: string;
  description: string;
  accent: string;
  softAccent: string;
}

export interface LessonBlock {
  type: LessonBlockType;
  title: string;
  body: string;
  items?: string[];
  formula?: string;
}

export interface LessonSection {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  visual?: VisualId;
  interactive?: InteractiveId;
  blocks?: LessonBlock[];
}

export interface TimelineEvent {
  id: string;
  period: string;
  title: string;
  description: string;
}

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  feedback: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface SummaryCard {
  title: string;
  body: string;
}

export interface ComparisonRow {
  topic: string;
  newton: string;
  leibniz: string;
}

export interface LessonContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCategoryId: string;
  secondaryCategoryId?: string;
  level: Level;
  estimatedTime: string;
  tags: string[];
  sections: LessonSection[];
  timeline?: TimelineEvent[];
  quiz?: QuizQuestion[];
  glossary?: GlossaryTerm[];
  summaryCards?: SummaryCard[];
  comparisonRows?: ComparisonRow[];
}
