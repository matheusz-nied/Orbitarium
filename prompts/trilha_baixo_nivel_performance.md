# Trilha: Baixo Nível, Performance, Rust e Go

Especialização para quem já programa e quer dominar **systems programming**, **performance engineering** e duas linguagens centrais nesse caminho: **Rust** e **Go**.

**Branch recomendada:** a mesma de Computação (`cursor/plano-trilha-computacao-a640`).  
Motivo: reutiliza a base já criada (CPU, cache, memória, SO, syscalls, concorrência) e evita fragmentar o catálogo.

Manifesto de IDs: `prompts/manifesto_aulas_baixo_nivel.json`  
Trilha-mãe: `prompts/trilha_computacao.md`

---

## Para quem é

- Dev que já entrega software e quer ir para **baixo nível / performance / infraestrutura**
- Objetivo: ler o hardware com a cabeça, medir certo, escrever Rust/Go com critério, não “otimizar no escuro”

## Pré-requisitos (já no catálogo de Computação)

Estude antes (ou em paralelo no começo):

| Tema | Slug |
|---|---|
| CPU | `como-funciona-uma-cpu` |
| Stack/Heap/Ponteiros | `memoria-stack-heap-ponteiros` |
| Cache | `cache-de-cpu` |
| RAM | `como-funciona-a-memoria-ram` |
| SO | `como-funciona-um-sistema-operacional` |
| Processos/Threads | `processos-threads-concorrencia` |
| Memória virtual | `memoria-virtual` |
| Syscalls | `syscalls-kernel` |
| Pipeline / ISA | `pipeline-de-cpu`, `isa-x86-arm-riscv` |
| Concorrência baixo nível | `concorrencia-baixo-nivel` |
| Segurança de memória | `seguranca-de-memoria` |

Esta trilha **não repete** esses temas: ela **aprofunda e aplica**.

---

## Mapa das ondas

```text
Onda L1  Mentalidade de performance e medição
   ↓
Onda L2  Memória, locality e custo real de abstrações
   ↓
Onda L3  Rust para systems
   ↓
Onda L4  Go para concurrency e serviços rápidos
   ↓
Onda L5  Performance engineering na prática
   ↓
Onda L6  (opcional) Especialização avançada
```

Categoria primária: `computacao`  
Secundária frequente: `engenharia` (e `inteligencia-artificial` só quando houver ponte clara, ex. serving)

Pasta sugerida: `src/lessons/computacao/<id>/`  
(alternativamente `src/lessons/baixo-nivel/<id>/` com primary `computacao` — manter `computacao/` para simplicidade do catálogo)

---

## Onda L1 — Mentalidade de performance (8 aulas)

Ordem de implementação: **primeira**.

| # | ID | Título | Nível | Ideia central | Interações |
|---|---|---|---|---|---|
| L1.1 | `performance-mental-model` | Modelo Mental de Performance | Intermediário | CPU/memória/IO/locks como orçamentos | Classificar gargalo; budget de latência |
| L1.2 | `medir-antes-de-otimizar` | Medir Antes de Otimizar | Intermediário | Sem hipótese + medição, otimização é teatro | Hipótese → métrica → experimento |
| L1.3 | `cpu-bound-io-bound-memory-bound` | CPU-bound, I/O-bound e Memory-bound | Intermediário | O tipo de bound muda a solução | Seletor de sintoma → bound provável |
| L1.4 | `latencia-vs-throughput` | Latência vs Throughput | Intermediário | Otimizar um pode piorar o outro | Fila M/M/1 toy; batch vs online |
| L1.5 | `ampdal-e-limites-do-paralelismo` | Amdahl e os Limites do Paralelismo | Intermediário | Parte serial domina o ganho | Slider da fração paralelizável |
| L1.6 | `custo-de-abstracoes` | Custo de Abstrações | Intermediário | Zero-cost vs “parece barato” | Contar alocações/chamadas em snippets |
| L1.7 | `flamegraphs-e-profiling` | Flamegraphs e Profiling | Intermediário | Ver onde o tempo realmente vai | Ler flamegraph; on/off-CPU |
| L1.8 | `benchmarking-honesto` | Benchmarking Honesto | Avançado | Microbench mente fácil | Warmup, noise, regression trap |

**Fontes-guia:** Brendan Gregg (systems performance), Google SRE (medição), docs `perf`, pprof, Criterion/Go benchmarking guides.

---

## Onda L2 — Memória, locality e dados (8 aulas)

| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| L2.1 | `locality-data-oriented-design` | Locality e Data-Oriented Design | Intermediário | Layout de dados > micro-otimismo cego |
| L2.2 | `false-sharing-e-cache-lines` | False Sharing e Cache Lines | Avançado | Contenção invisível entre cores |
| L2.3 | `alocacao-arena-pool-bump` | Alocação: Arena, Pool e Bump | Intermediário | Controlar lifetime em lote |
| L2.4 | `stack-vs-heap-na-pratica` | Stack vs Heap na Prática | Intermediário | Escape analysis mental (linguagem-agnóstico) |
| L2.5 | `zero-copy-e-buffers` | Zero-Copy e Buffers | Intermediário | Copiar menos; ownership de buffers |
| L2.6 | `simd-intuicao` | SIMD: Intuição de Paralelismo de Dados | Avançado | Mesma operação em vários lanes |
| L2.7 | `branch-prediction-e-codigo-quente` | Branch Prediction e Código Quente | Avançado | Ramos imprevisíveis custam |
| L2.8 | `undefined-behavior-mindset` | Mindset de Undefined Behavior | Avançado | O compilador assume regras; quebrá-las dói |

---

## Onda L3 — Rust para systems (10 aulas)

| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| L3.1 | `rust-ownership-borrowing` | Rust: Ownership e Borrowing | Intermediário | Uma dona; empréstimos com regras |
| L3.2 | `rust-lifetimes-intuicao` | Rust: Lifetimes (Intuição) | Avançado | Anotar relações, não “tempo de vida mágico” |
| L3.3 | `rust-tipos-traits-zero-cost` | Rust: Tipos, Traits e Zero-Cost | Intermediário | Abstrair sem pagar runtime à toa |
| L3.4 | `rust-error-handling` | Rust: Erros com `Result` e `?` | Intermediário | Falhas explícitas como parte do design |
| L3.5 | `rust-collections-e-alocacao` | Rust: Collections e Alocação | Intermediário | `Vec`, `HashMap`, capacidade, cloning |
| L3.6 | `rust-concurrency-send-sync` | Rust: Concurrency, `Send` e `Sync` | Avançado | Fearless concurrency com tipos |
| L3.7 | `rust-async-intuicao` | Rust: Async (Intuição) | Avançado | Future, runtime, quando async ajuda/atrapalha |
| L3.8 | `rust-unsafe-boundaries` | Rust: Unsafe e Fronteiras Seguras | Avançado | Isolar invariantes; não espalhar `unsafe` |
| L3.9 | `rust-ffi-e-c` | Rust: FFI com C | Avançado | Crossing ABI com disciplina |
| L3.10 | `rust-tooling-cargo-perf` | Rust: Cargo, Tests e Perf Tooling | Intermediário | `cargo`, benches, `perf`/instruments overview |

**Fontes-guia:** The Rust Book, Rustonomicon, Rust API Guidelines, docs.rs std, Tokio tutorial (conceitual).

---

## Onda L4 — Go para concurrency e serviços (10 aulas)

| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| L4.1 | `go-modelo-mental` | Go: Modelo Mental da Linguagem | Intermediário | Simplicidade deliberada e trade-offs |
| L4.2 | `go-goroutines-scheduler` | Go: Goroutines e Scheduler | Intermediário | M:N scheduling; o que é “barato” |
| L4.3 | `go-channels-vs-memoria-compartilhada` | Go: Channels vs Memória Compartilhada | Intermediário | Comunicação vs sincronização |
| L4.4 | `go-escape-analysis` | Go: Escape Analysis e Alocação | Avançado | Stack vs heap no compilador Go |
| L4.5 | `go-gc-e-latencia` | Go: GC e Latência | Avançado | O GC não é inimigo — mas tem custo |
| L4.6 | `go-sync-atomic-mutex` | Go: `sync`, Atomic e Mutex | Intermediário | Primitivas certas para cada disputa |
| L4.7 | `go-pprof-e-benchmarks` | Go: pprof e Benchmarks | Intermediário | CPU/heap/block profiles na prática |
| L4.8 | `go-net-http-performance` | Go: `net/http` e Performance | Intermediário | Conexões, buffers, timeouts, pooling |
| L4.9 | `go-context-cancelamento` | Go: `context` e Cancelamento | Intermediário | Propagar deadline e cancelamento |
| L4.10 | `go-vs-rust-quando-usar` | Go vs Rust: Quando Usar Cada Um | Intermediário | Critérios de escolha sem fanatismo |

**Fontes-guia:** Go Blog (scheduler, GC), Effective Go, Go Diagnostics, Dave Cheney / official Go performance materials, Go memory model.

---

## Onda L5 — Performance engineering na prática (8 aulas)

| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| L5.1 | `metodologia-de-otimizacao` | Metodologia de Otimização | Intermediário | Ciclo: observar → hipótese → experimento → validar |
| L5.2 | `contencao-locks-e-filas` | Contenção, Locks e Filas | Avançado | Esperar também é custo |
| L5.3 | `lock-free-com-cuidado` | Lock-Free (com Cuidado) | Avançado | Não é automaticamente mais rápido |
| L5.4 | `syscalls-e-overhead-de-io` | Syscalls e Overhead de I/O | Intermediário | Cruzar o kernel tem preço |
| L5.5 | `network-performance-basics` | Network Performance Basics | Intermediário | Buffers, Nagle, keepalive, backpressure |
| L5.6 | `compiladores-e-otimizacoes` | Compiladores e Otimizações | Intermediário | Inline, LTO, PGO (conceitual) |
| L5.7 | `debugging-nativo` | Debugging Nativo: perf, strace, gdb/dlv | Avançado | Ferramentas certas por sintoma |
| L5.8 | `performance-em-producao` | Performance em Produção | Avançado | SLOs, regressão, capacity, trade-offs de negócio |

---

## Onda L6 — Opcional / especialização (8 aulas)

Só depois de L1–L5:

| ID | Título | Nota |
|---|---|---|
| `linux-perf-events-avancado` | Linux `perf` Avançado | Contadores, sampling bias |
| `io-uring-intuicao` | io_uring (Intuição) | I/O assíncrono moderno no Linux |
| `ebpf-observabilidade` | eBPF para Observabilidade | Poder e risco operacional |
| `rust-unsafe-avancado` | Rust Unsafe Avançado | Aliasing, stacked borrows (intuição) |
| `go-assembly-e-intrinsics` | Go: Assembly e Intrinsics | Quando descer um nível |
| `memory-allocators-internos` | Allocators Internos | jemalloc/mimalloc conceitualmente |
| `numa-e-afinidade` | NUMA e Afinidade de CPU | Multisocket reality |
| `writing-fast-code-checklist` | Checklist de Código Rápido | Síntese operacional da trilha |

---

## Ordem de implementação (sprints)

### Sprint S1 — Onda L1 (mentalidade)
Implementar L1.1 → L1.8

### Sprint S2 — Onda L2 (memória/dados)
Implementar L2.1 → L2.8

### Sprint S3 — Onda L3 (Rust)
Implementar L3.1 → L3.10  
(Pode começar L3.1–L3.3 em paralelo ao fim de S2)

### Sprint S4 — Onda L4 (Go)
Implementar L4.1 → L4.10

### Sprint S5 — Onda L5 (prática)
Implementar L5.1 → L5.8

### Sprint S6 — Onda L6 (opcional)
Sob demanda

---

## Trilhas de estudo sugeridas

### Dev → Systems/Performance (caminho principal)
```text
Pré-reqs Computação (CPU/cache/memória/SO/syscalls)
  → L1 medição
  → L2 locality/memória
  → L3 Rust
  → L5 prática
  → L4 Go (se stack/serviços exigirem)
```

### Foco serviços concorrentes (mais Go)
```text
Pré-reqs + L1 → L4 → L5.2/L5.4/L5.5 → L2.5 → L3 seletiva (ownership/FFI)
```

### Foco engines / infra crítica (mais Rust)
```text
Pré-reqs + L1 → L2 → L3 → L5 → L6 (unsafe/perf/NUMA)
```

### Comparativo deliberado Rust × Go
```text
L3.1–L3.6 ↔ L4.1–L4.6 → L4.10 → L5.1
```

---

## Contagem

| Onda | Aulas | Acumulado |
|---|---|---|
| L1 | 8 | 8 |
| L2 | 8 | 16 |
| L3 Rust | 10 | 26 |
| L4 Go | 10 | 36 |
| L5 Prática | 8 | **44** |
| L6 Opcional | 8 | 52 |

**Núcleo recomendado: 44 aulas (L1–L5).**

---

## Regras de qualidade específicas desta trilha

1. **Nunca inventar números** de latência/ns/GB/s — usar ordens de grandeza com fonte ou falar qualitativamente  
2. Preferir **metodologia** a “truques”  
3. Em Rust/Go: ensinar **trade-offs**, não evangelismo  
4. Interações devem forçar o aluno a **escolher bound, ler profile, ou prever custo**  
5. Conectar cada aula a pelo menos um pré-requisito da trilha de Computação  
6. Fontes: Rust Book, Rustonomicon, Go Blog, Gregg Systems Performance, `man perf`, docs oficiais

---

## Status

## Próximo passo recomendado

Depois de L1–L5, seguir:

- `prompts/trilha_capstones_e_teoria.md` (capstones → teoria low-level → teoria IA)
- Manifesto: `prompts/manifesto_aulas_capstones_teoria.json`

Não abrir trilha ofensiva de hacking; segurança só como fase defensiva opcional nesse plano.

---

## Status

- [x] Plano escrito (`prompts/trilha_baixo_nivel_performance.md`)
- [x] Manifesto de IDs (`prompts/manifesto_aulas_baixo_nivel.json`)
- [x] Onda L1 implementada
- [x] Onda L2 implementada
- [x] Onda L3 (Rust) implementada
- [x] Onda L4 (Go) implementada
- [ ] Onda L5 implementada *(ver PR da onda L5 se ainda não mergeada)*
- [ ] Onda L6 opcional
- [x] Validação acadêmica + anti-alucinação *(L1–L4; L5 no PR dedicado)*
- [x] Registro no catálogo + build verde *(até L4 na main; L5 via PR)*
