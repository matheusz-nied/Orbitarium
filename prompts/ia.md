
# Inteligência Artificial

## Como Funciona um LLM


<!-- ## Tokens e Tokenização

Categoria: Inteligência Artificial  
Nível: Iniciante/intermediário

Ideia central:
Modelos não leem texto como humanos; eles processam unidades chamadas tokens.

Interações possíveis:
- digitar frase e ver tokens;
- comparar palavras comuns e raras;
- custo por tokens;
- contexto disponível;
- truncamento.

Tópicos:
- token;
- subword;
- vocabulário;
- encoding;
- contexto;
- custo;
- limites;
- idiomas diferentes.

--- -->

<!-- ## Embeddings

Categoria: Inteligência Artificial  
Nível: Intermediário

Ideia central:
Embeddings representam informações como vetores em um espaço semântico.

Interações possíveis:
- mapa 2D de vetores;
- similaridade;
- busca semântica;
- distância entre palavras;
- agrupamentos.

Tópicos:
- vetores;
- similaridade coseno;
- busca semântica;
- clustering;
- representação;
- embeddings de texto;
- embeddings de imagem;
- aplicações. -->

---

<!-- ## Transformers e Atenção

Categoria: Inteligência Artificial  
Nível: Intermediário/avançado inicial

Ideia central:
Transformers usam atenção para relacionar tokens entre si e construir representações contextuais.

Interações possíveis:
- mapa de atenção;
- tokens conectados;
- camadas;
- cabeças de atenção;
- comparação RNN vs Transformer.

Tópicos:
- self-attention;
- queries;
- keys;
- values;
- multi-head attention;
- positional encoding;
- camadas;
- feedforward.

---
 -->
## RAG: Retrieval-Augmented Generation

Categoria: Inteligência Artificial  
Nível: Intermediário

Ideia central:
RAG melhora respostas buscando informações externas antes de gerar texto.

Interações possíveis:
- pergunta → busca → documentos → resposta;
- chunking;
- embeddings;
- ranking;
- comparação com/sem RAG.

Tópicos:
- recuperação;
- chunking;
- vector database;
- embeddings;
- contexto;
- grounding;
- citações;
- limitações;
- avaliação.

---

## Agentes de IA

Categoria: Inteligência Artificial  
Nível: Intermediário

Ideia central:
Agentes combinam modelo, ferramentas, memória e planejamento para executar tarefas.

Interações possíveis:
- loop observar → pensar → agir;
- ferramenta chamada pelo agente;
- memória;
- planejamento;
- falha e recuperação.

Tópicos:
- tools;
- planejamento;
- execução;
- memória;
- estado;
- autonomia;
- limites;
- avaliação;
- segurança.

---

## Fine-tuning

Categoria: Inteligência Artificial  
Nível: Intermediário

Ideia central:
Fine-tuning ajusta um modelo pré-treinado para um comportamento, domínio ou formato específico.

Interações possíveis:
- base model → dataset → fine-tuned model;
- comparação prompt vs fine-tuning;
- exemplos de dataset;
- overfitting;
- avaliação.

Tópicos:
- modelo base;
- dataset;
- supervisão;
- LoRA;
- ajuste fino;
- domínio;
- custo;
- quando usar;
- quando não usar.

---

## Avaliação de LLMs

Categoria: Inteligência Artificial  
Nível: Intermediário

Ideia central:
Avaliar LLMs exige medir qualidade, fidelidade, segurança, custo e consistência.

Interações possíveis:
- comparação de respostas;
- rubrica;
- testes automatizados;
- hallucination check;
- avaliação humana vs automática.

Tópicos:
- benchmark;
- evals;
- métricas;
- groundedness;
- factualidade;
- precisão;
- regressão;
- custo;
- latência.

---

## Alucinações em IA

Categoria: Inteligência Artificial  
Nível: Iniciante/intermediário

Ideia central:
Alucinação ocorre quando o modelo gera uma resposta plausível, mas não fundamentada corretamente.

Interações possíveis:
- resposta com/sem fonte;
- confiança vs evidência;
- RAG reduzindo erro;
- comparação perguntas conhecidas/desconhecidas.

Tópicos:
- geração probabilística;
- falta de grounding;
- incerteza;
- fontes;
- verificação;
- RAG;
- limites;
- mitigação.

---

## Redes Neurais do Zero

Categoria: Inteligência Artificial  
Nível: Intermediário

Ideia central:
Redes neurais combinam pesos, funções e treinamento para aprender padrões a partir de dados.

Interações possíveis:
- neurônio artificial;
- pesos ajustáveis;
- forward pass;
- loss;
- treinamento simples.

Tópicos:
- neurônio;
- pesos;
- bias;
- ativação;
- camadas;
- loss;
- gradiente;
- treinamento.

---

## Backpropagation

Categoria: Inteligência Artificial  
Nível: Avançado inicial

Ideia central:
Backpropagation calcula como cada peso contribuiu para o erro para ajustar a rede.

Interações possíveis:
- rede pequena;
- erro propagando para trás;
- gradientes;
- atualização de pesos;
- learning rate.

Tópicos:
- função de perda;
- derivadas;
- regra da cadeia;
- gradiente;
- learning rate;
- otimização;
- treinamento.

---

## CNNs: Redes Convolucionais

Categoria: Inteligência Artificial  
Nível: Intermediário

Ideia central:
CNNs extraem padrões visuais aplicando filtros sobre imagens.

Interações possíveis:
- filtro passando sobre imagem;
- mapa de ativação;
- bordas;
- pooling;
- classificação.

Tópicos:
- convolução;
- filtros;
- kernels;
- feature maps;
- pooling;
- visão computacional;
- classificação.

---

## Diffusion Models

Categoria: Inteligência Artificial  
Nível: Intermediário/avançado inicial

Ideia central:
Modelos de difusão aprendem a transformar ruído em imagem por passos graduais de denoising.

Interações possíveis:
- imagem → ruído;
- ruído → imagem;
- passos de denoising;
- prompt guidance;
- comparação GAN vs diffusion.

Tópicos:
- ruído;
- denoising;
- geração de imagens;
- score matching, conceitualmente;
- guidance;
- latents;
- limitações.

---

## IA Multimodal

Categoria: Inteligência Artificial  
Nível: Intermediário

Ideia central:
Modelos multimodais combinam texto, imagem, áudio ou vídeo em uma representação comum.

Interações possíveis:
- imagem + pergunta;
- legenda automática;
- alinhamento texto-imagem;
- embeddings multimodais;
- comparação modalidades.

Tópicos:
- visão-linguagem;
- embeddings multimodais;
- OCR;
- áudio;
- vídeo;
- alinhamento;
- aplicações;
- limitações.

---

## Quantização de Modelos

Categoria: Inteligência Artificial / Hardware  
Nível: Intermediário

Ideia central:
Quantização reduz precisão numérica para diminuir memória e acelerar inferência.

Interações possíveis:
- FP32 vs FP16 vs INT8;
- tamanho do modelo;
- perda de precisão;
- velocidade;
- uso de VRAM.

Tópicos:
- precisão numérica;
- pesos;
- inferência;
- VRAM;
- INT8;
- FP16;
- quantização pós-treinamento;
- trade-offs.

---
