# Brief de implementação de aula (Orbitarium)

## Estrutura obrigatória por aula

Crie em `src/lessons/<folder>/<id>/`:

1. `content.ts` — `LessonContent` completo
2. `visuals.tsx` — Record de componentes visuais SVG/React
3. `interactions.tsx` — ≥3 interações educativas com estado
4. `index.ts` — exporta `LessonModule`

**NÃO edite** `src/lessons/index.ts` (o orquestrador registra).

## Referência de código

Estude estes arquivos existentes e copie o estilo:

- `src/lessons/visao-computacional/fundamentos-imagens-digitais-segmentacao/` (tamanho bom)
- `src/lessons/inteligencia-artificial/transformers-e-atencao/interactions.tsx` (usa `InteractiveShell` de `InteractionPrimitives`)
- `src/types/content.ts` (tipos)
- `AGENTS.md` (padrão pedagógico)

Prefira importar:

```ts
import { InteractiveShell, MetricCard } from "../../../components/lesson/InteractionPrimitives";
import { BarChart3, Sliders, ... } from "lucide-react";
```

`InteractiveShell` exige `icon` (ReactNode).

## content.ts — checklist

- `id` = slug exato do manifesto
- `primaryCategoryId` / `secondaryCategoryId` conforme manifesto
- `level` exato
- `estimatedTime` tipo `"35-50 min"`
- 6–10 `learningObjectives`, 3–6 `prerequisites`
- 5–10 `references` com URLs reais verificáveis (arxiv, MIT, Stanford, Hugging Face, OpenAI docs, papers clássicos, Khan Academy, Britannica, SEP). **Nunca invente paper/URL.**
- `openingText`, `quickFacts` (3), `heroVisual`
- **8–12 seções** com `eyebrow`, `title`, `lead`, `paragraphs` (2–4), `blocks` (definition/insight/example/mistake), e pelo menos 3 seções com `interactive` apontando para IDs reais
- Inclua seções finais de quiz/glossary via `interactive: "quiz"` e `interactive: "glossary"` e/ou use `quiz`/`glossary` no content (commonInteractions já cobre quiz/glossary/summary-cards)
- `quiz`: ≥8 perguntas, 3 opções, `correctOptionId` válido, feedback útil
- `glossary`: ≥10 termos
- `summaryCards`: 3–6 cards
- Texto em **português do Brasil**, profundo, progressivo, não genérico
- Sem números específicos sem fonte; sem simplificações cientificamente erradas

## visuals.tsx

- Exporte `visuals` com `satisfies LessonModule["visuals"]`
- Inclua o `heroVisual` e 4–8 diagramas SVG simples e didáticos
- Use Tailwind + SVG inline como nas aulas existentes

## interactions.tsx

- ≥3 interações com sliders/toggles/simulações que **ensinam**
- Exporte com `satisfies LessonModule["interactions"]`
- IDs devem bater com `section.interactive` no content
- Não dependa de libs novas (só react, lucide-react, motion se já usado)

## index.ts

```ts
import type { LessonModule } from "../../../types/content";
import { <camel>Content } from "./content";
import { interactions } from "./interactions";
import { visuals } from "./visuals";

export const <camel>Lesson = {
  content: <camel>Content,
  visuals,
  interactions,
} satisfies LessonModule;
```

## Qualidade científica

- Conceitos alinhados a cursos tipo CS229/CS231n/CS224n, Goodfellow Deep Learning book, Bishop PRML (conceitualmente)
- Diferencie intuição de formalismo
- Inclua erros comuns reais de alunos
- Em temas controversos (agência de LLMs, fairness), apresente o debate sem sensacionalismo

## Ao terminar

Liste: paths criados, IDs das interações, referências usadas, e qualquer dúvida factual que ficou em aberto.
