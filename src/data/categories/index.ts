import type { Category } from "../../types/content";
import { astrofisicaCategory } from "./astrofisica/category";
import { computacaoCategory } from "./computacao/category";
import { engenhariaCategory } from "./engenharia/category";
import { filosofiaCategory } from "./filosofia/category";
import { fisicaCategory } from "./fisica/category";
import { historiaDaCienciaCategory } from "./historia-da-ciencia/category";
import { inteligenciaArtificialCategory } from "./inteligencia-artificial/category";
import { matematicaCategory } from "./matematica/category";

export const categories: Category[] = [
  astrofisicaCategory,
  matematicaCategory,
  fisicaCategory,
  inteligenciaArtificialCategory,
  computacaoCategory,
  historiaDaCienciaCategory,
  filosofiaCategory,
  engenhariaCategory,
];
