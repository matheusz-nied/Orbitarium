# Brief — Capstones (Fase A)

## Estrutura

`src/lessons/computacao/<id>/` com `content.ts`, `visuals.tsx`, `interactions.tsx`, `index.ts`

**NÃO edite** `src/lessons/index.ts` nem `src/lessons/computacao/index.ts`.

## Tom do capstone

Cada aula é uma **oficina guiada**, não um tutorial de ferramenta:

1. Problema real / sintoma
2. Como medir
3. Formar hipótese
4. Intervir com critério
5. Verificar / invalidar
6. Erros comuns e overfit de otimização

`primaryCategoryId: "computacao"`, `secondaryCategoryId: "engenharia"`, `level: "Avançado"`.

## Qualidade

- PT-BR, 8–12 seções, ≥3 interações de **decisão/medição**
- Quiz ≥8 (raciocínio), glossary ≥10
- `export const xContent: LessonContent = { ... }`
- Sem números de latência/throughput inventados
- Referências reais: Gregg, Go diagnostics, Rust Book/Nomicon, SRE Book

## Plano

`prompts/trilha_capstones_e_teoria.md`  
`prompts/manifesto_aulas_capstones_teoria.json`
