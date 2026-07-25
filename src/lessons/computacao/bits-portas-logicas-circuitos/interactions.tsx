import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Bits, Portas Lógicas e Circuitos",
  "pipelineSteps": [
    {
      "name": "Codificação binária",
      "summary": "Estados físicos são interpretados como 0 e 1 de forma robusta.",
      "signal": "nível lógico",
      "risk": "achar que o bit é puramente matemático",
      "takeaway": "Bit é abstração sobre hardware real."
    },
    {
      "name": "Combinação por portas",
      "summary": "AND, OR, NOT e afins implementam relações booleanas locais.",
      "signal": "tabela verdade",
      "risk": "confundir expressão e circuito",
      "takeaway": "Portas são funções físicas simples."
    },
    {
      "name": "Composição em blocos",
      "summary": "Meios somadores, somadores completos e multiplexadores surgem da composição.",
      "signal": "profundidade lógica",
      "risk": "subestimar atraso acumulado",
      "takeaway": "Circuitos grandes são blocos pequenos empilhados."
    },
    {
      "name": "Captura de estado",
      "summary": "Flip-flops e registradores permitem lembrar resultados ao longo do tempo.",
      "signal": "clock",
      "risk": "ignorar timing",
      "takeaway": "Sem estado, não há máquina sequencial."
    }
  ],
  "leftLabel": "simplicidade conceitual",
  "rightLabel": "expressividade dos circuitos",
  "tradeoffSummary": "Poucas portas básicas já permitem construir máquinas poderosas, mas cada camada extra adiciona atraso, fan-out, necessidade de clock e mais complexidade de projeto.",
  "tradeoffRisks": [
    "Pouca capacidade de expressão, ainda que seja fácil de explicar.",
    "Boa intuição para montar blocos reutilizáveis sem explodir a complexidade.",
    "Circuitos mais ricos, com maior sensibilidade a atraso e coordenação temporal.",
    "Otimização agressiva sem olhar timing pode produzir projeto correto no papel e ruim no silício."
  ],
  "practiceRule": "sempre pergunte o que é combinacional, o que é estado e onde está a fronteira de clock",
  "scenarios": [
    {
      "name": "Somar dois bits",
      "situation": "Você precisa produzir soma e carry para duas entradas binárias.",
      "choice": "Modelar a tabela verdade e compor um meio somador antes de pensar em algo maior.",
      "why": "Blocos pequenos dão linguagem para circuitos mais complexos.",
      "caution": "Pular a tabela verdade cedo demais costuma esconder erro lógico."
    },
    {
      "name": "Selecionar um caminho",
      "situation": "Um circuito precisa escolher entre duas entradas conforme um controle.",
      "choice": "Usar a ideia de multiplexação em vez de tentar desenhar ligações arbitrárias.",
      "why": "Multiplexadores explicitam seleção de dados de forma organizada.",
      "caution": "Escolha de caminho também custa atraso e fan-out."
    },
    {
      "name": "Guardar um valor",
      "situation": "O sistema precisa lembrar um bit de um ciclo para outro.",
      "choice": "Adicionar estado com flip-flops ou registradores e pensar no clock.",
      "why": "Lógica pura não recorda o passado sozinha.",
      "caution": "Sem considerar timing, surgem glitches e comportamento instável."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
