# Validacao academica - Baixo nivel onda L2

## Escopo validado

Foram revisadas as 8 aulas pedidas em `src/lessons/computacao/`:

1. `locality-data-oriented-design`
2. `false-sharing-e-cache-lines`
3. `alocacao-arena-pool-bump`
4. `stack-vs-heap-na-pratica`
5. `zero-copy-e-buffers`
6. `simd-intuicao`
7. `branch-prediction-e-codigo-quente`
8. `undefined-behavior-mindset`

## Contagem final

- Aulas validadas: **8**
- Achados criticos: **0**
- Achados maiores: **3**
- Achados maiores corrigidos nesta passada: **3**
- Achados criticos/maiores remanescentes: **0**

## Achados maiores corrigidos

| Aula | Severidade | Problema | Correcao aplicada |
| --- | --- | --- | --- |
| `alocacao-arena-pool-bump` | Maior | A aula usava `sync.Pool` como referencia oficial de pooling, mas o texto principal ainda podia sugerir um pool deterministico de reuso. Em Go, `sync.Pool` e uma cache oportunista de objetos temporarios: itens podem ser descartados a qualquer momento e `Get` pode agir como se o pool estivesse vazio. | Reescrita a secao de pools e o glossario para distinguir **pool generico** de **`sync.Pool` oportunista**, deixando explicito que reuso nao e garantido nessa implementacao. |
| `simd-intuicao` | Maior | A ponte com ML/numerico dizia que matrizes, tensores e vetores eram "naturalmente alinhados ao modelo vetorial", o que simplificava demais a realidade. Vetorizacao rentavel ainda depende de layout, stride, operacao, custo model e alvo. | Ajustado o trecho de conexoes e o resumo interativo para dizer que esses dados **frequentemente** se encaixam bem em SIMD **quando layout, stride e operacao cooperam**, e que compiladores cobrem muitos loops regulares, mas nao todos. |
| `undefined-behavior-mindset` | Maior | A aula tratava regras de aliasing/proveniencia de forma mais fechada do que a documentacao oficial sustenta e nao destacava com nitidez suficiente a excecao controlada de `UnsafeCell` para interior mutability em referencias compartilhadas. | Reescritos referencias, secao central, glossario e visual para explicitar a excecao oficial de **`UnsafeCell`**, suavizar a linguagem sobre **proveniencia/aliasing** e registrar que os detalhes finos do modelo ainda evoluem no ecossistema Rust. |

## Aulas sem achados criticos/maiores

- `locality-data-oriented-design`
- `false-sharing-e-cache-lines`
- `stack-vs-heap-na-pratica`
- `zero-copy-e-buffers`
- `branch-prediction-e-codigo-quente`

## Observacoes de atencao especial

### SIMD

Depois da correcao, a aula continua correta ao enfatizar:

- independencia entre iteracoes
- contiguidade e regularidade do loop
- tails e reductions como parte normal da tecnica
- gathers/scatters e controle de fluxo como fatores de custo e de veto pelo vetorizer

O ponto central agora fica mais academico: SIMD e um encaixe frequente em kernels numericos, mas nao um direito automatico dado pelo dominio do problema.

### UB

Depois da correcao, a aula evita dois deslizes comuns:

- tratar `unsafe` como desligamento de regras
- ensinar aliasing/proveniencia como se o modelo fino ja estivesse totalmente fechado e simples

Ela passa a ancorar melhor a excecao de interior mutability em `UnsafeCell` e a diferenciar contrato pratico de linguagem de detalhes formais ainda em consolidacao.

## Fontes usadas para checagem fina desta validacao

Além das referencias ja presentes nas aulas, usei como confirmacao pontual para os trechos corrigidos:

- Rust Reference - `Behavior considered undefined`
- Rust Reference - `Interior mutability`
- LLVM docs - `Auto-Vectorization in LLVM`
- Go `sync` package docs - `Pool`

## Arquivos alterados

- `src/lessons/computacao/alocacao-arena-pool-bump/content.ts`
- `src/lessons/computacao/simd-intuicao/content.ts`
- `src/lessons/computacao/simd-intuicao/interactions.tsx`
- `src/lessons/computacao/undefined-behavior-mindset/content.ts`
- `src/lessons/computacao/undefined-behavior-mindset/visuals.tsx`
- `prompts/validation/baixo-nivel-academic-L2.md`

## Resultado

Validacao academica concluida para o conjunto solicitado, com **0 criticos**, **3 maiores corrigidos** e **0 criticos/maiores pendentes**.
