import type { LessonContent } from "../../../types/content";

export const bitsBytesRepresentacaoDadosContent: LessonContent = {
  id: "bits-bytes-representacao-dados",
  title: "Bits, Bytes e Representação de Dados",
  subtitle:
    "O computador não entende texto, imagens ou números do jeito que nós entendemos: ele manipula padrões de bits e depende de convenções para dar sentido a eles.",
  description:
    "Uma aula visual sobre base binária, bytes, inteiros com e sem sinal, texto em UTF-8, ponto flutuante, endianness e por que o mesmo padrão de bits pode significar coisas diferentes.",
  primaryCategoryId: "computacao",
  secondaryCategoryId: "matematica",
  level: "Iniciante",
  estimatedTime: "45-55 min",
  tags: ["Bits", "Bytes", "Binário", "Hexadecimal", "UTF-8", "IEEE 754", "Endianness"],
  learningObjectives: [
    "Entender por que toda informação digital pode ser reduzida a bits.",
    "Relacionar bit, byte, palavra, hexadecimal e capacidade de representação.",
    "Explicar como inteiros com e sem sinal ocupam os mesmos bits com interpretações diferentes.",
    "Entender por que texto depende de codificação e o papel do UTF-8.",
    "Reconhecer os limites de representação de ponto flutuante e a origem de erros como 0.1 + 0.2.",
    "Visualizar o papel da endianness ao armazenar bytes em memória.",
  ],
  prerequisites: [
    "Aritmética básica.",
    "Curiosidade sobre como dados são armazenados.",
    "Não é necessário saber programar, mas exemplos de código ajudam.",
  ],
  references: [
    {
      title: "Computer Systems: A Programmer's Perspective",
      source: "Bryant e O'Hallaron — Carnegie Mellon University",
      url: "https://csapp.cs.cmu.edu/",
      note:
        "Referência clássica para representação de dados, memória e relação entre software e hardware.",
    },
    {
      title: "Computation Structures",
      source: "MIT OpenCourseWare — 6.004",
      url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/",
      note:
        "Curso aberto do MIT sobre lógica digital, arquitetura e representação binária.",
    },
    {
      title: "Nand to Tetris",
      source: "Nisan e Schocken — site oficial",
      url: "https://www.nand2tetris.org/",
      note:
        "Constrói os fundamentos do computador do bit até software, com forte intuição sobre codificação.",
    },
    {
      title: "RFC 3629 — UTF-8",
      source: "RFC Editor / IETF",
      url: "https://www.rfc-editor.org/rfc/rfc3629.html",
      note:
        "Especificação oficial do UTF-8, importante para entender representação de texto.",
    },
    {
      title: "Floating-Point Arithmetic: Issues and Limitations",
      source: "Python Documentation",
      url: "https://docs.python.org/3/tutorial/floatingpoint.html",
      note:
        "Explica de forma acessível por que certos decimais não são representados exatamente em binário.",
    },
    {
      title: "Number",
      source: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
      note:
        "Mostra como ambientes modernos expõem números de ponto flutuante IEEE 754 no dia a dia.",
    },
  ],
  heroVisual: "bits-bytes-hero",
  openingText:
    "Quando você abre um PDF, manda um emoji ou soma dois números em uma planilha, a máquina não vê 'documento', 'emoji' ou 'número decimal'. Ela vê estados físicos que abstraímos como 0 e 1. A mágica da computação está em usar pouquíssimos símbolos para representar praticamente qualquer coisa. A dificuldade — e a beleza — está em lembrar que os bits não trazem significado embutido. O significado nasce de acordos: esta sequência é um inteiro, aquela é texto UTF-8, outra é um float, outra é um pixel.",
  quickFacts: [
    { title: "Bit é escolha mínima", body: "Um bit distingue entre dois estados possíveis: 0 ou 1." },
    { title: "Byte é bloco prático", body: "O byte virou unidade comum para agrupar 8 bits e endereçar memória." },
    { title: "Mesmo bit, outro sentido", body: "01000001 pode ser 65, a letra A ou parte de outra estrutura." },
    { title: "Representar não é o mesmo que entender", body: "Todo dado digital precisa de uma interpretação combinada por software e hardware." },
  ],
  sections: [
    s(
      "bit-base",
      "Fundação",
      "Por que tudo começa em 0 e 1",
      "Bits são a forma mais econômica de representar diferenças confiáveis em hardware.",
      "bit-foundation",
      "binary-converter",
      [
        "Circuitos eletrônicos trabalham bem distinguindo estados físicos como ligado/desligado, tensão alta/baixa ou carga/pouca carga. A abstração 0 e 1 nasce dessa robustez: é muito mais fácil detectar dois estados com segurança do que dezenas de estados intermediários.",
        "Isso não significa que o universo 'é binário'. Significa apenas que, para construir máquinas confiáveis, escolhemos uma linguagem mínima de dois símbolos. A partir dela, compomos números, texto, cor, áudio e instruções.",
        "O ponto crucial é que bit sozinho não significa nada além de uma distinção. O poder aparece quando vários bits são agrupados e interpretados por uma regra.",
      ],
      [
        { type: "definition", title: "Bit", body: "A menor unidade de informação digital, capaz de assumir dois valores possíveis: 0 ou 1." },
        { type: "insight", title: "Robustez antes de elegância", body: "O binário venceu porque hardware detecta melhor dois estados distantes do que muitos estados próximos." },
      ],
    ),
    s(
      "bytes-e-bases",
      "Leitura",
      "Byte, hexadecimal e agrupamento",
      "Um único bit representa pouco; bytes e notação hexadecimal tornam os padrões utilizáveis por humanos e máquinas.",
      "byte-hex-grid",
      undefined,
      [
        "O byte, com 8 bits, permite 256 combinações possíveis. Isso foi suficiente para vários padrões iniciais de texto e continua sendo a unidade prática mais usada em endereçamento, protocolos e formatos de arquivo.",
        "Como escrever longas sequências binárias é cansativo, usamos hexadecimal. Cada dígito hexadecimal representa exatamente 4 bits, então um byte cabe em dois dígitos: 11111111 vira FF e 00101101 vira 2D.",
        "Esse agrupamento não muda o dado; muda apenas nossa maneira de lê-lo. Binário, hexadecimal e decimal podem apontar para o mesmo padrão, desde que a interpretação seja consistente.",
      ],
      [
        { type: "example", title: "Um byte em três notações", body: "00101101 em binário é 45 em decimal e 2D em hexadecimal." },
        { type: "mistake", title: "Confundir unidade com significado", body: "Dois bytes podem ser um número, duas letras, parte de uma imagem ou metade de uma instrução — depende do contexto." },
      ],
    ),
    s(
      "inteiros",
      "Números",
      "Como inteiros cabem em bits",
      "Os mesmos bits podem representar valores muito diferentes dependendo de haver ou não sinal.",
      "signed-unsigned-visual",
      "signed-range-playground",
      [
        "Em inteiros sem sinal, todos os bits contribuem para a magnitude. Com 8 bits, representamos de 0 a 255. Em inteiros com sinal, normalmente usamos complemento de dois, que reserva padrões para números negativos sem precisar de um bit separado 'desconectado' da soma.",
        "No complemento de dois, o bit mais significativo influencia o sinal, mas o verdadeiro ganho é operacional: a mesma lógica de soma pode trabalhar tanto com positivos quanto com negativos. Isso simplifica o hardware.",
        "O preço é que metade dos padrões vai para negativos. Com 8 bits assinados, o intervalo vira -128 a 127. Overflow não é 'número maior'; é interpretação estourando o espaço disponível.",
      ],
      [
        { type: "definition", title: "Complemento de dois", body: "Sistema mais usado para representar inteiros com sinal, permitindo somar positivos e negativos com a mesma lógica básica." },
        { type: "example", title: "11111111", body: "Sem sinal vale 255; com complemento de dois, vale -1." },
        { type: "mistake", title: "Achar que o bit mais significativo 'é só o sinal'", body: "Em complemento de dois, ele participa da representação inteira, não é um marcador isolado." },
      ],
    ),
    s(
      "texto",
      "Texto",
      "Letras também são números",
      "Para o computador, texto é uma sequência de códigos; para nós, o desafio é escolher uma codificação que sirva a muitos idiomas.",
      "utf8-visual",
      undefined,
      [
        "ASCII foi um passo importante porque associou letras, dígitos e símbolos a números. Mas ele não cobre adequadamente o mundo real: acentos, alfabetos diversos e emoji exigem algo mais flexível.",
        "UTF-8 se tornou dominante porque preserva compatibilidade com ASCII nos primeiros 128 códigos e usa múltiplos bytes quando precisa representar caracteres além desse conjunto. Isso o torna eficiente para textos centrados em inglês e abrangente para o restante.",
        "A unidade 'caractere' também engana. Um caractere visível pode ocupar mais de um byte e, em alguns casos, mais de um code point. Por isso tamanho em bytes nem sempre coincide com quantidade de símbolos percebidos por uma pessoa.",
      ],
      [
        { type: "definition", title: "Codificação de texto", body: "Convenção que mapeia caracteres para sequências de bytes." },
        { type: "insight", title: "UTF-8 é compatibilidade com expansão", body: "Ele mantém ASCII intacto e cresce só quando o caractere exige mais informação." },
        { type: "mistake", title: "Assumir que 1 caractere = 1 byte", body: "Isso falha com acentos, ideogramas e emoji em UTF-8." },
      ],
    ),
    s(
      "float",
      "Números Reais",
      "Ponto flutuante: aproximações organizadas",
      "Para representar intervalos gigantes com poucos bits, sacrificamos exatidão decimal e passamos a trabalhar com aproximações binárias.",
      "float-layout",
      "float-bits-lab",
      [
        "Ponto flutuante separa sinal, expoente e significando. Em vez de guardar todos os dígitos de um número decimal, ele guarda uma forma normalizada em base 2. Isso permite cobrir números muito grandes e muito pequenos com custo fixo.",
        "O problema é que muitos decimais simples para nós, como 0.1, não têm expansão binária finita. O resultado é que a máquina armazena o valor mais próximo que cabe no formato. Daí surgem surpresas como 0.1 + 0.2 resultar em algo ligeiramente diferente de 0.3.",
        "Isso não é defeito aleatório. É consequência da escolha de representação. Em computação científica, finanças e gráficos, entender essa limitação evita bugs conceituais e expectativas erradas sobre igualdade exata.",
      ],
      [
        { type: "definition", title: "Ponto flutuante", body: "Formato numérico que usa sinal, expoente e significando para representar uma ampla faixa de valores aproximados." },
        { type: "insight", title: "A máquina erra de forma previsível", body: "Os erros de arredondamento não são caos; eles seguem regras do formato usado." },
        { type: "example", title: "0.1 em binário", body: "Assim como 1/3 em decimal é infinito, 0.1 em binário também não termina." },
      ],
    ),
    s(
      "endianness",
      "Memória",
      "Quando vários bytes viram um valor",
      "Armazenar um número de vários bytes exige decidir em que ordem os bytes serão colocados na memória.",
      "endianness-visual",
      undefined,
      [
        "Se um inteiro ocupa quatro bytes, precisamos escolher qual byte vai primeiro no endereço menor. Em little-endian, o byte menos significativo vem antes. Em big-endian, o mais significativo vem antes.",
        "Isso não altera o valor abstrato do número; altera a disposição física dos bytes. Problemas aparecem quando sistemas trocam dados sem concordar nessa ordem ou quando alguém lê memória byte a byte sem considerar o formato.",
        "Protocolos de rede, formatos binários e debugging de baixo nível dependem muito dessa distinção. Por isso endianness é menos um detalhe esotérico e mais uma regra de interoperabilidade.",
      ],
      [
        { type: "definition", title: "Endianness", body: "Convenção que define a ordem dos bytes de um valor multibyte na memória." },
        { type: "example", title: "0x12345678", body: "Em little-endian, os bytes aparecem como 78 56 34 12; em big-endian, 12 34 56 78." },
        { type: "mistake", title: "Pensar que little-endian 'inverte o número'", body: "O valor não muda; muda apenas a ordem de armazenamento dos bytes." },
      ],
    ),
    s(
      "mesmo-padrao-outro-significado",
      "Síntese",
      "O mesmo padrão de bits pode ser várias coisas",
      "Bits não carregam semântica sozinhos; software, hardware e formatos é que atribuem interpretação.",
      "same-bits-many-meanings",
      undefined,
      [
        "Uma sequência como 01000001 pode ser o número 65, a letra A em ASCII, parte de um pixel ou um pedaço de instrução. Nada no bit sozinho revela isso. Quem decide é o contexto.",
        "Essa ideia é essencial para entender arquivos corrompidos, bugs de serialização, casts perigosos e vulnerabilidades: muitas falhas surgem quando duas camadas discordam sobre o que um conjunto de bytes significa.",
        "Toda computação de sistemas reais é, em algum nível, negociação de interpretação. É por isso que tipos, esquemas, protocolos e formatos importam tanto.",
      ],
      [
        { type: "insight", title: "Representação é contrato", body: "Sempre que duas partes trocam dados, elas precisam concordar sobre como ler os mesmos bits." },
      ],
    ),
    s(
      "quiz-revisao",
      "Revisão",
      "Quiz de revisão",
      "Teste se as ideias de base, codificação e interpretação ficaram conectadas.",
      undefined,
      "quiz",
      ["Use o quiz para revisar como bits, bytes, números, texto e memória dependem de convenções."],
      [],
    ),
    s(
      "glossario",
      "Glossário",
      "Termos essenciais",
      "Feche a aula consolidando o vocabulário que reaparecerá nas próximas aulas da trilha.",
      undefined,
      "glossary",
      ["CPU, memória, cache e sistemas operacionais dependem fortemente destas ideias de representação."],
      [],
    ),
  ],
  summaryCards: [
    { title: "Bit distingue estados", body: "Ele é a unidade mínima que hardware manipula com robustez." },
    { title: "Byte organiza leitura", body: "O agrupamento de 8 bits tornou armazenamento e troca de dados mais práticos." },
    { title: "Inteiros dependem da convenção", body: "Sem sinal e complemento de dois usam os mesmos bits de jeitos diferentes." },
    { title: "Texto precisa de codificação", body: "UTF-8 é um contrato para mapear caracteres em bytes." },
    { title: "Float é aproximação", body: "Grande alcance numérico vem com custo de arredondamento." },
    { title: "Endianness é ordem", body: "Valores multibyte exigem combinar como os bytes ocupam a memória." },
  ],
  quiz: [
    q("q1", "Qual é a principal vantagem prática de representar dados em binário no hardware?", "Distinguir dois estados físicos com mais confiabilidade.", "Economizar energia em qualquer circuito automaticamente.", "Evitar toda forma de erro numérico.", "a", "Dois estados bem separados são mais robustos para detectar e manter em circuitos digitais."),
    q("q2", "Um byte de 8 bits permite quantas combinações diferentes?", "256.", "128.", "512.", "a", "São 2^8 combinações possíveis, totalizando 256 padrões."),
    q("q3", "Qual é a relação mais útil entre binário e hexadecimal?", "Cada dígito hexadecimal representa 4 bits.", "Cada dígito hexadecimal representa 8 bits.", "Hexadecimal é apenas decimal com letras.", "a", "Por isso dois dígitos hex representam exatamente um byte."),
    q("q4", "O padrão 11111111 interpretado como inteiro com sinal em complemento de dois vale:", "-1.", "255.", "128.", "a", "Em 8 bits com complemento de dois, 11111111 representa -1."),
    q("q5", "Por que UTF-8 é tão usado?", "Porque é compatível com ASCII e suporta caracteres de muitos idiomas.", "Porque garante 1 byte por caractere.", "Porque elimina a necessidade de code points.", "a", "UTF-8 preserva o ASCII nos primeiros códigos e expande quando necessário."),
    q("q6", "Por que 0.1 pode causar surpresa em programas?", "Porque muitos decimais não têm representação binária finita em ponto flutuante.", "Porque CPUs não sabem somar números pequenos.", "Porque floats armazenam números como texto.", "a", "O formato guarda a aproximação binária mais próxima, não o decimal exato."),
    q("q7", "O que endianness define?", "A ordem dos bytes de um valor multibyte na memória.", "A velocidade máxima da memória RAM.", "Se um número é inteiro ou float.", "a", "Endianness trata da ordem física dos bytes, não do valor em si."),
    q("q8", "O que melhor resume a relação entre bits e significado?", "Bits não têm semântica própria; a interpretação vem do contexto.", "Cada padrão de bits possui um único significado universal.", "Só texto depende de interpretação; números não.", "a", "O mesmo padrão pode ser número, letra, pixel ou instrução dependendo do contrato usado."),
  ],
  glossary: [
    g("Bit", "Menor unidade de informação digital, com dois valores possíveis."),
    g("Byte", "Agrupamento de 8 bits usado como unidade prática de armazenamento e endereçamento."),
    g("Binário", "Sistema de numeração em base 2."),
    g("Hexadecimal", "Sistema em base 16, útil para compactar leitura de padrões binários."),
    g("Complemento de dois", "Forma padrão de representar inteiros com sinal em hardware moderno."),
    g("Overflow", "Situação em que o resultado pretendido não cabe no número de bits disponível."),
    g("ASCII", "Padrão histórico de codificação de texto para um conjunto básico de caracteres."),
    g("UTF-8", "Codificação de texto de tamanho variável compatível com ASCII e amplamente usada na web."),
    g("Ponto flutuante", "Formato numérico aproximado que usa sinal, expoente e significando."),
    g("Significando", "Parte do ponto flutuante que carrega os dígitos relevantes do valor."),
    g("Endianness", "Convenção de ordem de bytes para valores multibyte."),
    g("Code point", "Identificador abstrato de um caractere em um padrão como Unicode."),
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
