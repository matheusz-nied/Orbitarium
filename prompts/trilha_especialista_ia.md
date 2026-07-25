# Trilha: tornar-se especialista em Inteligência Artificial

Plano de aulas para o site de estudos interativos.  
Organizado por fases, do fundamento ao domínio prático e crítico.

**Como usar:** escolha um tema da coluna “A criar”, rode o pipeline de `etapas.md` e registre a aula em `src/lessons/`.

---

## O que já existe no catálogo

### Núcleo LLM / NLP (`inteligencia-artificial`)
| Aula | Slug | Nível |
|---|---|---|
| Tokens e Tokenização | `tokens-tokenizacao` | Intermediário |
| Embeddings | `embeddings` | Intermediário |
| Como Funciona um LLM | `como-funciona-um-llm` | Intermediário |
| Transformers e Atenção | `transformers-e-atencao` | Intermediário |

### Visão Computacional (catálogo em IA + Computação)
| Aula | Slug | Nível |
|---|---|---|
| Fundamentos de Imagens Digitais para Segmentação | `fundamentos-imagens-digitais-segmentacao` | Iniciante |
| Imagens Binárias, Limiarização e Histogramas | `imagens-binarias-limiarizacao-histogramas` | Intermediário |
| Thresholding Global, Otsu e Adaptativo | `thresholding-global-otsu-adaptativo` | Intermediário |
| Morfologia Matemática | `morfologia-matematica-opening-closing-elementos-estruturantes` | Intermediário |
| Adjacência, Conectividade e Blobs | `adjacencia-conectividade-blobs` | Intermediário |
| Rotulação de Componentes Conectados | `rotulacao-componentes-conectados` | Intermediário |
| Contornos, Área, Perímetro e Bounding Box | `contornos-area-perimetro-bounding-box` | Intermediário |
| Momentos, Centro de Massa e Orientação | `momentos-centro-massa-orientacao` | Intermediário |
| Circularidade, Solidez e Convex Hull | `circularidade-solidez-convex-hull` | Intermediário |
| Classificação Baseada em Regras | `classificacao-baseada-em-regras` | Intermediário |
| Segmentação Semântica | `segmentacao-semantica` | Intermediário |
| Segmentação por Instâncias | `segmentacao-por-instancias` | Avançado |
| Pipeline Clássico vs Deep Learning | `pipeline-classico-vs-deep-learning-segmentacao` | Intermediário |

**Lacuna principal:** o site já cobre bem *transformers/LLMs* e *visão clássica + segmentação*, mas ainda falta o “miolo” de ML clássico, treinamento de redes, sistemas de produção com LLMs e geração multimídia.

---

## Mapa da jornada

```text
Fase 0  Fundamentos matemáticos e de pensamento
   ↓
Fase 1  Aprendizado de máquina clássico
   ↓
Fase 2  Deep learning (redes, otimização, CNNs)
   ↓
Fase 3  LLMs na prática (já parcialmente feito)
   ↓
Fase 4  Sistemas com LLMs (RAG, agentes, eval, fine-tuning)
   ↓
Fase 5  Visão + geração (já parcialmente feito)
   ↓
Fase 6  Produção, eficiência e segurança
   ↓
Fase 7  Especialização e visão crítica
```

Cada fase tem temas **prioritários** (criar primeiro) e temas **de aprofundamento** (depois).

---

## Fase 0 — Fundamentos (pré-requisitos conceituais)

Categoria sugerida: `matematica` ou `inteligencia-artificial` (secundária `matematica`).

| # | Tema | Nível | Por que importa | Interações possíveis |
|---|---|---|---|---|
| 0.1 | Probabilidade para IA: incerteza, distribuição e valor esperado | Iniciante | Quase tudo em ML é probabilístico | Histograma interativo; lançar dados e ver frequência → probabilidade |
| 0.2 | Álgebra linear essencial: vetores, matrizes e espaços | Iniciante | Embeddings, atenção e redes são álgebra linear | Multiplicação matriz×vetor animada; projeção 2D |
| 0.3 | Gradientes e otimização intuitiva | Intermediário | Preparar backprop e training loops | Descer uma superfície de perda com learning rate ajustável |
| 0.4 | Teoria da informação: entropia, surpresa e bits | Intermediário | Liga tokens, compressão e cross-entropy | Comparar entropia de textos previsíveis vs caóticos |

**Ordem sugerida:** 0.1 → 0.2 → 0.3 → 0.4

---

## Fase 1 — Machine Learning clássico

Categoria: `inteligencia-artificial` (secundária `computacao` ou `matematica`).

| # | Tema | Nível | Ideia central | Interações possíveis |
|---|---|---|---|---|
| 1.1 | O que é aprendizado de máquina | Iniciante | Distinguir regras manuais, estatística e modelos que aprendem | Classificador de frutas por regras vs por dados |
| 1.2 | Aprendizado supervisionado, não supervisionado e por reforço | Iniciante | Três paradigmas e quando usar cada um | Seletor de problema → paradigma recomendado |
| 1.3 | Treino, validação, teste e vazamento de dados | Intermediário | Generalização depende do protocolo experimental | Split interativo; detectar data leakage em cenários |
| 1.4 | Overfitting, underfitting e regularização | Intermediário | O conflito entre ajustar o treino e generalizar | Curva de complexidade vs erro; slider de regularização |
| 1.5 | Regressão linear e logística (intuição) | Intermediário | Modelos lineares como porta de entrada | Reta ajustável; fronteira de decisão 2D |
| 1.6 | Árvores, ensembles e o poder da agregação | Intermediário | Bagging/boosting sem virar caixa-preta total | Votação de árvores fracas; feature importance simples |
| 1.7 | Métricas: acurácia, precisão, recall, F1, ROC | Intermediário | Escolher métrica é escolher o que otimizar | Matriz de confusão interativa; trade-off precisão/recall |
| 1.8 | Viés, variância e o erro irredutível | Avançado inicial | Framework mental para diagnosticar modelos | Diagrama viés-variância com datasets sintéticos |

**Prioridade alta:** 1.1, 1.2, 1.3, 1.4, 1.7  
**Depois:** 1.5, 1.6, 1.8

---

## Fase 2 — Deep Learning

Categoria: `inteligencia-artificial`.

| # | Tema | Nível | Status | Ideia central |
|---|---|---|---|---|
| 2.1 | Redes Neurais do Zero | Intermediário | A criar | Neurônio, pesos, forward pass, loss |
| 2.2 | Funções de ativação e expressividade | Intermediário | A criar | Por que ReLU/sigmoid/softmax existem |
| 2.3 | Funções de perda: MSE, cross-entropy e amigos | Intermediário | A criar | A loss define o que a rede “quer” |
| 2.4 | Backpropagation | Avançado | A criar | Erro propagando para trás via regra da cadeia |
| 2.5 | Otimizadores: SGD, momentum, Adam | Intermediário | A criar | Como os pesos realmente se movem |
| 2.6 | Inicialização, batch norm e estabilidade do treino | Avançado | A criar | Por que redes profundas “quebram” sem truques |
| 2.7 | CNNs: Redes Convolucionais | Intermediário | A criar | Filtros, feature maps, pooling |
| 2.8 | Regularização em deep learning: dropout, weight decay, early stopping | Intermediário | A criar | Evitar memorização em redes grandes |
| 2.9 | Transfer learning e fine-tuning de redes | Intermediário | A criar | Reaproveitar representações aprendidas |

**Prioridade alta:** 2.1 → 2.4 → 2.7 → 2.5  
**Interações-chave da fase:** neurônio ajustável; forward/back pass animado; filtro convolucional deslizando; trajetória do otimizador numa loss landscape.

---

## Fase 3 — LLMs por dentro (já em andamento)

Categoria: `inteligencia-artificial`.

| # | Tema | Status |
|---|---|---|
| 3.1 | Tokens e Tokenização | Feito |
| 3.2 | Embeddings | Feito |
| 3.3 | Como Funciona um LLM | Feito |
| 3.4 | Transformers e Atenção | Feito |
| 3.5 | Positional encoding e janela de contexto | A criar |
| 3.6 | Decoding: greedy, temperature, top-k, top-p | A criar |
| 3.7 | Pré-treino, dados e scaling laws (conceitual) | A criar |
| 3.8 | Alinhamento: SFT, RLHF e preferências | A criar |

**Prioridade alta após a Fase 2:** 3.6, 3.5, 3.8  
**Interações-chave:** amostragem com temperature; contexto truncando; comparação greedy vs sampling.

---

## Fase 4 — Sistemas com LLMs (produção cognitiva)

Categoria: `inteligencia-artificial` (secundária `computacao` / `engenharia`).

| # | Tema | Nível | Status | Ideia central |
|---|---|---|---|---|
| 4.1 | Alucinações em IA | Iniciante/Intermediário | A criar | Resposta plausível ≠ resposta fundamentada |
| 4.2 | Prompt engineering com fundamento | Intermediário | A criar | Estrutura, poucos exemplos, restrições e falhas |
| 4.3 | RAG: Retrieval-Augmented Generation | Intermediário | A criar | Buscar antes de gerar |
| 4.4 | Chunking, ranking e bases vetoriais | Intermediário | A criar | O “miolo” que faz RAG funcionar ou falhar |
| 4.5 | Avaliação de LLMs | Intermediário | A criar | Qualidade, fidelidade, custo, regressão |
| 4.6 | Fine-tuning e LoRA | Intermediário | A criar | Quando ajustar pesos vs quando só promptar/RAG |
| 4.7 | Agentes de IA | Intermediário | A criar | Loop observar → planejar → usar ferramentas → agir |
| 4.8 | Memória, estado e orquestração de workflows | Avançado | A criar | De chat único a sistemas multi-etapa |
| 4.9 | Ferramentas, function calling e grounding | Intermediário | A criar | Como o modelo age no mundo real com APIs |
| 4.10 | Observabilidade de sistemas LLM | Avançado | A criar | Traces, custos, falhas silenciosas |

**Ordem recomendada (núcleo prático):**  
`4.1 → 4.2 → 4.3 → 4.5 → 4.6 → 4.7 → 4.4 → 4.9 → 4.8 → 4.10`

Esta é a fase com **maior retorno imediato** se o objetivo for construir produtos com IA, não só entender papers.

---

## Fase 5 — Visão, geração e multimodal

Categoria: `inteligencia-artificial`.

### Já coberto
Pipeline clássico de segmentação + semântica/instâncias (13 aulas).

### A criar (complemento natural)

| # | Tema | Nível | Ideia central |
|---|---|---|---|
| 5.1 | CNNs na prática de classificação de imagens | Intermediário | Ponte entre visão clássica e deep learning *(pode fundir com 2.7)* |
| 5.2 | Detecção de objetos: bounding boxes e YOLO (conceitual) | Intermediário | Localizar e classificar ao mesmo tempo |
| 5.3 | Diffusion Models | Intermediário/Avançado | Do ruído à imagem por denoising |
| 5.4 | GANs vs Diffusion (comparativo) | Intermediário | Duas famílias de geração e seus trade-offs |
| 5.5 | IA Multimodal | Intermediário | Texto + imagem (+ áudio) em representação compartilhada |
| 5.6 | CLIP e alinhamento texto-imagem | Intermediário | Por que embeddings multimodais mudaram o jogo |
| 5.7 | OCR e document AI | Intermediário | Do pixel ao texto estruturado |
| 5.8 | Áudio e fala: ASR / TTS (conceitual) | Intermediário | Pipeline de voz sem virar curso de sinal |

**Prioridade alta:** 5.3, 5.5, 5.2  
**Depois:** 5.6, 5.4, 5.7, 5.8

---

## Fase 6 — Produção, eficiência e engenharia de IA

Categoria: `inteligencia-artificial` + `engenharia` / `computacao`.

| # | Tema | Nível | Ideia central |
|---|---|---|---|
| 6.1 | Quantização de Modelos | Intermediário | FP32 → FP16/INT8: memória, velocidade, qualidade |
| 6.2 | Inferência: latência, batching e throughput | Intermediário | O modelo treinado ainda precisa servir bem |
| 6.3 | Distilação e compressão de modelos | Avançado | Ensinar um modelo menor com um maior |
| 6.4 | GPUs, VRAM e o custo real da IA | Intermediário | Hardware como restrição de design |
| 6.5 | MLOps essencial: datasets, versionamento, pipelines | Intermediário | Reproduzibilidade e ciclo de vida |
| 6.6 | Segurança de LLMs: prompt injection e jailbreaks (defensivo) | Intermediário | Ameaças reais em apps com LLM |
| 6.7 | Privacidade, PII e dados sensíveis em sistemas de IA | Intermediário | O que não pode ir para o prompt/contexto |
| 6.8 | Avaliação contínua e monitoramento em produção | Avançado | Evals não acabam no notebook |

**Prioridade alta:** 6.1, 6.2, 6.6, 6.5

---

## Fase 7 — Especialização e visão crítica

Categoria: `inteligencia-artificial` + `filosofia` / `historia-da-ciencia`.

| # | Tema | Nível | Ideia central |
|---|---|---|---|
| 7.1 | História da IA: simbólica, conexionista e a era dos transformers | Iniciante | Contexto para não achar que IA nasceu em 2022 |
| 7.2 | Vieses, fairness e dados que distorcem decisões | Intermediário | Modelos herdam (e amplificam) o mundo dos dados |
| 7.3 | Explicabilidade e interpretabilidade | Avançado | O que dá para explicar — e o que é teatro |
| 7.4 | Agência, autonomia e limites do “raciocínio” de LLMs | Intermediário | Separar competência aparente de compreensão |
| 7.5 | Avaliação científica de claims de IA | Avançado | Ler papers e marketing sem se deixar levar |
| 7.6 | IA e sociedade: trabalho, autoria, responsabilidade | Intermediário | Especialista também precisa de julgamento ético |
| 7.7 | Reinforcement Learning (introdução conceitual) | Avançado | Agente, recompensa, exploração vs exploração |
| 7.8 | Graph Neural Networks / dados relacionais | Avançado | Quando a estrutura importa mais que a sequência |
| 7.9 | Time series e forecasting com ML | Intermediário | Outro eixo de aplicação muito pedido no mercado |

---

## Pacote mínimo recomendado (próximas 12 aulas)

Se você quiser o caminho mais eficiente para “parecer e ser” especialista prático em IA moderna, crie nesta ordem:

| Ordem | Tema | Fase | Motivo |
|---|---|---|---|
| 1 | Redes Neurais do Zero | 2 | Base que falta entre embeddings e “treino de verdade” |
| 2 | Backpropagation | 2 | Mecânica do aprendizado |
| 3 | Overfitting, underfitting e regularização | 1 | Diagnóstico que todo praticante usa |
| 4 | Métricas de classificação | 1 | Sem métrica boa, não há progresso mensurável |
| 5 | Alucinações em IA | 4 | Ponte entre teoria de LLM e risco real |
| 6 | RAG | 4 | Arquitetura dominante em produtos |
| 7 | Avaliação de LLMs | 4 | Fecha o ciclo RAG/prompt/fine-tune |
| 8 | Fine-tuning e LoRA | 4 | Alternativa correta ao “só promptar” |
| 9 | Agentes de IA | 4 | Próximo salto de sistemas |
| 10 | CNNs | 2/5 | Une a trilha de visão já existente ao deep learning |
| 11 | Diffusion Models | 5 | Geração de imagens com intuição sólida |
| 12 | Quantização de Modelos | 6 | Eficiência e deploy no mundo real |

Depois desse pacote, o natural é: **Decoding/sampling (3.6)**, **Multimodal (5.5)**, **Detecção de objetos (5.2)**, **Segurança de LLMs (6.6)** e **MLOps (6.5)**.

---

## Trilhas alternativas (mesmo catálogo, ênfases diferentes)

### Trilha A — Pesquisador / fundamentos profundos
`0.1–0.3 → 1.x → 2.1–2.6 → 3.5–3.8 → 7.5 → 7.7`

### Trilha B — Builder de produtos com LLM
`3.x (já feito) → 4.1–4.7 → 4.9 → 6.2 → 6.6 → 6.5 → 6.1`

### Trilha C — Visão e mídia generativa
`visão clássica (já feito) → 2.7 CNNs → 5.2 detecção → 5.3 diffusion → 5.5 multimodal → 5.6 CLIP`

### Trilha D — Engenharia de IA em produção
`1.3–1.7 → 4.5 → 6.1–6.5 → 6.8 → 4.10`

---

## Critérios de qualidade por aula (lembrete)

Cada tema acima, ao virar aula, deve seguir o padrão do projeto:

- 8–14 seções didáticas
- ≥ 3 interações visuais que ensinam (não só decoram)
- blocos de definição, insight, exemplo e erro comum
- resumo final
- quiz ≥ 8 perguntas
- glossário ≥ 10 termos
- referências reais (papers, universidades, docs oficiais — sem inventar)

Fontes preferidas para esta trilha:  
MIT OCW, Stanford CS231n/CS224n, DeepLearning.AI, Hugging Face docs, OpenAI/Anthropic docs educacionais, papers seminais (Attention Is All You Need, RAG, LoRA, Diffusion), Khan Academy (math foundations), Britannica / SEP para história e filosofia.

---

## Como marcar progresso

Ao concluir uma aula, atualize este arquivo:

- mova o tema para a seção “O que já existe”
- risque da fase correspondente ou marque `Status: Feito`
- se o tema veio de `ia.md`, marque lá também para evitar duplicata

Backlog legado relacionado: `prompts/ia.md` (temas LLM/visão) e `prompts/computer.md` (fundamentos de computação que sustentam IA).
