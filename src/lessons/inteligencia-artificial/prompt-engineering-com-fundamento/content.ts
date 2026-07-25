import type { LessonContent } from "../../../types/content";

export const promptEngineeringComFundamentoContent: LessonContent = {
  id: "prompt-engineering-com-fundamento",
  title: "Prompt Engineering com Fundamento",
  subtitle:
    "Como escrever instruções que realmente moldam o comportamento do modelo, sem tratar prompting como coleção de truques soltos.",
  description:
    "Uma aula intermediária sobre estrutura de prompt, objetivos, contexto, restrições, exemplos, saídas estruturadas, debugging e avaliação contínua para sistemas com LLMs.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "40-50 min",
  tags: [
    "Prompt Engineering",
    "LLM",
    "Few-shot",
    "Chain-of-Thought",
    "ReAct",
    "Avaliação",
  ],
  learningObjectives: [
    "Entender prompt como interface de controle de comportamento, não como feitiço textual.",
    "Separar objetivo, contexto, restrições e formato de saída dentro de um prompt bem projetado.",
    "Distinguir quando usar zero-shot, few-shot, decomposição de tarefa ou ferramentas externas.",
    "Aprender a reduzir ambiguidade especificando critérios de sucesso e formato esperado.",
    "Reconhecer limites do prompting quando faltam dados, ferramentas ou grounding.",
    "Usar avaliação e comparação de versões para iterar prompts com mais rigor.",
    "Conectar prompting a desenho de produto e não apenas a experimentos isolados em chat.",
  ],
  prerequisites: [
    "Familiaridade básica com LLMs e com a ideia de que eles respondem a instruções em linguagem natural.",
    "Noção inicial de prompts em chatbots ou APIs.",
    "Curiosidade para analisar por que pequenos ajustes de instrução mudam bastante o resultado.",
  ],
  references: [
    {
      title: "Prompt engineering",
      source: "OpenAI — documentação",
      url: "https://developers.openai.com/api/docs/guides/prompt-engineering",
      note:
        "Guia oficial sobre estrutura, contexto, versionamento e boas práticas de prompting em aplicações reais.",
    },
    {
      title: "Prompting",
      source: "OpenAI — documentação",
      url: "https://developers.openai.com/api/docs/guides/prompting",
      note:
        "Complementa a visão de prompt como código de aplicação e reforça testes e iteração controlada.",
    },
    {
      title: "Reasoning best practices",
      source: "OpenAI — documentação",
      url: "https://developers.openai.com/api/docs/guides/reasoning-best-practices",
      note:
        "Mostra que famílias diferentes de modelo pedem estratégias diferentes de instrução.",
    },
    {
      title: "The Prompt Report: A Systematic Survey of Prompt Engineering Techniques",
      source: "Schulhoff et al., 2024 — arXiv",
      url: "https://arxiv.org/abs/2406.06608",
      note:
        "Survey amplo com taxonomia de técnicas e vocabulário para discutir prompting com mais precisão.",
    },
    {
      title: "A Systematic Survey of Prompt Engineering in Large Language Models: Techniques and Applications",
      source: "Sahoo et al., 2024 — arXiv",
      url: "https://arxiv.org/abs/2402.07927",
      note:
        "Organiza técnicas e aplicações de prompt engineering em LLMs e VLMs.",
    },
    {
      title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
      source: "Wei et al., 2022 — arXiv",
      url: "https://arxiv.org/abs/2201.11903",
      note:
        "Referência central para prompting com raciocínio intermediário em tarefas complexas.",
    },
    {
      title: "ReAct: Synergizing Reasoning and Acting in Language Models",
      source: "Yao et al., 2022 — arXiv",
      url: "https://arxiv.org/abs/2210.03629",
      note:
        "Importante para entender prompting que combina raciocínio com uso de ferramentas e observações externas.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Prompt engineering fica raso quando vira superstição: 'coloque esta frase mágica', 'use sempre este papel', 'adicione mais contexto e pronto'. Na prática, prompt bom é projeto de interface. Você está descrevendo para o modelo qual tarefa existe, que evidência ele deve usar, quais limites precisa respeitar, como a saída deve ser organizada e o que conta como sucesso. Quanto mais clara essa interface, menor a chance de ambiguidades, desvios e retrabalho.",
  quickFacts: [
    {
      title: "Prompt não é encanto",
      body:
        "Ele funciona melhor quando expressa objetivo, contexto e critérios de forma explícita, testável e revisável.",
    },
    {
      title: "Menos ambiguidade, menos surpresa",
      body:
        "Muitas falhas de LLM vêm de instruções vagas ou conflitantes, não apenas de limitação intrínseca do modelo.",
    },
    {
      title: "Prompt bom entra em ciclo de avaliação",
      body:
        "Sem comparar versões e medir regressões, otimizar prompt vira tentativa e erro desorganizada.",
    },
  ],
  sections: [
    {
      id: "prompt-como-interface",
      eyebrow: "Fundamento",
      title: "Prompt é interface de tarefa, não pedido solto",
      lead:
        "Quando você escreve um prompt, está definindo contrato, contexto e critério de sucesso para o modelo.",
      visual: "hero",
      paragraphs: [
        "O modelo não lê intenções ocultas. Ele recebe texto e tenta produzir uma continuação adequada à estrutura, às instruções e aos exemplos disponíveis. Isso significa que o prompt é parte da engenharia do sistema, não apenas um detalhe de copywriting.",
        "Pensar em interface ajuda muito. Uma interface boa reduz ambiguidades, especifica entradas e limita comportamentos não desejados. O mesmo vale aqui: o prompt organiza o espaço de resposta que o modelo considera apropriado.",
        "Essa visão também muda como iteramos. Em vez de perguntar 'qual frase mágica faz funcionar?', perguntamos 'qual informação está faltando para o modelo executar bem esta tarefa?'.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Prompt engineering",
          body:
            "Projeto deliberado de instruções, contexto, exemplos e formatos de saída para orientar o comportamento de um modelo em uma tarefa específica.",
        },
        {
          type: "insight",
          title: "Prompt é parte do produto",
          body:
            "Se a aplicação depende do comportamento do modelo, o prompt precisa de versionamento, revisão e testes como qualquer outro componente crítico.",
        },
      ],
    },
    {
      id: "anatomia",
      eyebrow: "Estrutura",
      title: "Os quatro blocos mais úteis: objetivo, contexto, restrições e formato",
      lead:
        "Grande parte dos prompts ruins falha porque mistura tudo em um texto corrido e espera que o modelo adivinhe prioridades.",
      visual: "concept",
      paragraphs: [
        "Objetivo responde 'o que deve ser feito'. Contexto responde 'com base em quê'. Restrições respondem 'o que não pode acontecer ou quais critérios precisam ser respeitados'. Formato responde 'como o resultado deve sair'.",
        "Separar esses blocos aumenta legibilidade para humanos e para o próprio fluxo de manutenção. Em times, prompts claros reduzem divergência entre quem escreve, quem revisa e quem avalia a qualidade do comportamento obtido.",
        "Também ajuda a diagnosticar erro. Se a saída veio vaga, talvez faltou formato. Se veio inventiva demais, talvez faltaram restrições. Se veio fora de escopo, talvez o objetivo estava frouxo.",
      ],
      blocks: [
        {
          type: "example",
          title: "Exemplo de decomposição",
          body:
            "'Objetivo: resumir o ticket. Contexto: use apenas o texto fornecido. Restrições: não invente causa. Formato: devolva JSON com resumo, prioridade e dúvidas.'",
        },
      ],
    },
    {
      id: "clareza",
      eyebrow: "Controle",
      title: "Especificidade reduz ambiguidade, mas excesso irrelevante também atrapalha",
      lead:
        "Prompt melhor não é sempre prompt maior; é prompt mais informativo para a tarefa certa.",
      visual: "pipeline",
      interactive: "prompt-structure-lab",
      paragraphs: [
        "Quando o pedido é genérico, o modelo precisa inferir sozinho escopo, público, tom e critério de sucesso. Isso aumenta dispersão da saída. Por outro lado, despejar informação irrelevante demais pode esconder o que realmente importa e poluir a tarefa.",
        "O segredo é relevância estruturada: fornecer contexto suficiente para a decisão, explicitar restrições e remover ruído que não ajuda. Bons prompts são enxutos no que repetem e ricos no que realmente orienta comportamento.",
        "A interação desta seção mostra isso: mais contexto útil costuma melhorar aderência, mas redundância e conflito entre instruções diminuem a nitidez da tarefa.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Confundir prompt detalhado com prompt inflado. Instruções repetidas, exemplos redundantes e regras conflitantes podem piorar a resposta.",
        },
      ],
    },
    {
      id: "estrategias",
      eyebrow: "Técnicas",
      title: "Zero-shot, few-shot, decomposição e tool use resolvem problemas diferentes",
      lead:
        "Não existe uma técnica universal. A melhor escolha depende da estrutura da tarefa e do tipo de erro mais caro.",
      visual: "comparison",
      interactive: "prompt-strategy-comparison",
      paragraphs: [
        "Zero-shot costuma bastar quando a tarefa é simples e o formato está bem definido. Few-shot ajuda quando exemplos curtos ensinam padrão, tom ou decisão de fronteira que seria difícil explicar apenas em regra abstrata.",
        "Decomposição de tarefa é útil quando o pedido mistura subtarefas demais: classificar, resumir, justificar, extrair campos, checar restrições. Separar etapas reduz carga cognitiva do modelo e facilita depuração.",
        "Quando o problema exige informação externa, cálculo, busca ou interação com ambiente, prompting puro frequentemente não basta. Aí entram ferramentas, recuperação e padrões como ReAct, nos quais pensar e agir são acoplados.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Few-shot prompting",
          body:
            "Uso de alguns exemplos no próprio prompt para demonstrar o padrão esperado de entrada e saída.",
        },
        {
          type: "insight",
          title: "Exemplos ensinam fronteiras",
          body:
            "Few-shot é especialmente valioso quando o problema tem nuances difíceis de traduzir em regra curta, como tom, classificação ambígua ou estilo editorial.",
        },
      ],
    },
    {
      id: "saida-estruturada",
      eyebrow: "Robustez",
      title: "Formato de saída bem definido evita retrabalho e facilita automação",
      lead:
        "Muitas integrações quebram menos por inteligência do modelo e mais por inconsistência de formato.",
      visual: "tradeoff",
      paragraphs: [
        "Quando você pede 'me dê uma análise', o modelo escolhe sozinho extensão, ordem, rótulos e granularidade. Se a aplicação precisa de pós-processamento, isso vira fonte de fragilidade. Pedir campos, seções ou JSON explícito costuma reduzir esse ruído.",
        "Saída estruturada também melhora avaliação. Fica mais fácil comparar versões, verificar campos obrigatórios e identificar onde houve erro: na extração, na justificativa, na classificação ou no cumprimento de uma restrição específica.",
        "Isso não significa engessar toda tarefa. Significa reconhecer quando a interface downstream se beneficia de consistência. Prompt bom conversa tanto com o modelo quanto com o resto do sistema.",
      ],
      blocks: [
        {
          type: "example",
          title: "Formato operacional",
          body:
            "Em vez de 'explique o ticket', peça: 'retorne prioridade, resumo, causa provável, dados faltantes e próxima ação em JSON'.",
        },
      ],
    },
    {
      id: "debugging",
      eyebrow: "Iteração",
      title: "Debugar prompt é localizar a falha dominante, não trocar palavras ao acaso",
      lead:
        "Saídas ruins ficam mais tratáveis quando você sabe se o problema foi contexto, conflito, exemplo ruim ou ausência de critério.",
      visual: "checklist",
      interactive: "prompt-debugger-scenarios",
      paragraphs: [
        "Se a resposta saiu incompleta, talvez o objetivo não estivesse explícito. Se saiu criativa demais, talvez faltassem restrições. Se ignorou o formato, talvez o prompt não tenha priorizado a estrutura da saída. Se variou muito entre execuções, talvez haja ambiguidade nas instruções.",
        "Prompt debugging funciona melhor com casos de teste representativos. Em vez de mudar frases ao sabor da impressão, reúna exemplos bons e ruins, compare versões e observe em quais casos cada ajuste melhora ou piora o comportamento.",
        "Na prática, prompts maduros nascem de pequenas hipóteses testadas: remover redundância, adicionar contraexemplo, reforçar fonte de verdade, separar subtarefa ou explicitar o que fazer diante de falta de informação.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Fazer dez mudanças de uma vez. Quando tudo muda ao mesmo tempo, você perde noção de qual ajuste realmente melhorou o resultado.",
        },
      ],
    },
    {
      id: "limites",
      eyebrow: "Limites do prompting",
      title: "Prompt bom não substitui dados, ferramentas, retrieval nem avaliação",
      lead:
        "Alguns problemas não são de redação da instrução; são de falta de capacidade operacional ou de evidência acessível ao modelo.",
      paragraphs: [
        "Se a tarefa exige informação atualizada, prompting puro não cria acesso ao mundo. Se exige busca em uma base interna, talvez seja caso de RAG. Se exige cálculo confiável, talvez uma ferramenta especializada seja melhor. Se o risco é alto, revisão humana continua relevante.",
        "Prompting resolve muito bem ambiguidade de interface e expectativa de saída. Já lacunas de conhecimento, ausência de grounding e necessidade de ação externa pertencem a outra camada da arquitetura. É por isso que engenharia de prompt madura anda junto com desenho de sistema.",
        "Em resumo: prompt bom melhora o uso do que o modelo já pode fazer. Ele não inventa capacidades sistêmicas que a aplicação ainda não oferece.",
      ],
      blocks: [
        {
          type: "insight",
          title: "A melhor solução às vezes é não insistir no prompt",
          body:
            "Quando o problema é estrutural, a resposta correta pode ser adicionar ferramenta, retrieval, schema ou workflow, e não apenas reescrever instruções.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual do prompting com fundamento",
      lead:
        "Projetar prompts bem significa tornar objetivo, contexto, restrições e formato mais explícitos e avaliáveis.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde a ideia central: prompting é engenharia de interface entre intenção humana e comportamento probabilístico do modelo.",
      ],
    },
    {
      id: "quiz",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se você conectou estrutura de prompt, escolha de técnica e limites operacionais.",
      interactive: "quiz",
      paragraphs: [
        "As perguntas abaixo foram pensadas para distinguir prompting superficial de prompting bem fundamentado.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Feche a aula com os termos que mais aparecem ao desenhar e avaliar prompts em produção.",
      interactive: "glossary",
      paragraphs: [
        "Dominar esse vocabulário ajuda a transformar intuição em discussão técnica mais precisa.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Prompt é contrato de tarefa",
      body:
        "Ele deve deixar claro o que fazer, com base em quê, com quais limites e em qual formato entregar.",
    },
    {
      title: "Estrutura vence superstição",
      body:
        "Objetivo, contexto, restrições e saída explícita costumam ser mais úteis do que frases mágicas genéricas.",
    },
    {
      title: "A técnica depende do problema",
      body:
        "Zero-shot, few-shot, decomposição e tool use existem para tipos diferentes de tarefa e erro.",
    },
    {
      title: "Formato estruturado reduz fragilidade",
      body:
        "Quando a aplicação depende de pós-processamento, consistência de saída importa tanto quanto qualidade semântica.",
    },
    {
      title: "Prompting tem limite arquitetural",
      body:
        "Sem retrieval, ferramentas, dados ou avaliação, prompts sozinhos não resolvem toda lacuna do sistema.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual visão é mais sólida sobre prompt engineering?",
      options: [
        { id: "a", label: "É o projeto de instruções, contexto e formato para orientar uma tarefa de forma controlável." },
        { id: "b", label: "É principalmente descobrir uma frase secreta que sempre funciona." },
        { id: "c", label: "É uma etapa útil só em modelos pequenos." },
      ],
      correctOptionId: "a",
      feedback:
        "Prompting maduro trata a instrução como interface de tarefa, não como superstição textual.",
    },
    {
      id: "q2",
      prompt: "Quais quatro blocos costumam organizar melhor um prompt?",
      options: [
        { id: "a", label: "Objetivo, contexto, restrições e formato de saída." },
        { id: "b", label: "Saudação, metáfora, sinônimos e assinatura." },
        { id: "c", label: "Temperatura, GPU, batch size e loss." },
      ],
      correctOptionId: "a",
      feedback:
        "Esses blocos tornam a tarefa mais explícita e facilitam manutenção e depuração.",
    },
    {
      id: "q3",
      prompt: "Quando few-shot costuma ajudar mais?",
      options: [
        { id: "a", label: "Quando poucos exemplos ensinam padrão ou fronteira difícil de explicar só com regra abstrata." },
        { id: "b", label: "Quando qualquer tarefa precisa sempre de exemplos, independentemente da complexidade." },
        { id: "c", label: "Apenas quando o modelo não entende o idioma." },
      ],
      correctOptionId: "a",
      feedback:
        "Few-shot é especialmente bom para mostrar nuance de estilo, formato ou decisão em casos ambíguos.",
    },
    {
      id: "q4",
      prompt: "Por que saída estruturada é útil em aplicações?",
      options: [
        { id: "a", label: "Porque facilita automação, avaliação e pós-processamento consistente." },
        { id: "b", label: "Porque toda tarefa deve virar JSON, sem exceção." },
        { id: "c", label: "Porque elimina a necessidade de revisar a semântica da resposta." },
      ],
      correctOptionId: "a",
      feedback:
        "Estrutura reduz fragilidade operacional, embora nem toda tarefa precise do mesmo nível de rigidez.",
    },
    {
      id: "q5",
      prompt: "Qual é um sinal de debugging ruim de prompt?",
      options: [
        { id: "a", label: "Mudar muitas coisas ao mesmo tempo e depois não saber o que funcionou." },
        { id: "b", label: "Testar ajustes com casos representativos." },
        { id: "c", label: "Separar hipótese por hipótese." },
      ],
      correctOptionId: "a",
      feedback:
        "Quando você altera tudo de uma vez, perde rastreabilidade causal sobre a melhora ou a regressão.",
    },
    {
      id: "q6",
      prompt: "Quando prompting puro frequentemente não basta?",
      options: [
        { id: "a", label: "Quando a tarefa exige informação externa atualizada, cálculo confiável ou ação via ferramenta." },
        { id: "b", label: "Quando a tarefa pede resposta curta." },
        { id: "c", label: "Quando o texto precisa ser em português." },
      ],
      correctOptionId: "a",
      feedback:
        "Nesses casos, o problema é arquitetural: o sistema pode precisar de retrieval, tool use ou outro workflow.",
    },
    {
      id: "q7",
      prompt: "Qual afirmação sobre modelos de raciocínio é mais adequada?",
      options: [
        { id: "a", label: "Nem toda família de modelo responde melhor ao mesmo estilo de prompt; algumas preferem instruções mais diretas." },
        { id: "b", label: "Todo modelo melhora automaticamente se receber 'pense passo a passo'." },
        { id: "c", label: "Prompting é idêntico para qualquer snapshot de modelo." },
      ],
      correctOptionId: "a",
      feedback:
        "As boas práticas variam por família e objetivo; prompting eficaz leva isso em conta.",
    },
    {
      id: "q8",
      prompt: "O que distingue prompting com fundamento de prompting superficial?",
      options: [
        { id: "a", label: "Uso de hipóteses, testes, estrutura e avaliação em vez de truques não medidos." },
        { id: "b", label: "Escrever prompts o mais longos possível." },
        { id: "c", label: "Nunca usar exemplos no prompt." },
      ],
      correctOptionId: "a",
      feedback:
        "O diferencial é transformar tentativa e erro em ciclo técnico observável e comparável.",
    },
  ],
  glossary: [
    { term: "Prompt", definition: "Conjunto de instruções e contexto fornecidos ao modelo para orientar sua resposta." },
    { term: "Prompt engineering", definition: "Projeto deliberado de prompts para controlar comportamento em tarefas específicas." },
    { term: "Zero-shot", definition: "Execução de tarefa apenas com instrução, sem exemplos explícitos no prompt." },
    { term: "Few-shot", definition: "Uso de poucos exemplos no prompt para demonstrar padrão esperado." },
    { term: "Chain-of-Thought", definition: "Estratégia de prompting que incentiva passos intermediários de raciocínio em certas tarefas." },
    { term: "ReAct", definition: "Padrão que intercala raciocínio e ação, permitindo uso de ferramentas e observações externas." },
    { term: "Saída estruturada", definition: "Resposta pedida em formato consistente, como campos fixos, listas ou JSON." },
    { term: "Restrição", definition: "Regra que limita o comportamento do modelo, como escopo, fonte de verdade ou estilo permitido." },
    { term: "Contexto", definition: "Informação relevante fornecida ao modelo para ajudar na tarefa atual." },
    { term: "Critério de sucesso", definition: "Condição explícita que define o que conta como boa resposta na tarefa." },
    { term: "Prompt debugging", definition: "Processo de localizar e corrigir causas de erro no desenho do prompt." },
    { term: "Grounding", definition: "Ancoragem da resposta em material verificável, em vez de depender só da memória do modelo." },
  ],
};
