import { commonLessonInteractions } from "../src/components/lesson/commonInteractions";
import { lessonModules } from "../src/lessons";
import type { LessonContent, LessonModule, QuizQuestion } from "../src/types/content";

const MIN_SECTIONS = 8;
const MAX_SECTIONS = 14;
const MIN_VISUAL_INTERACTIONS = 3;
const MIN_QUIZ_QUESTIONS = 8;
const MIN_GLOSSARY_TERMS = 10;
const NON_VISUAL_INTERACTIONS = new Set(["quiz", "glossary", "summary-cards"]);

const errors: string[] = [];

function label(content: LessonContent) {
  return `${content.id} (${content.title})`;
}

function requireText(value: unknown, field: string, content: LessonContent) {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${label(content)}: campo obrigatório vazio: ${field}`);
  }
}

function requireList(values: unknown, field: string, content: LessonContent) {
  if (!Array.isArray(values) || values.length === 0) {
    errors.push(`${label(content)}: lista obrigatória vazia: ${field}`);
  }
}

function validateUrl(url: string, field: string, content: LessonContent) {
  try {
    new URL(url);
  } catch {
    errors.push(`${label(content)}: URL inválida em ${field}: ${url}`);
  }
}

function validateQuiz(quiz: QuizQuestion[] | undefined, content: LessonContent) {
  if (!quiz || quiz.length < MIN_QUIZ_QUESTIONS) {
    errors.push(
      `${label(content)}: quiz deve ter pelo menos ${MIN_QUIZ_QUESTIONS} perguntas`,
    );
    return;
  }

  for (const question of quiz) {
    requireText(question.id, "quiz.id", content);
    requireText(question.prompt, `quiz.${question.id}.prompt`, content);
    requireText(question.feedback, `quiz.${question.id}.feedback`, content);

    if (!question.options.length) {
      errors.push(`${label(content)}: pergunta ${question.id} não tem opções`);
      continue;
    }

    const optionIds = new Set(question.options.map((option) => option.id));
    if (!optionIds.has(question.correctOptionId)) {
      errors.push(
        `${label(content)}: pergunta ${question.id} aponta para alternativa correta inexistente`,
      );
    }
  }
}

function validateLessonModule(lessonModule: LessonModule) {
  const { content } = lessonModule;
  const visualIds = new Set(Object.keys(lessonModule.visuals));
  const interactionIds = new Set([
    ...Object.keys(commonLessonInteractions),
    ...Object.keys(lessonModule.interactions),
  ]);

  requireText(content.id, "id", content);
  requireText(content.title, "title", content);
  requireText(content.subtitle, "subtitle", content);
  requireText(content.description, "description", content);
  requireText(content.primaryCategoryId, "primaryCategoryId", content);
  requireText(content.level, "level", content);
  requireText(content.estimatedTime, "estimatedTime", content);
  requireList(content.tags, "tags", content);
  requireList(content.learningObjectives, "learningObjectives", content);
  requireList(content.prerequisites, "prerequisites", content);
  requireList(content.references, "references", content);

  if (content.sections.length < MIN_SECTIONS || content.sections.length > MAX_SECTIONS) {
    errors.push(
      `${label(content)}: deve ter entre ${MIN_SECTIONS} e ${MAX_SECTIONS} seções`,
    );
  }

  if (content.heroVisual && !visualIds.has(content.heroVisual)) {
    errors.push(`${label(content)}: heroVisual inexistente: ${content.heroVisual}`);
  }

  const visualInteractionCount = content.sections.filter(
    (section) => section.interactive && !NON_VISUAL_INTERACTIONS.has(section.interactive),
  ).length;

  if (visualInteractionCount < MIN_VISUAL_INTERACTIONS) {
    errors.push(
      `${label(content)}: deve ter pelo menos ${MIN_VISUAL_INTERACTIONS} interações visuais`,
    );
  }

  for (const section of content.sections) {
    requireText(section.id, "sections.id", content);
    requireText(section.eyebrow, `${section.id}.eyebrow`, content);
    requireText(section.title, `${section.id}.title`, content);
    requireText(section.lead, `${section.id}.lead`, content);
    requireList(section.paragraphs, `${section.id}.paragraphs`, content);

    if (section.visual && !visualIds.has(section.visual)) {
      errors.push(`${label(content)}: seção ${section.id} usa visual inexistente: ${section.visual}`);
    }

    if (section.interactive && !interactionIds.has(section.interactive)) {
      errors.push(
        `${label(content)}: seção ${section.id} usa interação inexistente: ${section.interactive}`,
      );
    }
  }

  validateQuiz(content.quiz, content);

  if (!content.glossary || content.glossary.length < MIN_GLOSSARY_TERMS) {
    errors.push(
      `${label(content)}: glossário deve ter pelo menos ${MIN_GLOSSARY_TERMS} termos`,
    );
  }

  for (const reference of content.references) {
    requireText(reference.title, "references.title", content);
    requireText(reference.source, `references.${reference.title}.source`, content);
    requireText(reference.url, `references.${reference.title}.url`, content);
    validateUrl(reference.url, `references.${reference.title}.url`, content);
  }
}

const lessonIds = new Set<string>();

for (const lessonModule of lessonModules) {
  if (lessonIds.has(lessonModule.content.id)) {
    errors.push(`ID duplicado de aula: ${lessonModule.content.id}`);
  }

  lessonIds.add(lessonModule.content.id);
  validateLessonModule(lessonModule);
}

if (errors.length > 0) {
  console.error("Validação de aulas falhou:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validação de aulas passou: ${lessonModules.length} aula(s).`);
