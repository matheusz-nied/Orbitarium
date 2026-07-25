# Validacao academica - Baixo nivel L4 Go

Data: 2026-07-25

## Escopo validado

Foram revisadas as 10 aulas da onda `L4_go` definidas em `prompts/manifesto_aulas_baixo_nivel.json`:

1. `go-modelo-mental`
2. `go-goroutines-scheduler`
3. `go-channels-vs-memoria-compartilhada`
4. `go-escape-analysis`
5. `go-gc-e-latencia`
6. `go-sync-atomic-mutex`
7. `go-pprof-e-benchmarks`
8. `go-net-http-performance`
9. `go-context-cancelamento`
10. `go-vs-rust-quando-usar`

## Contagem final

- Aulas validadas: **10**
- Achados criticos: **0**
- Achados maiores: **2**
- Achados maiores corrigidos nesta passada: **2**
- Achados criticos/maiores remanescentes: **0**

## Achados maiores corrigidos

| Aula | Severidade | Problema | Correcao aplicada |
| --- | --- | --- | --- |
| `go-net-http-performance` | Maior | A aula atribuía pooling e reuso de conexoes ao `http.Client` de forma ampla demais, o que podia levar o leitor a concluir incorretamente que criar um `Client` novo por chamada sempre destrói keep-alive. A documentacao oficial do `net/http` e mais precisa: o estado de conexoes em cache mora tipicamente no `Transport`, clientes e transports devem ser reutilizados, e um `Client` com `Transport` nulo ainda recorre ao `DefaultTransport`. | Reescritos os trechos de cliente/transporte para explicitar que o custo principal vem de perder reuso de `Transport` e de recriar a pilha HTTP sem politica coerente. A aula agora tambem explica que o `Body` precisa ser fechado e, para reuso da conexao persistente, lido ate EOF antes do `Close`. |
| `go-goroutines-scheduler` | Maior | A secao sobre containers e `GOMAXPROCS` tratava oversubscription como se a orientacao fosse atemporal, sem datar a mudanca importante do Go 1.25. Isso podia fazer o aluno aplicar uma heuristica antiga sem perceber que o default atual ja e container-aware quando nao ha override explicito. | Ajustado o texto para deixar claro o comportamento historico pre-Go 1.25, o novo default container-aware e o fato de que overrides manuais e workloads espinhosos ainda exigem leitura critica do ambiente. |

## Aulas sem achados criticos/maiores

- `go-modelo-mental`
- `go-channels-vs-memoria-compartilhada`
- `go-escape-analysis`
- `go-gc-e-latencia`
- `go-sync-atomic-mutex`
- `go-pprof-e-benchmarks`
- `go-context-cancelamento`
- `go-vs-rust-quando-usar`

## Observacoes de atencao especial

### `go-gc-e-latencia`

Sem problema critico/maior remanescente. A aula continua correta ao tratar GC como orcamento entre memoria e CPU, distinguir pausas explicitas de custo distribuido e situar `GOGC` ao lado do soft memory limit introduzido nas releases mais recentes.

### `go-context-cancelamento`

Sem problema critico/maior remanescente. A aula esta alinhada com a documentacao oficial ao enfatizar:

- `CancelFunc` deve ser chamado para liberar timers e referencias
- `context.Value` deve carregar apenas dados request-scoped
- o pacote modela vida util e cancelamento cooperativo, nao parametros arbitrarios

### `go-sync-atomic-mutex`

Sem problema critico/maior remanescente. O texto esta correto ao tratar `sync/atomic` como ferramenta low-level, destacar DRF-SC no memory model e evitar a simplificacao errada de que atomics isolados protegem invariantes compostas.

## Fontes usadas para checagem fina desta validacao

Além das referencias ja presentes nas aulas, usei como confirmacao pontual para os trechos corrigidos:

- `net/http` package docs em `pkg.go.dev`
- `context` package docs em `pkg.go.dev`
- Go Blog: `Container-aware GOMAXPROCS`
- Go Blog: `Go runtime: 4 years later`
- Go Blog: `Go GC: Prioritizing low latency and simplicity`

## Arquivos alterados

- `src/lessons/computacao/go-goroutines-scheduler/content.ts`
- `src/lessons/computacao/shared/goWaveL4PartB.tsx`
- `prompts/validation/baixo-nivel-academic-L4.md`

## Resultado

Validacao academica concluida para as 10 aulas Go do L4, com **0 criticos**, **2 maiores corrigidos** e **0 criticos/maiores pendentes**.
