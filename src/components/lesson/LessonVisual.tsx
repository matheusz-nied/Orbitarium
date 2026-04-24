import type { LessonModule } from "../../types/content";

interface LessonVisualProps {
  visualId?: string;
  visuals: LessonModule["visuals"];
}

export function LessonVisual({ visualId, visuals }: LessonVisualProps) {
  if (!visualId) {
    return null;
  }

  const Visual = visuals[visualId];

  if (!Visual) {
    return null;
  }

  return <Visual />;
}
