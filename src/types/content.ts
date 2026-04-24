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
  | "summary"
  | "cmb-hero"
  | "cmb-observer-past"
  | "cmb-plasma"
  | "cmb-cooling"
  | "cmb-recombination"
  | "cmb-redshift"
  | "cmb-evidence"
  | "cmb-temperature-map"
  | "cmb-structures"
  | "cmb-timeline"
  | "cmb-missions"
  | "cmb-measurements"
  | "cmb-summary";

export type InteractiveId =
  | "secant-tangent"
  | "integral-rectangles"
  | "derivative-integral-toggle"
  | "newton-leibniz-comparison"
  | "timeline"
  | "quiz"
  | "glossary"
  | "summary-cards"
  | "cmb-temperature-map"
  | "cmb-recombination-before-after"
  | "cmb-cooling-slider"
  | "cmb-redshift-slider"
  | "cmb-structure-growth"
  | "cmb-timeline"
  | "cmb-mission-cards"
  | "cmb-measurement-map"
  | "related-topics";

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

export interface LessonTheme {
  variant: "light" | "cosmic";
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
  theme?: LessonTheme;
  heroVisual?: VisualId;
  openingText?: string;
  quickFacts?: SummaryCard[];
  relatedTopics?: SummaryCard[];
  missionCards?: SummaryCard[];
  sections: LessonSection[];
  timeline?: TimelineEvent[];
  quiz?: QuizQuestion[];
  glossary?: GlossaryTerm[];
  summaryCards?: SummaryCard[];
  comparisonRows?: ComparisonRow[];
}
