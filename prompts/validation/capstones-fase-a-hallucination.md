# Auditoria de alucinacoes - Capstones Fase A

Data: 2026-07-25

## Escopo

- 4 aulas em `src/lessons/computacao/`:
  - `capstone-flamegraph-para-patch`
  - `capstone-http-go-p99`
  - `capstone-parser-rust-ownership`
  - `capstone-go-vs-rust-criterio`

## Metodologia

1. Leitura manual integral das quatro lessons.
2. Varredura focada em:
   - numeros especificos de performance sem fonte
   - claims absolutos ou superfortes sobre Go/Rust
   - referencias insuficientes para afirmacoes sensiveis
   - quiz/glossario com risco de enunciado enganoso
3. Checagem pontual com fontes vivas via `WebSearch` para:
   - flamegraphs (Brendan Gregg / ACM Queue)
   - p99 e tail latency
   - benchmarking estatistico com Criterion.rs
   - profiling/benchmarking no ecossistema Rust
4. Confirmacao final de integridade com `npm run build`.

## Resumo executivo

- Aulas auditadas: **4**
- Problemas confirmados encontrados: **1**
- Problemas corrigidos: **1**
- Problemas confirmados remanescentes: **0**
- Papers inventados confirmados: **0**
- URLs falsas/quebradas confirmadas: **0**
- Numeros especificos de performance sem fonte: **0**
- Quiz com resposta factual incorreta confirmada: **0**
- Glossario com erro factual confirmado: **0**

## Problema confirmado e correcao aplicada

| Aula | Arquivo | Tipo | Evidencia | Correcao |
| --- | --- | --- | --- | --- |
| `capstone-go-vs-rust-criterio` | `src/lessons/computacao/capstone-go-vs-rust-criterio/content.ts` | Claim forte / ancoragem insuficiente | A formulacao "Rust elimina o GC do caminho central" era mais forte do que o necessario e a secao comparativa citava bem o lado Go, mas nao ancorava explicitamente o lado Rust em fontes de benchmark/profiling equivalentes. | O texto passou a dizer que Rust **normalmente nao depende de GC de proposito geral** no caminho de gerenciamento de memoria; tambem foram adicionadas referencias a **The Rust Performance Book** e **Criterion.rs** e reforcada a instrumentacao comparavel no lado Rust. |

## Checagens que passaram sem correcao

### 1. Numeros especificos de performance

- Nao encontrei claims do tipo "X vezes mais rapido", "Y% melhor", "N ms em producao" ou equivalentes sem fonte.
- Os unicos numeros recorrentes sao estruturais/editoriais, como:
  - tempos estimados da aula
  - p50/p95/p99 como nomes de percentis
  - contagens de quiz/glossario
- Resultado: **0 problemas confirmados nessa categoria**.

### 2. Referencias e URLs

Spot-check das referencias mais sensiveis usadas pelas quatro lessons:

- Brendan Gregg - flamegraphs
- ACM Queue - "The Flame Graph"
- Go docs (`diagnostics`, `net/http`, `httptrace`, `runtime/pprof`, `net/http/pprof`, `gc-guide`)
- Rust Book / Rustonomicon
- docs.rs `nom`
- docs.rs `bytes`
- std `Cow`
- Criterion.rs Documentation
- The Rust Performance Book
- Google Research - "The Tail at Scale"

Nao encontrei URL inventada, paper falso ou atribuicao claramente falsa entre as referencias auditadas.

### 3. Quiz e glossarios

- `capstone-flamegraph-para-patch`: respostas consistentes com a leitura correta de flamegraphs.
- `capstone-http-go-p99`: sem erro factual nas respostas; a precisao de definicao de p99 foi tratada no relatorio academico.
- `capstone-parser-rust-ownership`: sem slogan factual incorreto sobre lifetimes, zero-copy ou ownership.
- `capstone-go-vs-rust-criterio`: sem resposta de quiz factualmente falsa; o ponto sensivel estava no wording do corpo da aula, ja corrigido.

## Cobertura por lesson

- `capstone-flamegraph-para-patch` - sem alucinacao confirmada
- `capstone-http-go-p99` - sem alucinacao confirmada
- `capstone-parser-rust-ownership` - sem alucinacao confirmada
- `capstone-go-vs-rust-criterio` - 1 claim sensivel corrigido

## Arquivos alterados nesta auditoria

- `src/lessons/computacao/capstone-go-vs-rust-criterio/content.ts`
- `prompts/validation/capstones-fase-a-hallucination.md`

## Resultado

Auditoria de alucinacoes concluida para os capstones da Fase A, com **1 problema confirmado**, **1 corrigido** e **0 pendencias remanescentes**.
