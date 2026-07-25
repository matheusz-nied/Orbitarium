# Trilha: Capstones + Teoria Profunda (IA e Baixo Nível)

Plano de implementação **recomendado** depois das trilhas de IA, Computação e Baixo Nível (L1–L5).

**Princípio:** menos volume, mais profundidade e aplicação.  
Não abrir trilha de hacking ofensivo. Segurança, se vier, será **defensiva**.

Manifesto: `prompts/manifesto_aulas_capstones_teoria.json`

---

## Por que esta ordem

```text
Fase A  Capstones (aplicar o que já existe)
   ↓
Fase B  Teoria de baixo nível (fundamentar performance)
   ↓
Fase C  Teoria de IA (fundamentar modelos)
   ↓
Fase D  Segurança defensiva (opcional)
```

1. **Capstones primeiro** — transformam catálogo em especialização prática  
2. **Teoria low-level** — fecha lacunas que limitam leitura de sistemas  
3. **Teoria IA** — aprofunda sem repetir as 59 aulas já feitas  
4. **Segurança defensiva** — só depois, e com recorte certo

---

## Pré-requisitos

| Bloco | Já no catálogo |
|---|---|
| Capstones | L1–L5 (performance), Rust L3, Go L4, CPU/cache/memória/SO |
| Teoria low-level | L2 locality, concurrency baixo nível, compiladores, ISA |
| Teoria IA | redes, backprop, transformers, métricas, overfitting |
| Segurança | `seguranca-de-memoria`, `seguranca-llms-prompt-injection` |

> Se a Onda L5 ainda estiver só em PR, mergear antes de implementar os capstones.

---

## Fase A — Capstones (4 aulas) — PRIORIDADE 1

Categoria primária: `computacao` (capstones 1–3) ou `inteligencia-artificial` só se o projeto for claramente de IA.  
Secundária: `engenharia`.

Cada capstone deve parecer **oficina guiada**: problema → medição → hipótese → intervenção → verificação.

| # | ID | Título | Nível | Entrega do aluno (conceitual) |
|---|---|---|---|---|
| A1 | `capstone-flamegraph-para-patch` | Capstone: Do Flamegraph ao Patch | Avançado | Ler profile, formar hipótese, escolher patch, invalidar/confirmar |
| A2 | `capstone-http-go-p99` | Capstone: Servidor HTTP em Go e p99 | Avançado | Instrumentar latência, achar bound, melhorar sem teatro |
| A3 | `capstone-parser-rust-ownership` | Capstone: Parser/Buffer em Rust | Avançado | Design com ownership, zero-copy onde couber, fronteiras safe |
| A4 | `capstone-go-vs-rust-criterio` | Capstone: Mesma Tarefa em Go e Rust | Avançado | Comparar com critério (latência, memória, complexidade, ops) |

### Interações típicas dos capstones
- Laboratório de decisão (qual bound? qual ferramenta?)
- Before/after de métricas **qualitativas** (sem inventar números)
- Checklist de experimentação
- Cenários com trade-offs explícitos

### Critério de pronto — Fase A
- 4 aulas no catálogo
- Cada uma com ≥3 interações de decisão/medição
- Referências reais (Gregg, Go diagnostics, Rust Book/Nomicon, SRE)
- Validação acadêmica + anti-alucinação

**Sprint A:** implementar A1→A4 nesta ordem.

---

## Fase B — Teoria de baixo nível (5 aulas) — PRIORIDADE 2

Categoria: `computacao` / secundária `matematica` ou `engenharia`.

| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| B1 | `roofline-modelo-de-performance` | Modelo Roofline de Performance | Avançado | Teto de compute vs teto de bandwidth |
| B2 | `consistencia-de-memoria-e-ordering` | Consistência de Memória e Ordering | Avançado | O que “ver” uma escrita significa entre cores |
| B3 | `teoria-de-scheduling` | Teoria de Scheduling (Intuição Formal) | Avançado | Fairness, latência, throughput, work-conserving |
| B4 | `ssa-e-otimizacoes-de-compilador` | SSA e Otimizações de Compilador | Avançado | Por que IR facilita otimizar de verdade |
| B5 | `sistemas-de-tipos-e-soundness` | Sistemas de Tipos e Soundness | Avançado | Tipos como prova parcial; ponte para Rust |

### Fontes-guia
- Williams et al. Roofline (Berkeley)
- Herlihy/Shavit (conceitos); Rust/C++ memory models docs
- OSTEP scheduling chapters
- SSA literature surveys / LLVM docs educacionais
- Pierce TAPL (conceitualmente) / materiais universitários de types

**Sprint B:** B1→B5 após Fase A.

---

## Fase C — Teoria de IA (5 aulas) — PRIORIDADE 3

Categoria: `inteligencia-artificial` / secundária `matematica`.

| # | ID | Título | Nível | Ideia central |
|---|---|---|---|---|
| C1 | `generalizacao-e-capacidade-de-modelos` | Generalização e Capacidade de Modelos | Avançado | Por que caber nos dados ≠ generalizar |
| C2 | `otimizacao-convexa-vs-nao-convexa` | Otimização Convexa vs Não-Convexa | Avançado | O que gradiente “garante” (e o que não) |
| C3 | `teoria-da-informacao-no-aprendizado` | Teoria da Informação no Aprendizado | Avançado | Surpresa, compressão e loss (aprofundar entropia) |
| C4 | `complexidade-da-atencao-e-kv-cache` | Complexidade da Atenção e KV Cache | Avançado | Custo teórico vira custo de serving |
| C5 | `mdp-e-equacoes-de-bellman` | MDPs e Equações de Bellman | Avançado | Base formal do RL (além da intro já existente) |

### Fontes-guia
- Hastie/Tibshirani/Friedman (ESL), Vapnik (conceitual)
- Boyd/Vandenberghe (convex opt) — intuição
- MacKay / Cover & Thomas (já na trilha)
- Vaswani et al. + materials de serving/KV cache
- Sutton & Barto

**Sprint C:** C1→C5. Pode paralelizar com B se houver capacidade, mas **não** antes dos capstones.

---

## Fase D — Segurança defensiva (opcional, 4 aulas)

**Não é trilha de hacking.** Foco: ameaça → defesa → engenharia segura.

| # | ID | Título | Nível |
|---|---|---|---|
| D1 | `threat-modeling-para-sistemas` | Threat Modeling para Sistemas | Intermediário |
| D2 | `hardening-de-binarios-e-aslr` | Hardening de Binários e ASLR (visão defensiva) | Avançado |
| D3 | `supply-chain-e-dependencias` | Supply Chain e Dependências | Intermediário |
| D4 | `secure-defaults-em-rust-e-go` | Secure Defaults em Rust e Go | Intermediário |

Só abrir depois de A+B (e idealmente C).

---

## O que fica de fora (de propósito)

- Trilha ofensiva / “hacking” exploratório  
- Mais aulas genéricas de IA já cobertas  
- Microserviços/GraphQL/TPU como expansão agora  
- L6 completa de uma vez (pegar itens pontuais só se um capstone exigir)

---

## Ordem de implementação (checklist)

### Sprint 1 — Capstones
- [x] `capstone-flamegraph-para-patch`
- [x] `capstone-http-go-p99`
- [x] `capstone-parser-rust-ownership`
- [x] `capstone-go-vs-rust-criterio`
- [x] Validação A + registro no catálogo

### Sprint 2 — Teoria low-level
- [ ] `roofline-modelo-de-performance`
- [ ] `consistencia-de-memoria-e-ordering`
- [ ] `teoria-de-scheduling`
- [ ] `ssa-e-otimizacoes-de-compilador`
- [ ] `sistemas-de-tipos-e-soundness`
- [ ] Validação B

### Sprint 3 — Teoria IA
- [ ] `generalizacao-e-capacidade-de-modelos`
- [ ] `otimizacao-convexa-vs-nao-convexa`
- [ ] `teoria-da-informacao-no-aprendizado`
- [ ] `complexidade-da-atencao-e-kv-cache`
- [ ] `mdp-e-equacoes-de-bellman`
- [ ] Validação C

### Sprint 4 — Segurança defensiva (opcional)
- [ ] D1–D4

---

## Contagem

| Fase | Aulas | Acumulado |
|---|---|---|
| A Capstones | 4 | 4 |
| B Teoria low-level | 5 | 9 |
| C Teoria IA | 5 | **14** |
| D Segurança (opc.) | 4 | 18 |

**Núcleo recomendado: 14 aulas (A+B+C).**

---

## Padrão de qualidade

Seguir `AGENTS.md` + briefs existentes:

- Capstones: progressão por **problema real**, não tutorial de ferramenta
- Teoria: formalismo com intuição; **sem números inventados**
- Quiz testa raciocínio (ex.: “qual bound?”, “o que o modelo garante?”)
- Referências universitárias/papers/docs oficiais verificáveis
- Sem conteúdo ofensivo de exploração

### Fontes preferidas
- Capstones: Gregg, Go diagnostics, Rust Book/Nomicon, SRE Book  
- Low-level: Roofline paper, OSTEP, LLVM docs, memory model docs  
- IA: ESL, Boyd, MacKay, Sutton & Barto, Attention Is All You Need  

---

## Como usar este plano

1. Mergear L5 na `main` se ainda estiver em PR  
2. Criar branch `cursor/capstones-teoria-<suffix>`  
3. Implementar Sprint 1 com subagentes + validação  
4. Só então Sprint 2 e 3  
5. Avaliar Sprint 4 com calma  

---

## Status

- [x] Plano escrito (`prompts/trilha_capstones_e_teoria.md`)
- [x] Manifesto (`prompts/manifesto_aulas_capstones_teoria.json`)
- [x] Fase A implementada
- [ ] Fase B implementada
- [ ] Fase C implementada
- [ ] Fase D opcional
- [ ] Validação + build verdes por fase
