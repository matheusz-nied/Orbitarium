# Auditoria de alucinacoes - trilha de Computacao

Data: 2026-07-25

## Escopo

- 46 arquivos de entrada em `src/lessons/computacao/<id>/content.ts`
- 8 dessas aulas reexportam conteudo de `src/lessons/computacao/shared/wave3PartAContent.ts`
- Total efetivo auditado no texto-fonte: 39 implementacoes unicas
- URLs de referencia unicas encontradas: 163

## Metodologia

1. Inventario completo das 46 aulas a partir de `prompts/manifesto_aulas_computacao.json`.
2. Resolucao das aulas que apenas reexportam conteudo compartilhado.
3. Extracao e varredura de referencias, URLs, anos, termos de glossario e numeros tecnicos.
4. Probe de URLs suspeitas:
   - varredura automatizada com `curl -L`
   - verificacao manual adicional com `WebSearch` e `WebFetch` quando o resultado parecia ambiguo
5. Revisao manual de pontos com maior chance de erro factual:
   - CAP / PACELC / linearizabilidade
   - TLS / HTTPS / forward secrecy
   - B-Tree em banco de dados
   - TPU / NPU / aceleradores
   - DRAM / SRAM
   - idempotencia e semantica de entrega

## Resumo executivo

- Problemas confirmados encontrados: **1**
- Problemas corrigidos: **1**
- Problemas confirmados remanescentes: **0**
- Papers inventados confirmados: **0**
- URLs falsas/quebradas confirmadas: **1**
- Mismatches ano x arXiv id: **0** (nenhuma referencia a arXiv apareceu na trilha)
- Numeros especificos de performance sem fonte: **0**
- Misattributions confirmadas: **0**
- Erros factuais confirmados de glossario: **0**

## Problema confirmado e correcao aplicada

| Aula | Arquivo | Tipo | Evidencia | Correcao |
| --- | --- | --- | --- | --- |
| `tpu-npu-aceleradores` | `src/lessons/computacao/tpu-npu-aceleradores/content.ts` | URL quebrada | `curl -L` retornou 404 para `https://www.mlsysbook.ai/contents/core/hw_acceleration/hw_acceleration.html`; busca web localizou o capitulo vivo em `https://mlsysbook.ai/vol1/hw_acceleration/hw_acceleration.html` | URL atualizada para o endpoint valido do MLSys Book |

## URLs suspeitas que foram sondadas

### Confirmada como problema real

- `https://www.mlsysbook.ai/contents/core/hw_acceleration/hw_acceleration.html`
  - Resultado do probe automatizado: `404`
  - Resultado da busca/web fetch: capitulo mudou para `https://mlsysbook.ai/vol1/hw_acceleration/hw_acceleration.html`
  - Status final: **corrigida**

### Suspeitas, mas nao confirmadas como erro

- `https://www.rabbitmq.com/docs/queues`
  - `curl` retornou `403`, mas `WebFetch` e `WebSearch` confirmaram pagina valida
  - Status final: **URL valida com bloqueio anti-bot no probe automatizado**

- Dominios com `403` recorrente em probe automatizado, sem evidencia de referencia falsa:
  - `cloudflare.com/learning/...`
  - `britannica.com/...`
  - `pcisig.com/`
  - `nvmexpress.org/specifications/`
  - `en.cppreference.com/...`
  - Status final: **sem correcao**, porque o comportamento observado e compativel com bloqueio anti-bot e nao com URL inventada

## Categorias auditadas

### 1. Fake papers / URLs

- Nao encontrei paper inventado com titulo/autor falso.
- Encontrei **1 URL quebrada real**, ja corrigida.

### 2. Ano errado vs identificador arXiv

- Nenhuma referencia a arXiv apareceu nas 46 aulas.
- Resultado: **0 problemas nessa categoria**.

### 3. Numeros especificos de performance sem fonte

- Nao encontrei claims do tipo "3x mais rapido", "40% melhor", "N GB/s" ou benchmarks factuais sem referencia.
- O unico numero operacional destacado na varredura foi um exemplo didatico hipotetico (`2 ms` vs `5 ms`) em `wave3PartAContent.ts`, sem apresentacao como benchmark factual.
- Resultado: **0 problemas confirmados**.

### 4. Misattribution

- Revisei manualmente as referencias mais sensiveis:
  - Turing 1936
  - Lamport / Paxos
  - Gilbert & Lynch / CAP
  - Brewer / CAP Twelve Years Later
  - Abadi / PACELC
  - RFCs de DNS, TCP, HTTP e TLS
- Nao encontrei atribuicao errada confirmada.

### 5. Glossario

- Fiz spot-check manual dos glossarios com maior chance de erro:
  - `CAP`, `Disponibilidade`, `Linearizabilidade`, `PACELC`
  - `TLS`, `HTTPS`, `Forward secrecy`, `HSTS`
  - `DRAM`, `SRAM`
  - `Fila`, `Stream`, `Offset`, `Idempotencia`
  - `TPU`, `NPU`
  - `B-Tree`
- Nao encontrei erro factual confirmado que justificasse edicao cirurgica.

## Cobertura

### Aulas auditadas

- `bits-bytes-representacao-dados`
- `como-funciona-uma-cpu`
- `memoria-stack-heap-ponteiros`
- `cache-de-cpu`
- `como-funciona-um-sistema-operacional`
- `processos-threads-concorrencia`
- `memoria-virtual`
- `gpu-para-ia`
- `como-funciona-a-internet`
- `como-funciona-um-banco-de-dados`
- `indices-e-b-trees`
- `docker-e-containers`
- `como-um-programa-vira-processo`
- `syscalls-kernel`
- `como-funciona-um-compilador`
- `pipeline-de-cpu`
- `isa-x86-arm-riscv`
- `apis-rest`
- `autenticacao-e-autorizacao`
- `tls-e-https`
- `observabilidade-de-sistemas`
- `filas-e-arquitetura-event-driven`
- `turing-e-a-ideia-de-computacao`
- `algoritmos-e-complexidade`
- `estruturas-de-dados-essenciais`
- `recursao-e-dividir-para-conquistar`
- `dns-ip-tcp-http`
- `tcp-vs-udp-latencia-confiabilidade`
- `sistemas-distribuidos-fundamentos`
- `cap-consistencia-disponibilidade`
- `balanceamento-e-cdn`
- `sistema-de-arquivos`
- `transacoes-acid-isolamento`
- `como-funciona-a-memoria-ram`
- `bits-portas-logicas-circuitos`
- `hashes-e-integridade`
- `criptografia-moderna-intuicao`
- `seguranca-de-memoria`
- `monolito-vs-microservicos`
- `graphql-como-contrato`
- `tpu-npu-aceleradores`
- `ssd-e-storage`
- `pcie-barramentos`
- `concorrencia-baixo-nivel`
- `linux-permissoes-processos`
- `http-caching`

### Arquivo compartilhado auditado por impacto multiplo

- `src/lessons/computacao/shared/wave3PartAContent.ts`
  - alimenta:
    - `turing-e-a-ideia-de-computacao`
    - `algoritmos-e-complexidade`
    - `estruturas-de-dados-essenciais`
    - `recursao-e-dividir-para-conquistar`
    - `dns-ip-tcp-http`
    - `tcp-vs-udp-latencia-confiabilidade`
    - `sistemas-distribuidos-fundamentos`
    - `cap-consistencia-disponibilidade`

## Arquivos alterados

- `src/lessons/computacao/tpu-npu-aceleradores/content.ts`
- `prompts/validation/computacao-hallucination-audit.md`
- `prompts/validation/computacao-hallucination-fixes.json`
