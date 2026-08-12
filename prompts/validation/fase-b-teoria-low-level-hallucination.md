# Auditoria de alucinacoes - Fase B teoria low-level

Data: 2026-07-25

## Escopo

- 5 aulas em `src/lessons/computacao/`:
  - `roofline-modelo-de-performance`
  - `consistencia-de-memoria-e-ordering`
  - `teoria-de-scheduling`
  - `ssa-e-otimizacoes-de-compilador`
  - `sistemas-de-tipos-e-soundness`

## Metodologia

1. Leitura manual integral dos cinco `content.ts`.
2. Varredura focada em:
   - numeros especificos de performance sem fonte
   - claims absolutos ou superfortes
   - referencias com URL/titulo incompatíveis ou papers duvidosos
   - quiz/glossario com risco de enunciado enganoso
3. Checagem pontual de URLs e claims sensiveis via `WebFetch` / `curl` / `WebSearch`:
   - Berkeley Roofline PDF, NERSC, Intel Advisor, AMCR LBL, CACM "Latency Lags Bandwith"
   - Go Memory Model, Rust atomics/Ordering/Nomicon, Boehm & Adve PLDI PDF
   - Linux memory barriers, CFS, EEVDF
   - OSTEP PDFs, Go HACKING, Go 1.14 blog
   - LLVM LangRef / Kaleidoscope, Cytron DOI, Cornell CS 6120
   - CMU soundness notes, Northeastern PFPL type safety
4. Correcoes apenas quando havia erro factual claro ou URL claramente fragil/enganosa ligada a claim sensivel.

## Resumo executivo

- Aulas auditadas: **5**
- Problemas confirmados encontrados: **3**
- Problemas corrigidos: **3**
- Problemas confirmados remanescentes: **0**
- Papers inventados confirmados: **0**
- URLs falsas/quebradas confirmadas: **0**
- Numeros especificos de performance sem fonte: **0**
- Quiz com resposta factual incorreta confirmada: **0**
- Glossario com erro factual confirmado: **1** (corrigido; dominance frontier)

## Problemas confirmados e correcoes aplicadas

| Aula | Arquivo | Tipo | Evidencia | Correcao |
| --- | --- | --- | --- | --- |
| `ssa-e-otimizacoes-de-compilador` | `content.ts` | Definicao imprecisa / glossario | Formula e glossario de dominance frontier usavam "nao domina B por completo", incompatível com a definicao classica baseada em **nao dominancia estrita**. | Texto alinhado a "nao domina estritamente B". |
| `teoria-de-scheduling` | `content.ts`, `interactions.tsx` | Claim de modernidade desatualizado | Aula apresentava CFS como ponte de "pratica moderna" sem EEVDF, apesar da documentacao oficial do Linux ja documentar a sucessao do fair class. | Adicionada referencia EEVDF, reescrito o paragrafo moderno, ajustados quiz/glossario/interacao. |
| `consistencia-de-memoria-e-ordering` | `content.ts` | URL fragil / versionada | Referencia apontava para `docs.kernel.org/7.1/...`; o conteudo era o documento correto de memory barriers, mas a rota versionada era desnecessaria e menos estavel. | URL trocada para `https://docs.kernel.org/core-api/wrappers/memory-barriers.html`. |

## Checagens que passaram sem correcao

### 1. Numeros especificos de performance

- Nao encontrei claims do tipo "X vezes mais rapido", "Y% melhor", "N GB/s em hardware real" sem fonte.
- No Roofline, os unicos numeros recorrentes sao:
  - tempos estimados da aula
  - maquina didatica normalizada (`computePeak: 100`, `bandwidthSlope: 16`)
  - fatores pedagogicos de what-if (`intensityFactor` / `computeFactor`)
- O texto da aula deixa explicito que o playground **nao representa hardware especifico**.
- Resultado: **0 problemas confirmados nessa categoria**.

### 2. Referencias e URLs

Spot-check das referencias mais sensiveis:

| Referencia | Resultado |
| --- | --- |
| Berkeley EECS-2008-134 (Roofline PDF) | OK / conteudo bate com o titulo |
| NERSC Roofline docs | OK |
| Intel Advisor CPU Roofline | OK |
| AMCR LBL Roofline page | OK / titulo bate |
| CACM "Latency Lags Bandwith" | OK; o typo `bandwith` e o slug real da ACM |
| Go Memory Model | OK |
| Rust atomics / Ordering / Nomicon | OK |
| Boehm & Adve PLDI 2008 PDF | OK / titulo e autores batem |
| OSTEP cpu-sched / mlfq / multi PDFs | OK |
| Linux CFS + EEVDF docs | OK apos inclusao do EEVDF |
| Go runtime HACKING / Go 1.14 blog | OK |
| LLVM LangRef + Kaleidoscope ch.7 | OK |
| Cytron et al. DOI `10.1145/115372.115320` | OK (resolve via Crossref) |
| Cornell CS 6120 SSA lessons | OK |
| CMU lecture10-soundness.pdf | OK / progress+preservation |
| Northeastern PFPL type-safety.pdf | OK |

Observacao de probe: alguns hosts (CACM, cppreference) podem responder `403` a clients automatizados mesmo com URL valida; o conteudo foi confirmado por busca/titulo ou por fetch alternativo.

Nao encontrei paper inventado, DOI falso ou titulo claramente incompativel com a URL.

### 3. Quiz e glossarios

- `roofline-modelo-de-performance`: respostas coerentes com memory/compute-bound e ridge point.
- `consistencia-de-memoria-e-ordering`: Relaxed/Acquire-Release/DRF-SC/mutex sem slogan falso.
- `teoria-de-scheduling`: starvation, SJF, RR, afinidade e camadas kernel/runtime corretas; q7 atualizada apos EEVDF.
- `ssa-e-otimizacoes-de-compilador`: phi, dominadores, mem2reg e bloqueio por alias corretos; glossario de frontier corrigido.
- `sistemas-de-tipos-e-soundness`: progress/preservation/escape hatch/Rust vs Go sem contradicao com o corpo.

## Cobertura por lesson

- `roofline-modelo-de-performance` - sem alucinacao confirmada
- `consistencia-de-memoria-e-ordering` - 1 URL fragil corrigida
- `teoria-de-scheduling` - 1 claim de modernidade corrigido
- `ssa-e-otimizacoes-de-compilador` - 1 definicao/glossario corrigidos
- `sistemas-de-tipos-e-soundness` - sem alucinacao confirmada

## Arquivos alterados nesta auditoria

- `src/lessons/computacao/ssa-e-otimizacoes-de-compilador/content.ts`
- `src/lessons/computacao/teoria-de-scheduling/content.ts`
- `src/lessons/computacao/teoria-de-scheduling/interactions.tsx`
- `src/lessons/computacao/consistencia-de-memoria-e-ordering/content.ts`
- `prompts/validation/fase-b-teoria-low-level-hallucination.md`

## Resultado

Auditoria de alucinacoes concluida para a Fase B de teoria low-level, com **3 problemas confirmados**, **3 corrigidos** e **0 pendencias remanescentes**.
