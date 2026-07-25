import { createComputacaoInteractions } from "../_shared/factories";

export const interactions = createComputacaoInteractions({
  title: "Lifetimes (Intuição)",
  pipelineSteps: [
    {
      name: "Criar referência",
      summary:
        "Toda referência nasce subordinada a algum dado e a algum escopo real. Lifetime é a linguagem que descreve essa subordinação quando a inferência sozinha não basta.",
      signal: "origem do borrow",
      risk: "tratar referência como autônoma",
      takeaway:
        "O primeiro passo é sempre identificar quem ainda possui o dado apontado.",
    },
    {
      name: "Sobrepor escopos",
      summary:
        "A validade de uma referência depende da interseção entre a vida do alvo e a janela em que a referência será usada.",
      signal: "janela compartilhada",
      risk: "uso fora da interseção segura",
      takeaway:
        "Leia lifetimes como geometria de escopos: a referência só vive onde ambos os lados ainda fazem sentido.",
    },
    {
      name: "Ligar retorno",
      summary:
        "Quando a função devolve uma referência, o compilador precisa saber de qual entrada essa saída depende ou de qual escopo ela realmente vem.",
      signal: "dependência da saída",
      risk: "retorno ambíguo",
      takeaway:
        "A anotação explicita relação; ela não inventa uma origem nova para a referência.",
    },
    {
      name: "Provar validade",
      summary:
        "Se a prova não fecha, a arquitetura talvez precise mudar: encurtar borrows, reorganizar etapas ou passar a possuir dados em uma fronteira estratégica.",
      signal: "fronteira problemática",
      risk: "espalhar lifetimes sem necessidade",
      takeaway:
        "Quando a relação fica complexa demais, o problema pode ser de desenho, não de sintaxe.",
    },
  ],
  leftLabel: "propagar referências",
  rightLabel: "possuir valores",
  tradeoffSummary:
    "Borrowing prolongado pode evitar cópias, mas ownership em pontos certos reduz acoplamento e simplifica contratos de validade por toda a aplicação.",
  tradeoffRisks: [
    "Emprestar tudo pode espalhar lifetimes e tornar a API mais frágil do que o ganho justifica.",
    "Um equilíbrio conservador evita alocação desnecessária e ainda mantém assinaturas legíveis.",
    "Possuir mais dados aumenta autonomia, mas pode introduzir cópias em fronteiras onde só leitura bastaria.",
    "Extremos arquiteturais tendem a trocar um problema de clareza por outro problema de custo ou acoplamento.",
  ],
  practiceRule:
    "Use referências quando a dependência externa for parte real do modelo; use ownership quando autonomia simplificar o desenho.",
  scenarios: [
    {
      name: "Função longest",
      situation:
        "A função recebe duas referências e devolve uma delas conforme uma regra de seleção. O corpo é simples, mas a origem do retorno varia.",
      choice: "Explicitar a relação de validade entre entradas e saída.",
      why: "O compilador precisa saber que o retorno depende das janelas dos argumentos relevantes.",
      caution:
        "A anotação não prolonga nenhum texto; ela apenas restringe onde o resultado poderá ser usado.",
    },
    {
      name: "Struct view temporária",
      situation:
        "Você quer construir uma struct leve para olhar pedaços de um buffer durante um parse curto.",
      choice: "Guardar referências na struct pode fazer sentido.",
      why: "A dependência externa é curta, local e parte central do propósito da estrutura.",
      caution:
        "Se essa view atravessar muitas camadas ou durar demais, talvez possuir dados críticos fique mais saudável.",
    },
    {
      name: "Componente de longa vida",
      situation:
        "Um serviço inicializado no boot precisa manter dados e responder por muito tempo a chamadas vindas de vários lugares.",
      choice: "Preferir ownership em fronteiras estratégicas.",
      why: "A autonomia da estrutura reduz cadeias extensas de validade compartilhada.",
      caution:
        "Insistir em borrows longos aqui costuma transformar detalhes de lifetime em problema arquitetural crônico.",
    },
  ],
});
