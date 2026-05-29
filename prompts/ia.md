
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

# Visão Computacional

<!-- ## Fundamentos de Imagens Digitais para Segmentação

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Iniciante/intermediário

Ideia central:
Tudo em visão computacional começa no pixel: imagens são matrizes numéricas que precisam ser entendidas antes de poderem ser segmentadas.

Interações possíveis:
- visualizador de pixels com zoom até nível de célula;
- conversor RGB para escala de cinza;
- slider de contraste mostrando impacto na segmentação.

Tópicos:
- imagem digital como matriz;
- pixel;
- coordenadas;
- canais RGB;
- escala de cinza;
- intensidade;
- contraste;
- ruído;
- resolução;
- imagem binária.

--- -->

## Imagens Binárias, Limiarização e Histogramas

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
A binarização transforma uma imagem em apenas dois níveis (objeto e fundo) usando um limiar — e o histograma é a ferramenta para escolher esse valor.

Interações possíveis:
- histograma interativo com slider de limiar;
- visualização pixels acima/abaixo do threshold;
- simulador de iluminação alterando o histograma.

Tópicos:
- imagem binária;
- limiarização;
- threshold;
- histograma de intensidades;
- separação objeto/fundo;
- falso positivo;
- falso negativo;
- impacto da iluminação;
- contraste;
- ruído.

---

## Thresholding Global, Otsu e Adaptativo

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Diferentes técnicas de limiarização resolvem problemas diferentes: fixo para cenas uniformes, Otsu para histogramas bimodais e adaptativo para iluminação desigual.

Interações possíveis:
- comparador lado a lado: original, global, Otsu, adaptativo;
- slider de limiar global atualizando resultado em tempo real;
- controle de tamanho de janela no threshold adaptativo.

Tópicos:
- thresholding global;
- método de Otsu;
- thresholding adaptativo;
- média local;
- gaussiano local;
- iluminação uniforme vs desigual;
- histograma bimodal;
- comparação de resultados;
- parâmetros;
- escolha da técnica.

---

## Morfologia Matemática: Opening, Closing e Elementos Estruturantes

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Operações morfológicas corrigem imperfeições em imagens binárias usando um elemento estruturante que desliza sobre a imagem.

Interações possíveis:
- simulador de erosão e dilatação em matriz binária;
- comparação opening vs closing;
- slider de tamanho do kernel (3x3, 5x5, 7x7).

Tópicos:
- morfologia matemática;
- erosão;
- dilatação;
- opening;
- closing;
- elemento estruturante;
- kernel;
- remoção de ruído;
- preenchimento de buracos;
- impacto do tamanho.

---

## Adjacência, Conectividade e Blobs

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Pixels vizinhos se conectam para formar regiões — e a definição de vizinhança (4 ou 8) muda completamente o resultado da segmentação.

Interações possíveis:
- grade interativa de pixels alternando conectividade-4 e 8;
- comparador visual de resultados com dois tipos de conectividade;
- animação de caminho conectado formando um blob.

Tópicos:
- adjacência;
- vizinhança;
- conectividade-4;
- conectividade-8;
- caminho conectado;
- componente conectado;
- blob;
- diferença entre objeto visual e componente computacional;
- diagonais;
- fragmentação.

---

## Rotulação de Componentes Conectados

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Depois de binarizar, é preciso identificar cada região conectada como um objeto individual — isso é feito pela rotulação de componentes.

Interações possíveis:
- animação de pixels recebendo labels循序渐进;
- mapa colorido por blob com hover mostrando ID, área e bounding box;
- histograma interativo de áreas dos blobs.

Tópicos:
- connected component labeling;
- connectedComponentsWithStats;
- labels;
- stats;
- centroids;
- área;
- bounding box;
- colormap;
- contornos;
- filtragem de ruído;
- histograma de áreas.

---

## Contornos, Área, Perímetro e Bounding Box

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Depois de encontrar os blobs, extraímos medidas geométricas fundamentais: contorno, área, perímetro e retângulo envolvente.

Interações possíveis:
- contorno destacado sobre a imagem;
- bounding box ativável sobre cada objeto;
- comparação área vs perímetro entre formas diferentes.

Tópicos:
- contornos;
- findContours;
- área;
- contourArea;
- perímetro;
- arcLength;
- bounding box;
- boundingRect;
- retângulo envolvente;
- coordenadas.

---

## Momentos, Centro de Massa e Orientação

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Momentos de imagem descrevem como a massa de pixels está distribuída — permitindo calcular centro de massa e orientação do objeto.

Interações possíveis:
- centroide visual calculado sobre a forma;
- forma alterável com centroide recalculado em tempo real;
- comparação centroide vs centro da bounding box.

Tópicos:
- momentos de imagem;
- cv2.moments;
- centroide;
- centro de massa;
- momento espacial;
- momento central;
- orientação;
- distribuição espacial;
- diferença centroide vs bounding box.

---

## Circularidade, Solidez e Convex Hull

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Métricas de forma como circularidade e solidez permitem classificar objetos pela geometria — e o convex hull revela concavidades.

Interações possíveis:
- comparação de circularidade entre círculo, quadrado e forma irregular;
- convex hull sobreposto ao contorno original;
- slider de concavidade alterando solidez em tempo real.

Tópicos:
- circularidade;
- fórmula 4π × área / perímetro²;
- solidez;
- convex hull;
- área do hull;
- concavidade;
- compactação;
- classificação por forma;
- sensibilidade ao ruído;
- excentricidade.

---

## Classificação Baseada em Regras

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Features geométricas podem ser combinadas em regras simples para classificar objetos — mas regras manuais têm limitações claras.

Interações possíveis:
- editor de regras com sliders para área, circularidade e solidez;
- scatter plot interativo Área × Circularidade com cor por classe;
- imagem anotada sincronizada com o gráfico.

Tópicos:
- classificação baseada em regras;
- threshold de área;
- threshold de circularidade;
- threshold de solidez;
- classes interpretáveis;
- anotação na imagem;
- scatter plot;
- decisão;
- limitações de regras manuais;
- transição para aprendizado de máquina.

---

## Segmentação Semântica

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Segmentação semântica atribui uma classe a cada pixel da imagem — não apenas detecta onde o objeto está, mas contorna sua forma exata.

Interações possíveis:
- imagem original vs mapa semântico colorido por classe;
- controle de opacidade do overlay;
- legenda interativa filtrando classes.

Tópicos:
- segmentação semântica;
- classificação por pixel;
- mapa de segmentação;
- classes;
- overlay;
- modelo pré-treinado;
- diferença para classificação de imagem;
- diferença para detecção de objetos;
- DeepLab;
- limitações.

---

## Segmentação por Instâncias

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
Segmentação por instância vai além da semântica: separa objetos da mesma classe em indivíduos distintos com máscaras próprias.

Interações possíveis:
- comparador semântica vs instância;
- seleção de máscara individual por objeto;
- exemplo com múltiplos objetos da mesma classe separados.

Tópicos:
- segmentação por instâncias;
- máscaras individuais;
- classe + ID da instância;
- separação de objetos da mesma classe;
- Mask R-CNN;
- contornos por instância;
- comparação com semântica;
- aplicações práticas;
- panoptic segmentation;
- limitações.

---

## Pipeline Clássico vs Deep Learning para Segmentação

Categoria: Inteligência Artificial / Visão Computacional  
Nível: Intermediário

Ideia central:
O pipeline clássico usa regras e features manuais; deep learning aprende a segmentar automaticamente — cada abordagem tem onde brilhar e onde falhar.

Interações possíveis:
- comparador visual de pipeline clássico vs deep learning;
- atividade de montar pipeline arrastando etapas;
- tabela interativa de vantagens e limitações.

Tópicos:
- pipeline clássico;
- binarização;
- morfologia;
- features geométricas;
- regras manuais;
- deep learning;
- modelo pré-treinado;
- aprendizado a partir de dados;
- interpretabilidade vs flexibilidade;
- quando usar cada abordagem.

---
