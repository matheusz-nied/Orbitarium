# Brief — Baixo Nível / Performance / Rust / Go

## Estrutura

Crie em `src/lessons/computacao/<id>/`:
- `content.ts`, `visuals.tsx`, `interactions.tsx`, `index.ts`

**NÃO edite** `src/lessons/index.ts` nem `src/lessons/computacao/index.ts` (orquestrador registra).

## Padrão

- `primaryCategoryId: "computacao"`
- `secondaryCategoryId` do manifesto
- PT-BR, 8–12 seções, ≥3 interações educativas, quiz≥8, glossary≥10
- Tipar `export const xContent: LessonContent = { ... }`
- Usar `InteractiveShell` de `InteractionPrimitives` com `icon`
- Estudar aulas existentes em `src/lessons/computacao/cache-de-cpu/` e `memoria-stack-heap-ponteiros/`

## Regras científicas

- Não inventar ns/GB/s/FLOPS sem fonte
- Preferir metodologia a truques
- Rust/Go: trade-offs, sem evangelismo
- Referências reais: Rust Book, Rustonomicon, Go Blog, Brendan Gregg, man perf, docs oficiais

## Manifesto

`prompts/manifesto_aulas_baixo_nivel.json`  
Plano: `prompts/trilha_baixo_nivel_performance.md`
