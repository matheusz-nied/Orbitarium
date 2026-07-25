import type { LessonModule } from "../../../types/content";
import { graphNeuralNetworksContent } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const graphNeuralNetworksLesson = {
  content: graphNeuralNetworksContent,
  visuals,
  interactions,
} satisfies LessonModule;
