import type { LessonModule } from "../../../types/content";
import { localityDataOrientedDesignContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const localityDataOrientedDesignLesson = {
  content: localityDataOrientedDesignContent,
  visuals,
  interactions,
} satisfies LessonModule;
