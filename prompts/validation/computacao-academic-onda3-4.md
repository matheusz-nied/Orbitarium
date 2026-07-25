# Validacao academica - Computacao ondas 3 e 4

## Escopo validado

Foram revisadas as 22 aulas pedidas em `src/lessons/computacao/`:

1. `turing-e-a-ideia-de-computacao`
2. `algoritmos-e-complexidade`
3. `estruturas-de-dados-essenciais`
4. `recursao-e-dividir-para-conquistar`
5. `dns-ip-tcp-http`
6. `tcp-vs-udp-latencia-confiabilidade`
7. `sistemas-distribuidos-fundamentos`
8. `cap-consistencia-disponibilidade`
9. `balanceamento-e-cdn`
10. `sistema-de-arquivos`
11. `transacoes-acid-isolamento`
12. `hashes-e-integridade`
13. `criptografia-moderna-intuicao`
14. `seguranca-de-memoria`
15. `monolito-vs-microservicos`
16. `graphql-como-contrato`
17. `tpu-npu-aceleradores`
18. `ssd-e-storage`
19. `pcie-barramentos`
20. `concorrencia-baixo-nivel`
21. `linux-permissoes-processos`
22. `http-caching`

## Contagem final

- Aulas validadas: **22**
- Achados criticos: **0**
- Achados maiores: **4**
- Achados maiores corrigidos nesta passada: **4**
- Achados criticos/maiores remanescentes: **0**

## Achados maiores corrigidos

| Aula | Severidade | Problema | Correcao aplicada |
| --- | --- | --- | --- |
| `criptografia-moderna-intuicao` | Maior | A aula tratava a funcao central da criptografia moderna como protecao de confidencialidade e autenticidade, deixando a integridade sub-representada em pontos centrais; a definicao de AEAD tambem estava simplificada demais. | Ajustados subtitulo, lead, paragrafo principal, resumo, quiz e glossario para explicitar **confidencialidade, integridade e autenticidade** e para definir AEAD como cifra autenticada que tambem verifica integridade/autenticidade dos dados associados. |
| `concorrencia-baixo-nivel` | Maior | O texto e um cartao visual sugeriam que uma operacao atomica, por si so, "estabelece" a borda de happens-before, o que simplifica demais a semantica real de sincronizacao. | Reescritos quick fact, secao central, glossario e visual para deixar claro que a garantia nasce de **operacoes compativeis e sincronizacao bem formada**, nao do uso isolado de um atomic. |
| `sistema-de-arquivos` | Maior | A aula separava pouco a atomicidade de `rename` da durabilidade apos falha, o que podia levar o leitor a superestimar `rename`/`fsync` em atualizacao de arquivo critico. | Adicionados esclarecimentos sobre **rename atomico vs durabilidade** e sobre a necessidade de **fsync no diretorio** ao substituir arquivo critico com garantia de persistencia. |
| `transacoes-acid-isolamento` | Maior | A definicao operacional quase apagava o "C" de ACID, enfatizando atomicidade/isolamento/durabilidade sem amarrar direito o papel da consistencia declarada. | Ajustados objetivo de aprendizagem, definicao central e glossario para explicitar que a consistencia depende da preservacao de invariantes corretamente modeladas. |

## Aulas sem achados criticos/maiores

### Onda 3 compartilhada

- `turing-e-a-ideia-de-computacao`
- `algoritmos-e-complexidade`
- `estruturas-de-dados-essenciais`
- `recursao-e-dividir-para-conquistar`
- `dns-ip-tcp-http`
- `tcp-vs-udp-latencia-confiabilidade`
- `sistemas-distribuidos-fundamentos`
- `cap-consistencia-disponibilidade`

### Onda 4 individual

- `balanceamento-e-cdn`
- `hashes-e-integridade`
- `seguranca-de-memoria`
- `monolito-vs-microservicos`
- `graphql-como-contrato`
- `tpu-npu-aceleradores`
- `ssd-e-storage`
- `pcie-barramentos`
- `linux-permissoes-processos`
- `http-caching`

## Observacoes de atencao especial

### CAP

Sem simplificacao grave remanescente. A aula esta correta ao combater a caricatura de "pick two", manter foco em particao e usar PACELC como complemento, nao como substituto.

### Big-O

Sem mau uso grave remanescente. A aula diferencia Big-O de tempo real, separa assintotica de benchmark e trata bem pior caso, caso medio e analise amortizada.

### Criptografia

Era o ponto mais delicado entre as aulas individuais. Depois da correcao, a aula voltou a separar melhor:

- sigilo
- integridade
- autenticidade
- hash
- cifra
- assinatura
- AEAD

### TPU / NPU

Sem overclaim relevante remanescente. A aula evita prometer ganho automatico e mantem o foco correto em operadores suportados, movimento de dados, compilador, quantizacao e encaixe do workload.

## Fontes usadas para checagem fina desta validacao

Além das referencias ja presentes nas aulas, usei como confirmacao pontual para os trechos corrigidos:

- RFC 5116 - AEAD
- cppreference `std::memory_order`
- C++ draft / happens-before
- `fsync(2)` e `rename(2)` no man7
- PostgreSQL docs sobre transactions e transaction isolation

## Arquivos alterados

- `src/lessons/computacao/criptografia-moderna-intuicao/content.ts`
- `src/lessons/computacao/concorrencia-baixo-nivel/content.ts`
- `src/lessons/computacao/concorrencia-baixo-nivel/visuals.tsx`
- `src/lessons/computacao/sistema-de-arquivos/content.ts`
- `src/lessons/computacao/transacoes-acid-isolamento/content.ts`

## Resultado

Validacao academica concluida para o conjunto solicitado, com **0 criticos**, **4 maiores corrigidos** e **0 criticos/maiores pendentes**.
