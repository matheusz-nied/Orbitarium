import type { Category, LessonContent } from "../../types/content";
import { astrofisicaCategory } from "./astrofisica/category";
import { radiacaoCosmicaDeFundoContent } from "./astrofisica/contents/radiacao-cosmica-de-fundo";
import { computacaoCategory } from "./computacao/category";
import { engenhariaCategory } from "./engenharia/category";
import { filosofiaCategory } from "./filosofia/category";
import { fisicaCategory } from "./fisica/category";
import { historiaDaCienciaCategory } from "./historia-da-ciencia/category";
import { matematicaCategory } from "./matematica/category";
import { newtonCalculoContent } from "./matematica/contents/newton-calculo";

export const categories: Category[] = [
  astrofisicaCategory,
  matematicaCategory,
  fisicaCategory,
  computacaoCategory,
  historiaDaCienciaCategory,
  filosofiaCategory,
  engenhariaCategory,
];

export const contents: LessonContent[] = [newtonCalculoContent, radiacaoCosmicaDeFundoContent];
