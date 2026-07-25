import type { LessonContent } from "../../../types/content";

export const fineTuningELoraContent: LessonContent = {
  id: "fine-tuning-e-lora",
  title: "Fine-tuning e LoRA",
  subtitle:
    "Como adaptar um modelo já treinado para um domínio, tarefa ou estilo sem necessariamente atualizar todos os seus parâmetros.",
  description:
    "Uma aula intermediária sobre fine-tuning completo, PEFT, LoRA e QLoRA, cobrindo motivação, trade-offs de custo, escolha de dados, avaliação e erros comuns ao adaptar LLMs.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Fine-tuning",
    "LoRA",
    "QLoRA",
    "PEFT",
    "Adaptação de modelos",
    "LLM",
  ],
  learningObjectives: [
    "Distinguir fine-tuning completo de abordagens parameter-efficient como LoRA e QLoRA.",
    "Entender por que adaptar um modelo não significa reaprender tudo desde o zero.",
    "Explicar a intuição de atualização de baixa rank em matrizes grandes.",
    "Avaliar trade-offs entre custo computacional, flexibilidade e risco de regressão.",
    "Reconhecer o papel da qualidade dos dados e da avaliação no sucesso do ajuste.",
    "Saber quando LoRA é uma excelente escolha e quando ele pode ser insuficiente.",
    "Interpretar QLoRA como estratégia de eficiência operacional, não como mágica sem perdas.",
  ],
  prerequisites: [
    "Noção básica de como LLMs são pré-treinados e depois usados em tarefas específicas.",
    "Familiaridade geral com pesos, camadas e atualização por gradiente.",
    "Entender que modelos de base podem ser fortes, mas ainda não falar o idioma exato de um produto ou domínio.",
  ],
  references: [
    {
      title: "LoRA: Low-Rank Adaptation of Large Language Models",
      source: "Hu et al., 2021 — arXiv / ICLR 2022",
      url: "https://arxiv.org/abs/2106.09685",
      note:
        "Trabalho que consolidou LoRA como uma forma prática de adaptar grandes modelos congelando os pesos originais.",
    },
    {
      title: "QLoRA: Efficient Finetuning of Quantized LLMs",
      source: "Dettmers et al., 2023 — arXiv / NeurIPS 2023",
      url: "https://arxiv.org/abs/2305.14314",
      note:
        "Mostra como combinar quantização com LoRA para reduzir o custo de memória durante o ajuste.",
    },
    {
      title: "Parameter-Efficient Fine-Tuning for Large Models: A Comprehensive Survey",
      source: "Han et al., 2024 — arXiv",
      url: "https://arxiv.org/abs/2403.14608",
      note:
        "Panorama útil para contextualizar LoRA entre outras estratégias de PEFT.",
    },
    {
      title: "Parameter-Efficient Transfer Learning for NLP",
      source: "Houlsby et al., 2019 — ICML",
      url: "https://arxiv.org/abs/1902.00751",
      note:
        "Referência clássica sobre adapters, importante para entender a família de métodos que evitam ajustar tudo.",
    },
    {
      title: "LoRA conceptual guide",
      source: "Hugging Face PEFT",
      url: "https://huggingface.co/docs/peft/main/conceptual_guides/lora",
      note:
        "Guia prático com parâmetros típicos e decisões de implementação usadas na prática.",
    },
    {
      title: "Fine-tuning guide",
      source: "OpenAI Developers",
      url: "https://platform.openai.com/docs/guides/fine-tuning",
      note:
        "Material operacional sobre quando vale adaptar modelos e como pensar em dados e avaliação.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Quando um modelo base já sabe muito, adaptar não significa começar de novo: significa empurrar o comportamento para uma região mais útil para a sua tarefa. Fine-tuning completo faz isso atualizando muitos ou todos os pesos. LoRA toma outro caminho: mantém a maior parte do modelo congelada e aprende apenas pequenas correções de baixa rank inseridas em pontos estratégicos. A ideia é elegante porque aproveita a estrutura já aprendida pelo modelo e reduz muito o custo operacional. Mas eficiência não elimina a necessidade de bons dados, avaliação séria e clareza sobre o que realmente precisa ser mudado.",
  quickFacts: [
    {
      title: "Nem toda adaptação exige atualizar tudo",
      body:
        "Métodos PEFT reduzem custo e tempo ao aprender um conjunto muito menor de parâmetros.",
    },
    {
      title: "LoRA foca em correções estruturadas",
      body:
        "Em vez de reescrever matrizes inteiras, ele aprende ajustes de baixa rank que alteram a função da camada.",
    },
    {
      title: "Eficiência não substitui avaliação",
      body:
        "Um ajuste barato ainda pode degradar segurança, factualidade ou generalização se os dados forem ruins.",
    },
  ],
  sections: [
    {
      id: "motivacao",
      eyebrow: "Problema",
      title: "Por que adaptar um modelo se ele já foi pré-treinado em escala?",
      lead:
        "Modelos de base aprendem linguagem ampla, mas produto, domínio e estilo pedem especialização.",
      visual: "hero",
      paragraphs: [
        "Um LLM pré-treinado é uma base geral. Ele conhece muitos padrões da internet, mas isso não significa que responda do jeito exato que um produto, uma empresa ou um domínio técnico exigem. A lacuna aparece em formato, terminologia, política de resposta, robustez a instruções e cobertura de casos reais.",
        "Fine-tuning entra justamente para reduzir essa distância. Em vez de reaprender linguagem, usamos exemplos mais próximos da tarefa desejada para empurrar o modelo para um comportamento mais específico. Esse ajuste pode melhorar aderência a estilo, consistência de saída e desempenho em nichos onde prompts isolados já não bastam.",
        "A pergunta prática deixa de ser 'o modelo sabe tudo?' e passa a ser 'o modelo responde do jeito que o meu sistema precisa?'.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Fine-tuning",
          body:
            "Processo de continuar o treinamento de um modelo pré-treinado usando dados mais específicos para adaptar seu comportamento a uma tarefa, domínio ou política de resposta.",
        },
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Supor que prompt engineering sempre substitui adaptação. Em vários casos, prompt ajuda bastante, mas não corrige sistematicamente lacunas de estilo, terminologia ou comportamento.",
        },
      ],
    },
    {
      id: "ajuste-completo",
      eyebrow: "Estratégia clássica",
      title: "Fine-tuning completo oferece flexibilidade máxima, mas cobra caro",
      lead:
        "Atualizar todos os pesos dá liberdade total ao ajuste, porém aumenta custo, memória e risco de regressão.",
      visual: "comparison",
      paragraphs: [
        "No fine-tuning completo, praticamente todo o conjunto de parâmetros participa da adaptação. Isso é poderoso porque o modelo pode reorganizar internamente muitas representações e não fica restrito a pequenos pontos de intervenção.",
        "O problema é operacional: grandes modelos tornam esse processo caro em VRAM, armazenamento, tempo e infra. Além disso, quanto mais liberdade você dá ao ajuste, maior pode ser o risco de esquecer comportamentos úteis da base ou superespecializar demais o modelo ao dataset fino.",
        "Por isso, em produção, a decisão nem sempre é 'o que extrai o máximo absoluto?', mas 'qual método entrega o ganho necessário com o menor custo e o menor risco aceitável?'.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Mais liberdade, mais responsabilidade",
          body:
            "Fine-tuning completo pode capturar adaptações profundas, mas também amplia o espaço onde o modelo pode se desorganizar ou sobreajustar.",
        },
      ],
    },
    {
      id: "intuicao-lora",
      eyebrow: "PEFT",
      title: "LoRA troca reescrita total por correções pequenas e estruturadas",
      lead:
        "A intuição central é que, para muitas tarefas, basta aprender um ajuste compacto em vez de reotimizar a matriz inteira.",
      visual: "concept",
      interactive: "adapter-budget-lab",
      paragraphs: [
        "LoRA congela os pesos originais e injeta matrizes menores treináveis em certos pontos da rede, como projeções de atenção. Em termos intuitivos, é como manter a estrutura principal do prédio e instalar módulos que mudam a direção de certas passagens internas.",
        "Essas matrizes pequenas formam um update de baixa rank. O ganho é duplo: muito menos parâmetros treináveis e custo de memória consideravelmente menor. Na prática, isso torna o ajuste de modelos grandes bem mais acessível.",
        "LoRA não é interessante porque 'faz menos'. Ele é interessante porque muitas adaptações úteis parecem viver em um subespaço menor do que a matriz completa faria parecer à primeira vista.",
      ],
      blocks: [
        {
          type: "definition",
          title: "Low-rank adaptation",
          body:
            "Estratégia em que a atualização de uma matriz grande é aproximada por um produto de matrizes menores, reduzindo o número de parâmetros treináveis.",
        },
        {
          type: "example",
          title: "Mudança localizada",
          body:
            "Se a tarefa exige outro estilo de resposta ou melhor domínio de uma terminologia específica, talvez não seja preciso reescrever todo o conhecimento do modelo, apenas redirecionar partes do comportamento.",
        },
      ],
    },
    {
      id: "escolha-metodo",
      eyebrow: "Decisão prática",
      title: "Escolher entre full fine-tuning, LoRA e QLoRA é escolher um ponto no mapa de trade-offs",
      lead:
        "Não existe uma técnica universalmente melhor; existe uma combinação entre objetivo, hardware, dados e tolerância a risco.",
      visual: "tradeoff",
      interactive: "full-vs-peft",
      paragraphs: [
        "Full fine-tuning costuma oferecer o maior espaço de adaptação, mas é o mais caro. LoRA reduz fortemente o custo preservando boa capacidade de especialização em muitos cenários. QLoRA vai além ao quantizar a base durante o treino, empurrando a eficiência ainda mais.",
        "A decisão depende da distância entre a base e a tarefa, do orçamento computacional, da necessidade de manter múltiplas variantes do modelo e do impacto aceitável de pequenas perdas operacionais introduzidas pela eficiência extra.",
        "Em times reais, QLoRA e LoRA são frequentemente preferidos porque permitem iterar mais, comparar hipóteses mais rápido e manter múltiplos adapters específicos sem duplicar checkpoints gigantes.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Iterar rápido também é desempenho",
          body:
            "Uma técnica um pouco menos flexível, mas muito mais barata, pode ser superior no ciclo completo de desenvolvimento porque permite testar mais hipóteses e corrigir erros cedo.",
        },
      ],
    },
    {
      id: "dados-avaliacao",
      eyebrow: "Base empírica",
      title: "A qualidade do fine-tuning depende mais do dataset do que da sigla escolhida",
      lead:
        "LoRA ruim com dados ruins continua ruim; o método não compensa exemplos mal formulados ou avaliação fraca.",
      visual: "pipeline",
      paragraphs: [
        "Se os exemplos contêm inconsistência, ruído, instruções contraditórias ou respostas superficiais, o modelo aprende exatamente essa mistura. Ajuste eficiente não filtra automaticamente mau curadoria.",
        "O melhor dataset de adaptação costuma refletir o uso real: prompts representativos, formatos finais esperados, negativas apropriadas, critérios de qualidade bem definidos e diversidade suficiente para evitar rigidez excessiva.",
        "Do mesmo modo, avaliação precisa ir além da loss. Compare variantes em tarefas reais, cheque regressões de segurança e observe se o ganho aparente também aparece em produção ou em um conjunto de validação mais honesto.",
      ],
      blocks: [
        {
          type: "mistake",
          title: "Erro comum",
          body:
            "Medir sucesso só pela redução da loss de treino. O que importa é comportamento útil em dados não vistos e em cenários que importam para o produto.",
        },
      ],
    },
    {
      id: "qlora-operacao",
      eyebrow: "Eficiência extra",
      title: "QLoRA reduz memória, mas exige maturidade para interpretar seus compromissos",
      lead:
        "Quantizar a base durante o ajuste barateia muito a operação, porém muda o regime de treino e as sensibilidades do pipeline.",
      visual: "checklist",
      interactive: "data-regime-lab",
      paragraphs: [
        "QLoRA combina base quantizada com adapters treináveis em precisão maior. O ganho prático é permitir ajustar modelos maiores em hardware mais limitado sem tocar em todos os pesos de forma densa.",
        "Esse avanço operacional é enorme, mas não deve ser romantizado. Quantização, escolha de hiperparâmetros, qualidade dos batches e tipo de tarefa influenciam bastante a estabilidade. O pipeline precisa ser tratado como engenharia fina, não como receita automática.",
        "Vale pensar em QLoRA como uma ferramenta de acessibilidade computacional. Ele amplia quem consegue experimentar com modelos grandes, mas continua exigindo método para separar ganho real de ilusão experimental.",
      ],
      blocks: [
        {
          type: "definition",
          title: "QLoRA",
          body:
            "Abordagem que mantém a base quantizada para reduzir memória e treina adapters LoRA sobre ela, preservando boa parte da qualidade com custo menor.",
        },
      ],
    },
    {
      id: "falhas-classicas",
      eyebrow: "Riscos",
      title: "Os fracassos mais comuns vêm de desalinhamento entre objetivo, dados e escopo do ajuste",
      lead:
        "Muitos problemas atribuídos ao método, na verdade, nascem de especificação ruim do que deveria ser aprendido.",
      paragraphs: [
        "Uma falha frequente é tentar resolver com fine-tuning um problema que era de ferramenta, recuperação de contexto ou política de sistema. Outra é usar poucos dados, extremamente homogêneos, e esperar ganho robusto fora da distribuição.",
        "Também é comum ajustar um modelo para um benchmark estreito e depois descobrir que ele ficou pior em perguntas abertas, recusas sensíveis ou coerência geral. Isso acontece porque adaptar significa deslocar o comportamento; deslocamentos sempre têm efeitos colaterais possíveis.",
        "Por isso, o trabalho sério não é apenas treinar adapters. É definir claramente qual comportamento deve melhorar sem quebrar o restante.",
      ],
      blocks: [
        {
          type: "example",
          title: "Exemplo de decisão ruim",
          body:
            "Se o modelo erra porque não tem acesso a documentação atualizada, um sistema com grounding pode resolver melhor do que um fine-tuning sobre poucas amostras estáticas.",
        },
      ],
    },
    {
      id: "quando-nao-usar",
      eyebrow: "Escopo",
      title: "Nem todo problema pede LoRA",
      lead:
        "Às vezes a melhor solução é prompt, RAG, ferramenta externa ou até mudança de UX em vez de adaptação do modelo.",
      paragraphs: [
        "Se a necessidade principal é incorporar fatos mutáveis, como preços, políticas atuais ou inventário, ajustar o modelo pode ser pior do que consultar uma fonte viva. O mesmo vale para cálculos determinísticos e execução de ações: ferramenta certa costuma vencer memorização estatística.",
        "LoRA brilha quando você quer moldar comportamento recorrente com eficiência: estilo, formato, taxonomia interna, tipo de resposta ou domínio especializado razoavelmente estável. Fora disso, ele pode virar um martelo procurando pregos.",
      ],
      blocks: [
        {
          type: "insight",
          title: "Adaptar é uma decisão arquitetural",
          body:
            "Antes de treinar qualquer coisa, pergunte se o que falta é conhecimento paramétrico, contexto recuperável ou capacidade de agir sobre sistemas externos.",
        },
      ],
    },
    {
      id: "resumo",
      eyebrow: "Síntese",
      title: "Mapa mental de fine-tuning, LoRA e QLoRA",
      lead:
        "O núcleo da decisão é simples: quanto do modelo preciso mover, quanto posso pagar e como vou provar que melhorei sem quebrar o resto?",
      interactive: "summary-cards",
      paragraphs: [
        "Guarde a hierarquia: fine-tuning completo maximiza liberdade; LoRA oferece adaptação eficiente por updates de baixa rank; QLoRA empurra ainda mais a eficiência ao quantizar a base durante o ajuste.",
      ],
    },
    {
      id: "quiz-revisao",
      eyebrow: "Revisão",
      title: "Quiz de revisão",
      lead:
        "Teste se ficaram claros o papel de LoRA, os trade-offs de custo e os cuidados com dados e avaliação.",
      interactive: "quiz",
      paragraphs: [
        "A meta é raciocinar sobre escolhas de adaptação, não decorar nomes de métodos.",
      ],
    },
    {
      id: "glossario",
      eyebrow: "Vocabulário",
      title: "Glossário essencial",
      lead:
        "Termos-chave para ler papers, documentação e discussões práticas sobre adaptação de LLMs.",
      interactive: "glossary",
      paragraphs: [
        "Use este glossário como âncora conceitual para não confundir eficiência operacional com objetivo de modelagem.",
      ],
    },
  ],
  summaryCards: [
    {
      title: "Fine-tuning adapta a base ao seu contexto",
      body:
        "A meta não é reaprender linguagem inteira, mas empurrar o modelo para o comportamento necessário em uma tarefa ou produto.",
    },
    {
      title: "LoRA aprende atualizações compactas",
      body:
        "Em vez de ajustar matrizes completas, ele adiciona correções de baixa rank em pontos estratégicos da rede.",
    },
    {
      title: "PEFT reduz custo e facilita iteração",
      body:
        "Menos parâmetros treináveis significam menos memória, menor armazenamento e mais facilidade para testar variantes.",
    },
    {
      title: "QLoRA amplia acessibilidade computacional",
      body:
        "Ao combinar quantização com adapters, ele permite ajustar modelos maiores em hardware mais modesto.",
    },
    {
      title: "Método não salva dataset ruim",
      body:
        "Curadoria, cobertura e avaliação são determinantes para o comportamento final, independentemente da técnica escolhida.",
    },
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Qual problema o fine-tuning tenta resolver em relação a um modelo base?",
      options: [
        {
          id: "a",
          label:
            "Adaptar o comportamento do modelo a um domínio, tarefa ou estilo mais específico.",
        },
        { id: "b", label: "Apagar todo o conhecimento aprendido no pré-treinamento." },
        { id: "c", label: "Eliminar a necessidade de avaliação." },
      ],
      correctOptionId: "a",
      feedback:
        "A ideia central é especializar uma base já forte, não recomeçar do zero nem dispensar validação.",
    },
    {
      id: "q2",
      prompt: "O que caracteriza o fine-tuning completo?",
      options: [
        { id: "a", label: "Atualizar amplamente os pesos do modelo, com alto custo e alta flexibilidade." },
        { id: "b", label: "Treinar apenas o tokenizer." },
        { id: "c", label: "Usar exclusivamente prompts sem gradientes." },
      ],
      correctOptionId: "a",
      feedback:
        "Full fine-tuning oferece grande liberdade de adaptação, mas cobra caro em memória, tempo e risco de regressão.",
    },
    {
      id: "q3",
      prompt: "Qual é a intuição principal de LoRA?",
      options: [
        { id: "a", label: "Aprender pequenas correções estruturadas sem reescrever toda a matriz de pesos." },
        { id: "b", label: "Remover completamente a atenção do modelo." },
        { id: "c", label: "Tornar o modelo incapaz de generalizar." },
      ],
      correctOptionId: "a",
      feedback:
        "LoRA assume que muitas adaptações úteis podem ser expressas por updates compactos de baixa rank.",
    },
    {
      id: "q4",
      prompt: "Por que LoRA costuma ser atraente em produção?",
      options: [
        { id: "a", label: "Porque reduz parâmetros treináveis e facilita manter múltiplas variantes do modelo." },
        { id: "b", label: "Porque garante qualidade superior em todo cenário." },
        { id: "c", label: "Porque substitui a necessidade de dados representativos." },
      ],
      correctOptionId: "a",
      feedback:
        "Eficiência operacional e velocidade de iteração tornam LoRA muito valioso em ambientes com restrições reais de custo.",
    },
    {
      id: "q5",
      prompt: "O que QLoRA adiciona ao quadro?",
      options: [
        { id: "a", label: "Combina base quantizada com adapters treináveis para reduzir ainda mais o uso de memória." },
        { id: "b", label: "Treina todos os pesos em precisão maior." },
        { id: "c", label: "Dispensa hiperparâmetros e avaliação." },
      ],
      correctOptionId: "a",
      feedback:
        "QLoRA é uma estratégia de eficiência de memória; ele não elimina o trabalho de engenharia do treinamento.",
    },
    {
      id: "q6",
      prompt: "Qual afirmação sobre dados é a mais correta?",
      options: [
        { id: "a", label: "A qualidade e a representatividade do dataset são decisivas para o resultado do ajuste." },
        { id: "b", label: "Se o método for moderno, o dataset importa pouco." },
        { id: "c", label: "Basta reduzir a loss de treino para garantir sucesso." },
      ],
      correctOptionId: "a",
      feedback:
        "Método não compensa exemplos ruins, distribuição mal escolhida ou critérios de resposta inconsistentes.",
    },
    {
      id: "q7",
      prompt: "Quando LoRA pode não ser a melhor solução?",
      options: [
        { id: "a", label: "Quando o problema principal é falta de contexto atualizado ou necessidade de executar ferramentas." },
        { id: "b", label: "Quando existe qualquer tarefa de linguagem." },
        { id: "c", label: "Quando se quer um formato de saída mais consistente." },
      ],
      correctOptionId: "a",
      feedback:
        "Se a falha for de grounding ou ação externa, arquitetura com RAG ou ferramentas pode ser mais apropriada que adaptação paramétrica.",
    },
    {
      id: "q8",
      prompt: "Qual é um erro frequente ao avaliar um fine-tuning?",
      options: [
        { id: "a", label: "Olhar só para a loss de treino e ignorar regressões em comportamento real." },
        { id: "b", label: "Comparar variantes no conjunto de validação." },
        { id: "c", label: "Checar se o modelo mantém recusas adequadas." },
      ],
      correctOptionId: "a",
      feedback:
        "O ganho verdadeiro aparece em tarefas não vistas e no uso final, não apenas em métricas internas do treino.",
    },
  ],
  glossary: [
    {
      term: "Fine-tuning",
      definition:
        "Continuação do treinamento de um modelo pré-treinado para adaptá-lo a uma tarefa ou domínio específico.",
    },
    {
      term: "PEFT",
      definition:
        "Parameter-Efficient Fine-Tuning: família de métodos que adapta modelos treinando relativamente poucos parâmetros.",
    },
    {
      term: "LoRA",
      definition:
        "Low-Rank Adaptation: técnica de PEFT que aprende updates compactos de baixa rank sobre pesos congelados.",
    },
    {
      term: "QLoRA",
      definition:
        "Variante que combina quantização da base com treinamento de adapters LoRA para economizar memória.",
    },
    {
      term: "Rank",
      definition:
        "Dimensão interna do update LoRA; em termos intuitivos, controla a capacidade do ajuste compacto.",
    },
    {
      term: "Adapter",
      definition:
        "Módulo adicional treinável inserido em um modelo grande para adaptá-lo sem mexer densamente em todos os pesos.",
    },
    {
      term: "Pesos congelados",
      definition:
        "Parâmetros mantidos fixos durante o ajuste, usados como base estável sobre a qual outros módulos aprendem.",
    },
    {
      term: "Quantização",
      definition:
        "Representação de pesos com menos bits para reduzir memória e custo computacional.",
    },
    {
      term: "Regressão comportamental",
      definition:
        "Piora em capacidades ou comportamentos úteis após uma adaptação que supostamente deveria melhorar o modelo.",
    },
    {
      term: "Validação",
      definition:
        "Etapa em que variantes são comparadas em dados não usados diretamente no ajuste para medir generalização.",
    },
    {
      term: "Domínio",
      definition:
        "Contexto especializado de uso, como jurídico, médico, suporte técnico ou documentação interna.",
    },
    {
      term: "Grounding",
      definition:
        "Ancoragem da resposta em fontes ou ferramentas externas, em vez de depender só do conhecimento paramétrico do modelo.",
    },
  ],
};
