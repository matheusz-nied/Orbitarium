import type { ComponentType } from "react";
import type {
  LessonInteractionProps as InteractionComponentProps,
  LessonModule,
  LessonSection,
} from "../../types/content";
import { commonLessonInteractions } from "./commonInteractions";

interface LessonInteractionProps {
  content: LessonModule["content"];
  section: LessonSection;
  lessonModule: LessonModule;
  isCosmic: boolean;
}

export function LessonInteraction({
  content,
  section,
  lessonModule,
  isCosmic,
}: LessonInteractionProps) {
  if (!section.interactive) {
    return null;
  }

  const interactions = {
    ...commonLessonInteractions,
    ...lessonModule.interactions,
  } as Record<string, ComponentType<InteractionComponentProps>>;
  const Interaction = interactions[section.interactive];

  if (!Interaction) {
    return null;
  }

  return (
    <div className="mt-8">
      <Interaction content={content} section={section} isCosmic={isCosmic} />
    </div>
  );
}
