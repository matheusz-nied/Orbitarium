import type { Category, LessonContent } from "../../types/content";
import { computacaoCategory } from "./computacao/category";
import { engenhariaCategory } from "./engenharia/category";
import { filosofiaCategory } from "./filosofia/category";
import { fisicaCategory } from "./fisica/category";
import { historiaDaCienciaCategory } from "./historia-da-ciencia/category";
import { matematicaCategory } from "./matematica/category";
import { newtonCalculoContent } from "./matematica/contents/newton-calculo";

export const categories: Category[] = [
  matematicaCategory,
  fisicaCategory,
  computacaoCategory,
  historiaDaCienciaCategory,
  filosofiaCategory,
  engenhariaCategory,
];

export const contents: LessonContent[] = [newtonCalculoContent];
