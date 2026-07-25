import { createComputacaoInteractions } from "../_shared/factories";

export const interactions = createComputacaoInteractions({
  title: "Erros com Result e ?",
  pipelineSteps: [
    {
      name: "Produzir erro",
      summary:
        "A operação falha em um ponto concreto: abrir arquivo, parsear dado, acessar rede, validar regra. Rust força essa possibilidade a aparecer no tipo em vez de se esconder no fluxo.",
      signal: "origem da falha",
      risk: "tratar erro operacional como bug interno",
      takeaway:
        "Comece distinguindo falha esperada de invariantes quebradas.",
    },
    {
      name: "Propagar causa",
      summary:
        "Com Result e ?, a função pode encaminhar a falha para quem tem melhor contexto para decidir, sem perder a estrutura do contrato.",
      signal: "tipo de retorno",
      risk: "boilerplate ou atalho indevido com panic",
      takeaway:
        "Propagar não é ignorar; é reconhecer que outra camada tem a política certa para aquele erro.",
    },
    {
      name: "Adicionar contexto",
      summary:
        "Mensagens e tipos de erro mais ricos ajudam a próxima camada a diagnosticar, logar e traduzir corretamente o problema.",
      signal: "fronteira entre camadas",
      risk: "erro genérico demais",
      takeaway:
        "Contexto técnico e contexto de domínio devem cooperar, não competir.",
    },
    {
      name: "Decidir na borda",
      summary:
        "Na aplicação final, o erro vira ação concreta: retry, log, resposta HTTP, fallback, encerramento ou mensagem ao usuário.",
      signal: "política operacional",
      risk: "biblioteca decidir cedo demais pelo chamador",
      takeaway:
        "Estrutura sobe; política desce. Essa separação deixa o sistema mais previsível.",
    },
  ],
  leftLabel: "panic / abortar",
  rightLabel: "result / propagar",
  tradeoffSummary:
    "Panic é apropriado para bugs e invariantes rompidas; Result é apropriado para falhas recuperáveis ou esperadas do ambiente e da entrada.",
  tradeoffRisks: [
    "Abusar de panic transforma erro operacional em colapso abrupto do processo.",
    "Equilíbrio saudável preserva falhas estruturadas sem mascarar bugs internos.",
    "Transformar tudo em Result pode diluir a noção de invariante e tratar bug como se fosse só mais uma resposta alternativa.",
    "Empurrar qualquer problema para cima sem modelagem clara gera APIs verbosas e pouco úteis.",
  ],
  practiceRule:
    "Se o chamador pode agir diante da falha, modele com Result. Se a condição representa bug ou estado impossível por contrato, panic pode ser honesto.",
  scenarios: [
    {
      name: "Biblioteca de parser",
      situation:
        "Uma crate recebe texto externo e pode falhar por sintaxe inválida, dados incompletos ou codificação inesperada.",
      choice: "Devolver Result com erro estruturado.",
      why: "O consumidor da biblioteca é quem sabe se vai mostrar mensagem, logar, tentar outro formato ou abortar a operação.",
      caution:
        "Encerrar o processo dentro da lib tomaria uma decisão operacional que não pertence a ela.",
    },
    {
      name: "Invariante interna quebrada",
      situation:
        "Um estado que deveria ser impossível após validações anteriores aparece no meio de uma transformação interna.",
      choice: "Tratar como bug e considerar panic ou assert apropriado ao contexto.",
      why: "A falha não vem do ambiente previsível, mas da quebra de uma garantia que o próprio programa afirmou manter.",
      caution:
        "Se esse caso começa a ocorrer na prática, talvez a fronteira de validação anterior esteja menos sólida do que se imaginava.",
    },
    {
      name: "Aplicação web final",
      situation:
        "Seu handler recebe diversos erros de banco, autenticação e validação vindos de camadas internas e precisa responder ao cliente.",
      choice: "Traduzir os erros em política de borda: status, mensagem, logs e métricas.",
      why: "A camada externa entende contexto de usuário, contrato HTTP e observabilidade do sistema.",
      caution:
        "Deixar cada camada montar sua própria resposta final tende a duplicar lógica e embaralhar responsabilidade.",
    },
  ],
});
