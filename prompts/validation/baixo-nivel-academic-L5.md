# Validacao academica - Baixo nivel L5 pratica

Data: 2026-07-25

## Escopo validado

Foram revisadas as 8 aulas da onda `L5_pratica` definidas em `prompts/manifesto_aulas_baixo_nivel.json`:

1. `metodologia-de-otimizacao`
2. `contencao-locks-e-filas`
3. `lock-free-com-cuidado`
4. `syscalls-e-overhead-de-io`
5. `network-performance-basics`
6. `compiladores-e-otimizacoes`
7. `debugging-nativo`
8. `performance-em-producao`

## Contagem final

- Aulas validadas: **8**
- Achados criticos: **0**
- Achados maiores: **1**
- Achados maiores corrigidos nesta passada: **1**
- Achados criticos/maiores remanescentes: **0**

## Achados maiores corrigidos

| Aula | Severidade | Problema | Correcao aplicada |
| --- | --- | --- | --- |
| `performance-em-producao` | Maior | A aula tratava `SLO` como meta observavel, mas sem explicitar o papel de **error budget** como mecanismo operacional que liga a meta a decisoes sobre releases, risco e priorizacao. Isso deixava a pratica de SRE incompleta: o leitor podia sair com um dashboard bonito, mas sem criterio claro para reagir quando a margem de confiabilidade se esgota. | Reescrevi a secao `sli-slo` para introduzir error budget de forma explicita, acrescentei referencias oficiais do `Google SRE Workbook`, inclui a politica no checklist de maturidade, adicionei o termo ao glossario e atualizei uma pergunta do quiz para refletir a correcao. |

## Aulas sem achados criticos/maiores

- `metodologia-de-otimizacao`
- `contencao-locks-e-filas`
- `lock-free-com-cuidado`
- `syscalls-e-overhead-de-io`
- `network-performance-basics`
- `compiladores-e-otimizacoes`
- `debugging-nativo`

## Observacoes de atencao especial

### `lock-free-com-cuidado`

Sem problema critico/maior remanescente. A aula esta alinhada com a terminologia correta de progresso concorrente:

- diferencia `obstruction-free`, `lock-free` e `wait-free`
- evita o mito de que `lock-free` significa "sempre mais rapido"
- trata `ABA`, ordering e memory reclamation como as dores reais da tecnica
- esta coerente com `The Go Memory Model`, `sync/atomic` e a documentacao de atomics do Rust

### `network-performance-basics`

Sem problema critico/maior remanescente. O texto esta correto ao:

- tratar `TCP_NODELAY` como desativacao do atraso ligado a Nagle, e nao como botao universal de performance
- distinguir `keepalive` de timeout/deadline de aplicacao
- apresentar `backpressure` como mecanismo de controle, nao como falha a ser mascarada

Os dois links da Red Hat usados como apoio retornaram `403` no probe bruto com `urllib`, mas o conteudo foi recuperado com `WebFetch`; portanto, nao foram tratados como URLs quebradas.

### `compiladores-e-otimizacoes`

Sem problema critico/maior remanescente. A aula esta consistente com a documentacao oficial ao apresentar:

- `inline`, `LTO` e `PGO` como formas diferentes de aumentar contexto para o compilador
- `ThinLTO` como compromisso de escalabilidade, nao como tecnica distinta sem relacao com LTO
- `PGO` como processo dependente de workload representativo, com risco real de enviesar o binario quando o perfil e artificial

### `performance-em-producao`

Depois da correcao, a aula ficou alinhada com a pratica oficial de SRE ao combinar:

- `SLI` e `SLO` como compromisso observavel
- `error budget` como politica operacional para risco e releases
- regressao por release, percentis, capacity planning e degradacao graciosa como guardrails do sistema

## Fontes usadas para checagem fina desta validacao

Além das referencias ja presentes nas aulas, usei como confirmacao pontual para os trechos sensiveis:

- `The Go Memory Model` em `go.dev/ref/mem`
- `tcp(7)` e `socket(7)` em `man7.org`
- Red Hat docs sobre `TCP_NODELAY` e tuning de throughput TCP
- `Profile-guided Optimization` no `rustc Book`
- `ThinLTO` na documentacao do Clang/LLVM
- `Service Level Objectives`, `Implementing SLOs` e `Error Budget Policy` em `sre.google`

## Arquivos alterados

- `src/lessons/computacao/shared/performanceWaveL5PartB.tsx`
- `prompts/validation/baixo-nivel-academic-L5.md`
- `prompts/validation/baixo-nivel-hallucination-L5.md`

## Resultado

Validacao academica concluida para as 8 aulas de `L5_pratica`, com **0 criticos**, **1 maior corrigido** e **0 criticos/maiores pendentes**.
