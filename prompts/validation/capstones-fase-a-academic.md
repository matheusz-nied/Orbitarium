# Validacao academica - Capstones Fase A

Data: 2026-07-25

## Escopo validado

Foram revisadas as 4 aulas capstone em `src/lessons/computacao/`:

1. `capstone-flamegraph-para-patch`
2. `capstone-http-go-p99`
3. `capstone-parser-rust-ownership`
4. `capstone-go-vs-rust-criterio`

## Metodologia de validacao

1. Leitura integral das quatro lessons, com foco em:
   - solidez metodologica da oficina
   - precisao tecnica de Go, Rust, profiling e benchmarking
   - correicao conceitual de quiz e glossario
   - qualidade e encaixe das referencias
2. Conferencia pontual com fontes oficiais e consagradas:
   - Brendan Gregg / ACM Queue para flamegraphs
   - Go docs (`diagnostics`, `net/http`, `httptrace`, `pprof`, `gc-guide`)
   - Rust Book e Rustonomicon para ownership/borrowing/lifetimes
   - Rust Performance Book e Criterion.rs para metodologia de benchmark no lado Rust
   - "The Tail at Scale" para percentis e cauda de latencia
3. Aplicacao apenas de correcoes cirurgicas quando havia risco real de imprecisao conceitual ou de assimetria metodologica.
4. Verificacao final com `npm run build`, que tambem executa `validate:lessons`.

## Contagem final

- Aulas validadas: **4**
- Achados criticos: **0**
- Achados maiores: **2**
- Achados maiores corrigidos nesta passada: **2**
- Achados criticos/maiores remanescentes: **0**

## Achados maiores corrigidos

| Aula | Severidade | Problema | Correcao aplicada |
| --- | --- | --- | --- |
| `capstone-http-go-p99` | Maior | A definicao textual de `p99` e a entrada correspondente do glossario estavam corretas na intuicao, mas vagas demais para uma aula cuja tese central depende justamente de distinguir percentil de media/mediana. "A maior parte das observacoes" deixava margem para leitura frouxa. | A definicao passou a explicitar que **99% das observacoes** ficam abaixo do valor de p99, deixando claro que os **1% restantes** formam a cauda mais lenta. |
| `capstone-go-vs-rust-criterio` | Maior | A aula comparativa estava metodologicamente mais bem ancorada no lado Go do que no lado Rust, e ainda usava a formulacao "Rust elimina o GC do caminho central", forte demais para uma validacao academica rigorosa. | Foram adicionadas referencias a **The Rust Performance Book** e **Criterion.rs**, a secao de instrumentacao passou a citar benchmark/profiling comparavel no lado Rust, e o texto foi reescrito para dizer que Rust **normalmente nao depende de GC de proposito geral** no caminho de gerenciamento de memoria. |

## Lessons aprovadas sem achados criticos/maiores

- `capstone-flamegraph-para-patch`
- `capstone-parser-rust-ownership`

## Observacoes por lesson

### `capstone-flamegraph-para-patch`

- Metodologia forte e consistente com a literatura de Brendan Gregg.
- Leitura de flamegraph correta: largura como presenca agregada, nao linha do tempo.
- Quiz e glossario corretos; nao encontrei numero factual inventado.

### `capstone-http-go-p99`

- Estrutura metodologica correta: distribuicao -> decomposicao do request -> bound -> patch -> verificacao.
- Uso de `httptrace` restrito ao lado cliente e de `pprof`/profiles para diagnostico do processo esta correto.
- Depois do ajuste de definicao, a parte conceitual de percentis ficou adequada para uma aula centrada em p99.

### `capstone-parser-rust-ownership`

- Boa separacao entre borrowed, owned, streaming e fronteiras de autonomia.
- Uso de `Bytes`, `Cow`, lifetimes e zero-copy esta conceitualmente solido e sem sloganizacao perigosa.
- Quiz coerente com o texto e com a modelagem de ownership em Rust.

### `capstone-go-vs-rust-criterio`

- A aula evita benchmark de torcida e usa criterios razoaveis: latencia, memoria, complexidade, operacao e time.
- A comparacao entre GC e ownership ficou mais precisa apos a correcao de wording.
- A referencia bibliografica agora sustenta melhor a exigencia de instrumentacao comparavel dos dois lados.

## Registro no catalogo

O registro no catalogo de `computacao` foi conferido em `src/lessons/computacao/index.ts`, que ja importa e exporta as quatro lessons da Fase A.

## Arquivos alterados nesta validacao

- `src/lessons/computacao/capstone-http-go-p99/content.ts`
- `src/lessons/computacao/capstone-go-vs-rust-criterio/content.ts`
- `prompts/validation/capstones-fase-a-academic.md`

## Resultado

Validacao academica concluida para os capstones da Fase A, com **0 criticos**, **2 maiores corrigidos** e **0 criticos/maiores pendentes**.
