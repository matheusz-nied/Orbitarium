# Validacao academica - Fase B teoria low-level

Data: 2026-07-25

## Escopo validado

Foram revisadas as 5 aulas teoricas em `src/lessons/computacao/`:

1. `roofline-modelo-de-performance`
2. `consistencia-de-memoria-e-ordering`
3. `teoria-de-scheduling`
4. `ssa-e-otimizacoes-de-compilador`
5. `sistemas-de-tipos-e-soundness`

## Metodologia de validacao

1. Leitura integral dos cinco `content.ts`, com foco em:
   - precisao conceitual do tema central de cada aula
   - coerencia de quiz e glossario com o corpo
   - limites e oversimplifications apresentados como verdade absoluta
   - qualidade e encaixe das referencias
2. Skim das interacoes quando havia risco de numeros didaticos serem lidos como claims de hardware.
3. Conferencia pontual com fontes oficiais e consagradas:
   - Berkeley Roofline (EECS-2008-134) / CACM / NERSC / Intel Advisor
   - Go Memory Model, Rustonomicon/atomics, cppreference `memory_order`, Boehm & Adve (PLDI 2008)
   - OSTEP (scheduling), Linux CFS e EEVDF docs, Go runtime HACKING / Go 1.14
   - LLVM LangRef, Kaleidoscope mutable variables, Cytron et al. (TOPLAS), Cornell CS 6120
   - CMU type soundness notes, PFPL type safety notes, Rust Book / Rustonomicon
4. Aplicacao apenas de correcoes cirurgicas quando havia risco real de imprecisao conceitual.
5. Nao foi editado `src/lessons/computacao/index.ts`.

## Contagem final

- Aulas validadas: **5**
- Achados criticos: **0**
- Achados maiores: **2**
- Achados maiores corrigidos nesta passada: **2**
- Achados menores: **3**
- Observacoes: **5**
- Achados criticos/maiores remanescentes: **0**

## Achados maiores corrigidos

| Aula | Severidade | Problema | Correcao aplicada |
| --- | --- | --- | --- |
| `ssa-e-otimizacoes-de-compilador` | Maior | A formula da dominance frontier usava "nao domina B por completo", imprecisa frente a definicao classica (Cytron et al.): o criterio correto e **nao dominancia estrita**. Em loops, o header pode dominar a si mesmo e ainda assim estar na propria frontier; a formulacao antiga falhava nesse caso. | A formula e a entrada do glossario passaram a usar "nao domina estritamente B". |
| `teoria-de-scheduling` | Maior | A secao de "pratica moderna" apresentava o CFS como ponte atual do fair scheduling do Linux sem registrar que a documentacao oficial ja aponta a sucessao pelo **EEVDF**. Em 2026 isso e enganoso para quem for mapear a aula no kernel corrente. | Texto, referencia, quiz, glossario, tags e a interacao de objetivos passaram a tratar CFS como modelo conceitual e EEVDF como fair class moderno, com link oficial para ambos. |

## Lessons aprovadas sem achados criticos/maiores

- `roofline-modelo-de-performance`
- `consistencia-de-memoria-e-ordering`
- `sistemas-de-tipos-e-soundness`

## Observacoes por lesson

### `roofline-modelo-de-performance`

- Modelo correto: intensidade operacional no eixo X, throughput no Y, diagonal de banda, teto de compute, ridge point.
- Separacao correta entre mover o ponto (locality/blocking/bytes) e erguer o teto horizontal (SIMD/compute pico).
- Limites do modelo bem calibrados: I/O, sincronizacao, serializacao e caudas ficam fora do teto principal.
- Interacoes usam maquina **normalizada didatica**; nao ha claims numericos de hardware real.
- Quiz e glossario coerentes; AXPY vs matmul esta alinhado com a literatura HPC.

### `consistencia-de-memoria-e-ordering`

- Distincao solida entre ordem do codigo fonte e observacao entre threads.
- Happens-before, Acquire/Release, Relaxed e DRF-SC estao corretos e bem ancorados em Go/Rust/C++.
- A aula evita o mito "atomic = mutex mais rapido" e trata `volatile` com a devida cautela multilinguagem.
- Quiz e glossario distinguem data race de race condition de forma adequada.
- URL versionada `/7.1/` das memory barriers foi trocada pela rota estavel sem versao (higiene; conteudo ja era o documento correto).

### `teoria-de-scheduling`

- Metricas OSTEP (turnaround, response, waiting, throughput, fairness) corretas.
- FIFO / SJF / RR / prioridade / starvation / aging estao bem posicionados como trade-offs, nao como receitas universais.
- Ponte kernel vs runtime de Go permanece correta apos o ajuste CFS/EEVDF.
- Apos a correcao, a leitura de "pratica moderna" deixa de sugerir que CFS ainda e o retrato completo do fair class do Linux.

### `ssa-e-otimizacoes-de-compilador`

- Regra SSA, phi como selecao por predecessor, def-use, const prop + DCE e mem2reg estao corretos.
- Limites por alias/side effects estao bem colocados; a aula nao promete que SSA "salva codigo ruim".
- Depois do ajuste, a intuicao de dominance frontier fica alinhada com a definicao classica (incluindo o caso de nao-dominancia estrita).

### `sistemas-de-tipos-e-soundness`

- Progress e preservation corretos e calibrados: bem tipado nao implica terminacao nem corretude de negocio.
- Ownership/borrowing como tipagem de recursos em Rust esta bem formulado, sem slogan de "Rust prova tudo".
- Comparacao Rust vs Go e honesta sobre promessas operacionais diferentes.
- Escape hatches (`unsafe`, FFI, reflection) deslocam obrigacao em vez de apagar prova; coerente com Rustonomicon.
- Quiz e glossario sem contradicao com o corpo.

## Achados menores (nao bloqueantes)

| Aula | Severidade | Nota |
| --- | --- | --- |
| `consistencia-de-memoria-e-ordering` | Menor | Glossario de `SeqCst` e util, mas permanece um pouco frouxo sobre o escopo da ordem total (operacoes SeqCst, nao "todo o programa"). Aceitavel no nivel da aula. |
| `teoria-de-scheduling` | Menor | Exemplo de burst I/O com "poucos milissegundos" e qualitativo; nao e claim de workload real, mas poderia ser ainda mais neutro. |
| `roofline-modelo-de-performance` | Menor | Glossario trata arithmetic intensity como sinonimo pleno de operational intensity; na pratica sao usados como quase-sinonimos, embora Williams et al. tenham cunhado operational intensity de proposito. |

## Registro no catalogo

Nao houve alteracao em `src/lessons/computacao/index.ts`, conforme restricao da tarefa.

## Arquivos alterados nesta validacao

- `src/lessons/computacao/ssa-e-otimizacoes-de-compilador/content.ts`
- `src/lessons/computacao/teoria-de-scheduling/content.ts`
- `src/lessons/computacao/teoria-de-scheduling/interactions.tsx`
- `src/lessons/computacao/consistencia-de-memoria-e-ordering/content.ts`
- `prompts/validation/fase-b-teoria-low-level-academic.md`

## Resultado

Validacao academica concluida para a Fase B de teoria low-level, com **0 criticos**, **2 maiores corrigidos** e **0 criticos/maiores pendentes**. Do ponto de vista academico, a Fase B esta **pronta para merge** apos estas correcoes.
