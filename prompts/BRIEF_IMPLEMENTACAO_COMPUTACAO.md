# Brief — aulas da trilha de Computação (Orbitarium)

## Estrutura

Crie em `src/lessons/computacao/<id>/`:

1. `content.ts`
2. `visuals.tsx`
3. `interactions.tsx`
4. `index.ts`

**NÃO edite** `src/lessons/index.ts`.

## Referência de padrão

Estude:
- `src/lessons/visao-computacional/fundamentos-imagens-digitais-segmentacao/`
- `src/lessons/inteligencia-artificial/transformers-e-atencao/interactions.tsx` (usa `InteractiveShell` de `InteractionPrimitives`)
- `src/types/content.ts`
- `AGENTS.md`
- Plano: `prompts/trilha_computacao.md`
- Manifesto: `prompts/manifesto_aulas_computacao.json`

```ts
import { InteractiveShell, MetricCard } from "../../../components/lesson/InteractionPrimitives";
import { Cpu, ... } from "lucide-react";
```

`InteractiveShell` exige `icon`.

## content.ts

- `id` = slug exato
- `primaryCategoryId: "computacao"`
- `secondaryCategoryId` conforme manifesto
- `level` exato do manifesto
- PT-BR, 8–12 seções, progressivo
- ≥3 seções com `interactive` custom (não contar quiz/glossary)
- blocos definition/insight/example/mistake
- quiz ≥8, glossary ≥10
- 5–10 references com URLs reais (OSTEP, CSAPP, Kurose materials, PostgreSQL docs, Docker docs, MIT OCW, RISC-V, OWASP, Tanenbaum refs via reputable URLs). **Nunca invente paper/URL/números de performance.**
- `openingText`, `quickFacts` (3), `heroVisual`, `summaryCards`

## visuals / interactions

- SVG didáticos + ≥3 interações com estado que ensinam
- Só deps já no projeto (react, lucide-react, motion)

## Fontes preferidas

OSTEP (https://pages.cs.wisc.edu/~remzi/OSTEP/), Docker docs, PostgreSQL docs, MDN, RFC quando fizer sentido, MIT OCW, Nand2Tetris, RISC-V specs educacionais, OWASP, Cloudflare Learning Center (rede), Linux man pages conceitualmente.

## Ao terminar

Liste paths + interaction IDs. Não faça commit destrutivo de arquivos de outros agentes.
