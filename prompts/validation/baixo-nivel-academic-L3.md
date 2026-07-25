# Validacao academica - Rust baixo nivel L3

## Escopo validado

Foram auditadas as 10 aulas `rust-*` em `src/lessons/computacao/`:

1. `rust-ownership-borrowing`
2. `rust-lifetimes-intuicao`
3. `rust-tipos-traits-zero-cost`
4. `rust-error-handling`
5. `rust-collections-e-alocacao`
6. `rust-concurrency-send-sync`
7. `rust-async-intuicao`
8. `rust-unsafe-boundaries`
9. `rust-ffi-e-c`
10. `rust-tooling-cargo-perf`

## Criterio de checagem

Para os temas pedidos pelo escopo do usuario, a validacao foi ancorada principalmente em fontes oficiais do projeto Rust:

- The Rust Programming Language:
  - cap. 4 (`ownership`, `borrowing`, `slices`)
  - cap. 10 (`lifetimes`)
  - cap. 16.4 (`Send`/`Sync`)
  - cap. 17 (`async`/`await`)
  - cap. 20.1 (`unsafe`)
- Rustonomicon:
  - `send-and-sync`
  - `ffi`
  - `other-reprs`

Como duas aulas do lote tratam de fronteiras mais especificas, tambem usei confirmacao oficial complementar:

- Rust Reference (`lifetime elision`, `type layout`, `panic` / unwinding across FFI)
- Cargo Book (`cargo bench`, `profiles`)
- Rust Performance Book (profiling)

## Contagem final

- Aulas validadas: **10**
- Achados criticos: **0**
- Achados maiores: **3**
- Achados maiores corrigidos nesta passada: **3**
- Achados criticos/maiores remanescentes: **0**

## Achados maiores corrigidos

| Aula | Severidade | Problema | Correcao aplicada |
| --- | --- | --- | --- |
| `rust-ffi-e-c` | Maior | O texto sobre `repr(C)` simplificava demais a historia de layout e podia soar como se o atributo, por si so, tornasse `structs` e `enums` adequados para qualquer fronteira FFI. Isso e arriscado especialmente para enums, que tem nuances reais de representacao e validade. | Ajustado o texto principal, a definicao e a interacao de layout para deixar claro que `repr(C)` **aproxima** a representacao binaria, mas nao torna qualquer tipo automaticamente FFI-safe; enums seguem exigindo analise caso a caso. |
| `rust-ffi-e-c` | Maior | A secao sobre unwinding falava em "refletir o acordo corretamente", mas nao explicitava que deixar panic/excecao atravessar uma ABI nao-unwind, como `extern "C"`, e UB. | O trecho agora cita explicitamente `extern "C-unwind"` como caso de ABI que permite unwind e marca a travessia por ABI nao-unwind como **comportamento indefinido**. |
| `rust-tooling-cargo-perf` | Maior | A aula tratava `cargo bench` como workflow padrao sem avisar a nuance mais importante para quem usa stable: o harness nativo com `#[bench]` continua nightly-only. | Adicionados esclarecimentos no corpo da aula, no glossario e na interacao: `cargo bench` existe no stable, mas o harness nativo `#[bench]` segue unstable; em stable, e comum usar harness customizado, como Criterion. |

## Aulas sem achados criticos/maiores

- `rust-ownership-borrowing`
- `rust-lifetimes-intuicao`
- `rust-tipos-traits-zero-cost`
- `rust-error-handling`
- `rust-collections-e-alocacao`
- `rust-concurrency-send-sync`
- `rust-async-intuicao`
- `rust-unsafe-boundaries`

## Notas de validacao por tema

### Ownership e borrowing

Sem overclaim critico ou maior remanescente. A aula esta alinhada com o Rust Book ao tratar:

- move como transferencia de ownership, nao copia
- `&T` / `&mut T` como contratos de acesso, nao apenas sintaxe
- slices como views sobre armazenamento alheio
- `Clone` como decisao semantica e de custo, nao "solucao padrao"

### Lifetimes

Sem achado critico/maior. A aula evita o erro classico de ensinar lifetime como "duracao adicionada ao valor" e mantem a leitura correta de lifetimes como relacoes de validade entre referencias e escopos.

### Send e Sync

Sem achado critico/maior. O material esta coerente com Rust Book + Rustonomicon ao:

- separar transferencia de ownership (`Send`) de compartilhamento por referencia (`Sync`)
- nao tratar `Arc<T>` como selo automatico de thread-safety
- reconhecer `Rc`, `Cell`, `RefCell` e `UnsafeCell` como excecoes pedagogicas relevantes
- tratar `unsafe impl Send/Sync` como fronteira rara e delicada

### Async

Sem achado critico/maior. A aula nao overclaima paralelismo automatico e preserva os pontos certos:

- future como computacao inerte, nao thread secreta
- `poll` / `Pending` / `Waker` como centro do modelo
- async como excelente para espera concorrente
- CPU-bound exigindo outra estrategia alem de `.await`

### Unsafe

Sem achado critico/maior. A aula esta boa ao manter:

- `unsafe` como deslocamento de prova, nao desligamento geral da linguagem
- foco em invariantes e soundness
- `UnsafeCell`, raw pointers e `MaybeUninit` como ferramentas legitimas, mas perigosas
- Miri e sanitizers como apoio de auditoria, nao prova automatica de soundness

### FFI

Era o ponto mais delicado do lote. Depois dos ajustes, a aula volta a separar melhor:

- ABI de semantica de ownership
- `repr(C)` de FFI-safety total
- layout previsivel de compatibilidade binaria plena
- unwinding permitido por ABI apropriada de unwind proibido por ABI nao-unwind

### Cargo / perf tooling

Depois da correcao, a aula continua correta ao distinguir:

- `cargo check` de build final
- perfis de compilacao de harness de benchmark
- benchmark de profiling
- build representativa de conveniencia local

## Arquivos alterados

- `src/lessons/computacao/shared/rustWaveL3PartBContent.ts`
- `src/lessons/computacao/shared/rustWaveL3PartBInteractions.tsx`
- `prompts/validation/baixo-nivel-academic-L3.md`

## Fontes usadas para checagem fina desta validacao

- https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html
- https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html
- https://doc.rust-lang.org/book/ch16-04-extensible-concurrency-sync-and-send.html
- https://doc.rust-lang.org/book/ch17-00-async-await.html
- https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html
- https://doc.rust-lang.org/nomicon/send-and-sync.html
- https://doc.rust-lang.org/nomicon/ffi.html
- https://doc.rust-lang.org/nomicon/other-reprs.html
- https://doc.rust-lang.org/reference/type-layout.html
- https://doc.rust-lang.org/reference/panic.html
- https://doc.rust-lang.org/cargo/commands/cargo-bench.html
- https://doc.rust-lang.org/cargo/reference/profiles.html
- https://nnethercote.github.io/perf-book/profiling.html

## Comandos executados

- mapeamento e leitura dos arquivos `rust-*` em `src/lessons/computacao/`
- buscas direcionadas com `rg` nos conteudos, interacoes e visuais
- leitura do catalogo em `src/lessons/computacao/index.ts`
- consulta a fontes oficiais do Rust Book, Rustonomicon, Rust Reference e Cargo Book
- `npm run build`

## Verificacao executada

- `npm run build` passou com sucesso
- `validate:lessons`: **101 aula(s)** validadas
- `tsc -b`: passou
- `vite build`: passou

## Resultado

Validacao academica concluida para o lote solicitado, com **0 criticos**, **3 maiores corrigidos** e **0 criticos/maiores pendentes**.
