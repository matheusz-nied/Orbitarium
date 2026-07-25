import type { LessonContent } from "../../../types/content";

export const audioFalaAsrTtsContent: LessonContent = {
  id: "audio-fala-asr-tts",
  title: "Áudio e Fala: ASR e TTS",
  subtitle:
    "Como máquinas escutam, transcrevem e sintetizam voz: do sinal acústico contínuo às palavras, prosódia e latência em sistemas reais.",
  description:
    "Uma aula intermediária sobre representação de áudio, reconhecimento automático de fala (ASR), síntese de fala (TTS), self-supervised speech models, vocoders e trade-offs de streaming, naturalidade e robustez.",
  primaryCategoryId: "inteligencia-artificial",
  secondaryCategoryId: "computacao",
  level: "Intermediário",
  estimatedTime: "45-60 min",
  tags: [
    "Áudio",
    "Fala",
    "ASR",
    "TTS",
    "Whisper",
    "wav2vec 2.0",
    "Tacotron 2",
  ],
  learningObjectives: [
    "Entender por que áudio e fala são sinais temporais diferentes de texto e imagem.",
    "Compreender a relação entre waveform, espectrograma e representação acústica.",
    "Explicar o pipeline conceitual de ASR: do sinal acústico à transcrição textual.",
    "Entender o papel de pré-treino autosupervisionado em modelos modernos de fala.",
    "Distinguir objetivos de robustez, latência e precisão em sistemas de reconhecimento.",
    "Compreender o pipeline de TTS como texto -> representação intermediária -> waveform.",
    "Reconhecer o papel de vocoders na naturalidade final da fala sintetizada.",
    "Avaliar limites práticos como ruído, sotaque, sobreposição de vozes e alinhamento prosódico.",
  ],
  prerequisites: [
    "Noções básicas de modelos neurais.",
    "Interesse em fala, assistentes de voz e processamento de áudio.",
    "Curiosidade sobre sinais temporais e representação computacional de som.",
  ],
  references: [
    {
      title: "Robust Speech Recognition via Large-Scale Weak Supervision",
      source: "Radford et al., 2022 — arXiv (Whisper)",
      url: "https://arxiv.org/abs/2212.04356",
      note:
        "Paper do Whisper, importante para ASR robusto em grande escala e múltiplos idiomas.",
    },
    {
      title: "wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations",
      source: "Baevski et al., 2020 — arXiv/NeurIPS",
      url: "https://arxiv.org/abs/2006.11477",
      note:
        "Referência central sobre pré-treino autosupervisionado para fala.",
    },
    {
      title: "Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions",
      source: "Shen et al., 2017 — arXiv (Tacotron 2)",
      url: "https://arxiv.org/abs/1712.05884",
      note:
        "Paper clássico de TTS neural ponta a ponta com papel importante na história recente da síntese de voz.",
    },
    {
      title: "HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis",
      source: "Kong, Kim e Bae, 2020 — arXiv",
      url: "https://arxiv.org/abs/2010.05646",
      note:
        "Referência importante para vocoders neurais rápidos e naturais em TTS.",
    },
    {
      title: "openai/whisper",
      source: "OpenAI — repositório oficial",
      url: "https://github.com/openai/whisper",
      note:
        "Repositório oficial do Whisper com código, modelos e exemplos de uso.",
    },
    {
      title: "torchaudio Pipelines",
      source: "PyTorch Audio — documentação oficial",
      url: "https://pytorch.org/audio/stable/pipelines.html",
      note:
        "Referência prática para pipelines de ASR, TTS e modelos de fala no ecossistema PyTorch.",
    },
  ],
  heroVisual: "hero",
  openingText:
    "Quando ouvimos alguém falar, parece que as palavras simplesmente aparecem em nossa mente. Para uma máquina, porém, fala começa como uma onda contínua variando no tempo. Não há letras prontas, espaços visíveis ou fronteiras limpas entre palavras. ASR precisa transformar essa continuidade acústica em símbolos discretos. TTS faz o caminho oposto: recebe texto, decide ritmo, entonação e timbre, e precisa devolver uma waveform que soe natural aos ouvidos humanos. O campo de fala é fascinante justamente porque faz a ponte entre sinal físico, linguagem e experiência perceptiva.",
  quickFacts: [
    {
      title: "Fala é contínua no tempo",
      body:
        "Diferentemente do texto, a fala não chega segmentada em palavras; as fronteiras precisam ser inferidas.",
    },
    {
      title: "ASR lida com ruído e sotaque",
      body:
        "Precisão em fala depende de robustez acústica, cobertura linguística e contexto.",
    },
    {
      title: "TTS não é só pronunciar letras",
      body:
        "A naturalidade depende de prosódia, duração, entonação e vocoder de alta qualidade.",
    },
    {
      title: "Latência importa muito",
      body:
        "Em agentes de voz, atrasos pequenos já mudam drasticamente a experiência do usuário.",
    },
  ],
  sections: [
    s("motivacao", "Ponto de partida", "Por que áudio e fala são um desafio especial para IA", "Sinais acústicos são contínuos, temporais e altamente dependentes de contexto.", "hero", undefined, [
      "Uma imagem pode ser analisada como uma grade espacial relativamente estável. Fala, em contraste, é um fluxo temporal cuja interpretação depende de duração, ritmo, coarticulação, ruído e contexto linguístico. A mesma palavra pronunciada por pessoas diferentes pode ter formas acústicas bem distintas.",
      "Isso faz com que tarefas de fala exijam modelos capazes de lidar com variação temporal, compressão de informação acústica e incerteza sobre fronteiras. O modelo precisa inferir não apenas 'o que foi dito', mas onde um som termina, onde outro começa e como o ruído distorceu o sinal.",
      "Tanto em reconhecimento quanto em síntese, a fala obriga a IA a navegar entre física do som e estrutura da linguagem.",
    ], [
      { type: "definition", title: "ASR", body: "Automatic Speech Recognition: tarefa de converter fala em texto." },
      { type: "definition", title: "TTS", body: "Text-to-Speech: tarefa de converter texto em fala sintetizada." },
    ]),
    s("representacao", "Representação", "Da waveform ao espectrograma: como um som vira algo legível para modelos", "Antes de entender linguagem, o sistema precisa organizar energia acústica ao longo do tempo e da frequência.", "concept", undefined, [
      "A waveform é o sinal bruto no tempo. Ela preserva a forma física do áudio, mas nem sempre é a melhor representação para raciocinar sobre padrões fonéticos. Espectrogramas e variantes mel condensam informação de frequência ao longo do tempo de modo mais manejável.",
      "Essa representação revela estruturas úteis: vogais tendem a ocupar bandas específicas, consoantes explosivas aparecem como transientes, pausas são regiões de baixa energia e mudanças prosódicas alteram distribuição temporal do sinal.",
      "Mesmo quando modelos modernos aprendem diretamente do áudio bruto, a intuição do espectrograma continua valiosa para entender o problema.",
    ], [
      { type: "definition", title: "Espectrograma", body: "Representação tempo-frequência que mostra como a energia do sinal se distribui ao longo do tempo." },
    ]),
    s("asr-pipeline", "Reconhecimento", "ASR: do som contínuo ao texto discreto", "Reconhecimento de fala consiste em mapear padrões acústicos para sequência linguística.", "pipeline", "asr-alignment-lab", [
      "Conceitualmente, ASR precisa resolver ao menos três coisas: quais unidades fonéticas ou sublexicais aparecem, em que ordem aparecem e como isso se converte em palavras. Em modelos clássicos, essa decomposição era explícita. Em modelos neurais modernos, parte dessa estrutura é internalizada.",
      "O desafio é que o áudio não vem separado por letras ou palavras. Há coarticulação, velocidade variável, pausas ambíguas e ruído. O modelo precisa inferir alinhamento temporal ao mesmo tempo em que entende conteúdo linguístico.",
      "Isso torna ASR um problema híbrido entre percepção e modelagem de sequência.",
    ], [
      { type: "insight", title: "Texto é discreto, fala não", body: "ASR precisa transformar um fluxo contínuo em uma sequência de símbolos. Essa discretização é parte do desafio, não mero detalhe." },
    ]),
    s("self-supervised", "Pré-treino", "wav2vec 2.0 e o salto do autosupervisionado em fala", "Modelos modernos aprenderam muito antes mesmo de ver transcrições humanas detalhadas.", undefined, "chunk-latency-lab", [
      "O pré-treino autosupervisionado em fala explora uma ideia parecida com outras áreas da IA: usar grandes volumes de dados crus para aprender estrutura antes da supervisão final. wav2vec 2.0 tornou essa visão particularmente influente.",
      "Ao aprender representações acústicas úteis sem depender de transcrição em cada exemplo, o modelo desenvolve sensibilidade a regularidades fonéticas, temporais e contextuais. Depois, com pouca supervisão rotulada, consegue adaptar-se melhor a tarefas de ASR.",
      "Esse movimento foi importante porque transcrever fala é caro, enquanto gravar áudio é relativamente abundante.",
    ], [
      { type: "insight", title: "Áudio cru também tem estrutura aprendível", body: "Mesmo sem legenda textual, o sinal de fala carrega regularidades temporais que o modelo pode explorar no pré-treino." },
    ]),
    s("whisper", "Robustez", "Whisper popularizou ASR robusto em escala ampla", "Escala de dados fracos e diversidade linguística ajudaram a tornar o reconhecimento mais resistente em cenário real.", "comparison", "chunk-latency-lab", [
      "Whisper ganhou atenção porque mostrou robustez relativamente forte a sotaques, ruído, diferentes condições de gravação e múltiplos idiomas quando comparado a muitas gerações anteriores de ASR aberto. A estratégia central foi usar supervisão fraca em larga escala e um encoder-decoder treinado para transcrever ou traduzir fala.",
      "O resultado prático foi importante: ASR deixou de ser uma tecnologia que só funcionava bem em áudio limpo e passou a operar melhor em gravações imperfeitas, vídeos, entrevistas e contextos reais mais variados. Ainda assim, essa robustez não é uniforme entre idiomas, domínios e estilos de fala.",
      "Isso não significa perfeição. Nomes próprios raros, mistura de línguas, sobreposição de vozes, fala muito espontânea e áudio degradado continuam produzindo erros relevantes. O salto de robustez foi marcante, mas não elimina a necessidade de avaliação por domínio e por idioma.",
    ], [
      { type: "example", title: "Robustez contextual", body: "Um modelo robusto consegue manter boa transcrição mesmo quando o áudio traz ruído de fundo ou captação imperfeita." },
    ]),
    s("latencia-streaming", "Tempo real", "Chunking, streaming e latência mudam o desenho do sistema", "Reconhecer fala offline inteira é diferente de responder enquanto a pessoa ainda está falando.", "tradeoff", "chunk-latency-lab", [
      "Em streaming, o sistema não pode esperar o fim da frase inteira para decidir. Ele precisa emitir hipóteses parciais com baixa latência, sabendo que parte do contexto futuro ainda não chegou.",
      "Isso cria um compromisso entre atraso e precisão. Janelas maiores capturam mais contexto e tendem a errar menos. Janelas menores respondem mais rápido, mas correm mais risco de ambiguidade e revisões posteriores.",
      "Esse trade-off é central em assistentes de voz, legendagem ao vivo e agentes conversacionais falados.",
    ], [
      { type: "mistake", title: "O melhor WER nem sempre dá a melhor UX", body: "Um sistema extremamente preciso, mas lento, pode ser pior para conversa em tempo real do que um pouco menos preciso e muito mais responsivo." },
    ]),
    s("tts-pipeline", "Síntese", "TTS: do texto à voz passando por representações intermediárias", "Síntese moderna costuma separar conteúdo linguístico, prosódia e waveform final.", "comparison", "tts-scenarios", [
      "Em muitos pipelines neurais, o texto primeiro vira uma representação acústica intermediária, como mel spectrograma. Depois, um vocoder converte essa representação em waveform audível. Tacotron 2 tornou esse desenho muito influente.",
      "A vantagem dessa decomposição é que ela separa parte do problema. Um módulo aprende o que dizer e como distribuir isso no tempo; outro aprende como soar natural ao gerar a onda final.",
      "Isso ajuda a modular naturalidade, voz, ritmo e qualidade final de forma mais controlável do que sistemas antigos baseados em concatenação rígida de unidades.",
    ], [
      { type: "definition", title: "Mel spectrograma", body: "Representação acústica frequentemente usada como ponte entre texto processado e waveform sintetizada." },
    ]),
    s("prosodia-vocoder", "Naturalidade", "Entonação, duração e vocoder decidem se a voz soa humana ou mecânica", "Uma transcrição correta falada de forma plana ainda pode soar artificial e cansativa.", undefined, "tts-scenarios", [
      "Prosódia organiza pausas, ênfase, melodia e ritmo. Dois sistemas podem dizer exatamente as mesmas palavras, mas soar radicalmente diferentes dependendo de como distribuem energia e entonação ao longo da frase.",
      "O vocoder é o estágio que transforma a representação intermediária em áudio final. Trabalhos como HiFi-GAN mostraram que rapidez e alta fidelidade podem coexistir melhor do que nas gerações anteriores de vocoders neurais.",
      "Em aplicações de leitura longa, atendimento ou acessibilidade, naturalidade não é luxo: ela afeta compreensão, fadiga e confiança do usuário.",
    ], [
      { type: "insight", title: "Boa voz não é só pronúncia", body: "Naturalidade emerge de prosódia, timbre, continuidade e ausência de artefatos, não apenas de palavras corretas." },
    ]),
    s("avaliacao", "Métricas", "Transcrição correta e voz natural pedem critérios diferentes", "ASR e TTS não podem ser julgados pela mesma régua.", "checklist", undefined, [
      "ASR costuma ser avaliado por erro de palavra, erro de caractere e robustez sob diferentes condições acústicas. Mas WER e CER dependem de normalização, tokenização, idioma, convenções de pontuação e unidade de escrita; por isso, comparar números crus entre benchmarks ou línguas diferentes exige cuidado.",
      "TTS, por outro lado, depende muito de avaliação perceptual: naturalidade, inteligibilidade, timbre, prosódia e fluidez. Protocolos subjetivos como MOS ajudam, mas também variam com instrução ao avaliador, amostragem e contexto de uso.",
      "Métricas automáticas ajudam, mas não substituem julgamento humano em síntese. Uma voz pode ter poucas falhas técnicas e ainda soar estranha ou sem emoção. Em reconhecimento, uma pequena troca pode ser tolerável em captioning, mas crítica em comando por voz.",
      "O uso final define a métrica relevante. Fala é uma área em que 'acerto' sempre depende do contexto de aplicação.",
    ], [
      { type: "mistake", title: "Uma métrica única não resume tudo", body: "Baixo erro de palavra não garante boa latência nem comparabilidade entre idiomas; alta naturalidade não garante alinhamento perfeito ao texto." },
    ]),
    s("limites", "Limitações", "Ruído, sotaque, code-switching e sobreposição continuam difíceis", "Apesar do avanço, fala real ainda desafia modelos em vários níveis.", undefined, undefined, [
      "Sinais ruidosos, múltiplos falantes, vozes sobrepostas e code-switching entre idiomas continuam complicando ASR. Já no TTS, emoção, sotaque específico, controle fino de prosódia e estabilidade de longas leituras seguem sendo temas ativos.",
      "Também há questões éticas e de segurança. Clonagem de voz, spoofing e síntese convincente exigem mecanismos de responsabilidade, consentimento e autenticação.",
      "Como em outras áreas da IA, o sucesso impressionante em demos não elimina zonas duras no mundo real.",
    ], [
      { type: "insight", title: "Fala carrega identidade", body: "Ao contrário de muito texto, voz contém traços pessoais fortes. Isso amplia tanto o poder quanto o risco da tecnologia." },
    ]),
    s("aplicacoes", "Aplicações", "ASR e TTS já estruturam interfaces inteiras de software", "Assistentes, legendagem, acessibilidade e agentes de voz dependem dessa pilha.", undefined, undefined, [
      "ASR alimenta legendagem automática, busca em mídia, transcrição de reuniões, atendimento e interfaces por voz. TTS aparece em leitores de tela, navegação, agentes conversacionais e personalização de experiência.",
      "Quando combinadas, as duas tecnologias fecham o ciclo auditivo: ouvir usuários e responder em fala. Isso é central em assistentes conversacionais e dispositivos sem tela dominante.",
      "A qualidade do produto final, porém, depende da orquestração completa: VAD, latência, entendimento, voz sintetizada, turn-taking e mecanismos de fallback.",
    ], [
      { type: "example", title: "Agente de voz completo", body: "Capturar áudio, detectar fala, transcrever, interpretar intenção, planejar resposta e sintetizar voz de volta ao usuário." },
    ]),
    s("resumo", "Resumo", "O que precisa ficar na memória sobre ASR e TTS", "Consolide representação, robustez, latência e naturalidade antes do quiz.", undefined, "summary-cards", [
      "Revise como a fala liga sinal físico, linguagem e experiência perceptiva.",
    ], []),
    s("quiz", "Revisão", "Quiz de revisão", "Teste waveform, ASR, pré-treino, TTS, vocoders e latência.", undefined, "quiz", [
      "As perguntas visam conectar física do áudio, modelagem temporal e experiência prática.",
    ], []),
    s("glossario", "Glossário", "Termos essenciais", "Feche a aula consolidando o vocabulário de áudio e fala.", undefined, "glossary", [
      "Esses termos aparecem em papers, bibliotecas e sistemas de voz atuais.",
    ], []),
  ],
  summaryCards: [
    { title: "Fala é sinal temporal contínuo", body: "Diferente do texto, ela não chega discretizada; o modelo precisa inferir fronteiras e contexto." },
    { title: "Espectrogramas organizam o som", body: "Representações tempo-frequência ajudam a tornar padrões acústicos mais legíveis para a modelagem." },
    { title: "ASR transforma som em símbolos", body: "O sistema precisa resolver percepção acústica, alinhamento temporal e linguagem ao mesmo tempo." },
    { title: "Pré-treino autosupervisionado mudou o jogo", body: "Modelos como wav2vec 2.0 aprenderam muito a partir de áudio cru antes da supervisão textual." },
    { title: "Whisper popularizou robustez em larga escala", body: "Diversidade de dados fracos ajudou a melhorar bastante o reconhecimento em cenários reais." },
    { title: "TTS depende de prosódia e vocoder", body: "Uma fala sintetizada boa precisa soar natural, não apenas pronunciar palavras corretamente." },
  ],
  quiz: [
    q("q1", "Qual diferença torna fala um problema especial em relação ao texto?", "A fala é um sinal contínuo no tempo e não vem segmentada em palavras prontas.", "A fala sempre tem menos ruído que o texto.", "A fala não pode ser representada numericamente.", "a", "ASR precisa discretizar e alinhar um fluxo contínuo de som em símbolos linguísticos."),
    q("q2", "Para que serve um espectrograma?", "Organizar energia acústica ao longo do tempo e da frequência.", "Traduzir automaticamente áudio para outro idioma.", "Remover qualquer necessidade de encoder neural.", "a", "O espectrograma é uma representação tempo-frequência muito útil para raciocinar sobre padrões sonoros."),
    q("q3", "O que modelos como wav2vec 2.0 mostraram?", "Que é possível aprender representações úteis de fala antes de ver transcrições completas.", "Que ASR não precisa mais de dados de áudio.", "Que TTS e ASR são exatamente o mesmo problema.", "a", "Pré-treino autosupervisionado em fala reduziu dependência de anotações totalmente rotuladas."),
    q("q4", "Por que Whisper se tornou tão influente?", "Porque combinou escala e diversidade de dados para ASR robusto em muitos cenários reais.", "Porque gera voz sintetizada sem vocoder.", "Porque só funciona com áudio perfeitamente limpo.", "a", "Seu impacto veio da robustez prática a ruído, sotaques e múltiplos idiomas."),
    q("q5", "Qual trade-off é central em streaming ASR?", "Baixa latência versus maior contexto acústico e linguístico.", "Espectrograma versus waveform, sem relação com UX.", "Mais memória RAM versus mais volume do alto-falante.", "a", "Janelas maiores ajudam a precisão; janelas menores ajudam resposta rápida."),
    q("q6", "Qual é o papel do vocoder em TTS?", "Transformar uma representação acústica intermediária em waveform final audível.", "Converter texto em embeddings linguísticos.", "Decidir qual idioma será falado.", "a", "O vocoder é peça central para naturalidade e fidelidade final da fala sintetizada."),
    q("q7", "Por que uma voz sintetizada pode soar ruim mesmo com palavras corretas?", "Porque naturalidade depende também de prosódia, ritmo, entonação e ausência de artefatos.", "Porque TTS sempre exige sotaque humano específico.", "Porque toda síntese falha em frases longas por definição.", "a", "Pronúncia correta não basta; a experiência auditiva depende de muitos aspectos perceptuais."),
    q("q8", "Qual afirmação sobre avaliação de ASR e TTS é mais adequada?", "ASR e TTS exigem métricas diferentes, e avaliação humana continua importante em síntese.", "Uma única métrica automática resume perfeitamente as duas tarefas.", "TTS pode ser avaliado apenas por erro de palavra.", "a", "Transcrição correta e naturalidade vocal são objetivos diferentes e pedem critérios próprios."),
  ],
  glossary: [
    g("Waveform", "Representação bruta do sinal de áudio no domínio do tempo."),
    g("Espectrograma", "Representação tempo-frequência da energia do sinal."),
    g("ASR", "Reconhecimento automático de fala em texto."),
    g("TTS", "Síntese de fala a partir de texto."),
    g("wav2vec 2.0", "Modelo de pré-treino autosupervisionado para representações de fala."),
    g("Whisper", "Modelo de ASR robusto em larga escala da OpenAI."),
    g("Tacotron 2", "Arquitetura influente de TTS neural com mel spectrograma e vocoder."),
    g("Vocoder", "Módulo que converte uma representação acústica intermediária em waveform."),
    g("Prosódia", "Ritmo, entonação, pausa e melodia da fala."),
    g("Streaming", "Processamento de áudio em tempo real, sem esperar o fim do sinal completo."),
    g("Code-switching", "Alternância entre idiomas na mesma fala."),
    g("WER", "Word Error Rate, métrica clássica de erro de palavras em ASR."),
  ],
};

function s(
  id: string,
  eyebrow: string,
  title: string,
  lead: string,
  visual: string | undefined,
  interactive: string | undefined,
  paragraphs: string[],
  blocks: LessonContent["sections"][number]["blocks"],
) {
  return { id, eyebrow, title, lead, visual, interactive, paragraphs, blocks };
}

function q(
  id: string,
  prompt: string,
  a: string,
  b: string,
  c: string,
  correctOptionId: string,
  feedback: string,
) {
  return {
    id,
    prompt,
    options: [
      { id: "a", label: a },
      { id: "b", label: b },
      { id: "c", label: c },
    ],
    correctOptionId,
    feedback,
  };
}

function g(term: string, definition: string) {
  return { term, definition };
}
