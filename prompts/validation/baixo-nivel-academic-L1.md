# Validação acadêmica — Baixo Nível L1 (`waves.L1_mentalidade`)

## Escopo validado

Manifesto de origem:

- `prompts/manifesto_aulas_baixo_nivel.json`
- wave: `waves.L1_mentalidade`

Aulas auditadas em `src/lessons/computacao/`:

1. `performance-mental-model`
2. `medir-antes-de-otimizar`
3. `cpu-bound-io-bound-memory-bound`
4. `latencia-vs-throughput`
5. `ampdal-e-limites-do-paralelismo`
6. `custo-de-abstracoes`
7. `flamegraphs-e-profiling`
8. `benchmarking-honesto`

Observação estrutural: as 8 aulas desta wave são materializadas por um arquivo compartilhado:

- `src/lessons/computacao/shared/performanceWaveL1.ts`

## Foco da validação

- correção da fórmula e da interpretação de Amdahl;
- distinção correta entre latência, throughput, fila e regime estável;
- metodologia de profiling e benchmarking;
- ausência de números inventados ou dados específicos sem base;
- correção objetiva dos quizzes.

## Critério de severidade

- **Crítico**: ensina algo factualmente incorreto a ponto de inverter o entendimento central do tema ou marcar resposta errada como correta.
- **Maior**: simplificação ou formulação que pode induzir modelo mental errado sobre o mecanismo principal, mesmo sem invalidar toda a aula.
- **Menor**: nuance, terminologia ou precisão adicional desejável, sem comprometer o núcleo conceitual.

## Resultado geral

- Aulas auditadas: **8**
- Problemas críticos: **0**
- Problemas maiores: **2**
- Problemas maiores corrigidos: **2**
- Aulas que exigiram correção: **2**
- Aulas validadas sem correção acadêmica necessária: **6**

## Resumo executivo

O conjunto está **academicamente sólido** e alinhado à proposta da wave L1. Não encontrei erro crítico na fórmula de Amdahl, na distinção geral entre latência e throughput, nem nos quizzes. Os dois ajustes aplicados foram cirúrgicos e de precisão metodológica:

1. explicitar melhor a leitura correta de **Little's Law** em regime estável;
2. endurecer a recomendação de **profiling em produção**, deixando claro que overhead precisa ser estimado antes de habilitar perfis.

## Achados e correções aplicadas

### 1) `latencia-vs-throughput` — major corrigido

**Problema**

O texto de Little's Law estava bom, mas podia induzir uma leitura incompleta ao falar apenas em “taxa média de chegada efetiva” sem explicitar com nitidez a igualdade prática entre taxa efetiva de chegada e taxa de saída/throughput em regime estável.

Em uma aula cujo foco é justamente **latência vs throughput**, essa precisão importa.

**Correção aplicada**

- o trecho principal passou a explicitar que, em regime estável, a taxa efetiva de chegada coincide com a taxa média de saída observada;
- o glossário foi alinhado com a mesma formulação.

**Impacto didático**

Reduz a chance de o aluno memorizar `L = λW` como uma identidade solta, desconectada da condição de estabilidade e da noção operacional de throughput.

### 2) `flamegraphs-e-profiling` — major corrigido

**Problema**

Na interação “Serviço Go em produção”, a cautela dizia:

> “Habilitar perfil sem medir o overhead é melhor do que nada...”

Isso é metodologicamente frouxo para uma aula de profiling. A documentação oficial de Go permite profiling em produção, mas recomenda estimar o custo e tratar a coleta com cuidado porque o profiler pode degradar ou distorcer o próprio sistema observado.

**Correção aplicada**

- a cautela foi reescrita para orientar:
  - estimar overhead;
  - preferir janelas curtas;
  - ou selecionar réplicas específicas;
  - evitando distorcer o comportamento que se quer explicar.

**Impacto didático**

Alinha a aula com prática de observabilidade mais madura: profiling em produção é possível, mas não deve ser apresentado como “melhor do que nada” sem a ressalva metodológica central.

## Situação por aula

| Aula | Status | Observação |
| --- | --- | --- |
| `performance-mental-model` | ok | Modelo de budgets, saturação e fila está consistente e sem números inventados. |
| `medir-antes-de-otimizar` | ok | Metodologia de hipótese, baseline, variável de confusão e validação está sólida. |
| `cpu-bound-io-bound-memory-bound` | ok | Classificação operacional dos bounds está correta e os quizzes estão objetivos. |
| `latencia-vs-throughput` | major corrigido | Little's Law ficou mais preciso ao ligar regime estável, chegada efetiva e throughput. |
| `ampdal-e-limites-do-paralelismo` | ok | Fórmula de Amdahl, interpretação de `p`, teto assintótico e quizzes estão corretos. |
| `custo-de-abstracoes` | ok | Explicação de zero-cost abstractions, release builds e hot path está coerente. |
| `flamegraphs-e-profiling` | major corrigido | Reforçada a cautela metodológica sobre overhead de profiling em produção. |
| `benchmarking-honesto` | ok | Warmup, ruído, `black_box`, representatividade e comparação estatística estão bem enquadrados. |

## Observações específicas do foco pedido

### Amdahl

- Fórmula validada: `S(N) = 1 / ((1 - p) + p/N)`.
- Interpretação de `p` está correta: fração do **tempo original** paralelizável, não fração de linhas de código.
- Leitura assintótica também está correta: quando `N -> infinito`, o limite ideal tende a `1 / (1 - p)`.
- O exemplo textual com `10%` serial e teto de `10x` é aceitável porque é **exemplo derivado da fórmula**, não dado empírico inventado.

### Latência vs throughput

- Distinção central está correta ao longo da aula.
- A explicação de fila como ponte entre capacidade e atraso está boa.
- O ponto de maior precisão necessário era a formulação operacional de Little's Law, já corrigida.

### Profiling / metodologia

- A leitura de flamegraph como agregação de stacks, e não timeline, está correta.
- A distinção entre on-CPU e off-CPU está correta.
- A aula de benchmarking está metodologicamente boa: workload, warmup, ruído, dead-code elimination e comparação robusta foram tratados de forma alinhada a documentação confiável.

### Quizzes

- Não encontrei resposta marcada incorretamente.
- Não encontrei ambiguidade grave do tipo “mais de uma alternativa plausível” nas 8 aulas auditadas.

### Números inventados

- Não encontrei números empíricos específicos inventados.
- Os poucos números explícitos relevantes no escopo auditado são:
  - percentis exemplificativos (`p95`, `p99`);
  - exemplo matemático derivado de Amdahl (`10%` serial -> teto `10x`);
  - unidades ilustrativas em referências/documentação, não nas afirmações centrais das aulas.

## Fontes de checagem usadas nesta validação

- OpenCSF — *Limits of Parallelism and Scaling*  
  https://opencsf.org/Books/csf/html/Scaling.html
- MIT 1.041 / Queueing Models notes  
  https://web.mit.edu/1.041/spring2023/lectures/L8-queuing-models-2023sp.pdf
- Brendan Gregg — *Flame Graphs*  
  https://www.brendangregg.com/flamegraphs.html
- Go Documentation — *Diagnostics*  
  https://go.dev/doc/diagnostics
- Go Packages — `testing`  
  https://pkg.go.dev/testing@latest
- Criterion.rs — *Analysis Process* / *Command-Line Output*  
  https://bheisler.github.io/criterion.rs/book/analysis.html  
  https://criterion-rs.github.io/book/user_guide/command_line_output.html
- The Rust Programming Language — *Performance in Loops vs. Iterators*  
  https://doc.rust-lang.org/book/ch13-04-performance.html

## Arquivos alterados

- `src/lessons/computacao/shared/performanceWaveL1.ts`
- `prompts/validation/baixo-nivel-academic-L1.md`

## Comandos executados

```bash
npm run build
```

## Pendências

- Nenhuma pendência bloqueante dentro do escopo pedido.
