import { createComputacaoInteractions } from "../_shared/factories";

export const interactions = createComputacaoInteractions({
  title: "Ownership e Borrowing",
  pipelineSteps: [
    {
      name: "Criar valor",
      summary:
        "O valor nasce com uma dona clara. Em Rust, a pergunta inicial não é só 'qual é o dado?', mas 'quem responde por ele agora?'.",
      signal: "nome dono atual",
      risk: "posse implícita mal entendida",
      takeaway:
        "Comece lendo o código como fluxo de responsabilidade, não apenas fluxo de execução.",
    },
    {
      name: "Mover posse",
      summary:
        "Ao passar ownership adiante, o nome antigo deixa de ser usado como dono. Isso evita ambiguidade sobre quem deve liberar ou continuar mutando o recurso.",
      signal: "uso após move",
      risk: "duas entidades se acharem donas",
      takeaway:
        "Move não destrói o valor; ele apenas troca a entidade responsável por ele.",
    },
    {
      name: "Emprestar acesso",
      summary:
        "Borrowing cria uma janela temporária de uso sem transferir ownership. A API passa a distinguir quem observa e quem continua responsável pelo recurso.",
      signal: "tipo de referência",
      risk: "escopo do borrow maior que o necessário",
      takeaway:
        "Referências curtas e precisas costumam reduzir atrito com o borrow checker.",
    },
    {
      name: "Encerrar escopo",
      summary:
        "Quando a dona sai de escopo, o valor é descartado de forma previsível. Nenhuma referência pode fingir que continua válida depois disso.",
      signal: "fim da dona",
      risk: "janela de uso prolongada demais",
      takeaway:
        "Toda leitura de borrow deve caber confortavelmente dentro da vida útil do valor original.",
    },
  ],
  leftLabel: "duplicar dados",
  rightLabel: "emprestar dados",
  tradeoffSummary:
    "Clonar pode simplificar uma borda local, mas borrowing preserva semântica de posse e reduz cópias quando a leitura é temporária.",
  tradeoffRisks: [
    "Cópia excessiva pode ampliar alocação e tráfego de memória sem necessidade real.",
    "Buscar conforto imediato com clone pode esconder uma API pouco precisa.",
    "Emprestar demais por tempo longo pode prender o desenho e dificultar mutação posterior.",
    "Otimizar no extremo sem clareza semântica gera código confuso para humanos e para o compilador.",
  ],
  practiceRule:
    "Se a função só precisa ler, prefira borrow. Se precisa guardar ou consumir com autonomia, prefira ownership.",
  scenarios: [
    {
      name: "Parser de linha",
      situation:
        "Você recebe uma linha de texto para apenas analisar campos e devolver um resultado calculado sem armazenar a entrada.",
      choice: "Aceitar &str e emprestar o texto ao parser.",
      why: "A função só observa a entrada e não precisa se tornar dona do buffer.",
      caution:
        "Se o resultado precisar guardar partes do texto para uso posterior, talvez seja necessário possuir ou copiar trechos específicos.",
    },
    {
      name: "Cache interno",
      situation:
        "Um componente vai manter dados entre chamadas para acelerar consultas futuras.",
      choice: "Tornar o componente dono dos dados que armazenará.",
      why: "Guardar referências externas prolongadas espalha restrições de validade por toda a arquitetura.",
      caution:
        "Forçar borrowing longo demais pode transformar uma otimização local em acoplamento estrutural.",
    },
    {
      name: "Transformação consumidora",
      situation:
        "Uma função precisa pegar uma coleção, reordená-la e devolvê-la como novo valor principal do pipeline.",
      choice: "Receber ownership da coleção e retornar ownership do resultado.",
      why: "A transformação faz parte do ciclo de vida do valor, e não apenas de uma observação temporária.",
      caution:
        "Se a função só precisa ler e produzir algo independente, mover a coleção inteira pode ser poder demais.",
    },
  ],
});
