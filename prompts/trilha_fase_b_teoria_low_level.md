# Fase B — Teoria de Baixo Nível (plano de implementação)

Plano detalhado da **Fase B** do documento-mãe `prompts/trilha_capstones_e_teoria.md`.

**Objetivo:** dar formalismo e modelos mentais que sustentam performance, concorrência, compiladores e Rust — sem repetir L1–L5.

**Pré-requisito forte:** Fase A (capstones) mergeada na `main`.  
**Pré-requisitos de conteúdo:** CPU, cache, RAM, SO, concurrency baixo nível, compiladores/otimizações (L5), Rust ownership.

Manifesto (fase B): dentro de `prompts/manifesto_aulas_capstones_teoria.json` → `phases.B_teoria_low_level`  
Brief de implementação: usar `AGENTS.md` + padrão das aulas avançadas de `computacao/`.

---

## Mapa da fase

```text
B1 Roofline          → tetos de performance (compute vs memória)
B2 Memory ordering   → o que cores “veem” uns dos outros
B3 Scheduling        → fairness, latência, throughput
B4 SSA / compilador  → por que IR permite otimizar
B5 Tipos / soundness → tipos como garantia parcial (ponte Rust)
```

Ordem **obrigatória sugerida:** B1 → B2 → B3 → B4 → B5  
(B4 e B5 podem trocar de lugar se preferir fechar tipagem antes de SSA; não comece por B2 sem B1/locality frescos.)

Categoria: `primaryCategoryId: "computacao"`  
Pasta: `src/lessons/computacao/<id>/`  
Nível: **Avançado** em todas.

---

## Contagem e sprints

| Sprint | Aulas | Meta |
|---|---|---|
| B.1 | B1, B2 | Modelos de máquina (roofline + memória) |
| B.2 | B3, B4 | Sistemas + compiladores |
| B.3 | B5 | Tipos / soundness + validação da fase |

**Total Fase B: 5 aulas.**

---

## B1 — `roofline-modelo-de-performance`

**Título:** Modelo Roofline de Performance  
**Secundária:** `matematica`  
**Tempo estimado:** 45–60 min

### Problema
Por que “otimizar código” às vezes não muda nada? Porque o gargalo pode ser **bandwidth de memória**, não FLOPs/instruções.

### Ideia central
Roofline: desempenho limitado pelo **teto de compute** ou pelo **teto de memória**, conforme a intensidade operacional (ops por byte).

### Progressão didática (8–11 seções)
1. Sintoma: mais cores/SIMD sem ganho  
2. Dualidade compute vs data movement  
3. Intensidade operacional (ops/byte) — intuição  
4. Desenho do roofline (eixo X intensidade, Y performance)  
5. Kernels memory-bound vs compute-bound  
6. O que muda o ponto no gráfico (algoritmo, locality, precisão)  
7. Ligação com cache/RAM já estudados  
8. Limitações do modelo (I/O, sincronização, cauda)  
9. Como usar na prática de otimização  
10. Erros comuns + resumo  

### Interações (≥3)
1. **Roofline playground** — slider de intensidade; ver se bate no teto de memória ou compute  
2. **Kernel classifier** — cenários (stencil, axpy, matmul denso) → bound provável  
3. **What-if** — melhorar locality vs aumentar FLOPs pico (qual move o ponto?)

### Blocos obrigatórios
- Definição: intensidade operacional  
- Insight: otimizar o lado errado do teto  
- Erro comum: “mais threads sempre ajudam”  
- Exemplo: axpy vs matmul (qualitativamente)

### Pré-requisitos no catálogo
`cache-de-cpu`, `como-funciona-a-memoria-ram`, `cpu-bound-io-bound-memory-bound`, `metodologia-de-otimizacao`

### Fontes
- Williams, Waterman, Patterson — *Roofline* (Berkeley / CACM)  
- CSAPP / materiais de hierarquia de memória  
- Notas universitárias de performance modeling (com URL verificável)

### Quiz foca em
Classificar bound; interpretar um ponto no roofline; escolher intervenção coerente.

---

## B2 — `consistencia-de-memoria-e-ordering`

**Título:** Consistência de Memória e Ordering  
**Secundária:** `engenharia`  
**Tempo estimado:** 50–65 min

### Problema
Código “óbvio” em um core quebra quando outro core lê: reordering, buffers de store, falta de barreira.

### Ideia central
Consistência de memória define **quais ordens de leitura/escrita** um programa concorrente pode observar. Ordering/atomics tornam essas regras explícitas.

### Progressão
1. Ilusão de memória única compartilhada  
2. Exemplo clássico de reordering (intuição, sem UB theater)  
3. Sequencial consistency vs modelos relaxados (visão conceitual)  
4. Happens-before (ideia)  
5. Atomics como contrato (não só “mais rápido que mutex”)  
6. Acquire/release em intuição (Rust/C++ mental model)  
7. Quando mutex já resolve (e quando atomic ainda é necessário)  
8. Ligação com `concorrencia-baixo-nivel` e Rust `Send`/`Sync`  
9. Erros: data race vs race condition; “volatile resolve”  
10. Resumo operacional para quem escreve systems code  

### Interações (≥3)
1. **Reorder simulator** — dois threads, toggles de reordering permitido vs proibido  
2. **Fence chooser** — cenário → precisa acquire/release/mutex?  
3. **Bug autopsy** — sintoma → causa provável (falta de sync vs lógica)

### Pré-requisitos
`concorrencia-baixo-nivel`, `processos-threads-concorrencia`, `rust-concurrency-send-sync` (ajuda), `lock-free-com-cuidado`

### Fontes
- Rustonomicon / Rust atomics docs  
- C++ memory model cppreference (educacional)  
- Herlihy & Shavit — *The Art of Multiprocessor Programming* (conceitos)  
- Go memory model (`go.dev/ref/mem`) — contraste útil  

### Cuidados
- Não inventar regras de hardware específicas sem fonte  
- Não ensinar “receita de lock-free” perigosa  
- Deixar claro: modelo de linguagem ≠ microarquitetura detalhada  

---

## B3 — `teoria-de-scheduling`

**Título:** Teoria de Scheduling (Intuição Formal)  
**Secundária:** `engenharia`  
**Tempo estimado:** 45–60 min

### Problema
Filas, latência e “injustiça” entre tarefas não se resolvem só com mais CPU.

### Ideia central
Scheduling escolhe **quem corre agora** sob objetivos conflitantes: throughput, latência, fairness, utilização.

### Progressão
1. O que é uma política de scheduling  
2. Métricas: turnaround, response time, waiting time (intuição)  
3. FIFO / SJF / RR — trade-offs  
4. Work-conserving vs idle  
5. Priority e starvation  
6. Scheduling de I/O vs CPU (ponte L5)  
7. Multicores: afinidade e migração (leve)  
8. Ligação com goroutine scheduler / CFS (conceitual, sem mitologia)  
9. Erros: otimizar média e piorar p99  
10. Resumo  

### Interações (≥3)
1. **Policy lab** — mesma carga sob FIFO vs RR; ver latência/fairness qualitativa  
2. **Starvation demo** — prioridade alta eternamente  
3. **Goal selector** — objetivo (latência interativa vs batch) → política adequada  

### Pré-requisitos
`como-funciona-um-sistema-operacional`, `processos-threads-concorrencia`, `go-goroutines-scheduler`, `latencia-vs-throughput`

### Fontes
- OSTEP — CPU scheduling chapters  
- Silberschatz / Tanenbaum (conceitos, citar edição/URL estável se houver)  
- Documentação conceitual do CFS / Go scheduler blog posts oficiais  

---

## B4 — `ssa-e-otimizacoes-de-compilador`

**Título:** SSA e Otimizações de Compilador  
**Secundária:** `engenharia`  
**Tempo estimado:** 50–65 min

### Problema
Por que compiladores modernos conseguem eliminar código morto, propagar constantes e vetorizar com segurança relativa?

### Ideia central
SSA (Static Single Assignment) torna def-use explícito: cada nome é atribuído uma vez, facilitando análises e transformações.

### Progressão
1. Pipeline do compilador (repasse rápido de aula existente)  
2. IR: por que não otimizar AST direto  
3. SSA: uma atribuição por variável  
4. Φ-nodes na junção de fluxos (intuição visual)  
5. Constant propagation / DCE em SSA  
6. Dominators (leve, só o necessário)  
7. Ligação com LLVM IR (conceitual)  
8. O que SSA **não** faz sozinho (aliasing, side effects)  
9. Ponte com LTO/PGO da L5  
10. Erros: “compilador sempre salva código ruim”  

### Interações (≥3)
1. **To SSA** — pequeno CFG → forma SSA com Φ  
2. **Opt steps** — aplicar propagate/DCE passo a passo  
3. **Why blocked?** — transformação impedida por possível side effect/alias  

### Pré-requisitos
`como-funciona-um-compilador`, `compiladores-e-otimizacoes`, `undefined-behavior-mindset`

### Fontes
- Cytron et al. SSA paper (se URL estável) / surveys educacionais  
- LLVM Language Reference / Kaleidoscope tutorial  
- Appel / Dragon Book seções relevantes com links verificáveis  

---

## B5 — `sistemas-de-tipos-e-soundness`

**Título:** Sistemas de Tipos e Soundness  
**Secundária:** `matematica`  
**Tempo estimado:** 50–65 min

### Problema
O que um type system **realmente garante**? E o que Rust/Go estão prometendo em níveis diferentes?

### Ideia central
Soundness (intuição): se o tipo aceita, certas classes de erro em runtime não deveriam ocorrer. Tipos são **prova parcial**, não correção total do programa.

### Progressão
1. Tipos como contratos estáticos  
2. Progress + preservation (ideia, sem formalismo pesado demais)  
3. Sound vs unsound na prática  
4. Expressividade vs decidabilidade (trade-off)  
5. Ownership/borrowing como type system de recursos  
6. Go: tipagem simples + interfaces — o que garante e o que não  
7. Escape hatches: `unsafe`, reflection, FFI  
8. Ligação com memory safety e UB  
9. O que tipos **não** substituem (testes, specs, perf)  
10. Resumo para systems programmers  

### Interações (≥3)
1. **Guarantee checker** — afirmação → “tipo garante / não garante”  
2. **Escape hatch lab** — onde a prova quebra (unsafe/FFI)  
3. **Rust vs Go lens** — mesmo bug de classe → quem pega em compile-time?  

### Pré-requisitos
`rust-ownership-borrowing`, `rust-unsafe-boundaries`, `seguranca-de-memoria`, `go-modelo-mental`

### Fontes
- Pierce — TAPL (conceitual; citar material OCW/notas se URL ok)  
- Rust Book + Nomicon (ownership as type system)  
- Papers/notas de type soundness introdutórias (universidades)  
- Go spec — types section  

---

## Padrão de implementação (todas as aulas B)

1. Pasta `src/lessons/computacao/<id>/` com 4 arquivos  
2. `level: "Avançado"`  
3. 8–12 seções; ≥3 interações que **forçam raciocínio**  
4. Quiz ≥8 (cenários, não memorização de siglas)  
5. Glossário ≥10  
6. Sem números de performance inventados  
7. Formalismo com intuição: fórmulas só quando ajudam  
8. **Não editar** `src/lessons/index.ts` / `computacao/index.ts` nos subagentes — orquestrador registra  

### Interações preferidas nesta fase
- Simuladores de modelo (roofline, reorder, scheduler)  
- Classificadores de cenário  
- “O que o modelo garante?”  

---

## Ordem de implementação (checklist)

### Sprint B.1
- [x] `roofline-modelo-de-performance`
- [x] `consistencia-de-memoria-e-ordering`

### Sprint B.2
- [x] `teoria-de-scheduling`
- [x] `ssa-e-otimizacoes-de-compilador`

### Sprint B.3
- [x] `sistemas-de-tipos-e-soundness`
- [x] Registrar as 5 no `src/lessons/computacao/index.ts`
- [x] `npm run validate:lessons` + typecheck + build
- [x] Validação acadêmica + anti-alucinação
- [x] Atualizar checklist em `trilha_capstones_e_teoria.md` (Fase B)

---

## Critério de pronto da Fase B

- 5 aulas no catálogo  
- Validação estrutural verde  
- Relatórios em `prompts/validation/` (ex.: `fase-b-teoria-low-level-academic.md`)  
- Nenhuma claim de hardware/memory model sem base  
- Ponte explícita, em cada aula, para pelo menos 1 pré-requisito já existente  

---

## Depois da Fase B

Seguir para **Fase C — Teoria de IA** (`trilha_capstones_e_teoria.md`), sem abrir L6 completa nem trilha ofensiva.

---

## Status

- [x] Plano detalhado da Fase B escrito (`prompts/trilha_fase_b_teoria_low_level.md`)
- [x] Sprint B.1 implementado
- [x] Sprint B.2 implementado
- [x] Sprint B.3 + validação
- [ ] Merge na `main`
