export type Level = "Iniciante" | "Intermediário" | "Avançado";

export type VisualId = "newton-motion" | "static-dynamic" | "secant-tangent";

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
  blocks?: LessonBlock[];
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
}
