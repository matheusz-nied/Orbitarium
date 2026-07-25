# Validação acadêmica — Computação Onda 1

## Escopo auditado

Foram auditadas as 14 aulas abaixo em `src/lessons/computacao/`, com foco em:

- precisão conceitual contra OSTEP / CS:APP / documentação oficial / prática padrão de sistemas;
- correção dos quizzes;
- coerência entre texto e mecânica das interações;
- manutenção do conteúdo em PT-BR;
- ausência de números ou afirmações específicas sem base.

Lista auditada:

1. `bits-bytes-representacao-dados`
2. `como-funciona-uma-cpu`
3. `memoria-stack-heap-ponteiros`
4. `cache-de-cpu`
5. `como-funciona-um-sistema-operacional`
6. `processos-threads-concorrencia`
7. `memoria-virtual`
8. `gpu-para-ia`
9. `como-funciona-a-internet`
10. `como-funciona-um-banco-de-dados`
11. `indices-e-b-trees`
12. `docker-e-containers`
13. `como-funciona-a-memoria-ram`
14. `bits-portas-logicas-circuitos`

## Critério de severidade

- **Crítico**: ensina um modelo mental incorreto que muda o entendimento do aluno ou marca resposta errada como correta.
- **Maior**: simplificação ou mecânica que distorce um ponto importante do assunto, mesmo sem inverter tudo.
- **Menor**: redação, nuance ou terminologia que merece refinamento, mas não compromete o núcleo conceitual.

## Resultado geral

- Aulas auditadas: **14**
- Aulas com bloqueio crítico: **0**
- Problemas críticos encontrados: **0**
- Problemas maiores encontrados: **3**
- Problemas maiores corrigidos: **3**
- Aulas que exigiram correção: **2**
- Aulas validadas sem correção acadêmica necessária: **12**

## Achados principais

### 1) `como-funciona-a-memoria-ram` — problema maior de modelo mental

**Problema encontrado**

A aula e suas interações resumiam o tema como um eixo `capacidade ↔ latência e locality`. Isso é didaticamente perigoso porque:

- **localidade** é majoritariamente propriedade do padrão de acesso do workload, não um botão isolado do hardware;
- o aluno podia sair com a impressão de que "capacidade" e "locality" são extremos diretos do mesmo controle;
- a interação reforçava uma leitura simplificada demais da hierarquia de memória.

**Correção aplicada**

Reformulei o eixo para um modelo mais fiel:

- `mais dados residentes ↔ menos espera por acesso`

Também atualizei:

- explicação textual do trade-off;
- feedback do quiz;
- rótulos de visual/interação;
- terminologia user-facing em PT-BR onde havia anglicismos desnecessários;
- definição de `Page fault` no glossário para ficar tecnicamente mais precisa.

### 2) `como-funciona-a-memoria-ram` — problema maior de quiz ambíguo

**Problema encontrado**

A questão `q6` perguntava:

> "Pensando em cenários reais, qual decisão inicial está mais alinhada com a aula?"

Mas as três alternativas eram heurísticas válidas para cenários diferentes da própria aula. Isso quebrava a correção objetiva do quiz.

**Correção aplicada**

A pergunta foi reescrita para um cenário específico:

> "No cenário de muitas abas abertas e alternância constante entre aplicações, qual decisão inicial combina melhor com a aula?"

Assim, apenas a alternativa correta permanece plausível.

### 3) `bits-portas-logicas-circuitos` — problema maior de quiz ambíguo

**Problema encontrado**

A questão `q6` repetia o mesmo defeito estrutural da aula de RAM: três alternativas representavam boas decisões, mas apenas uma estava marcada como correta.

**Correção aplicada**

A pergunta foi reescrita para um caso específico de projeto:

> "Ao começar a desenhar um circuito que soma dois bits, qual decisão inicial está mais alinhada com a aula?"

As alternativas incorretas passaram a ser distrações de fato, não respostas aceitáveis em outros cenários da própria aula.

## Situação por aula

| Aula | Situação | Observação |
| --- | --- | --- |
| `bits-bytes-representacao-dados` | Validada | Conteúdo, quiz e interações coerentes. |
| `como-funciona-uma-cpu` | Validada | Modelo fetch/decode/execute adequado para nível introdutório-intermediário. |
| `memoria-stack-heap-ponteiros` | Validada | Conceitos de lifetime, stack, heap e bugs clássicos corretos. |
| `cache-de-cpu` | Validada | Localidade, linhas de cache, hits/misses e mapeamento corretos. |
| `como-funciona-um-sistema-operacional` | Validada | Boa separação entre abstração, proteção, syscalls e escalonamento. |
| `processos-threads-concorrencia` | Validada | Distinções entre processo, thread, corrida e deadlock corretas. |
| `memoria-virtual` | Validada | Espaço de endereços, TLB, page table e page fault corretos para a trilha. |
| `gpu-para-ia` | Validada | Explicação de throughput, SIMT, memória e gargalos está coerente. |
| `como-funciona-a-internet` | Validada | Camadas DNS/IP/TCP/TLS/HTTP apresentadas de forma correta e didática. |
| `como-funciona-um-banco-de-dados` | Validada | Visão geral de páginas, planner, MVCC e WAL está sólida. |
| `indices-e-b-trees` | Validada | Seq scan, índice, fan-out, folhas ordenadas e splits corretos. |
| `docker-e-containers` | Validada | Diferença entre imagem, container, namespace, cgroup e volume está correta. |
| `como-funciona-a-memoria-ram` | **Corrigida** | Ajuste de modelo mental + quiz + strings user-facing. |
| `bits-portas-logicas-circuitos` | **Corrigida** | Ajuste de quiz ambíguo. |

## Fontes-base usadas na validação

As aulas já traziam referências fortes; a checagem foi alinhada principalmente com estas famílias de fontes:

- **OSTEP** — virtualização, concorrência, memória, processos e abstrações de SO.
- **CS:APP** — representação de dados, memória, cache, CPU e visão de sistemas para programadores.
- **MIT 6.004 / 6.S081** — estruturas computacionais, memória, processos, page tables e arquitetura.
- **PostgreSQL Docs / CMU Database Group / Use The Index, Luke!** — banco de dados, MVCC, WAL, páginas e índices.
- **Docker Docs / man7 namespaces / kernel docs de cgroups** — containers e isolamento.
- **RFCs do IETF / MDN** — DNS, TCP, HTTP, TLS.
- **CUDA / PyTorch / Stanford CS231n** — GPU para IA.

## Arquivos alterados

- `src/lessons/computacao/como-funciona-a-memoria-ram/content.ts`
- `src/lessons/computacao/como-funciona-a-memoria-ram/interactions.tsx`
- `src/lessons/computacao/como-funciona-a-memoria-ram/visuals.tsx`
- `src/lessons/computacao/bits-portas-logicas-circuitos/content.ts`
- `prompts/validation/computacao-academic-onda1.md`

## Comandos executados

- `npm run validate:lessons`
- `npm run typecheck`
- `npm run build`

## Pendências

- Nenhuma pendência bloqueante dentro do escopo pedido.
- Observação não bloqueante: há outras aulas fora deste escopo que usam o mesmo padrão genérico de pergunta ambígua em quiz; não foram alteradas porque o pedido foi restrito à Onda 1 + hardware extras.
