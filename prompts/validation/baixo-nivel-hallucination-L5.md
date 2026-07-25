# Auditoria de alucinacoes - Baixo nivel L5 pratica

Data: 2026-07-25

## Escopo

- 8 aulas da onda `L5_pratica`
- 8 entradas de aula resolvidas em 2 fontes compartilhadas de conteudo:
  - `src/lessons/computacao/shared/performanceWaveL5PartA.ts`
  - `src/lessons/computacao/shared/performanceWaveL5PartB.tsx`
- 49 URLs de referencia unicas encontradas nessas aulas
- 64 perguntas de quiz revisadas (`8 aulas x 8 perguntas`)

## Metodologia

1. Inventario completo das 8 aulas a partir de `prompts/manifesto_aulas_baixo_nivel.json`.
2. Resolucao das aulas que consomem conteudo compartilhado em `performanceWaveL5PartA.ts` e `performanceWaveL5PartB.tsx`.
3. Extracao de referencias, URLs, anos e numeros com cara de claim tecnico.
4. Probe automatizado das **49 URLs unicas** com `python3` + `urllib`, tentando `HEAD` e depois `GET`.
5. Revalidacao manual dos 2 links da Red Hat que retornaram `403` no probe bruto; ambos abriram normalmente via `WebFetch`, entao nao foram classificados como quebrados.
6. Spot-check manual com fontes oficiais para os trechos de maior risco de alucinacao:
   - lock-free, ordering e atomics em Go/Rust
   - Nagle, `TCP_NODELAY`, keepalive e buffers
   - `LTO`, `ThinLTO` e `PGO`
   - `SLO`, `error budget`, regressao e capacidade
7. Revisao final de todas as 64 perguntas de quiz para conferir aderencia ao texto e ausencia de alternativa correta ambigua.

## Resumo executivo

- Problemas confirmados nas categorias de alucinacao pedidas: **0**
- Problemas corrigidos nessas categorias: **0**
- Problemas confirmados remanescentes: **0**
- URLs falsas/quebradas confirmadas: **0**
- Questoes de quiz incorretas confirmadas: **0**
- Numeros especificos sem fonte confirmados: **0**

## Resultado por categoria

### 1. Fake URLs

- Das **49/49** URLs unicas, **47** responderam normalmente no probe automatizado bruto.
- As outras **2** eram paginas da Red Hat que bloquearam o probe com `403`, mas abriram via `WebFetch` com conteudo valido.
- Resultado final: **0 URLs falsas ou quebradas confirmadas**.

### 2. Quiz correctness

- Revisei as **64/64** perguntas de quiz das 8 aulas.
- Nao encontrei alternativa marcada como correta que contrariasse o corpo da aula ou a documentacao oficial consultada.
- Houve **1 ajuste editorial de quiz** em `performance-em-producao` para refletir a correcao academica sobre `SLO` + `error budget`, mas a versao anterior nao configurava alucinacao factual isolada.
- Resultado final: **0 quizzes incorretos confirmados**.

### 3. Numeros especificos sem fonte

- Nao encontrei claims do tipo "Nx mais rapido", "Y% melhor", "Z req/s", "K MB/s" ou equivalentes apresentados como fato externo sem referencia.
- Os poucos numeros do texto funcionam como:
  - percentis conceituais (`p95`, `p99`)
  - contagens estruturais de quiz/aulas
  - exemplos hipoteticos explicitamente didaticos, nao benchmarks do mundo real
- Resultado final: **0 problemas confirmados**.

## Spot-checks que mereceram validacao manual

- `The Go Memory Model`
  - Confirmou que as operacoes de `sync/atomic` em Go se comportam como se estivessem em uma ordem sequencialmente consistente.
- `tcp(7)` e `socket(7)`
  - Confirmaram a caracterizacao de `TCP_NODELAY`, `SO_KEEPALIVE` e a distincao entre envio de pequenos segmentos e politicas de timeout na aplicacao.
- Red Hat docs sobre `TCP_NODELAY`
  - Confirmaram que habilitar `TCP_NODELAY` nao corrige framing ruim e pode piorar a eficiencia se a aplicacao continuar emitindo muitos pequenos writes logicamente relacionados.
- `rustc Book` e docs do Clang
  - Confirmaram `PGO` como ciclo de instrumentacao/perfil/recompilacao e `ThinLTO` como forma escalavel de LTO.
- `Google SRE Book` e `Workbook`
  - Confirmaram o papel de `SLO` como meta observavel e de `error budget` como mecanismo operacional de priorizacao e controle de risco.

## Cobertura

- `metodologia-de-otimizacao`
- `contencao-locks-e-filas`
- `lock-free-com-cuidado`
- `syscalls-e-overhead-de-io`
- `network-performance-basics`
- `compiladores-e-otimizacoes`
- `debugging-nativo`
- `performance-em-producao`

## Arquivos alterados

- `src/lessons/computacao/shared/performanceWaveL5PartB.tsx`
- `prompts/validation/baixo-nivel-academic-L5.md`
- `prompts/validation/baixo-nivel-hallucination-L5.md`

## Resultado

Auditoria de alucinacoes concluida para as 8 aulas de `L5_pratica`, com **0 problemas confirmados** nas categorias pedidas (URLs falsas/quebradas, quiz incorreto e numeros especificos sem fonte), **0 corrigidos** nessas categorias e **0 remanescentes**.
