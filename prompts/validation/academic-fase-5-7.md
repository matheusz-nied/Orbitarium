# Validação acadêmica — fases 5, 6 e 7

## Escopo

Validação integral das 24 aulas listadas em `/workspace/prompts/manifesto_aulas_ia.json` para as fases 5, 6 e 7, com leitura completa de cada `content.ts`.

Focos prioritários desta revisão:

- YOLO/detecção, diffusion, GANs, CLIP e multimodalidade
- ASR/TTS e critérios de avaliação
- quantização, destilação, serving/inferência e cautela com hardware
- segurança de LLMs e prompt injection em postura defensiva
- fairness, interpretabilidade, agência e impactos sociais
- RL, GNNs e séries temporais

## Resumo executivo

- **Aulas validadas:** 24/24
- **Achados críticos:** 0
- **Achados maiores:** 4
- **Achados menores:** 2
- **Correções aplicadas:** 6/6
- **Aulas sem achados críticos/maiores:** 20/24

## Correções cirúrgicas aplicadas

### 1) Quantização de Modelos — correção maior

**Arquivo:** `src/lessons/inteligencia-artificial/quantizacao-de-modelos/content.ts`

**Problema:** a formulação de PTQ no quiz/glossário podia confundir **post-training quantization** com cenários que já exigem adaptação explícita por treino.

**Correção aplicada:** o texto passou a explicitar que PTQ normalmente usa **calibração sem reabrir um ciclo completo de treinamento**, e que adaptação explícita ao ruído numérico já se aproxima mais de **QAT** ou fine-tuning específico.

**Justificativa acadêmica:** a distinção PTQ vs QAT é básica em compressão/inferência; misturá-la enfraquece a precisão conceitual da aula.

### 2) Áudio e Fala: ASR e TTS — correção maior

**Arquivo:** `src/lessons/inteligencia-artificial/audio-fala-asr-tts/content.ts`

**Problema:** o trecho sobre Whisper e métricas podia ser lido como robustez mais uniforme do que a literatura sustenta, e deixava subentendida uma comparabilidade excessivamente simples de WER/CER entre benchmarks e idiomas.

**Correção aplicada:**

- Whisper passou a ser descrito como robusto **relativamente** a gerações anteriores de ASR aberto, com ressalva explícita de variação por idioma, domínio e estilo de fala.
- A seção de métricas agora explicita que **WER/CER dependem de normalização, tokenização, idioma, pontuação e unidade de escrita**.
- A aula também passou a registrar que **MOS** e avaliações subjetivas ajudam em TTS, mas dependem do protocolo experimental.

**Justificativa acadêmica:** comparar acurácia de ASR e naturalidade de TTS sem essas ressalvas favorece conclusões superfortes demais para o estado da arte.

### 3) Time Series e Forecasting com ML — correção maior

**Arquivo:** `src/lessons/inteligencia-artificial/time-series-forecasting-ml/content.ts`

**Problema:** a seção sobre features temporais estava correta em lags/janelas, mas faltava uma advertência explícita sobre **covariáveis exógenas futuras**.

**Correção aplicada:** foi adicionada a condição de que promoções, clima, preços futuros e outros sinais exógenos **só podem entrar como feature se estiverem de fato disponíveis, contratados ou previstos no momento real da decisão**.

**Justificativa acadêmica:** esse é um dos pontos mais comuns de leakage temporal em forecasting aplicado.

### 4) IA e Sociedade — correção maior

**Arquivo:** `src/lessons/inteligencia-artificial/ia-e-sociedade/content.ts`

**Problema:** o trecho sobre autoria/copyright estava bom conceitualmente, mas generalizava um pouco demais a resposta jurídica sem lembrar que **jurisdições diferentes adotam critérios diferentes**.

**Correção aplicada:** o texto passou a marcar explicitamente que a resposta sobre autoria e proteção **varia conforme a jurisdição e o tipo de direito em disputa**, preservando a centralidade da contribuição humana substantiva.

**Justificativa acadêmica:** em temas de autoria e IA generativa, nuance jurisdicional é importante para evitar sobregeneralização.

### 5) Normalização de referências — correção menor

**Arquivos:**

- `src/lessons/inteligencia-artificial/agencia-autonomia-limites-llms/content.ts`
- `src/lessons/inteligencia-artificial/ia-e-sociedade/content.ts`

**Correção aplicada:** normalização do URL da Stanford Encyclopedia of Philosophy para a forma canônica em minúsculas.

### 6) Normalização de referência oficial — correção menor

**Arquivo:** `src/lessons/inteligencia-artificial/ia-e-sociedade/content.ts`

**Correção aplicada:** remoção do sufixo `?t=` do PDF do U.S. Copyright Office, mantendo o link oficial limpo e estável.

## Resultado por aula

| Fase | Aula | Status | Observação |
| --- | --- | --- | --- |
| 5 | deteccao-de-objetos-yolo | Limpa | Sem achados críticos/maiores. |
| 5 | diffusion-models | Limpa | Sem achados críticos/maiores. |
| 5 | gans-vs-diffusion | Limpa | Comparação equilibrada, sem exagero indevido. |
| 5 | ia-multimodal | Limpa | Boa distinção entre alinhamento, fusão e grounding. |
| 5 | clip-alinhamento-texto-imagem | Limpa | Correta sobre zero-shot e limites de CLIP. |
| 5 | ocr-document-ai | Limpa | Correta sobre OCR vs estrutura documental. |
| 5 | audio-fala-asr-tts | **Ajuste maior aplicado** | Métricas e robustez ficaram mais precisas. |
| 6 | quantizacao-de-modelos | **Ajuste maior aplicado** | PTQ vs QAT ficou conceitualmente mais limpo. |
| 6 | inferencia-latencia-batching-throughput | Limpa | Sem números inventados; boa distinção entre latência e throughput. |
| 6 | destilacao-compressao-modelos | Limpa | Correta sobre teacher-student e limites de compressão. |
| 6 | gpus-vram-custo-real-ia | Limpa | Boa cautela com preços e números de hardware. |
| 6 | mlops-essencial | Limpa | Sem achados críticos/maiores. |
| 6 | seguranca-llms-prompt-injection | Limpa | Postura defensiva correta; sem orientação ofensiva indevida. |
| 6 | privacidade-pii-dados-sensiveis-ia | Limpa | Boa cobertura de minimização, retenção e memorization risk. |
| 6 | avaliacao-continua-monitoramento-producao | Limpa | Correta sobre observabilidade e proxy metrics. |
| 7 | historia-da-ia | Limpa | Narrativa historicamente sóbria, sem teleologia forte. |
| 7 | vieses-fairness-dados | Limpa | Nuançada sobre métricas em tensão e governança. |
| 7 | explicabilidade-interpretabilidade | Limpa | Boa distinção entre fidelidade, utilidade e pós-hoc. |
| 7 | agencia-autonomia-limites-llms | **Ajuste menor aplicado** | Conteúdo correto; URL de referência normalizado. |
| 7 | avaliacao-cientifica-claims-ia | Limpa | Correta sobre validade, leakage e claims inflados. |
| 7 | ia-e-sociedade | **Ajuste maior aplicado** | Autoria/copyright ficou menos universalizante; referências normalizadas. |
| 7 | reinforcement-learning-introducao | Limpa | Correta sobre política, retorno e crédito temporal. |
| 7 | graph-neural-networks | Limpa | Correta sobre message passing, homofilia e limites. |
| 7 | time-series-forecasting-ml | **Ajuste maior aplicado** | Salvaguarda explícita contra leakage por covariáveis futuras. |

## Observações finais

- Não encontrei **números de hardware inventados** nas aulas de quantização, serving, VRAM/custo e monitoramento.
- A aula de **prompt injection** está academicamente alinhada com uma leitura de **fronteira de confiança + defesa em camadas**, e não com a falsa promessa de “prompt perfeito”.
- As aulas de **fairness, interpretabilidade, agência e sociedade** estão, em geral, bem calibradas: reconhecem conflito entre métricas, limites de explicações pós-hoc, antropomorfização indevida e responsabilidade institucional.
- As aulas de **RL, GNN e forecasting** estão corretas em alto nível; a única lacuna material encontrada nessa frente foi a explicitação do risco de covariáveis futuras em séries temporais.

## Contagem final

- **Críticos:** 0
- **Maiores:** 4
- **Menores:** 2
- **Total de achados:** 6
- **Total de correções aplicadas:** 6
