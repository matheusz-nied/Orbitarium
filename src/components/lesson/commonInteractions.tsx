import type { LessonModule } from "../../types/content";
import {
  GlossaryGrid,
  InteractiveTimeline,
  ReviewQuiz,
  SummaryCards,
} from "./LessonExtras";

export const commonLessonInteractions = {
  timeline: ({ content }) =>
    content.timeline ? <InteractiveTimeline events={content.timeline} /> : null,
  quiz: ({ content }) => (content.quiz ? <ReviewQuiz questions={content.quiz} /> : null),
  glossary: ({ content }) =>
    content.glossary ? (
      <div className="grid gap-8">
        <GlossaryGrid terms={content.glossary} />
        {content.relatedTopics ? (
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Próximos estudos
            </h3>
            <SummaryCards cards={content.relatedTopics} />
          </div>
        ) : null}
      </div>
    ) : null,
  "summary-cards": ({ content }) =>
    content.summaryCards ? <SummaryCards cards={content.summaryCards} /> : null,
} satisfies LessonModule["interactions"];
