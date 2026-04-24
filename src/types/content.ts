import type { ComponentType } from "react";

export type Level = "Iniciante" | "Intermediário" | "Avançado";

export type VisualId = string;
export type InteractiveId = string;

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

export interface LessonReference {
  title: string;
  source: string;
  url: string;
  note?: string;
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
  learningObjectives: string[];
  prerequisites: string[];
  references: LessonReference[];
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

export interface LessonInteractionProps {
  content: LessonContent;
  section: LessonSection;
  isCosmic: boolean;
}

export interface LessonModule {
  content: LessonContent;
  visuals: Record<string, ComponentType>;
  interactions: Record<string, ComponentType<LessonInteractionProps>>;
}
