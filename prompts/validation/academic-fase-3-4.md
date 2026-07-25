# Validacao academica - fases 3 e 4

Data: 2026-07-25
Escopo validado: todas as aulas de fase 3 e 4 listadas em `/workspace/prompts/manifesto_aulas_ia.json`

## Resumo executivo

- Aulas revisadas: 14
- Severidade maxima por aula:
  - critical: 0
  - major: 3
  - minor: 11
- Aulas com correcoes aplicadas: 4

## Criterio de severidade

- **critical**: erro factual relevante com alto potencial de induzir entendimento incorreto do conceito central.
- **major**: formulacao materialmente enganosa, overclaim tecnico ou simplificacao que precisava ser corrigida.
- **minor**: sem erro material identificado, ou apenas ajuste fino de wording/precisao sem risco conceitual alto.

---

## 1) `positional-encoding-janela-contexto`
**Severidade:** major

- **Corrigido:** `src/lessons/inteligencia-artificial/positional-encoding-janela-contexto/content.ts:L192-L193`
  - O texto podia sugerir uma leitura otimista demais sobre extrapolacao de comprimento com RoPE e ALiBi.
  - A redacao foi ajustada para deixar explicito que:
    - extensoes muito acima do comprimento de treino frequentemente exigem interpolacao, rescaling ou adaptacoes adicionais no caso de RoPE;
    - ALiBi facilita extrapolacao mais do que embeddings absolutos, mas nao garante qualidade uniforme em comprimentos muito alem do regime de treino.
- **Veredito:** aula forte e conceitualmente correta apos o ajuste.

## 2) `decoding-temperature-top-k-top-p`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- Temperatura, greedy, top-k e top-p estao explicados de forma correta e sem prometer ganhos de conhecimento, verdade ou raciocinio que decoding nao oferece.

## 3) `pre-treino-dados-scaling-laws`
**Severidade:** major

- **Corrigido:** `src/lessons/inteligencia-artificial/pre-treino-dados-scaling-laws/content.ts:L174-L180`
  - A formulacao sobre Kaplan foi tornada mais cuidadosa: o texto agora explicita que a recomendacao vale **no regime experimental e nas hipoteses analisadas**, e nao como lei universal.
- **Corrigido:** `src/lessons/inteligencia-artificial/pre-treino-dados-scaling-laws/content.ts:L194-L199`
  - A formulacao sobre Chinchilla foi refinada para evitar overclaim universal e para esclarecer que a conclusao e sobre **regime compute-optimal analisado**.
  - Foi removido um erro textual importante: "tinham visto dado demais de menos".
- **Veredito:** aula permaneceu didatica, mas agora esta mais fiel ao debate Kaplan vs. Chinchilla sem parecer slogan.

## 4) `alinhamento-sft-rlhf`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- O texto distingue corretamente:
  - pre-treino vs. alinhamento;
  - SFT vs. reward model vs. RLHF;
  - preferencias observadas vs. "valores humanos" em sentido amplo.

## 5) `alucinacoes-em-ia`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- A aula trata alucinacao como problema de evidência, grounding e politica de resposta, sem vender "temperatura zero" ou modelos maiores como solucao magica.

## 6) `prompt-engineering-com-fundamento`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- O texto acerta ao tratar prompt engineering como interface de tarefa e ao nao prometer que prompting substitui dados, ferramentas, retrieval ou avaliacao.

## 7) `rag-retrieval-augmented-generation`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- O texto descreve corretamente RAG como pipeline de ingestao -> retrieval -> montagem de contexto -> geracao, e nao como garantia automatica de factualidade.

## 8) `chunking-ranking-bases-vetoriais`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- A aula esta tecnicamente correta ao separar chunking, ranking lexical/denso/hibrido e infraestrutura vetorial, sem atribuir "compreensao" magica ao vector store.

## 9) `avaliacao-de-llms`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- O tratamento de evals, slices, baseline, LLM-as-a-judge e limites de metricas esta cuidadoso e alinhado com boas praticas modernas.

## 10) `fine-tuning-e-lora`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- A aula diferencia corretamente full fine-tuning, LoRA e QLoRA, e nao vende PEFT como substituto de dados bons, validacao ou escolha arquitetural correta.

## 11) `agentes-de-ia`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- O texto e especialmente bom em nao romantizar "agencia": apresenta agentes como loops controlados com ferramentas, estado e guardrails, nao como autonomia ilimitada.

## 12) `memoria-estado-orquestracao-workflows`
**Severidade:** minor

- Nenhum problema material de exatidao encontrado.
- A distincao entre memoria, estado, workflow, durabilidade, checkpoint e idempotencia esta correta e bem ancorada em engenharia de sistemas.

## 13) `ferramentas-function-calling-grounding`
**Severidade:** minor

- **Ajuste fino aplicado:** `src/lessons/inteligencia-artificial/ferramentas-function-calling-grounding/content.ts:L95-L97`
  - A quick fact "Grounding melhora factualidade" foi suavizada para "Grounding pode melhorar factualidade".
  - Motivo: grounding ajuda quando a evidência recuperada e a integracao do pipeline sao boas; em caso contrario, tambem pode transportar erro, desatualizacao ou conflito para a resposta.
- **Veredito:** conceitualmente correta; o ajuste foi preventivo para evitar leitura excessivamente categorica.

## 14) `observabilidade-sistemas-llm`
**Severidade:** major

- **Corrigido:** `src/lessons/inteligencia-artificial/observabilidade-sistemas-llm/content.ts:L82`
  - A formulacao original sugeria que observabilidade poderia dizer diretamente "por que o modelo escolheu esse caminho".
  - Isso foi trocado por uma formulacao mais precisa sobre sinais, observacoes e causalidade operacional do fluxo.
- **Corrigido:** `src/lessons/inteligencia-artificial/observabilidade-sistemas-llm/content.ts:L131-L132`
  - O texto agora deixa explicito que tracing fornece causalidade operacional do pipeline, e nao acesso perfeito ao "motivo interno" do modelo.
- **Veredito:** aula forte apos ajuste; agora evita antropomorfizacao epistêmica do tracing.

---

## Fontes de referencia usadas na validacao

Usei como base principal as referencias ja presentes nas proprias aulas, com especial peso para:

- Vaswani et al. (2017), Su et al. (RoPE), Press et al. (ALiBi)
- Holtzman et al. (2019) para decoding
- Kaplan et al. (2020) e Hoffmann et al. (2022) para scaling laws
- Ouyang et al. (2022), Christiano et al. (2017), Stiennon et al. (2020) para SFT/RLHF
- Lewis et al. (2020), Karpukhin et al. (2020) para RAG/retrieval
- Hu et al. (2021) e Dettmers et al. (2023) para LoRA/QLoRA
- OpenTelemetry/OpenInference e documentacao de tracing/observability para a aula de observabilidade

Nao foram introduzidas estatisticas novas nem referencias inventadas.
