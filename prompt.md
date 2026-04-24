Você é um agente de IA especialista em desenvolvimento web, design educacional, UX/UI, conteúdo didático e visualização interativa.

Crie um site de estudo interativo, claro, bonito e expansível.

O projeto deve começar com um conteúdo principal:

Tema inicial:
"Como Newton chegou ao cálculo diferencial e integral"

Mas o site deve ser estruturado para receber vários temas no futuro, organizados por categorias.

============================================================
OBJETIVO GERAL DO SITE
============================================================

Criar uma plataforma pessoal de estudo com conteúdos longos, visuais e interativos.

O site deve funcionar como uma mistura de:
- aula interativa;
- artigo visual;
- mapa de conhecimento;
- material de revisão;
- experiência de estudo guiada.

O objetivo não é ser apenas um blog.
O objetivo é ensinar assuntos complexos de forma progressiva, visual, agradável e memorável.

O primeiro conteúdo deve explicar, com profundidade, como Newton chegou ao cálculo diferencial e integral.

============================================================
REQUISITOS GERAIS
============================================================

1. Deve existir uma página inicial.
2. A página inicial deve listar todos os conteúdos do site por categoria.
3. Hoje só haverá um conteúdo principal, mas a estrutura precisa permitir adicionar novos conteúdos facilmente.
4. O conteúdo deve ser extremamente didático.
5. A interface deve ser clara, moderna, agradável e sem poluição visual.
6. Deve ter imagens, ilustrações ou diagramas.
7. Deve ter efeitos visuais interativos.
8. Deve ser responsivo para desktop e mobile.
9. Deve ser adequado para estudo longo.
10. Deve ter navegação clara entre seções.
11. Deve ter sumário lateral ou sumário fixo no topo.
12. Deve ter blocos de definição, exemplos, erros comuns, perguntas de revisão e resumo.
13. Deve ter uma estética calma, elegante e focada em aprendizado.

============================================================
STACK SUGERIDA
============================================================

Use uma stack moderna e simples.

Preferência:
- React
- TypeScript
- Vite ou Next.js
- Tailwind CSS
- Framer Motion para animações
- Lucide React para ícones
- Recharts ou SVG puro para gráficos simples
- Componentização clara

Caso use Next.js:
- App Router
- páginas organizadas em /app
- componentes em /components
- dados dos conteúdos em /data ou /content

Caso use Vite:
- React Router
- componentes em /components
- dados dos conteúdos em /data

A prioridade é clareza e facilidade de expansão.

============================================================
ESTRUTURA DO SITE
============================================================

O site deve ter pelo menos:

1. Página inicial
2. Página de categoria
3. Página de conteúdo/aula
4. Componentes reutilizáveis

============================================================
PÁGINA INICIAL
============================================================

A página inicial deve ter:

1. Hero section
   Título:
   "Mapa de Estudos Interativos"

   Subtítulo:
   "Conteúdos visuais, progressivos e interativos para estudar temas complexos com profundidade."

2. Barra de busca
   Permitir pesquisar conteúdos por título, categoria ou tag.

3. Lista de categorias
   Exemplo inicial:
   - Matemática
   - Física
   - Computação
   - História da Ciência
   - Filosofia
   - Engenharia

4. Cards de conteúdos
   O primeiro card deve ser:
   Título:
   "Como Newton chegou ao cálculo diferencial e integral"

   Categoria:
   Matemática / História da Ciência

   Descrição:
   "Uma jornada visual pela origem do cálculo: movimento, velocidade instantânea, áreas sob curvas, derivadas, integrais e o Teorema Fundamental do Cálculo."

   Tags:
   Newton, Cálculo, Derivada, Integral, História da Ciência, Física

   Nível:
   Intermediário

   Tempo estimado:
   35–50 min

5. Seção "Como estudar por aqui"
   Explicar que cada conteúdo possui:
   - visão geral
   - explicação progressiva
   - diagramas
   - interações
   - revisão
   - perguntas

6. Design da home
   - fundo claro ou levemente escuro com contraste confortável
   - cards com bordas arredondadas
   - sombras suaves
   - cores por categoria
   - animações sutis ao passar o mouse
   - layout em grid

============================================================
PÁGINA DE CONTEÚDO
============================================================

A página sobre Newton e o cálculo deve ser longa, estruturada e interativa.

Título:
"Como Newton chegou ao cálculo diferencial e integral"

Subtítulo:
"Como a tentativa de entender movimento, gravidade e mudança contínua levou ao nascimento de uma das ferramentas mais importantes da matemática."

A página deve ter:

1. Sumário navegável
2. Indicador de progresso de leitura
3. Seções com âncoras
4. Diagramas interativos
5. Blocos de definição
6. Blocos de exemplo
7. Blocos de erro comum
8. Perguntas de revisão
9. Resumo final
10. Glossário
11. Linha do tempo
12. Comparação Newton vs Leibniz

============================================================
ESTILO VISUAL DO CONTEÚDO
============================================================

A interface deve parecer um "site de estudo premium".

Direção visual:
- clara
- espaçosa
- moderna
- com boa tipografia
- foco em leitura
- sem excesso de elementos piscando
- animações suaves
- diagramas elegantes

Paleta sugerida:
- fundo principal: #F8FAFC ou #FAFAF9
- texto principal: #111827
- texto secundário: #475569
- azul para contexto/problema
- laranja para derivada
- verde para integral
- roxo para conexão/teorema fundamental
- vermelho suave para erros comuns
- amarelo suave para observações

Tipos de blocos:
- Definição: azul claro
- Exemplo: verde claro
- Erro comum: vermelho claro
- Insight: roxo claro
- Revisão: amarelo claro

============================================================
EFEITOS VISUAIS E INTERAÇÕES
============================================================

Adicionar interações úteis, não apenas decorativas.

Sugestões obrigatórias:

1. Progress bar de leitura
   Uma barra no topo indicando quanto da aula foi lido.

2. Sumário lateral sticky
   No desktop, mostrar seções da aula e destacar a seção atual.

3. Cards expansíveis
   Para definições, curiosidades e erros comuns.

4. Animação de secante virando tangente
   Na seção de derivada:
   - mostrar uma curva
   - dois pontos na curva
   - uma reta secante
   - controle deslizante que aproxima os pontos
   - quando os pontos se aproximam, a secante deve se parecer com uma tangente
   - mostrar o texto:
     "Quando o intervalo tende a zero, a taxa média se aproxima da taxa instantânea."

5. Visualização da integral por retângulos
   Na seção de integral:
   - mostrar uma curva
   - mostrar retângulos abaixo da curva
   - controle para aumentar o número de retângulos
   - quanto mais retângulos, melhor a aproximação da área
   - mostrar o texto:
     "A integral nasce da soma de partes cada vez menores."

6. Diagrama derivada ↔ integral
   Na seção do Teorema Fundamental:
   - duas caixas grandes: Derivar e Integrar
   - seta dupla animada entre elas
   - ao clicar em cada uma, mostrar:
     Derivar: "descobre como algo muda"
     Integrar: "descobre quanto algo acumulou"

7. Linha do tempo interativa
   Incluir eventos:
   - matemática clássica e geometria antiga
   - Galileu e estudo do movimento
   - Kepler e órbitas planetárias
   - Newton e os anos de 1665–1666
   - publicação do Principia em 1687
   - Leibniz e a notação moderna

8. Quiz de revisão
   Ao final, criar perguntas de múltipla escolha.
   Mostrar feedback imediato.

9. Glossário interativo
   Termos clicáveis ou cards:
   - derivada
   - integral
   - limite
   - tangente
   - secante
   - taxa de variação
   - acumulação
   - fluxão
   - fluente
   - Teorema Fundamental do Cálculo

============================================================
IMAGENS E ILUSTRAÇÕES
============================================================

O site deve conter imagens ou ilustrações.

Não usar imagens aleatórias sem função pedagógica.

Imagens/ilustrações necessárias:
1. Retrato ou ilustração de Isaac Newton
2. Ilustração de um planeta em órbita
3. Ilustração de um objeto caindo
4. Diagrama de curva com reta secante
5. Diagrama de curva com reta tangente
6. Diagrama de área sob a curva
7. Ilustração comparando Newton e Leibniz
8. Linha do tempo visual

Pode usar:
- SVG inline
- ilustrações vetoriais geradas no próprio código
- imagens em /public/images
- placeholders elegantes caso não existam imagens reais

Caso não tenha imagens externas, criar ilustrações simples em SVG.
Priorizar SVGs próprios para evitar problemas de licença.

============================================================
CONTEÚDO EXTREMAMENTE DETALHADO DA AULA
============================================================

A aula deve ser escrita em português do Brasil, com tom claro, didático e progressivo.

Não escrever como texto acadêmico pesado.
Não escrever como autoajuda.
O tom deve ser:
- inteligente
- acessível
- preciso
- visual
- explicativo
- com bons exemplos

A aula deve ter as seguintes seções:

------------------------------------------------------------
SEÇÃO 1 — Introdução
------------------------------------------------------------

Título:
"Newton não começou com fórmulas"

Ideia central:
Newton chegou ao cálculo porque precisava resolver problemas concretos de movimento, gravidade e mudança contínua.

Texto a desenvolver:
Explicar que o cálculo não nasceu como um conjunto de regras mecânicas, mas como uma nova linguagem para descrever o mundo em transformação. Antes de pensar em derivadas e integrais como símbolos, é preciso entender os problemas que exigiram essas ideias: velocidade instantânea, áreas sob curvas, órbitas e forças.

Incluir insight:
"O cálculo nasceu quando a matemática precisou parar de olhar apenas para formas prontas e começou a olhar para processos."

Visual:
Hero com Newton, uma curva, uma órbita e uma seta de movimento.

------------------------------------------------------------
SEÇÃO 2 — O problema histórico
------------------------------------------------------------

Título:
"A matemática antiga era poderosa, mas estática"

Desenvolver:
A geometria clássica era excelente para estudar formas como triângulos, círculos, proporções e áreas simples. Mas muitos problemas físicos não eram apenas formas paradas. Eram processos: um corpo caindo, um planeta orbitando, a velocidade mudando, uma quantidade se acumulando.

Explicar:
- o que a geometria conseguia fazer bem;
- onde ela encontrava limites;
- por que movimento contínuo era um problema conceitual;
- por que o tempo se tornou uma variável central.

Bloco de definição:
"Grandeza variável: uma quantidade que pode mudar ao longo do tempo ou em relação a outra quantidade."

Exemplos:
- posição de um objeto;
- velocidade de um carro;
- distância percorrida;
- área acumulada.

Visual:
Comparação lado a lado:
"formas estáticas" vs "processos dinâmicos".

------------------------------------------------------------
SEÇÃO 3 — O problema da velocidade instantânea
------------------------------------------------------------

Título:
"Como medir uma coisa que muda exatamente agora?"

Desenvolver:
Explicar a diferença entre velocidade média e velocidade instantânea.

Velocidade média:
Se um objeto percorre 100 metros em 10 segundos, sua velocidade média é 10 m/s. Mas isso não diz necessariamente sua velocidade em cada instante.

Problema:
Se a velocidade muda o tempo todo, como descobrir a velocidade em um momento exato?

Explicar:
A ideia é calcular a variação em intervalos cada vez menores:
- intervalo grande: aproximação grosseira;
- intervalo menor: aproximação melhor;
- intervalo tendendo a zero: velocidade instantânea.

Conectar com derivada:
Essa busca pela velocidade em um instante leva à ideia de derivada.

Bloco de definição:
"Derivada: taxa de variação instantânea de uma quantidade."

Visual interativo:
Secante virando tangente.

Texto de apoio:
"Uma reta secante mede uma variação média entre dois pontos. Quando esses pontos se aproximam, a secante tende a revelar a direção da curva em um único ponto: a tangente."

Fórmula:
f'(x) = lim h→0 [f(x+h) - f(x)] / h

Explicar a fórmula de forma intuitiva:
- f(x) é o valor atual;
- f(x+h) é o valor depois de um pequeno avanço;
- f(x+h) - f(x) é a variação;
- h é o intervalo;
- a fração é uma taxa média;
- o limite h→0 transforma essa taxa média em taxa instantânea.

------------------------------------------------------------
SEÇÃO 4 — A construção geométrica da derivada
------------------------------------------------------------

Título:
"Da secante à tangente"

Desenvolver:
Explicar com cuidado:
- uma curva representa uma quantidade variando;
- dois pontos da curva permitem calcular uma inclinação média;
- essa inclinação média é representada por uma reta secante;
- aproximar os pontos reduz o intervalo;
- no limite, a secante se torna tangente;
- a inclinação da tangente é a derivada naquele ponto.

Incluir analogia:
"É como tentar descobrir a direção exata de uma estrada curva em um ponto específico. Se você olha para um trecho longo da estrada, vê uma direção média. Se olha para um trecho cada vez menor, entende melhor a direção naquele ponto."

Interpretações da derivada:
- inclinação local;
- taxa de variação;
- velocidade instantânea;
- sensibilidade;
- tendência local.

Erro comum:
"Derivada não é apenas uma técnica algébrica. A técnica serve para calcular, mas o conceito é medir mudança instantânea."

Visual:
Diagrama com curva, dois pontos, secante, tangente e slider.

------------------------------------------------------------
SEÇÃO 5 — O problema da área sob curvas
------------------------------------------------------------

Título:
"Como somar algo que está espalhado continuamente?"

Desenvolver:
Explicar que outro problema importante era calcular áreas delimitadas por curvas e, mais profundamente, quantidades acumuladas continuamente.

Começar com área:
Um retângulo tem área simples.
Um triângulo tem fórmula.
Um círculo tem fórmula.
Mas e uma região irregular abaixo de uma curva?

Ideia:
Dividir a área em retângulos pequenos:
- poucos retângulos: aproximação ruim;
- muitos retângulos: aproximação melhor;
- retângulos infinitamente finos: aproximação ideal.

Conectar com integral:
A integral nasce como uma soma contínua de pequenas partes.

Bloco de definição:
"Integral: operação que representa acumulação contínua ou soma de infinitas contribuições pequenas."

Visual interativo:
Área sob curva com controle de número de retângulos.

------------------------------------------------------------
SEÇÃO 6 — A integral como acumulação
------------------------------------------------------------

Título:
"Integral não é só área"

Desenvolver:
Explicar que a área sob a curva é uma interpretação visual poderosa, mas a ideia mais geral da integral é acumulação.

Exemplos:
- velocidade acumulada ao longo do tempo gera distância;
- taxa de entrada de água acumulada gera volume total;
- força aplicada ao longo de um deslocamento gera trabalho;
- crescimento acumulado gera quantidade total.

Explicar:
Se a derivada pergunta "como isso está mudando?", a integral pergunta "quanto isso acumulou?".

Fórmula:
∫ f(x) dx

Explicar:
- o símbolo ∫ vem de uma ideia de soma;
- f(x) representa a quantidade sendo acumulada;
- dx representa pedaços muito pequenos da variável;
- a integral soma essas contribuições.

Erro comum:
"Integral não deve ser entendida apenas como uma fórmula para área. Área é uma porta de entrada para a ideia maior: acumulação."

------------------------------------------------------------
SEÇÃO 7 — O elo: derivada e integral são inversas
------------------------------------------------------------

Título:
"O golpe de gênio"

Desenvolver:
Explicar que a grande descoberta não foi apenas criar técnicas para derivar e integrar. A ideia mais profunda foi perceber que essas duas operações estavam conectadas.

Derivada:
Mostra como uma quantidade muda.

Integral:
Reconstrói quanto foi acumulado a partir das mudanças.

Frase central:
"Derivar desmonta a acumulação em taxa de mudança. Integrar reconstrói a acumulação a partir da taxa."

Explicar com movimento:
- se você tem posição, derivando encontra velocidade;
- se você tem velocidade, derivando encontra aceleração;
- se você tem aceleração, integrando encontra velocidade;
- se você tem velocidade, integrando encontra posição.

Fluxo visual:
posição → derivada → velocidade → derivada → aceleração
aceleração → integral → velocidade → integral → posição

Introduzir:
Teorema Fundamental do Cálculo

Definição didática:
"O Teorema Fundamental do Cálculo mostra que derivação e integração são operações inversas sob certas condições."

Visual:
Duas caixas animadas:
Derivar ↔ Integrar

------------------------------------------------------------
SEÇÃO 8 — Newton, fluentes e fluxões
------------------------------------------------------------

Título:
"A linguagem original de Newton"

Desenvolver:
Newton não usava exatamente a linguagem moderna de derivada e integral. Ele falava em fluentes e fluxões.

Fluentes:
Quantidades que fluem, isto é, mudam ao longo do tempo.

Fluxões:
Taxas de mudança dessas quantidades.

Exemplo:
- posição é uma fluente;
- velocidade é sua fluxão;
- velocidade também pode ser fluente;
- aceleração é sua fluxão.

Explicar:
Essa linguagem mostra como Newton pensava o cálculo profundamente ligado ao tempo e ao movimento.

Visual:
posição → velocidade → aceleração
fluente → fluxão

------------------------------------------------------------
SEÇÃO 9 — Newton e a física
------------------------------------------------------------

Título:
"O cálculo como linguagem do movimento"

Desenvolver:
Explicar que o cálculo se tornou essencial para a física porque permite relacionar posição, velocidade, aceleração e força.

Exemplo:
No movimento:
- posição indica onde o objeto está;
- velocidade indica como a posição muda;
- aceleração indica como a velocidade muda;
- força se relaciona com aceleração.

Incluir fórmula conceitual:
força → aceleração → velocidade → posição

Explicar que esse tipo de raciocínio é central para estudar:
- queda de corpos;
- órbitas;
- gravidade;
- movimento de planetas;
- sistemas dinâmicos.

Visual:
Objeto caindo e planeta orbitando.

------------------------------------------------------------
SEÇÃO 10 — Newton vs Leibniz
------------------------------------------------------------

Título:
"Newton criou sozinho?"

Desenvolver:
Explicar que Newton e Leibniz chegaram ao cálculo de forma independente.

Newton:
- foco no movimento;
- linguagem de fluxões;
- pensamento físico;
- notação menos usada hoje.

Leibniz:
- foco em símbolos;
- dx, dy e ∫;
- notação muito poderosa;
- linguagem mais próxima da usada atualmente.

Conclusão:
A física do cálculo tem muito de Newton. A notação moderna tem muito de Leibniz.

Visual:
Tabela comparativa.

------------------------------------------------------------
SEÇÃO 11 — Linha do tempo
------------------------------------------------------------

Título:
"Como as ideias se encaixam historicamente"

Eventos:
1. Geometria clássica
2. Estudos antigos de áreas e tangentes
3. Galileu e movimento
4. Kepler e órbitas
5. Newton nos anos de 1665–1666
6. Principia em 1687
7. Leibniz e a notação diferencial
8. Consolidação do cálculo moderno

A linha do tempo deve ser visual e interativa.

------------------------------------------------------------
SEÇÃO 12 — Resumo final
------------------------------------------------------------

Título:
"O que você precisa levar daqui"

Resumo:
Newton chegou ao cálculo porque precisava descrever movimento e mudança contínua.
A derivada nasceu da tentativa de medir mudança instantânea.
A integral nasceu da tentativa de somar partes continuamente.
O ponto central foi perceber que derivada e integral são operações inversas.
Esse conjunto de ideias criou uma nova linguagem para a ciência moderna.

Cards finais:
- Derivada = mudança instantânea
- Integral = acumulação contínua
- Teorema Fundamental = uma desfaz a outra
- Cálculo = matemática da variação

------------------------------------------------------------
SEÇÃO 13 — Perguntas de revisão
------------------------------------------------------------

Criar um quiz com pelo menos 10 perguntas.

Tipos:
- múltipla escolha
- verdadeiro/falso
- perguntas reflexivas

Perguntas sugeridas:
1. Qual problema levou Newton à ideia de derivada?
2. Qual é a diferença entre velocidade média e instantânea?
3. O que representa a reta secante?
4. O que acontece quando os pontos da secante se aproximam?
5. Por que a integral pode ser vista como soma contínua?
6. Por que integral não é apenas área?
7. Como derivada e integral se relacionam?
8. O que são fluentes?
9. O que são fluxões?
10. Qual a diferença entre Newton e Leibniz?

Mostrar feedback após cada resposta.

------------------------------------------------------------
SEÇÃO 14 — Glossário
------------------------------------------------------------

Criar glossário com definições claras:

Derivada:
Taxa de variação instantânea.

Integral:
Acumulação contínua de pequenas contribuições.

Limite:
Ideia de observar o comportamento de uma expressão quando uma variável se aproxima de determinado valor.

Secante:
Reta que corta uma curva em dois pontos.

Tangente:
Reta que toca uma curva em um ponto e representa sua direção local.

Taxa de variação:
Medida de quanto uma quantidade muda em relação a outra.

Fluente:
Na linguagem de Newton, uma quantidade que varia com o tempo.

Fluxão:
Na linguagem de Newton, a taxa de mudança de uma fluente.

Teorema Fundamental do Cálculo:
Resultado que conecta derivadas e integrais como operações inversas.

============================================================
COMPONENTES REUTILIZÁVEIS
============================================================

Criar componentes reutilizáveis como:

1. Layout principal
2. Header
3. Sidebar de navegação
4. Card de conteúdo
5. Card de categoria
6. SectionHeader
7. DefinitionBox
8. InsightBox
9. ExampleBox
10. CommonMistakeBox
11. InteractiveDiagram
12. Timeline
13. Quiz
14. Glossary
15. ProgressBar
16. SearchBar
17. ContentGrid

============================================================
ESTRUTURA DE DADOS SUGERIDA
============================================================

Criar os conteúdos de forma estruturada, por exemplo:

content = [
  {
    id: "newton-calculo",
    title: "Como Newton chegou ao cálculo diferencial e integral",
    category: "Matemática",
    secondaryCategory: "História da Ciência",
    level: "Intermediário",
    estimatedTime: "35–50 min",
    tags: ["Newton", "Cálculo", "Derivada", "Integral", "Física"],
    summary: "...",
    sections: [...]
  }
]

Categorias:

categories = [
  {
    id: "matematica",
    name: "Matemática",
    description: "Conceitos matemáticos explicados de forma visual e progressiva."
  },
  {
    id: "fisica",
    name: "Física",
    description: "Leis, modelos e fenômenos físicos com diagramas e exemplos."
  },
  {
    id: "computacao",
    name: "Computação",
    description: "Programação, sistemas, algoritmos e arquitetura."
  },
  {
    id: "historia-da-ciencia",
    name: "História da Ciência",
    description: "Como grandes ideias científicas surgiram e evoluíram."
  }
]

============================================================
REQUISITOS DE UX
============================================================

1. A leitura deve ser confortável.
2. O conteúdo não pode parecer um bloco gigante de texto.
3. Cada seção deve alternar entre:
   - texto
   - visual
   - definição
   - exemplo
   - interação
4. Usar bastante espaçamento.
5. Usar largura máxima de leitura para textos longos.
6. Diagramas podem ocupar largura maior.
7. No mobile, o sumário lateral vira menu recolhível.
8. O site deve ter botão "voltar para início".
9. O usuário deve conseguir navegar por categoria.
10. O conteúdo deve ter botões:
    - Próxima seção
    - Seção anterior
    - Voltar ao topo

============================================================
ANIMAÇÕES
============================================================

Usar Framer Motion ou CSS transitions para:

1. Fade-in das seções ao entrar na tela.
2. Hover suave nos cards.
3. Barra de progresso de leitura.
4. Transição nos blocos expansíveis.
5. Animações nos diagramas de derivada e integral.
6. Movimento suave em setas e conexões.
7. Destaque da seção ativa no sumário.

Não exagerar nas animações.
O site deve parecer calmo, não gamificado demais.

============================================================
ACESSIBILIDADE
============================================================

1. Bom contraste.
2. Fontes legíveis.
3. Botões com estados visíveis.
4. Navegação por teclado.
5. Alt text em imagens.
6. Não depender apenas de cor para transmitir informação.
7. Layout responsivo.
8. Tamanho de fonte confortável.

============================================================
CRITÉRIOS DE QUALIDADE
============================================================

O resultado final deve:

1. Parecer um site real e bem acabado.
2. Ser fácil de expandir para novos temas.
3. Ter conteúdo longo e profundo.
4. Ter visual agradável.
5. Ter interações úteis para aprender.
6. Não ser apenas um artigo estático.
7. Não ser apenas uma landing page bonita.
8. Ter organização clara por categorias.
9. Ter a primeira aula completa sobre Newton e cálculo.
10. Ter código limpo, componentizado e fácil de modificar.

============================================================
ENTREGA ESPERADA
============================================================

Entregar:

1. Código completo do projeto.
2. Componentes reutilizáveis.
3. Página inicial funcional.
4. Página de conteúdo funcional.
5. Dados do conteúdo estruturados.
6. Diagramas interativos.
7. Quiz funcional.
8. Glossário funcional.
9. Layout responsivo.
10. Instruções de como rodar o projeto.

============================================================
IMPORTANTE
============================================================

Não simplifique demais o conteúdo.
O objetivo é criar uma experiência de estudo profunda.

Mas também não transforme em texto acadêmico pesado.
O conteúdo deve ser detalhado, porém claro.

A experiência final deve parecer:
"um material de estudo interativo que eu realmente teria vontade de usar".