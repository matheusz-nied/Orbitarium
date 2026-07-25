# Trilha: Computação para sistemas reais (e para IA)

Plano de implementação de aulas interativas na categoria `computacao`.  
Objetivo: construir a base de sistemas, hardware, redes, dados e engenharia que sustenta produtos — inclusive sistemas de IA.

**Como usar:** escolha um tema, rode o pipeline de `prompts/etapas.md`, crie em `src/lessons/computacao/<slug>/` e registre em `src/lessons/index.ts`.

Manifesto de IDs: `prompts/manifesto_aulas_computacao.json`  
Backlog legado: `prompts/computer.md`

---

## O que já existe

A categoria `computacao` existe, mas **ainda não tem aulas com primaryCategoryId = computacao**.

Há aulas de IA/visão com `secondaryCategoryId: "computacao"` (aparecem na listagem, mas não formam uma trilha própria de CS).

**Lacuna:** falta o miolo clássico — bits → CPU → memória → SO → rede → dados → containers → GPU.

---

## Mapa da jornada

```text
Onda 1  Fundamentos que todo praticante precisa
   ↓
Onda 2  Baixo nível, arquitetura e engenharia de serviços
   ↓
Onda 3  Temas importantes de CS / sistemas / segurança
   ↓
Pontes   Conexões explícitas com a trilha de IA
```

Categoria primária sugerida: `computacao`  
Secundárias comuns: `engenharia`, `inteligencia-artificial`, `historia-da-ciencia`, `matematica`

---

## Onda 1 — Pacote mínimo (12 aulas)

Ordem de implementação recomendada. Prioridade máxima.

| # | ID (slug) | Título | Nível | Secundária | Ideia central | Interações possíveis |
|---|---|---|---|---|---|---|
| 1.1 | `bits-bytes-representacao-dados` | Bits, Bytes e Representação de Dados | Iniciante | `matematica` | Tudo no computador é bit; interpretação muda o significado | Conversor binário/hex; int vs float; endianness toy |
| 1.2 | `como-funciona-uma-cpu` | Como Funciona uma CPU | Intermediário | `engenharia` | Fetch–decode–execute e o datapath | Ciclo de instrução animado; registradores; ALU |
| 1.3 | `memoria-stack-heap-ponteiros` | Memória: Stack, Heap e Ponteiros | Intermediário | `engenharia` | Onde os dados vivem e por quanto tempo | Stack frames; alocação heap; dangling pointer |
| 1.4 | `cache-de-cpu` | Cache de CPU | Intermediário | `engenharia` | Localidade explica boa parte da performance | Hit/miss; cache lines; array row vs column |
| 1.5 | `como-funciona-um-sistema-operacional` | Como Funciona um Sistema Operacional | Intermediário | `engenharia` | O SO gerencia recursos e oferece abstrações | Scheduler; syscalls overview; user vs kernel |
| 1.6 | `processos-threads-concorrencia` | Processos, Threads e Concorrência | Intermediário | `engenharia` | Várias tarefas ao mesmo tempo exigem coordenação | Scheduler visual; race condition; mutex/deadlock |
| 1.7 | `memoria-virtual` | Memória Virtual | Intermediário | `engenharia` | Cada processo “acha” que tem sua própria memória | Página virtual→física; page fault; TLB |
| 1.8 | `como-funciona-a-internet` | Como Funciona a Internet | Iniciante | `engenharia` | Do clique ao servidor: nomes, rotas e protocolos | DNS; TCP handshake; HTTP request path |
| 1.9 | `como-funciona-um-banco-de-dados` | Como Funciona um Banco de Dados | Intermediário | `engenharia` | Persistência, consulta e consistência | Tabela+índice; commit/rollback; planner simples |
| 1.10 | `indices-e-b-trees` | Índices e B-Trees | Intermediário | `matematica` | Por que índices aceleram (e quando atrapalham) | Seq scan vs index; B-tree visual; range scan |
| 1.11 | `docker-e-containers` | Docker e Containers | Intermediário | `engenharia` | Empacotar app + deps com isolamento do SO | Layers; VM vs container; volumes/rede |
| 1.12 | `gpu-para-ia` | GPU: Por Que Ela É Boa para IA | Intermediário | `inteligencia-artificial` | Paralelismo massivo e o custo de memória | SIMT toy; bandwidth vs compute; VRAM budget |

**Ponte com IA após a Onda 1:** releia `gpus-vram-custo-real-ia`, `inferencia-latencia-batching-throughput` e `mlops-essencial` com base nova.

### Critério de pronto da Onda 1
- 12 aulas no catálogo com `primaryCategoryId: "computacao"`
- ≥3 interações educativas por aula
- quiz ≥8, glossário ≥10, referências reais
- `npm run validate:lessons` + typecheck + build verdes
- auditoria acadêmica leve (especialmente CPU/cache/SO/BD)

---

## Onda 2 — Baixo nível, arquitetura e serviços (10 aulas)

Implementar depois que a Onda 1 estiver estável.

| # | ID | Título | Nível | Secundária | Ideia central |
|---|---|---|---|---|---|
| 2.1 | `como-um-programa-vira-processo` | Como um Programa Vira Processo | Intermediário | `engenharia` | Loader, layout de memória, exec |
| 2.2 | `syscalls-kernel` | Syscalls: Como Programas Conversam com o Kernel | Intermediário | `engenharia` | Ponte controlada user↔kernel |
| 2.3 | `como-funciona-um-compilador` | Como Funciona um Compilador | Intermediário | `engenharia` | Lex → parse → IR → codegen |
| 2.4 | `pipeline-de-cpu` | Pipeline de CPU | Avançado | `engenharia` | Throughput via sobreposição; hazards |
| 2.5 | `isa-x86-arm-riscv` | ISA: x86, ARM e RISC-V | Intermediário | `engenharia` | Contrato software↔hardware |
| 2.6 | `apis-rest` | APIs REST | Intermediário | `engenharia` | Recursos, verbos, status, idempotência |
| 2.7 | `autenticacao-e-autorizacao` | Autenticação e Autorização | Intermediário | `engenharia` | Identidade ≠ permissão; sessões/tokens |
| 2.8 | `tls-e-https` | TLS e HTTPS | Intermediário | `engenharia` | Confidencialidade e integridade na rede |
| 2.9 | `observabilidade-de-sistemas` | Observabilidade de Sistemas | Intermediário | `engenharia` | Logs, métricas, traces (não só LLM) |
| 2.10 | `filas-e-arquitetura-event-driven` | Filas e Arquitetura Event-Driven | Intermediário | `engenharia` | Desacoplar no tempo; retry e idempotência |

### Critério de pronto da Onda 2
- +10 aulas
- Pelo menos 2 pontes explícitas com aulas de IA (ex.: observabilidade ↔ `observabilidade-sistemas-llm`; auth ↔ apps com agentes/tools)

---

## Onda 3 — Temas importantes extras (16 aulas)

Temas que faltavam no pacote inicial e são centrais em CS/sistemas modernos.  
Ordem sugerida dentro da onda; pode paralelizar em blocos temáticos.

### Bloco A — Pensamento computacional e algoritmos
| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| 3.1 | `turing-e-a-ideia-de-computacao` | Turing e a Ideia de Computação | Intermediário | O que é computável; máquina de Turing; limites |
| 3.2 | `algoritmos-e-complexidade` | Algoritmos e Complexidade (Big-O na prática) | Intermediário | Custo cresce com a entrada; trade-offs |
| 3.3 | `estruturas-de-dados-essenciais` | Estruturas de Dados Essenciais | Intermediário | Array, lista, hash, árvore, grafo — quando usar |
| 3.4 | `recursao-e-dividir-para-conquistar` | Recursão e Dividir para Conquistar | Intermediário | Decomposição de problemas e custo da árvore de chamadas |

### Bloco B — Rede e sistemas distribuídos
| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| 3.5 | `dns-ip-tcp-http` | DNS, IP, TCP e HTTP em Camadas | Intermediário | Cada camada resolve um problema (aprofundar 1.8) |
| 3.6 | `tcp-vs-udp-latencia-confiabilidade` | TCP vs UDP: Latência e Confiabilidade | Intermediário | Quando garantir entrega custa tempo |
| 3.7 | `sistemas-distribuidos-fundamentos` | Sistemas Distribuídos: Fundamentos | Avançado | Falha parcial, latência, relógios, consistência |
| 3.8 | `cap-consistencia-disponibilidade` | CAP, Consistência e Disponibilidade | Avançado | Trade-offs em sistemas reais (sem caricatura) |
| 3.9 | `balanceamento-e-cdn` | Balanceamento de Carga e CDN | Intermediário | Escala, cache geográfico, origem |

### Bloco C — Persistência, storage e runtime
| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| 3.10 | `sistema-de-arquivos` | Sistema de Arquivos | Intermediário | Arquivos, diretórios, permissões, inodes (conceitual) |
| 3.11 | `transacoes-acid-isolamento` | Transações, ACID e Isolamento | Avançado | O que “commit” realmente garante |
| 3.12 | `como-funciona-a-memoria-ram` | Como Funciona a Memória RAM | Intermediário | Hierarquia; latência; DRAM vs ideia de “memória infinita” |
| 3.13 | `bits-portas-logicas-circuitos` | Bits, Portas Lógicas e Circuitos | Iniciante | Do bit ao somador — ponte para a CPU |

### Bloco D — Segurança e confiabilidade
| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| 3.14 | `hashes-e-integridade` | Hashes e Integridade | Intermediário | Fingerprint, verificação, limites (não é criptografia mágica) |
| 3.15 | `criptografia-moderna-intuicao` | Criptografia Moderna (Intuição) | Intermediário | Simétrica vs assimétrica; o que cifra e o que assina |
| 3.16 | `seguranca-de-memoria` | Segurança de Memória | Avançado | Buffer overflow, UAF, mitigações; por que linguagens importam |

### Critério de pronto da Onda 3
- +16 aulas (total da trilha ≈ 38)
- Bloco A antes de B/C quando possível (algoritmos ajudam BD/rede)
- Bloco D depois de rede/TLS da Onda 2

---

## Onda 4 (opcional / especialização)

Só depois das três ondas, se ainda fizer sentido:

| ID | Título | Nota |
|---|---|---|
| `monolito-vs-microservicos` | Monolito vs Microserviços | Evitar hype; custo operacional |
| `graphql-como-contrato` | GraphQL como Contrato de API | Depois de REST |
| `tpu-npu-aceleradores` | TPU, NPU e Aceleradores | Ponte IA avançada |
| `ssd-e-storage` | Como um SSD Funciona | Storage profundo |
| `pcie-barramentos` | Barramentos: PCIe e Comunicação Interna | Hardware avançado |
| `concorrencia-baixo-nivel` | Concorrência em Baixo Nível | Atomics, ordering |
| `linux-permissoes-processos` | Linux na Prática: Permissões e Processos | Operacional |
| `http-caching` | HTTP Caching | Cache-Control, ETag, CDN |

---

## Ordem de implementação sugerida (checklist)

### Sprint A — Onda 1a (hardware + memória)
- [ ] `bits-bytes-representacao-dados`
- [ ] `bits-portas-logicas-circuitos` *(pode puxar da Onda 3 cedo, se quiser base melhor para CPU)*
- [ ] `como-funciona-uma-cpu`
- [ ] `memoria-stack-heap-ponteiros`
- [ ] `cache-de-cpu`
- [ ] `como-funciona-a-memoria-ram`

### Sprint B — Onda 1b (SO + concorrência)
- [ ] `como-funciona-um-sistema-operacional`
- [ ] `processos-threads-concorrencia`
- [ ] `memoria-virtual`
- [ ] `gpu-para-ia`

### Sprint C — Onda 1c (rede + dados + deploy)
- [ ] `como-funciona-a-internet`
- [ ] `como-funciona-um-banco-de-dados`
- [ ] `indices-e-b-trees`
- [ ] `docker-e-containers`

> Ao fim do Sprint C, a **Onda 1 está completa** (e RAM/portas lógicas já adiantam a Onda 3).

### Sprint D — Onda 2
- [ ] `como-um-programa-vira-processo`
- [ ] `syscalls-kernel`
- [ ] `como-funciona-um-compilador`
- [ ] `pipeline-de-cpu`
- [ ] `isa-x86-arm-riscv`
- [ ] `apis-rest`
- [ ] `autenticacao-e-autorizacao`
- [ ] `tls-e-https`
- [ ] `observabilidade-de-sistemas`
- [ ] `filas-e-arquitetura-event-driven`

### Sprint E — Onda 3 (algoritmos → distribuídos → segurança)
- [ ] Bloco A (3.1–3.4)
- [ ] Bloco B (3.5–3.9)
- [ ] Bloco C restante (3.10–3.11; 3.12–3.13 se não feitos no Sprint A)
- [ ] Bloco D (3.14–3.16)

---

## Trilhas alternativas (mesmo catálogo)

### Trilha Builder fullstack
`1.1 → 1.3 → 1.5 → 1.8 → 1.9 → 1.11 → 2.6 → 2.7 → 2.8 → 2.9 → 2.10`

### Trilha Systems / performance
`1.2 → 1.4 → 1.7 → 2.4 → 2.5 → 3.12 → 1.12 → 3.2`

### Trilha para IA / ML Eng
`1.1 → 1.2 → 1.4 → 1.6 → 1.7 → 1.11 → 1.12 → 2.9 → (voltar à trilha de IA: quantização, inferência, MLOps)`

### Trilha fundamentos clássicos
`3.13 → 3.1 → 3.2 → 3.3 → 1.2 → 2.3 → 2.1`

---

## Padrão de cada aula

Seguir `AGENTS.md` e `prompts/BRIEF_IMPLEMENTACAO_AULA.md` (se existir no branch):

1. Pasta `src/lessons/computacao/<id>/` com `content.ts`, `visuals.tsx`, `interactions.tsx`, `index.ts`
2. `primaryCategoryId: "computacao"`
3. 8–12 seções; ≥3 interações que ensinam
4. Quiz ≥8; glossário ≥10; referências reais (OSTEP, Computer Systems: A Programmer’s Perspective, Tanenbaum, Kurose/Ross, PostgreSQL docs, Docker docs, RISC-V specs educacionais, MIT OCW, etc.)
5. Sem números de performance inventados; sem “microserviços resolvem tudo”

### Fontes preferidas
- OSTEP (Operating Systems: Three Easy Pieces) — gratuito
- Computer Networking: A Top-Down Approach (Kurose) / materiais universitários
- PostgreSQL documentation / Use The Index, Luke
- Docker docs / OCI concepts
- CSAPP (Computer Systems: A Programmer’s Perspective)
- Nand2Tetris / MIT 6.004 (conceitos)
- RISC-V educational materials
- OWASP (auth/security)
- Papers clássicos só com URL verificável

---

## Contagem

| Onda | Aulas | Acumulado |
|---|---|---|
| Onda 1 | 12 | 12 |
| Onda 2 | 10 | 22 |
| Onda 3 | 16 | **38** |
| Onda 4 (opcional) | ~8 | ~46 |

Recomendação: **implementar Ondas 1 → 2 → 3**; só então avaliar Onda 4.

---

## Status

- [x] Plano escrito (`prompts/trilha_computacao.md`)
- [x] Manifesto de IDs (`prompts/manifesto_aulas_computacao.json`)
- [x] Onda 1 implementada
- [x] Onda 2 implementada
- [x] Onda 3 implementada
- [x] Onda 4 (opcional) implementada
- [ ] Validação acadêmica + anti-alucinação
- [ ] Registro completo no catálogo + build verde
