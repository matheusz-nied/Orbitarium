# Trilha de Estudo — Atividade 2 de Visão Computacional

**Tema:** Representação e Descrição de Objetos, com introdução à Segmentação Semântica e Segmentação por Instâncias  
**Disciplina:** TECA2 — Tópicos em Visão Computacional  
**Entrega final:** 09/05/2026  
**Objetivo:** organizar todas as aulas que você pode passar ao seu agente/Codex para criar conteúdos interativos no site e estudar a atividade de forma progressiva.

---

## Como usar este Markdown

Use este arquivo como um **catálogo de aulas individuais**. Para cada aula, mande o prompt correspondente ao seu agente.  
A ordem foi pensada para seguir o fluxo da atividade:

```text
Imagem digital
  ↓
Binarização
  ↓
Morfologia
  ↓
Conectividade
  ↓
Componentes conectados / blobs
  ↓
Features geométricas
  ↓
Classificação baseada em regras
  ↓
Validação manual e análise crítica
  ↓
Segmentação semântica e por instâncias
```

---

# Mapa geral das aulas

## Parte 1 — Representação

1. Fundamentos de Imagens Digitais para Segmentação
2. Imagens Binárias, Limiarização e Histogramas
3. Thresholding Global, Otsu e Adaptativo
4. Morfologia Matemática: Opening, Closing e Elementos Estruturantes
5. Adjacência, Conectividade e Blobs
6. Rotulação de Componentes Conectados
7. Análise Comparativa: Conectividade-4 vs Conectividade-8

## Parte 2 — Descrição

8. Do Blob à Feature: Introdução à Descrição de Objetos
9. Contornos, Área, Perímetro e Bounding Box
10. Momentos, Centro de Massa e Orientação
11. Elipse Equivalente, Eixos e Excentricidade
12. Circularidade, Solidez e Convex Hull
13. Classificação Baseada em Regras
14. Validação Manual, Erro Percentual e Análise Crítica

## Parte 3 — Segmentação Inteligente com Deep Learning

15. Pipeline Clássico vs Segmentação com Deep Learning
16. Segmentação Semântica
17. Segmentação por Instâncias
18. Modelos Pré-treinados para Segmentação
19. Comparação Visual e Limitações dos Modelos

## Aula prática final

20. Como Montar os Notebooks e Apresentações da Atividade 2

---

# Prompt genérico para qualquer aula

```text
Crie uma nova aula completa no meu site de estudos interativos.

Tema da aula:
[COLE AQUI O TEMA ESCOLHIDO]

Contexto:
Esta aula faz parte da trilha "Atividade 2 de Visão Computacional — Representação, Descrição e Introdução à Segmentação Inteligente".

Objetivo:
A aula deve preparar o aluno para realizar a atividade da disciplina, com foco prático em Python, OpenCV, pandas, matplotlib, visualização e análise crítica de resultados.

Requisitos:
1. Pesquise fontes confiáveis.
2. Escreva em português do Brasil.
3. Crie explicação progressiva e profunda.
4. Inclua exemplos práticos em Python/OpenCV quando aplicável.
5. Inclua pelo menos 3 interações visuais úteis.
6. Inclua blocos de definição, insight, exemplo e erro comum.
7. Inclua quiz com pelo menos 8 perguntas.
8. Inclua glossário com pelo menos 10 termos.
9. Inclua referências.
10. Adicione a aula ao catálogo e à categoria correta.
11. Mantenha o padrão visual do site.
12. Rode build/lint/test e corrija erros.

Importante:
A aula deve ser diretamente útil para implementar os notebooks e apresentações da atividade.
Não crie conteúdo raso.
Não escreva apenas teoria.
Conecte o conceito com a implementação prática.
```

---

# Parte 1 — Representação

---

## Aula 1 — Fundamentos de Imagens Digitais para Segmentação

**Categoria:** Visão Computacional / Fundamentos  
**Nível:** Iniciante/intermediário  
**Prioridade:** Alta

### Objetivo

Entender o que é uma imagem digital e por que a segmentação começa com a manipulação de pixels.

### Por que estudar

A atividade exige transformar uma imagem real ou gerada por IA em uma imagem binária para detectar objetos. Antes disso, é preciso entender pixels, canais, resolução, intensidade, contraste e escala de cinza.

### Tópicos obrigatórios

- Imagem digital como matriz
- Pixel
- Coordenadas `(x, y)`
- Resolução
- Canais RGB
- Escala de cinza
- Intensidade de pixel
- Contraste
- Ruído
- Imagem binária

### Interações visuais sugeridas

1. **Visualizador de pixels** — ampliar imagem até mostrar pixels e seus valores.
2. **Conversor RGB → grayscale** — alternar entre imagem colorida e escala de cinza.
3. **Controle de contraste** — slider mostrando como contraste afeta segmentação.

### Código-base

```python
import cv2
import matplotlib.pyplot as plt

img = cv2.imread("imagem.jpg")
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

print(img_rgb.shape)
print(gray.shape)

plt.imshow(gray, cmap="gray")
plt.show()
```

### Glossário mínimo

Pixel, resolução, RGB, escala de cinza, intensidade, contraste, canal, matriz, ruído, segmentação.

### Prompt para o Codex

```text
Crie uma aula completa sobre "Fundamentos de Imagens Digitais para Segmentação".

Explique pixels, resolução, RGB, escala de cinza, intensidade, contraste, ruído e imagem como matriz.

Inclua interações:
1. visualizador de pixels;
2. conversor RGB para grayscale;
3. controle de contraste.

Inclua exemplos em Python/OpenCV, quiz, glossário, blocos de definição, insight e erro comum.
A aula deve preparar o aluno para entender binarização e segmentação.
```

---

## Aula 2 — Imagens Binárias, Limiarização e Histogramas

**Categoria:** Visão Computacional / Segmentação Clássica  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Entender como uma imagem grayscale pode ser convertida em imagem binária usando um limiar.

### Por que estudar

A atividade exige exibir lado a lado: imagem de entrada, histograma com limiar marcado e imagem binária resultante.

### Tópicos obrigatórios

- Imagem binária
- Limiarização
- Threshold
- Histograma de intensidades
- Separação objeto/fundo
- Escolha de limiar
- Contraste objeto-fundo
- Falso positivo e falso negativo
- Impacto de ruído e iluminação

### Interações visuais sugeridas

1. **Histograma interativo** — slider do limiar atualizando a imagem binária.
2. **Separação objeto/fundo** — destacar pixels abaixo/acima do threshold.
3. **Simulador de iluminação** — alterar iluminação e ver o histograma mudar.

### Código-base

```python
import cv2
import matplotlib.pyplot as plt

gray = cv2.imread("imagem.jpg", cv2.IMREAD_GRAYSCALE)
threshold_value = 120
_, binary = cv2.threshold(gray, threshold_value, 255, cv2.THRESH_BINARY)

plt.figure(figsize=(12, 4))
plt.subplot(1, 3, 1)
plt.imshow(gray, cmap="gray")
plt.title("Imagem grayscale")

plt.subplot(1, 3, 2)
plt.hist(gray.ravel(), bins=256)
plt.axvline(threshold_value, color="red")
plt.title("Histograma")

plt.subplot(1, 3, 3)
plt.imshow(binary, cmap="gray")
plt.title("Imagem binária")
plt.show()
```

### Glossário mínimo

Threshold, limiar, histograma, imagem binária, fundo, objeto, intensidade, contraste, falso positivo, falso negativo.

### Prompt para o Codex

```text
Crie uma aula completa sobre "Imagens Binárias, Limiarização e Histogramas".

A aula deve ensinar imagem binária, histograma, threshold, separação objeto/fundo e impacto da iluminação.

Inclua interações:
1. histograma com slider de limiar;
2. imagem binária atualizada em tempo real;
3. simulador de iluminação.

Inclua exemplos em Python/OpenCV, quiz, glossário e blocos didáticos.
```

---

## Aula 3 — Thresholding Global, Otsu e Adaptativo

**Categoria:** Visão Computacional / Segmentação Clássica  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Comparar três técnicas de binarização exigidas na atividade: limiar fixo, Otsu e adaptativo.

### Tópicos obrigatórios

- Thresholding global com valor fixo
- Escolha manual por análise do histograma
- Método de Otsu
- Thresholding adaptativo
- Média local
- Gaussiano local
- Iluminação uniforme vs desigual
- Comparação de resultados

### Interações visuais sugeridas

1. **Comparador lado a lado** — original, global, Otsu e adaptativo.
2. **Slider de limiar global** — alterar threshold fixo.
3. **Controle de bloco adaptativo** — alterar tamanho da janela local.

### Código-base

```python
import cv2

gray = cv2.imread("imagem.jpg", cv2.IMREAD_GRAYSCALE)

_, global_bin = cv2.threshold(gray, 120, 255, cv2.THRESH_BINARY)

_, otsu_bin = cv2.threshold(
    gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
)

adaptive_mean = cv2.adaptiveThreshold(
    gray, 255,
    cv2.ADAPTIVE_THRESH_MEAN_C,
    cv2.THRESH_BINARY,
    31,
    5
)

adaptive_gaussian = cv2.adaptiveThreshold(
    gray, 255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY,
    31,
    5
)
```

### Tabela conceitual

| Técnica | Vantagem | Limitação | Quando usar |
|---|---|---|---|
| Global | Simples e rápida | Sensível à iluminação | Fundo uniforme |
| Otsu | Automática | Pode falhar com sombras | Histograma bimodal |
| Adaptativa | Lida melhor com iluminação irregular | Mais parâmetros | Iluminação desigual |

### Prompt para o Codex

```text
Crie uma aula completa sobre "Thresholding Global, Otsu e Adaptativo".

Compare:
1. limiar fixo por análise do histograma;
2. Otsu;
3. thresholding adaptativo por média local ou gaussiano.

Inclua interações:
1. comparador lado a lado;
2. slider para limiar global;
3. controle de tamanho de janela no threshold adaptativo.

Inclua código Python/OpenCV, tabela comparativa, quiz e glossário.
```

---

## Aula 4 — Morfologia Matemática: Opening, Closing e Elementos Estruturantes

**Categoria:** Visão Computacional / Pré-processamento  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Entender como operações morfológicas corrigem ruídos e imperfeições em imagens binárias.

### Tópicos obrigatórios

- Morfologia matemática
- Erosão
- Dilatação
- Opening
- Closing
- Elemento estruturante
- Kernel
- Remoção de ruído
- Preenchimento de buracos
- Impacto do tamanho do kernel

### Interações visuais sugeridas

1. **Simulador de erosão/dilatação** em matriz binária pequena.
2. **Opening vs closing** aplicado a ruído e buracos.
3. **Slider de tamanho do kernel**: 3x3, 5x5, 7x7.

### Código-base

```python
import cv2
import numpy as np

kernel_3 = np.ones((3, 3), np.uint8)
kernel_5 = np.ones((5, 5), np.uint8)

opening_3 = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel_3)
closing_3 = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel_3)

opening_5 = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel_5)
closing_5 = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel_5)
```

### Prompt para o Codex

```text
Crie uma aula completa sobre "Morfologia Matemática: Opening, Closing e Elementos Estruturantes".

Explique erosão, dilatação, opening, closing, kernel e impacto do tamanho do elemento estruturante.

Inclua interações:
1. simulação de erosão/dilatação em matriz binária;
2. comparação opening vs closing;
3. slider de tamanho do kernel.

Inclua código Python/OpenCV, exemplos visuais, quiz, glossário e erros comuns.
```

---

## Aula 5 — Adjacência, Conectividade e Blobs

**Categoria:** Visão Computacional / Representação de Objetos  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Entender como pixels binários se conectam para formar regiões ou blobs.

### Tópicos obrigatórios

- Adjacência
- Vizinhança
- Conectividade
- Conectividade-4
- Conectividade-8
- Caminho conectado
- Componente conectado
- Blob
- Diferença entre objeto visual e componente computacional

### Interações visuais sugeridas

1. **Grade interativa de pixels** — alternar conectividade-4 e 8.
2. **Comparador 4 vs 8** — mesma imagem com resultados diferentes.
3. **Caminho conectado** — animação mostrando cadeia de pixels conectados.

### Exemplo visual

```text
Conectividade-4:
  X
X P X
  X

Conectividade-8:
X X X
X P X
X X X
```

### Prompt para o Codex

```text
Crie uma aula completa sobre "Adjacência, Conectividade e Blobs".

Explique adjacência-4, adjacência-8, conectividade, caminho conectado, componente conectado e blob.

Inclua interações:
1. grade interativa de pixels;
2. alternância conectividade-4 vs conectividade-8;
3. animação de caminho conectado.

Inclua exemplos visuais, quiz, glossário e conexão direta com connectedComponentsWithStats.
```

---

## Aula 6 — Rotulação de Componentes Conectados

**Categoria:** Visão Computacional / Representação de Objetos  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Entender como detectar e rotular blobs em uma imagem binária usando OpenCV.

### Tópicos obrigatórios

- Connected component labeling
- `cv2.connectedComponentsWithStats`
- Labels
- Stats
- Centroids
- Área
- Bounding box
- Colormap
- Contornos
- Histograma de áreas
- Filtragem de blobs pequenos

### Interações visuais sugeridas

1. **Rotulador animado** — pixels agrupados recebendo labels.
2. **Mapa colorido de blobs** — hover mostra ID, área e bounding box.
3. **Histograma de áreas** — clicar em barra destaca blobs daquela faixa.

### Código-base

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(
    binary,
    connectivity=8
)

areas = stats[1:, cv2.CC_STAT_AREA]
print("Número de blobs:", num_labels - 1)
print("Áreas:", areas)

colored = np.zeros((*labels.shape, 3), dtype=np.uint8)

for label in range(1, num_labels):
    color = np.random.randint(0, 255, size=3)
    colored[labels == label] = color

plt.imshow(colored)
plt.show()
```

### Código para bounding boxes

```python
output = img.copy()

for label in range(1, num_labels):
    x = stats[label, cv2.CC_STAT_LEFT]
    y = stats[label, cv2.CC_STAT_TOP]
    w = stats[label, cv2.CC_STAT_WIDTH]
    h = stats[label, cv2.CC_STAT_HEIGHT]

    cv2.rectangle(output, (x, y), (x+w, y+h), (0, 255, 0), 2)
    cv2.putText(output, str(label), (x, y-5),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)
```

### Prompt para o Codex

```text
Crie uma aula completa sobre "Rotulação de Componentes Conectados".

Ensine connected component labeling e cv2.connectedComponentsWithStats.

Inclua:
- labels;
- stats;
- centroids;
- área;
- bounding box;
- imagem colorida por blob;
- histograma de áreas;
- filtragem de ruído.

Interações:
1. mapa colorido de blobs com hover;
2. histograma interativo de áreas;
3. animação simplificada de rotulação.

Inclua código Python/OpenCV, quiz e glossário.
```

---

## Aula 7 — Análise Comparativa: Conectividade-4 vs Conectividade-8

**Categoria:** Visão Computacional / Avaliação de Representação  
**Nível:** Intermediário  
**Prioridade:** Alta

### Objetivo

Comparar quantitativamente os efeitos da conectividade-4 e conectividade-8 na rotulação de blobs.

### Tópicos obrigatórios

- Comparação experimental
- Número de blobs
- Área média
- Tempo de execução
- Conectividade-4 vs conectividade-8
- Casos diagonais
- Sensibilidade a ruído
- Tabela comparativa
- Discussão crítica

### Código-base

```python
import time
import pandas as pd

results = []

for conn in [4, 8]:
    start = time.time()

    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(
        binary,
        connectivity=conn
    )

    elapsed = time.time() - start
    areas = stats[1:, cv2.CC_STAT_AREA]

    results.append({
        "connectivity": conn,
        "num_blobs": num_labels - 1,
        "mean_area": areas.mean(),
        "execution_time": elapsed
    })

df = pd.DataFrame(results)
print(df)
```

### Perguntas de análise crítica

- A conectividade-8 uniu objetos que deveriam estar separados?
- A conectividade-4 fragmentou objetos que deveriam ser únicos?
- Houve diferença significativa no tempo de execução?
- Qual conectividade representou melhor a cena real?
- Como ruídos diagonais afetaram o resultado?

### Prompt para o Codex

```text
Crie uma aula completa sobre "Análise Comparativa: Conectividade-4 vs Conectividade-8".

Ensine como comparar número de blobs, área média e tempo de execução.

Inclua interações:
1. comparador lado a lado;
2. tabela dinâmica de métricas;
3. exemplo visual de pixels diagonais.

Inclua código Python/OpenCV, perguntas de análise crítica, quiz e glossário.
```

---

# Parte 2 — Descrição

---

## Aula 8 — Do Blob à Feature: Introdução à Descrição de Objetos

**Categoria:** Visão Computacional / Descrição de Objetos  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Entender por que, depois de detectar blobs, precisamos extrair features numéricas.

### Tópicos obrigatórios

- Subproblema de descrição
- Features
- Medidas geométricas
- Pixels → blobs → características → decisão
- DataFrame de features
- Interpretação de atributos
- Classificação baseada em regras

### Interações visuais sugeridas

1. **Pipeline visual** — imagem original → binária → blobs → features → classificação.
2. **Card de blob** — clicar em blob e mostrar suas features.
3. **Tabela interativa** — selecionar linha do DataFrame e destacar blob.

### Exemplo de DataFrame esperado

| id | area | cx | cy | perimeter | circularity | solidity | class |
|---|---:|---:|---:|---:|---:|---:|---|
| 1 | 1832 | 120 | 340 | 154.2 | 0.91 | 0.96 | circular |
| 2 | 950 | 240 | 310 | 132.8 | 0.68 | 0.81 | irregular |

### Prompt para o Codex

```text
Crie uma aula completa sobre "Do Blob à Feature: Introdução à Descrição de Objetos".

Explique o subproblema de descrição e o pipeline pixels → blobs → features → decisão.

Inclua interações:
1. pipeline visual;
2. card interativo de blob;
3. tabela de features destacando blobs.

Inclua exemplos em Python/pandas/OpenCV, quiz e glossário.
```

---

## Aula 9 — Contornos, Área, Perímetro e Bounding Box

**Categoria:** Visão Computacional / Features Geométricas  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Aprender a extrair medidas básicas de forma e tamanho dos blobs.

### Tópicos obrigatórios

- Contornos
- `cv2.findContours`
- Área
- `cv2.contourArea`
- Perímetro
- `cv2.arcLength`
- Bounding box
- `cv2.boundingRect`
- Retângulo envolvente
- Coordenadas `(x, y, w, h)`

### Interações visuais sugeridas

1. **Contorno interativo** — mostrar borda do objeto destacada.
2. **Bounding box dinâmica** — ativar/desativar retângulo envolvente.
3. **Área vs perímetro** — comparar objetos de área parecida e perímetro diferente.

### Código-base

```python
contours, _ = cv2.findContours(
    binary,
    cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE
)

features = []

for i, cnt in enumerate(contours):
    area = cv2.contourArea(cnt)
    perimeter = cv2.arcLength(cnt, True)
    x, y, w, h = cv2.boundingRect(cnt)

    features.append({
        "id": i + 1,
        "area": area,
        "perimeter": perimeter,
        "x": x,
        "y": y,
        "w": w,
        "h": h
    })
```

### Prompt para o Codex

```text
Crie uma aula completa sobre "Contornos, Área, Perímetro e Bounding Box".

Explique findContours, contourArea, arcLength e boundingRect.

Inclua interações:
1. contorno destacado;
2. bounding box ativável;
3. comparação área vs perímetro.

Inclua código Python/OpenCV, quiz, glossário e exemplos visuais.
```

---

## Aula 10 — Momentos, Centro de Massa e Orientação

**Categoria:** Visão Computacional / Features Geométricas  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Entender como momentos descrevem posição, centro de massa e distribuição espacial dos pixels.

### Tópicos obrigatórios

- Momentos de imagem
- `cv2.moments`
- Centroide
- Centro de massa
- Coordenadas `(cx, cy)`
- Interpretação geométrica
- Distribuição espacial dos pixels
- Diferença entre centroide e centro da bounding box

### Interações visuais sugeridas

1. **Centroide visual** — objeto e ponto central calculado.
2. **Distribuição de massa** — alterar forma e ver centro mudar.
3. **Centroide vs centro da bounding box** — comparação visual.

### Código-base

```python
M = cv2.moments(cnt)

if M["m00"] != 0:
    cx = M["m10"] / M["m00"]
    cy = M["m01"] / M["m00"]
else:
    cx, cy = None, None
```

### Prompt para o Codex

```text
Crie uma aula completa sobre "Momentos, Centro de Massa e Orientação".

Explique cv2.moments, centroide, centro de massa e interpretação geométrica.

Inclua interações:
1. centroide visual;
2. forma alterável com centroide recalculado;
3. comparação centroide vs centro da bounding box.

Inclua código Python/OpenCV, quiz e glossário.
```

---

## Aula 11 — Elipse Equivalente, Eixos e Excentricidade

**Categoria:** Visão Computacional / Features Geométricas  
**Nível:** Intermediário  
**Prioridade:** Alta

### Objetivo

Entender como uma elipse ajustada ao contorno ajuda a descrever orientação e alongamento do objeto.

### Tópicos obrigatórios

- Elipse equivalente
- `cv2.fitEllipse`
- Eixo maior
- Eixo menor
- Orientação
- Ângulo
- Alongamento
- Excentricidade conceitual
- Requisito mínimo de pontos

### Interações visuais sugeridas

1. **Elipse ajustada** — contorno e elipse sobreposta.
2. **Slider de alongamento** — ver eixos mudarem.
3. **Orientação angular** — rotacionar objeto e mostrar ângulo.

### Código-base

```python
if len(cnt) >= 5:
    ellipse = cv2.fitEllipse(cnt)
    (cx, cy), (major_axis, minor_axis), angle = ellipse
```

### Prompt para o Codex

```text
Crie uma aula completa sobre "Elipse Equivalente, Eixos e Excentricidade".

Explique cv2.fitEllipse, eixo maior, eixo menor, orientação e alongamento.

Inclua interações:
1. contorno com elipse ajustada;
2. slider de alongamento;
3. rotação com atualização do ângulo.

Inclua código Python/OpenCV, quiz, glossário e erros comuns.
```

---

## Aula 12 — Circularidade, Solidez e Convex Hull

**Categoria:** Visão Computacional / Features de Forma  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Entender métricas de forma usadas para classificar objetos como circulares, irregulares, compactos ou com concavidades.

### Tópicos obrigatórios

- Circularidade
- Fórmula `4π * área / perímetro²`
- Solidez
- Convex hull
- Área do convex hull
- Concavidade
- Compactação
- Sensibilidade ao ruído
- Classificação por forma

### Interações visuais sugeridas

1. **Circularidade visual** — círculo, elipse e objeto irregular.
2. **Convex hull interativo** — objeto com concavidade e hull sobreposto.
3. **Solidez** — alterar concavidade e ver solidez diminuir.

### Código-base

```python
import numpy as np

area = cv2.contourArea(cnt)
perimeter = cv2.arcLength(cnt, True)

if perimeter > 0:
    circularity = 4 * np.pi * area / (perimeter ** 2)
else:
    circularity = 0

hull = cv2.convexHull(cnt)
hull_area = cv2.contourArea(hull)

if hull_area > 0:
    solidity = area / hull_area
else:
    solidity = 0
```

### Prompt para o Codex

```text
Crie uma aula completa sobre "Circularidade, Solidez e Convex Hull".

Explique circularidade, fórmula 4π * área / perímetro², solidez, convex hull e concavidades.

Inclua interações:
1. comparação de circularidade entre formas;
2. convex hull sobreposto ao objeto;
3. slider de concavidade afetando solidez.

Inclua código Python/OpenCV, quiz, glossário e exemplos visuais.
```

---

## Aula 13 — Classificação Baseada em Regras

**Categoria:** Visão Computacional / Classificação Clássica  
**Nível:** Intermediário  
**Prioridade:** Muito alta

### Objetivo

Aprender a transformar features geométricas em classes usando regras simples.

### Tópicos obrigatórios

- Classificação baseada em regras
- Threshold de área
- Threshold de circularidade
- Threshold de solidez
- Classes
- Regras interpretáveis
- Anotação na imagem
- Scatter plot
- Área × Circularidade
- Limitações de regras manuais

### Interações visuais sugeridas

1. **Editor de regras** — sliders para área, circularidade e solidez.
2. **Scatter plot interativo** — Área × Circularidade, cor por classe.
3. **Imagem anotada sincronizada** — clicar no ponto destaca objeto.

### Código-base

```python
def classify(row):
    if row["area"] < 1500:
        return "pequeno"
    elif row["circularity"] > 0.85 and row["solidity"] > 0.9:
        return "circular_compacto"
    elif row["solidity"] < 0.9:
        return "com_concavidade"
    else:
        return "outro"

df["class"] = df.apply(classify, axis=1)
```

### Prompt para o Codex

```text
Crie uma aula completa sobre "Classificação Baseada em Regras".

Explique como usar features geométricas para classificar objetos em pequenos, médios, grandes, circulares, irregulares, compactos ou com concavidades.

Inclua interações:
1. editor de regras com sliders;
2. scatter plot interativo Área × Circularidade;
3. imagem anotada sincronizada com o gráfico.

Inclua código Python/pandas/OpenCV, quiz, glossário e discussão de limitações.
```

---

## Aula 14 — Validação Manual, Erro Percentual e Análise Crítica

**Categoria:** Visão Computacional / Avaliação de Resultados  
**Nível:** Intermediário  
**Prioridade:** Alta

### Objetivo

Aprender a comparar medidas automáticas com medidas manuais e discutir discrepâncias.

### Tópicos obrigatórios

- Validação manual
- Medida automática
- Área manual
- Perímetro manual
- Erro absoluto
- Erro percentual
- Fontes de discrepância
- Tabela de validação
- Discussão crítica
- Limitações

### Fórmula

```text
erro percentual = |valor_opencv - valor_manual| / valor_manual * 100
```

### Código-base

```python
df_validation["area_error_percent"] = (
    abs(df_validation["area_opencv"] - df_validation["area_manual"])
    / df_validation["area_manual"]
) * 100

df_validation["perimeter_error_percent"] = (
    abs(df_validation["perimeter_opencv"] - df_validation["perimeter_manual"])
    / df_validation["perimeter_manual"]
) * 100
```

### Fontes comuns de discrepância

- Segmentação imperfeita
- Bordas serrilhadas
- Ruído
- Sombra
- Buracos no objeto
- Diferença entre ferramenta manual e contorno do OpenCV
- Resolução da imagem
- Critério subjetivo de medição manual

### Interações visuais sugeridas

1. **Calculadora de erro percentual**.
2. **Tabela comparativa interativa**.
3. **Imagem anotada com fontes de erro**.

### Prompt para o Codex

```text
Crie uma aula completa sobre "Validação Manual, Erro Percentual e Análise Crítica".

Ensine como comparar medidas manuais com medidas calculadas pelo OpenCV.

Inclua:
- fórmula de erro percentual;
- tabela de validação;
- fontes de discrepância;
- análise crítica.

Interações:
1. calculadora de erro percentual;
2. tabela comparativa interativa;
3. imagem anotada com fontes de erro.

Inclua código Python/pandas, quiz e glossário.
```

---

# Parte 3 — Segmentação Inteligente com Deep Learning

---

## Aula 15 — Pipeline Clássico vs Segmentação com Deep Learning

**Categoria:** Visão Computacional / Segmentação Inteligente  
**Nível:** Intermediário  
**Prioridade:** Alta

### Objetivo

Entender a diferença entre o pipeline clássico das Partes 1 e 2 e a segmentação com redes neurais profundas.

### Tópicos obrigatórios

- Pipeline clássico
- Segmentação baseada em regras
- Binarização
- Conectividade
- Descritores geométricos
- Deep learning
- Modelo pré-treinado
- Aprendizado a partir de dados
- Interpretabilidade vs flexibilidade

### Interações visuais sugeridas

1. **Comparador de pipelines**.
2. **Atividade de montar pipeline**.
3. **Tabela interativa de vantagens e limitações**.

### Tabela comparativa

| Aspecto | Pipeline clássico | Deep Learning |
|---|---|---|
| Regras | Manuais | Aprendidas |
| Dados | Poucos | Muitos |
| Interpretabilidade | Alta | Menor |
| Cenário controlado | Muito bom | Bom |
| Cenas complexas | Limitado | Melhor |
| Treinamento | Não precisa | Precisa ou usa pré-treinado |

### Prompt para o Codex

```text
Crie uma aula completa sobre "Pipeline Clássico vs Segmentação com Deep Learning".

Explique a diferença entre:
- binarização, blobs, features e regras;
- modelos pré-treinados que produzem segmentação automaticamente.

Inclua interações:
1. comparador visual de pipelines;
2. atividade de montar pipeline;
3. tabela interativa de vantagens e limitações.

Inclua quiz, glossário e exemplos visuais.
```

---

## Aula 16 — Segmentação Semântica

**Categoria:** Visão Computacional / Deep Learning para Segmentação  
**Nível:** Intermediário  
**Prioridade:** Alta

### Objetivo

Entender o que é segmentação semântica e como ela rotula cada pixel com uma classe.

### Conceito central

```text
Segmentação semântica responde:
A qual classe pertence cada pixel?
```

### Tópicos obrigatórios

- Segmentação semântica
- Classificação por pixel
- Classes
- Mapa de segmentação
- Legenda de classes
- Sobreposição na imagem original
- Modelo pré-treinado
- Limitações
- Diferença para classificação de imagem
- Diferença para detecção de objetos

### Interações visuais sugeridas

1. **Imagem original vs mapa semântico**.
2. **Controle de opacidade do overlay**.
3. **Legenda interativa por classe**.

### Prompt para o Codex

```text
Crie uma aula completa sobre "Segmentação Semântica".

Explique que segmentação semântica atribui uma classe a cada pixel.

Inclua interações:
1. imagem original vs mapa semântico;
2. controle de opacidade do overlay;
3. legenda interativa por classe.

Inclua exemplo com modelo pré-treinado, quiz, glossário e comparação com classificação de imagem e detecção de objetos.
```

---

## Aula 17 — Segmentação por Instâncias

**Categoria:** Visão Computacional / Deep Learning para Segmentação  
**Nível:** Intermediário  
**Prioridade:** Alta

### Objetivo

Entender segmentação por instâncias e sua diferença em relação à segmentação semântica.

### Conceito central

```text
Segmentação por instâncias responde:
Qual classe é este pixel e a qual objeto individual ele pertence?
```

### Tópicos obrigatórios

- Segmentação por instâncias
- Máscaras individuais
- Classe + ID da instância
- Separação de objetos da mesma classe
- Contornos
- Regiões destacadas
- Comparação com segmentação semântica
- Aplicações práticas

### Interações visuais sugeridas

1. **Semântica vs instância**.
2. **Máscaras individuais selecionáveis**.
3. **Separação de objetos iguais**.

### Prompt para o Codex

```text
Crie uma aula completa sobre "Segmentação por Instâncias".

Explique diferença entre classe e instância, máscaras individuais e separação de objetos da mesma classe.

Inclua interações:
1. comparador semântica vs instância;
2. seleção de máscara individual;
3. exemplo com múltiplos objetos da mesma classe.

Inclua quiz, glossário, exemplos visuais e conexão com a Parte 3 da atividade.
```

---

## Aula 18 — Modelos Pré-treinados para Segmentação

**Categoria:** Visão Computacional / Deep Learning Aplicado  
**Nível:** Intermediário  
**Prioridade:** Média/alta

### Objetivo

Aprender como usar modelos pré-treinados de segmentação sem precisar treinar redes neurais.

### Tópicos obrigatórios

- Modelo pré-treinado
- Inferência
- Dataset de treinamento
- Classes conhecidas
- Limitações de classes não treinadas
- Torchvision
- Detectron2
- Segment Anything, conceitualmente
- YOLO segmentation, conceitualmente
- Interpretação do resultado

### Interações visuais sugeridas

1. **Fluxo de inferência** — imagem → modelo → máscaras/classes.
2. **Classe conhecida vs desconhecida**.
3. **Slider de threshold de confiança**.

### Código conceitual

```python
import torch
import torchvision
from PIL import Image

model = torchvision.models.segmentation.deeplabv3_resnet50(weights="DEFAULT")
model.eval()
```

### Prompt para o Codex

```text
Crie uma aula completa sobre "Modelos Pré-treinados para Segmentação".

Explique modelo pré-treinado, inferência, classes conhecidas, limitações e uso ilustrativo para segmentação semântica e por instâncias.

Inclua interações:
1. fluxo visual de inferência;
2. classe conhecida vs desconhecida;
3. slider de threshold de confiança.

Inclua quiz, glossário e exemplos conceituais em Python.
```

---

## Aula 19 — Comparação Visual e Limitações dos Modelos

**Categoria:** Visão Computacional / Análise Crítica  
**Nível:** Intermediário  
**Prioridade:** Alta

### Objetivo

Aprender a comparar visualmente resultados de segmentação semântica, segmentação por instâncias e pipeline clássico.

### Tópicos obrigatórios

- Comparação visual
- Objetos bem reconhecidos
- Oclusão
- Objetos pequenos
- Classes não treinadas
- Erros de máscara
- Falhas de segmentação
- Pipeline clássico vs DL
- Discussão conceitual
- Aplicações vantajosas

### Interações visuais sugeridas

1. **Painel comparativo** — original, semântica, instância e pipeline clássico.
2. **Marcador de falhas** — usuário marca regiões problemáticas.
3. **Checklist guiado de análise**.

### Perguntas para discussão

- Quais objetos foram reconhecidos corretamente?
- Quais objetos foram ignorados?
- Houve confusão entre classes?
- Objetos pequenos foram detectados?
- Oclusões atrapalharam?
- O modelo separou instâncias corretamente?
- O pipeline clássico seria melhor ou pior nesse caso?
- Em que tipo de aplicação o modelo pré-treinado seria vantajoso?

### Prompt para o Codex

```text
Crie uma aula completa sobre "Comparação Visual e Limitações dos Modelos".

Ensine como analisar criticamente resultados de segmentação semântica e por instâncias.

Inclua interações:
1. painel comparativo entre original, semântica, instância e pipeline clássico;
2. marcador de falhas;
3. checklist guiado de análise.

Inclua quiz, glossário e exemplos de discussão para a Parte 3 da atividade.
```

---

# Aula 20 — Como Montar os Notebooks e Apresentações da Atividade 2

**Categoria:** Visão Computacional / Organização da Entrega  
**Nível:** Prático  
**Prioridade:** Muito alta

## Objetivo

Organizar a implementação dos três notebooks e das três apresentações exigidas.

## Entregáveis da atividade

1. `Representacao.ipynb`
2. `Representacao.pptx`
3. `Descricao.ipynb`
4. `Descricao.pptx`
5. `Introducao Segmentacao DL.ipynb`
6. `Introducao Segmentacao DL.pptx`

---

## Estrutura recomendada — Representacao.ipynb

1. Importação de bibliotecas
2. Carregamento da imagem base
3. Conversão para escala de cinza
4. Análise do histograma
5. Threshold global
6. Threshold Otsu
7. Threshold adaptativo
8. Comparação visual das binarizações
9. Operações morfológicas
10. Escolha da melhor binarização
11. Componentes conectados com conectividade-4
12. Componentes conectados com conectividade-8
13. Imagem colorida por blob
14. Bounding boxes e IDs
15. Histograma de áreas
16. Tabela comparativa
17. Discussão crítica
18. Conclusão

---

## Estrutura recomendada — Representacao.pptx

1. Título e contexto da imagem
2. Imagem original e justificativa da escolha
3. Binarizações comparadas
4. Morfologia aplicada
5. Componentes conectados coloridos
6. Bounding boxes e IDs
7. Comparação conectividade-4 vs 8
8. Conclusões e limitações

---

## Estrutura recomendada — Descricao.ipynb

1. Importação das bibliotecas
2. Carregamento dos blobs da Parte 1
3. Extração de contornos
4. Cálculo de área
5. Cálculo de centro de massa
6. Bounding box
7. Elipse equivalente e orientação
8. Perímetro
9. Circularidade
10. Solidez
11. DataFrame final
12. Regras de classificação
13. Imagem anotada por classe
14. Scatter plot Área × Circularidade
15. Validação manual
16. Tabela de erro percentual
17. Discussão crítica
18. Conclusão

---

## Estrutura recomendada — Descricao.pptx

1. Objetivo da descrição de objetos
2. Features extraídas
3. Exemplos visuais: área, perímetro, bounding box
4. Centro de massa e elipse equivalente
5. Circularidade e solidez
6. Classificação baseada em regras
7. Scatter plot
8. Validação manual
9. Limitações e melhorias

---

## Estrutura recomendada — Introducao Segmentacao DL.ipynb

1. Objetivo da Parte 3
2. Escolha da imagem
3. Segmentação semântica
4. Mapa de segmentação
5. Overlay na imagem original
6. Segmentação por instâncias
7. Máscaras individuais
8. Comparação semântica vs instância
9. Limitações observadas
10. Diferenças para pipeline clássico
11. Conclusão

---

## Estrutura recomendada — Introducao Segmentacao DL.pptx

1. Segmentação clássica vs deep learning
2. Segmentação semântica
3. Segmentação por instâncias
4. Resultado experimental
5. Comparação e conclusão

---

# Checklist final da atividade

## Parte 1 — Representação

- [ ] Imagem com 8 a 20 objetos
- [ ] Resolução mínima 1280×960
- [ ] Objetos separados
- [ ] Fundo uniforme
- [ ] Conversão para grayscale
- [ ] Histograma
- [ ] Threshold global
- [ ] Otsu
- [ ] Adaptativo
- [ ] Opening e closing
- [ ] Dois tamanhos de kernel
- [ ] Componentes conectados
- [ ] Conectividade-4
- [ ] Conectividade-8
- [ ] Blobs coloridos
- [ ] Bounding boxes
- [ ] IDs
- [ ] Histograma de áreas
- [ ] Tabela comparativa
- [ ] Discussão crítica

## Parte 2 — Descrição

- [ ] Contornos
- [ ] Área
- [ ] Centro de massa
- [ ] Bounding box
- [ ] Elipse equivalente
- [ ] Orientação
- [ ] Perímetro
- [ ] Circularidade
- [ ] Solidez
- [ ] DataFrame
- [ ] Regras de classificação
- [ ] Imagem anotada
- [ ] Scatter plot Área × Circularidade
- [ ] Validação manual
- [ ] Erro percentual
- [ ] Discussão crítica

## Parte 3 — Segmentação com Deep Learning

- [ ] Imagem realista
- [ ] Segmentação semântica
- [ ] Mapa com legenda
- [ ] Overlay
- [ ] Segmentação por instâncias
- [ ] Máscaras individuais
- [ ] Comparação semântica vs instância
- [ ] Objetos bem reconhecidos
- [ ] Limitações
- [ ] Aplicações vantajosas
- [ ] Conclusão

---

# Sugestão de sequência mínima se estiver com pouco tempo

Se não der para criar todas as aulas no site, priorize estas 10:

1. Thresholding Global, Otsu e Adaptativo
2. Morfologia Matemática
3. Adjacência, Conectividade e Blobs
4. Rotulação de Componentes Conectados
5. Contornos, Área, Perímetro e Bounding Box
6. Momentos, Centro de Massa e Orientação
7. Circularidade, Solidez e Convex Hull
8. Classificação Baseada em Regras
9. Segmentação Semântica
10. Segmentação por Instâncias

Essas cobrem a maior parte do que você precisa para implementar e explicar a atividade.
