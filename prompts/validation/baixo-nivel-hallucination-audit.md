# Auditoria de alucinacoes - Baixo nivel L1-L4

Data: 2026-07-25

## Escopo

- 36 arquivos de entrada em `src/lessons/computacao/<id>/content.ts`
- Ondas auditadas:
  - `L1_mentalidade`
  - `L2_memoria_dados`
  - `L3_rust`
  - `L4_go`
- 18 dessas aulas resolvem conteudo por fonte compartilhada
- Total efetivo auditado no texto-fonte: 21 implementacoes unicas
- URLs de referencia unicas encontradas: 120

## Metodologia

1. Inventario completo das 36 aulas a partir de `prompts/manifesto_aulas_baixo_nivel.json`.
2. Resolucao das aulas que apenas reexportam ou consomem conteudo compartilhado:
   - `src/lessons/computacao/shared/performanceWaveL1.ts`
   - `src/lessons/computacao/shared/rustWaveL3PartBContent.ts`
   - `src/lessons/computacao/shared/goWaveL4PartB.tsx`
3. Extracao automatizada de referencias, URLs, anos no corpo textual e numeros com cara de claim tecnico.
4. Probe automatizado de **todas as 120 URLs unicas** com `fetch` seguindo redirects.
5. Spot-check manual adicional, com `WebFetch`, para referencias oficiais mais sensiveis por versao/comportamento:
   - `https://go.dev/blog/container-aware-gomaxprocs`
   - `https://go.dev/blog/go119runtime`
   - `https://go.dev/blog/go15gc`
   - `https://pkg.go.dev/net/http`
   - `https://pkg.go.dev/context`
6. Revisao manual final dos pontos com mais risco de falso positivo:
   - URLs oficiais do ecossistema Go
   - versoes citadas em L4 Go (`Go 1.5`, `Go 1.14`, `Go 1.25`)
   - claims sobre pooling HTTP e reuso de conexao
   - possiveis numeros de benchmark/throughput sem fonte

## Resumo executivo

- Problemas confirmados encontrados: **0**
- Problemas corrigidos nesta auditoria: **0**
- Problemas confirmados remanescentes: **0**
- URLs falsas/quebradas confirmadas: **0**
- Anos falsos confirmados: **0**
- Numeros especificos sem fonte confirmados: **0**

## Resultado por categoria

### 1. Fake URLs

- As **120/120** URLs unicas das 36 aulas retornaram `200` no probe automatizado com redirects seguidos.
- Nao apareceu URL confirmadamente falsa, quebrada ou trocada.

### 2. Anos / versoes

- Nao encontrei anos calendarios inventados no corpo das 36 aulas.
- As mencoes de versao encontradas em L4 Go (`Go 1.5`, `Go 1.14`, `Go 1.25`) batem com as fontes oficiais checadas.
- Resultado: **0 problemas confirmados nessa categoria**.

### 3. Numeros especificos sem fonte

- Nao encontrei claims do tipo "Nx mais rapido", "Y% melhor", "Z MB/s" ou throughput factual apresentado como dado externo sem referencia.
- Valores numericos usados em interacoes/controles visuais foram tratados como estados didaticos de UI, nao como benchmark factual.
- Resultado: **0 problemas confirmados**.

## Spot-checks que mereceram validacao manual

- `Container-aware GOMAXPROCS`
  - Confirmou que o default container-aware e novidade do Go 1.25, nao uma propriedade historica do runtime.
- `Go runtime: 4 years later`
  - Confirmou soft memory limit no Go 1.19 e a sequencia de melhorias recentes do runtime.
- `Go GC: Prioritizing low latency and simplicity`
  - Confirmou a caracterizacao do collector concorrente tri-color mark-sweep do Go 1.5.
- `net/http` package docs
  - Confirmou que `Client` e `Transport` devem ser reutilizados e que o reuso de conexao persistente depende de `Body` lido ate EOF e fechado.
- `context` package docs
  - Confirmou o contrato de `CancelFunc`, o aviso sobre leak quando ela nao e chamada e a regra de usar `context.Value` apenas para dados request-scoped.

## Cobertura

### L1_mentalidade

- `performance-mental-model`
- `medir-antes-de-otimizar`
- `cpu-bound-io-bound-memory-bound`
- `latencia-vs-throughput`
- `ampdal-e-limites-do-paralelismo`
- `custo-de-abstracoes`
- `flamegraphs-e-profiling`
- `benchmarking-honesto`

### L2_memoria_dados

- `locality-data-oriented-design`
- `false-sharing-e-cache-lines`
- `alocacao-arena-pool-bump`
- `stack-vs-heap-na-pratica`
- `zero-copy-e-buffers`
- `simd-intuicao`
- `branch-prediction-e-codigo-quente`
- `undefined-behavior-mindset`

### L3_rust

- `rust-ownership-borrowing`
- `rust-lifetimes-intuicao`
- `rust-tipos-traits-zero-cost`
- `rust-error-handling`
- `rust-collections-e-alocacao`
- `rust-concurrency-send-sync`
- `rust-async-intuicao`
- `rust-unsafe-boundaries`
- `rust-ffi-e-c`
- `rust-tooling-cargo-perf`

### L4_go

- `go-modelo-mental`
- `go-goroutines-scheduler`
- `go-channels-vs-memoria-compartilhada`
- `go-escape-analysis`
- `go-gc-e-latencia`
- `go-sync-atomic-mutex`
- `go-pprof-e-benchmarks`
- `go-net-http-performance`
- `go-context-cancelamento`
- `go-vs-rust-quando-usar`

## Arquivos alterados

- `prompts/validation/baixo-nivel-hallucination-audit.md`
- `prompts/validation/baixo-nivel-hallucination-fixes.json`

## Resultado

Auditoria de alucinacoes concluida para as 36 aulas L1-L4, com **0 problemas confirmados**, **0 corrigidos** e **0 remanescentes** nas categorias pedidas: URLs falsas, anos falsos e numeros especificos sem fonte.
