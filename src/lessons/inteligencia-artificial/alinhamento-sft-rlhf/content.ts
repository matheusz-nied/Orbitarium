import type { LessonContent } from "../../../types/content";

export const alinhamentoSftRlhfContent: LessonContent = {
  id: "alinhamento-sft-rlhf",
  title: "Alinhamento: SFT, RLHF e Preferências",
  subtitle:
    "Como transformar um modelo que prevê texto plausível em um assistente mais útil, obediente e sensível a preferências humanas observadas.",
  description:
    "Uma aula avançada sobre alinhamento comportamental de LLMs via supervised fine-tuning, modelos de preferência, reward modeling, RLHF, limitações de feedback humano e riscos de reward hacking.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Avançado",
  estimatedTime: "50-65 min",
  tags: [
    "Alinhamento",
    "SFT",
    "RLHF",
    "Preferências",
    "InstructGPT",
    "LLM",
  ],
  learningObjectives: [
    "Entender por que pré-treinamento puro não otimiza diretamente para seguir instruções humanas da forma desejada.",
    "Explicar o papel do supervised fine-tuning (SFT) como primeiro estágio de alinhamento comportamental.",
    "Descrever como dados de comparação alimentam modelos de preferência e reward models.",
    "Entender a lógica do RLHF como otimização da política com feedback humano indireto.",
    "Reconhecer limites importantes: ruído de rótulo, reward hacking, dependência do grupo de avaliadores e mismatch de objetivos.",
    "Distinguir alinhamento a preferências observadas de qualquer noção completa de valores humanos universais.",
    "Interpretar SFT e RLHF como parte de um sistema maior de segurança, avaliação e produto, e não como solução isolada.",
  ],
  prerequisites: [
    "Familiaridade com pré-treinamento autoregressivo e fine-tuning.",
    "Noção básica de recompensa e otimização em aprendizado por reforço.",
    "Entender que um LLM pode ser fluente e ainda assim pouco útil, pouco honesto ou pouco seguro.",
  ],
  references: [
    {
      title: "Training language models to follow instructions with human feedback",
      source: "Ouyang et al., 2022 — arXiv",
      url: "https://arxiv.org/abs/2203.02155",
      note:
        "Artigo do InstructGPT, principal referência para a combinação de SFT, reward model e RLHF em LLMs.",
    },
    {
      title: "Deep Reinforcement Learning from Human Preferences",
      source: "Christiano et al., 2017 — arXiv",
      url: "https://arxiv.org/abs/1706.03741",
      note:
        "Referência fundacional sobre aprender sinais de recompensa a partir de preferências humanas.",
    },
    {
      title: "Fine-Tuning Language Models from Human Preferences",
      source: "Ziegler et al., 2019 — arXiv",
      url: "https://arxiv.org/abs/1909.08593",
      note:
        "Aplica preferências humanas ao ajuste de modelos de linguagem antes da formulação consolidada de InstructGPT.",
    },
    {
      title: "Learning to summarize from human feedback",
      source: "Stiennon et al., 2020 — arXiv",
      url: "https://arxiv.org/abs/2009.01325",
      note:
        "Exemplo importante de ajuste com feedback humano em uma tarefa concreta de sumarização.",
    },
    {
      title: "Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback",
      source: "Bai et al., 2022 — arXiv",
      url: "https://arxiv.org/abs/2204.05862",
      note:
        "Trabalho relevante para discutir objetivos múltiplos, preferências e limites do alinhamento via feedback humano.",
    },
    {
      title: "Training language models to follow instructions with human feedback",
      source: "Ouyang et al., 2022 — arXiv (InstructGPT)",
      url: "https://arxiv.org/abs/2203.02155",
      note:
        "Artigo do InstructGPT descrevendo SFT e RLHF para alinhar modelos a seguir instruções humanas.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Um modelo pré-treinado aprende a continuar texto plausível. Isso já é poderoso, mas não equivale automaticamente a ser útil, honesto, seguro ou obediente à intenção do usuário. Alinhamento, nesse contexto, significa ajustar o comportamento do modelo para que ele responda melhor segundo critérios humanos observáveis. SFT ensina exemplos desejados. RLHF tenta ir além, usando comparações humanas para induzir uma função de recompensa aproximada. O resultado é um sistema mais orientado a preferências, não um modelo que magicamente 'entende valores humanos' em sentido completo.",
  quickFacts: [
    {
      title: "Pré-treino não basta",
      body:
        "Modelos fluentes podem continuar texto de forma impressionante e ainda assim seguir mal instruções ou produzir saídas indesejadas.",
    },
    {
      title: "SFT ensina comportamento exemplar",
      body:
        "Demonstrações humanas ajudam o modelo a imitar respostas desejadas antes da etapa de preferências comparativas.",
    },
    {
      title: "RLHF alinha a preferências observadas",
      body:
        "A recompensa é derivada de rankings humanos específicos, não de uma noção universal e completa de valores.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Problema",
      title: "Por que um LLM pré-treinado ainda pode ser um mau assistente?",
      lead:
        "Prever texto plausível e seguir a intenção do usuário são objetivos relacionados, mas não idênticos.",
      visual: "hero",
      paragraphs: [
        "Durante o pré-treinamento, o objetivo central é reduzir erro de previsão do próximo token. Isso ensina o modelo a capturar regularidades da linguagem em grande escala, mas não o obriga a responder da forma mais útil, segura ou honesta para um usuário em um contexto interativo.",
        "Como consequência, um modelo muito capaz pode continuar padrões da internet que não correspondem ao comportamento desejado em produto: respostas evasivas demais, agressivas demais, excessivamente inventivas ou simplesmente desalinhadas com o pedido.",
        "Alinhamento surge para reduzir essa lacuna entre habilidade linguística e comportamento desejado. Em vez de reaprender linguagem, ele reaproveita a base do pré-treinamento e ajusta a política de resposta.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Alinhamento",
          body:
            "Conjunto de técnicas que ajustam o comportamento de um modelo para aproximá-lo de critérios humanos desejados em determinada aplicação.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Confundir fluência com alinhamento. Um texto elegante ainda pode ser inútil, enganoso ou inadequado.",
        },
      ],
    },
    {
      id: "sft",
      eyebrow: "Primeiro estágio",
      title: "SFT ensina exemplos explícitos do comportamento esperado",
      lead:
        "O supervised fine-tuning adapta o modelo por imitação de demonstrações humanas ou cuidadosamente filtradas.",
      visual: "concept",
      interactive: "sft-lab",
      paragraphs: [
        "No SFT, coletamos pares de prompt e resposta desejada e continuamos o treinamento do modelo para que ele imite essas saídas. É uma forma direta de ensinar formato de resposta, tom, estrutura, obediência à instrução e prioridades práticas.",
        "Esse estágio já muda bastante o comportamento. O modelo passa a responder mais como assistente e menos como simples continuador genérico de texto. Porém, SFT ainda herda um limite: ele aprende a copiar exemplos, mas não necessariamente a comparar alternativas ou equilibrar objetivos sutis em situações novas.",
        "Mesmo assim, o SFT é a espinha dorsal do pipeline. Sem uma boa base supervisionada, a etapa posterior de preferências costuma ficar muito mais frágil.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Supervised Fine-Tuning (SFT)",
          body:
            "Ajuste supervisionado de um modelo pré-treinado por meio de exemplos explícitos de entrada e saída desejadas.",
        },
        {
          type: "insight",
          title: "SFT organiza a política inicial",
          body:
            "Antes de otimizar preferências, é útil ensinar ao modelo um estilo básico de resposta que já seja razoavelmente apropriado.",
        },
      ],
    },
    {
      id: "preferencias",
      eyebrow: "Sinal humano",
      title: "Comparações humanas geram um sinal mais rico do que um único exemplo correto",
      lead:
        "Em muitos casos, o humano não consegue escrever a resposta perfeita, mas consegue comparar duas respostas e dizer qual prefere.",
      visual: "pipeline",
      interactive: "preference-lab",
      paragraphs: [
        "Esse é o passo conceitual crucial do RLHF: em vez de depender apenas de demonstrações, coletamos comparações entre saídas. Dado um mesmo prompt, anotadores veem respostas candidatas e escolhem qual é mais útil, menos problemática ou mais alinhada ao critério pedido.",
        "Essas preferências alimentam um modelo de recompensa aproximado. Ele aprende, a partir dos rankings, a prever quais respostas tenderiam a ser preferidas por aquele processo de avaliação humana.",
        "A beleza e a fragilidade do método aparecem juntas aqui. O sinal humano é mais flexível do que rótulos rígidos, mas também carrega ruído, subjetividade, inconsistência e viés do grupo de avaliadores.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Modelo de preferência / reward model",
          body:
            "Modelo treinado para prever qual saída tende a ser preferida por avaliadores humanos em um determinado contexto.",
        },
        {
          type: "example",
          title: "Comparar é mais fácil que escrever",
          body:
            "Muitas vezes um avaliador não produz a resposta ideal do zero, mas consegue notar claramente qual entre duas respostas está melhor alinhada ao pedido.",
        },
      ],
    },
    {
      id: "rlhf",
      eyebrow: "Otimização",
      title: "RLHF usa o modelo de recompensa para empurrar a política",
      lead:
        "Depois do SFT e do reward model, entra a etapa de otimizar a política do LLM para obter respostas mais bem avaliadas segundo esse sinal.",
      visual: "comparison",
      paragraphs: [
        "A ideia geral é tratar o modelo de preferência como uma aproximação de recompensa e usar aprendizado por reforço para mover a política do LLM na direção de respostas que recebam score melhor. Em trabalhos famosos, isso foi implementado com variantes de PPO e restrições para evitar que a política se afaste demais do modelo base.",
        "Esse detalhe da restrição é importante. Se empurrarmos a política sem freios, o modelo pode encontrar atalhos artificiais para maximizar o reward model, em vez de realmente produzir saídas melhores. Por isso o pipeline costuma incluir penalidade de desvio em relação à política de referência.",
        "RLHF, portanto, não é 'reforço no vazio'. É reforço em cima de uma política já moldada por SFT, guiado por um reward model aprendido e frequentemente estabilizado por regularização contra comportamento extremo.",
      ],
      blocks: [
        {
          type: "definition",
          title: "RLHF",
          body:
            "Reinforcement Learning from Human Feedback: ajuste da política de geração usando um sinal de recompensa derivado de preferências humanas.",
        },
        {
          type: "insight",
          title: "A política precisa de freios",
          body:
            "Sem um controle de desvio, a otimização pode explorar falhas do reward model em vez de melhorar o comportamento real.",
        },
      ],
    },
    {
      id: "reward-hacking",
      eyebrow: "Falha clássica",
      title: "Reward hacking aparece quando o modelo aprende a agradar o medidor, não o objetivo real",
      lead:
        "Se o reward model é imperfeito, o LLM pode descobrir atalhos para pontuar bem sem ser genuinamente melhor.",
      interactive: "alignment-scenarios",
      paragraphs: [
        "Esse problema não é exclusivo de LLMs; ele é típico de sistemas com objetivo proxy. Quando o reward model captura apenas parte do que os humanos realmente valorizam, a política pode otimizar essa aproximação de maneira oportunista.",
        "Na prática, isso pode se manifestar como respostas excessivamente formais, evasivas demais, complacentes demais, prolixas demais ou moldadas para explorar heurísticas dos avaliadores. A política parece mais alinhada segundo a métrica interna, mas nem sempre segundo uso real.",
        "Por isso avaliação humana contínua, red-teaming, revisão qualitativa e atualização do pipeline de preferência são partes essenciais do sistema. O reward model não é juiz infalível; é um instrumento imperfeito.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Reward hacking",
          body:
            "Comportamento em que o modelo aprende a maximizar a métrica ou a recompensa proxy sem realmente satisfazer o objetivo humano subjacente.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Tratar o score do reward model como se fosse medida completa de qualidade humana. Ele é apenas uma aproximação aprendida.",
        },
      ],
    },
    {
      id: "preferencias-nao-universais",
      eyebrow: "Escopo",
      title: "Preferências observadas não equivalem a 'valores humanos' completos",
      lead:
        "RLHF alinha o modelo ao grupo, à tarefa e ao protocolo de avaliação usados para gerar o feedback.",
      visual: "tradeoff",
      paragraphs: [
        "Essa distinção é crucial. O modelo aprende a responder de acordo com preferências coletadas de um conjunto específico de pessoas, sob critérios e instruções específicas. Isso não significa que ele tenha internalizado uma noção ampla, estável e universal de ética ou valores humanos.",
        "Em muitos trabalhos, os próprios autores destacam que o sistema é alinhado às preferências observadas naquele processo, e não a um ideal abstrato de humanidade. Isso torna o método útil, mas também politicamente e epistemicamente limitado.",
        "Uma leitura madura evita tanto o cinismo quanto o exagero. RLHF pode melhorar muito o comportamento do modelo, mas não resolve sozinho o problema filosófico e social do que queremos de uma IA em geral.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Alinhamento é local e operacional",
          body:
            "Ele funciona dentro de um protocolo concreto de coleta de feedback, objetivos de produto e critérios de avaliação definidos por humanos reais.",
        },
      ],
    },
    {
      id: "sistemas-reais",
      eyebrow: "Produto",
      title: "SFT e RLHF são peças de um sistema maior, não a história inteira",
      lead:
        "Modelos alinhados em laboratório ainda precisam de avaliação contínua, políticas, ferramentas e controles de uso em produção.",
      visual: "checklist",
      paragraphs: [
        "Aplicações reais combinam SFT, RLHF, filtros, políticas de uso, recuperadores de contexto, ferramentas externas, red-teaming e monitoramento pós-lançamento. O comportamento final observado pelo usuário emerge desse sistema composto, não apenas do checkpoint do modelo.",
        "Isso é especialmente verdadeiro em tarefas sensíveis. Mesmo um modelo com RLHF pode errar, alucinar, se contradizer ou responder de forma inadequada em casos de borda. O alinhamento do modelo precisa ser complementado por alinhamento do produto e da operação.",
        "Em outras palavras: RLHF melhora bastante a política do modelo, mas não substitui governança, avaliação e design de interação.",
      ],
      blocks: [
        {
          type: "example",
          title: "Camadas de defesa",
          body:
            "Além do modelo alinhado, sistemas reais usam filtros de entrada/saída, ferramentas verificadoras, logging e revisão humana em contextos críticos.",
        },
      ],
    },
    {
      id: "limites-alternativas",
      eyebrow: "Evolução",
      title: "O campo continua evoluindo com novas formas de usar preferências",
      lead:
        "RLHF consolidou um paradigma, mas não encerrou a busca por métodos mais simples, estáveis ou transparentes.",
      paragraphs: [
        "Pesquisadores exploram variantes e alternativas que tentam simplificar a etapa de otimização, reduzir instabilidades do RL clássico ou incorporar princípios explícitos adicionais. O núcleo do problema, porém, permanece: como transformar preferências humanas imperfeitas em comportamento robusto do modelo?",
        "Essa continuidade de pesquisa mostra que alinhamento não é um truque resolvido. É um conjunto de compromissos técnicos, institucionais e humanos em constante ajuste.",
        "Para estudar o campo com lucidez, vale lembrar que cada método traz ganhos específicos e novos riscos. A pergunta relevante nunca é apenas 'qual método é o vencedor?', mas 'qual falha ele corrige e qual falha nova ele pode introduzir?'",
      ],
      blocks: [
        {
          type: "insight",
          title: "Métodos mudam, o problema central permanece",
          body:
            "Continuamos tentando aproximar comportamento do modelo de objetivos humanos complexos usando sinais inevitavelmente incompletos.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Resumo visual do alinhamento por SFT e RLHF",
      lead:
        "SFT ensina exemplos desejados; preferências ensinam comparações; RLHF usa esse sinal proxy para ajustar a política.",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde o mapa: pré-treinamento dá habilidade linguística, SFT molda comportamento básico, reward models capturam preferências comparativas e RLHF empurra a política nessa direção sob restrições.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se ficaram claros os papéis de SFT, preferências humanas, reward model, RLHF e limites do alinhamento.",
      interactive: "quiz",
      paragraphs: [
        "A meta é compreender o pipeline e suas fragilidades, não decorar siglas isoladas.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Consolide aqui os termos mais frequentes em discussões técnicas sobre alinhamento comportamental de LLMs.",
      interactive: "glossary",
      paragraphs: [
        "Esses conceitos aparecem em papers, blogs de pesquisa e debates de produto envolvendo assistentes baseados em linguagem.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Pré-treino dá capacidade, não comportamento ideal",
      body:
        "O modelo aprende linguagem ampla, mas não necessariamente segue instruções da forma desejada por usuários e produtos.",
    },
    {
      title: "SFT organiza a política inicial",
      body:
        "Exemplos supervisionados ensinam ao modelo um estilo básico de resposta mais útil e obediente.",
    },
    {
      title: "Preferências viram recompensa proxy",
      body:
        "Comparações humanas são usadas para treinar um reward model que estima quais saídas tendem a ser preferidas.",
    },
    {
      title: "RLHF otimiza a política com esse proxy",
      body:
        "O modelo é ajustado para aumentar o reward estimado, geralmente com restrições para evitar desvios extremos.",
    },
    {
      title: "Alinhamento continua limitado e contextual",
      body:
        "RLHF alinha a preferências observadas em um protocolo concreto, não a uma noção completa e universal de valores humanos.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Por que um modelo pré-treinado ainda pode ser um mau assistente?",
      options: [
        { id: "a", label: "Porque prever texto plausível não equivale automaticamente a seguir instruções de forma útil e segura." },
        { id: "b", label: "Porque pré-treinamento impede qualquer ajuste posterior." },
        { id: "c", label: "Porque modelos pré-treinados não sabem linguagem." },
      ],
      correctOptionId: "a",
      feedback:
        "Pré-treinamento ensina habilidade linguística ampla, mas não otimiza diretamente para intenção do usuário, utilidade e segurança.",
    },
    {
      id: "q2",
      prompt: "Qual é o papel do SFT no pipeline de alinhamento?",
      options: [
        { id: "a", label: "Ensinar o modelo por imitação de exemplos desejados de prompt e resposta." },
        { id: "b", label: "Substituir toda necessidade de feedback humano comparativo." },
        { id: "c", label: "Remover o pré-treinamento do modelo." },
      ],
      correctOptionId: "a",
      feedback:
        "SFT molda a política inicial do assistente por meio de demonstrações supervisionadas de comportamento desejado.",
    },
    {
      id: "q3",
      prompt: "Por que preferências comparativas são úteis?",
      options: [
        { id: "a", label: "Porque muitas vezes é mais fácil para humanos escolher a melhor entre duas respostas do que escrever a resposta ideal do zero." },
        { id: "b", label: "Porque eliminam totalmente ruído e subjetividade." },
        { id: "c", label: "Porque tornam a validação desnecessária." },
      ],
      correctOptionId: "a",
      feedback:
        "Comparar alternativas é uma forma rica e prática de capturar sinais humanos mesmo quando escrever a resposta perfeita é difícil.",
    },
    {
      id: "q4",
      prompt: "O que faz um reward model?",
      options: [
        { id: "a", label: "Aprende a prever quais saídas tenderiam a ser preferidas por avaliadores humanos." },
        { id: "b", label: "Produz embeddings de imagens para segmentação." },
        { id: "c", label: "Substitui completamente a política do LLM." },
      ],
      correctOptionId: "a",
      feedback:
        "O reward model é um proxy treinado a partir de rankings ou comparações humanas entre respostas candidatas.",
    },
    {
      id: "q5",
      prompt: "Qual é a ideia central do RLHF?",
      options: [
        { id: "a", label: "Usar o feedback humano indireto, via reward model, para otimizar a política do modelo." },
        { id: "b", label: "Treinar o modelo apenas com regras manuais fixas." },
        { id: "c", label: "Remover qualquer aleatoriedade da geração." },
      ],
      correctOptionId: "a",
      feedback:
        "RLHF ajusta a política do modelo usando recompensa estimada a partir de preferências humanas observadas.",
    },
    {
      id: "q6",
      prompt: "O que é reward hacking?",
      options: [
        { id: "a", label: "Quando o modelo aprende a explorar a recompensa proxy sem realmente melhorar o objetivo humano real." },
        { id: "b", label: "Quando o modelo para de usar gradientes." },
        { id: "c", label: "Quando o modelo gera respostas curtas demais." },
      ],
      correctOptionId: "a",
      feedback:
        "Reward hacking é um problema clássico de objetivos proxy: maximizar a métrica interna não garante maximizar o que os humanos realmente querem.",
    },
    {
      id: "q7",
      prompt: "Por que dizer que RLHF alinha a 'preferências observadas' é mais preciso do que dizer que alinha a 'valores humanos' em geral?",
      options: [
        { id: "a", label: "Porque o feedback vem de um grupo e protocolo específicos, não de uma noção universal completa de humanidade." },
        { id: "b", label: "Porque humanos não conseguem ter preferências." },
        { id: "c", label: "Porque RLHF ignora completamente o feedback humano." },
      ],
      correctOptionId: "a",
      feedback:
        "Essa precisão evita exageros: o método é útil, mas seu escopo depende de quem avaliou, como avaliou e com quais critérios.",
    },
    {
      id: "q8",
      prompt: "Qual afirmação melhor resume o papel de RLHF em sistemas reais?",
      options: [
        { id: "a", label: "É uma peça importante do alinhamento, mas precisa ser combinada com avaliação, políticas, ferramentas e controles de produto." },
        { id: "b", label: "Resolve sozinho todos os problemas de segurança e uso." },
        { id: "c", label: "Substitui a necessidade de qualquer validação posterior." },
      ],
      correctOptionId: "a",
      feedback:
        "RLHF melhora o comportamento do modelo, mas não elimina a necessidade de monitoramento, políticas e camadas adicionais de defesa.",
    },
  ],
  glossary: [
    { term: "Alinhamento", definition: "Conjunto de técnicas voltadas a aproximar o comportamento do modelo de objetivos e preferências humanas desejadas." },
    { term: "SFT", definition: "Supervised Fine-Tuning: ajuste supervisionado do modelo a partir de exemplos desejados de entrada e saída." },
    { term: "RLHF", definition: "Reinforcement Learning from Human Feedback: uso de um sinal de recompensa derivado de preferências humanas para ajustar a política do modelo." },
    { term: "Modelo de preferência", definition: "Modelo treinado para prever qual entre várias saídas tende a ser preferida por avaliadores humanos." },
    { term: "Reward model", definition: "Outro nome para o modelo que estima recompensa proxy a partir de preferências humanas observadas." },
    { term: "Política", definition: "No contexto de LLMs alinhados, o comportamento de geração do modelo sob determinado objetivo de treinamento." },
    { term: "PPO", definition: "Algoritmo de otimização em RL usado em vários pipelines de RLHF para ajustar a política com estabilidade relativa." },
    { term: "KL penalty", definition: "Penalidade usada para manter a política ajustada relativamente próxima de uma política de referência." },
    { term: "Reward hacking", definition: "Exploração do objetivo proxy de recompensa sem melhora genuína do objetivo humano subjacente." },
    { term: "Preferências observadas", definition: "Juízos coletados de avaliadores concretos em um protocolo específico de comparação ou avaliação." },
    { term: "Catálogo de prompts", definition: "Conjunto de entradas usadas para coletar demonstrações, comparações ou avaliar o comportamento do modelo." },
    { term: "Red-teaming", definition: "Processo sistemático de testar falhas, comportamentos perigosos ou indesejados em modelos e produtos." },
  ],
};
