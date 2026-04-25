Eles entram depois da etapa 3b, como etapas condicionais de qualidade. Aqui está o plano completo com tudo integrado:

---

## Pipeline completo e final

---

### Etapa 1a — Gemini
```markdown
Você é um especialista em design instrucional.

Tema da aula: [TEMA]

Antes de qualquer conteúdo, raciocine sobre a aula e me entregue:

1. Qual é o problema real que motiva aprender esse tema?
2. Que conceitos costumam ser mal entendidos por quem está aprendendo?
3. Qual progressão didática faz mais sentido? (do mais simples ao mais complexo)
4. Que seções ou ângulos importantes uma LLM genérica poderia ignorar?
5. Que contexto histórico ou comparativo ajudaria o aluno a entender melhor?

Não escreva a aula. Apenas raciocine e entregue esses insumos 
de forma clara e organizada.
```

---

### Etapa 1b — GLM 5.1
```markdown
Crie uma aula completa sobre [TEMA] seguindo rigorosamente as 
instruções abaixo.

--- INSUMOS DE PLANEJAMENTO ---
[cole o output da etapa 1a aqui]

--- INSTRUÇÕES DO PROJETO ---
[cole o AGENTS.md aqui]

--- ESTRUTURA DE DADOS ---

export interface LessonContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCategoryId: string;
  secondaryCategoryId?: string;
  level: Level;
  estimatedTime: string;
  tags: string[];
  learningObjectives: string[];
  prerequisites: string[];
  references: LessonReference[];
  theme?: LessonTheme;
  heroVisual?: VisualId;
  openingText?: string;
  quickFacts?: SummaryCard[];
  relatedTopics?: SummaryCard[];
  missionCards?: SummaryCard[];
  sections: LessonSection[];
  timeline?: TimelineEvent[];
  quiz?: QuizQuestion[];
  glossary?: GlossaryTerm[];
  summaryCards?: SummaryCard[];
  comparisonRows?: ComparisonRow[];
}
--- PADRÃO DE QUALIDADE ---
A aula deve ter:
- Seções com progressão clara do simples ao complexo
- Cada seção com pelo menos um bloco de definição, insight ou erro comum
- Exemplos concretos e memoráveis, não genéricos
- Quiz com perguntas que testam raciocínio, não memorização
- Glossário com definições precisas e sem jargão desnecessário
- Referências reais com URL verificável

Gere o arquivo TypeScript completo. Use os insumos de planejamento 
para garantir profundidade, boa progressão e cobertura dos conceitos 
críticos. Pesquise fontes confiáveis e cite todas nas referências.
```

---

### Etapa 2a — Gemini
```markdown
Abaixo está uma aula já estruturada. Quero que você faça duas coisas:

PARTE 1 — Reescreva estas três partes:

1. openingText — use pergunta retórica ou abordagem problema-primeiro.
   Deve fisgar o leitor antes de qualquer conceito técnico.

2. Seção 01 — comece pelo problema ou contexto histórico que motivou 
   o tema, antes de apresentar o conceito principal.

3. quickFacts — torne cada card mais concreto e memorável, com 
   exemplos reais sempre que possível.

PARTE 2 — Revise pedagogicamente o restante da aula e entregue 
um parecer por seção indicando:
- Seções que ficaram rasas ou poderiam ter mais profundidade
- Conceitos que merecem um bloco próprio (definição, insight ou 
  erro comum) mas não têm
- Erros de progressão didática (algo explicado antes do necessário 
  ou depois do ideal)
- Qualquer ângulo importante que ficou de fora

Entregue a PARTE 1 pronta para substituir no arquivo e a PARTE 2 
como um documento de anotações organizado por seção.

--- AULA ATUAL ---
[cole o output da etapa 1b aqui]
```

---

### Etapa 2b — GLM 5.1
```markdown
Abaixo está uma aula e um documento de anotações pedagógicas 
feito por um revisor especialista.

Faça uma segunda passagem na aula incorporando as anotações 
marcadas como aceitas. Não altere o que não foi anotado.

Entregue o arquivo TypeScript completo e atualizado.

--- AULA ATUAL ---
[cole o output da etapa 1b aqui]

--- ANOTAÇÕES ACEITAS ---
[cole apenas as anotações da PARTE 2 que você decidiu aceitar]
```

---

### Etapa 3a — Qwen 3.6 Plus
```markdown
Abaixo está o conteúdo de uma aula sobre [TEMA].

Me dê uma lista de 8 a 12 ideias de interações visuais que 
ajudariam o aluno a entender o conteúdo. Seja criativo e variado: 
sliders, simuladores, comparações, diagramas animados, 
calculadoras, etc.

Para cada ideia, descreva em 2 linhas:
- O que o aluno faria
- O que aprenderia com aquela interação

Não implemente nada. Apenas sugira.

--- CONTEÚDO DA AULA ---
[cole o output da etapa 2b aqui]
```

---

### Etapa 3b — Codex

```markdown
Adicione uma nova aula completa ao projeto.

Tema: Embeddings

A aula já foi implementada em src/lessons/inteligencia-artificial/embeddings/content.ts e os ajustes de abertura já foram aplicados 
pelas etapas anteriores. Sua tarefa é:

1. Avaliar as ideias de interatividade recebidas, descartar as que 
   apenas decoram sem ensinar e complementar com ideias próprias 
   se necessário
2. Implementar os componentes interativos escolhidos
3. Linkar a aula ao catálogo na categoria correta
4. Garantir que aparece na home e nas listagens esperadas
5. Verificar se reutiliza componentes existentes antes de criar novos
6. Rode build/lint/test e corrija todos os erros
7. Ao final informe: arquivos alterados, interações implementadas 
   e pendências se houver

--- IDEIAS DE INTERATIVIDADE ---
[cole o output da etapa 3a aqui]

Siga o AGENTS.md.
```

---

### Etapa 4a — Codex *(roda sempre)*
```markdown
Revise a implementação da aula [NOME DA AULA].

Verifique:
1. A aula aparece na home e na categoria correta?
2. O build passa sem erros?
3. O layout está responsivo em mobile e desktop?
4. O quiz funciona corretamente?
5. O glossário funciona corretamente?
6. As referências aparecem corretamente?
7. Há pelo menos 3 interações funcionando?
8. Há componentes duplicados que deveriam ser reutilizados?
9. Alguma interação está quebrada ou não renderiza?

Faça ajustes cirúrgicos. Não reescreva o que não precisa.
```

---

### Etapa 4b — Gemini *(roda sempre)*
```markdown
Analise a aula abaixo como um revisor pedagógico experiente.

Não reescreva nada. Apenas aponte problemas e sugira melhorias.

Para cada problema encontrado, indique:
- Onde está (seção, bloco, campo específico)
- O que está fraco (raso, genérico, confuso, mal ordenado)
- O que deveria ter no lugar

Avalie especificamente:
1. Explicações conceituais — estão claras e profundas o suficiente?
2. Exemplos — são concretos e memoráveis ou genéricos?
3. Analogias — onde estão ausentes e fariam falta?
4. Erros comuns — estão presentes onde o tema exige?
5. Progressão — cada seção prepara bem para a próxima?
6. Quiz — as perguntas testam raciocínio ou só memorização?
7. Glossário — as definições são precisas ou vagas?
8. Referências — embasam bem o conteúdo apresentado?

Entregue um parecer organizado por seção, direto e acionável.

--- AULA ---
[cole o conteúdo da aula aqui]
```

---

### Etapa 4c — GLM 5.1 *(condicional: só se 4b apontar problemas)*
```markdown
Aprofunde a aula abaixo com base nas anotações de revisão aceitas.

Para cada anotação, faça a melhoria indicada de forma cirúrgica.
Não altere o que não foi anotado.

Restrições:
- Não quebre o layout nem remova interações existentes
- Não transforme em texto acadêmico pesado
- Mantenha linguagem clara e progressiva
- Entregue o arquivo TypeScript completo e atualizado

--- ANOTAÇÕES ACEITAS ---
[cole apenas as anotações da etapa 4b que você decidiu aceitar]


```

---

## Como usar

**Substitua `[TEMA]` em todos os prompts** antes de começar.

**O que colar em cada etapa:**

| Etapa | LLM | Input | Quando roda |
|---|---|---|---|
| 1a | Gemini | só o tema | sempre |
| 1b | GLM 5.1 | output 1a + AGENTS.md + LessonContent | sempre |
| 2a | Gemini | output 1b | sempre |
| 2b | GLM 5.1 | output 1b + anotações aceitas da 2a | sempre |
| 3a | Qwen 3.6 Plus | output 2b | sempre |
| 3b | Codex | output 2b + PARTE 1 da 2a + output 3a | sempre |
| 4a | Codex | aula implementada | sempre |
| 4b | Gemini | conteúdo da aula | sempre |
| 4c | GLM 5.1 | aula + anotações aceitas da 4b | só se 4b apontar problemas |

**Onde você toma decisões:**

Há três momentos de decisão ao longo do fluxo:

**Após 2a:** aceitar ou rejeitar as anotações pedagógicas da Gemini antes de passar para a 2b.

**Após 4b:** decidir se os problemas apontados justificam rodar 4c e 4d ou se a aula já está boa o suficiente.


**O que pode rodar em paralelo:**

```
1a → 1b → 2a → 2b → 3a ──────────────┐
                  └→ 2a (PARTE 1) ────┤→ 3b → 4a
                                      │        │
                                      │        └→ 4b → 4c
                                      └──────────────────
```

