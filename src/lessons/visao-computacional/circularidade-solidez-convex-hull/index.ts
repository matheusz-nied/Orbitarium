import type { LessonModule } from "../../../types/content";
import { circularidadeSolidezConvexHullContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const circularidadeSolidezConvexHullLesson = {
  content: circularidadeSolidezConvexHullContent,
  visuals,
  interactions,
} satisfies LessonModule;
