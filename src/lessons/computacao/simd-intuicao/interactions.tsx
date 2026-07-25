import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "SIMD: Intuição de Paralelismo de Dados",
  "pipelineSteps": [
    {
      "name": "Achar independência",
      "summary": "Confirme que várias iterações podem ser executadas sem depender umas das outras.",
      "signal": "loop regular",
      "risk": "dependência escondida",
      "takeaway": "Sem independência, não há paralelismo de dados limpo para explorar."
    },
    {
      "name": "Expor contiguidade",
      "summary": "Dados homogêneos e próximos em memória alimentam melhor registradores vetoriais.",
      "signal": "stride baixo",
      "risk": "gathers caros",
      "takeaway": "Layout e vetorizar andam juntos; um sem o outro limita o ganho."
    },
    {
      "name": "VetorizAR o corpo quente",
      "summary": "Compilador ou intrinsics agrupam trabalho em lanes para o trecho principal do loop.",
      "signal": "lanes ocupadas",
      "risk": "controle de fluxo irregular",
      "takeaway": "A parte mais repetitiva é o lugar natural do ganho vetorial."
    },
    {
      "name": "Tratar sobras e medir",
      "summary": "Reductions, tails e bound de memória definem o quanto o ganho teórico aparece na prática.",
      "signal": "throughput real",
      "risk": "ganho só no papel",
      "takeaway": "Vetorização boa melhora a métrica final do kernel, não apenas o ego do programador."
    }
  ],
  "leftLabel": "escalar simples",
  "rightLabel": "paralelismo por lanes",
  "tradeoffSummary": "SIMD vale quando o trabalho é homogêneo, independente e alimentado por memória suficientemente previsível. Compiladores modernos já cobrem muitos loops regulares, mas não todos; intrinsics entram quando perfis e inspeção justificam controle extra. Antes disso, a pergunta principal continua sendo sobre dados e regularidade do loop.",
  "tradeoffRisks": [
    "Código escalar demais pode desperdiçar paralelismo de dados disponível em loops muito regulares.",
    "Auto-vectorization pode cobrir muitos casos regulares sem sacrificar clareza, desde que o loop exponha a oportunidade.",
    "Controle manual com intrinsics pode render ganhos extras em kernels quentes e estáveis.",
    "Baixa regularidade, gathers caros ou bound de memória podem reduzir muito o retorno do esforço vetorial."
  ],
  "practiceRule": "exponha independência e contiguidade primeiro; só depois avalie se auto-vectorization basta ou se intrinsics realmente se justificam",
  "scenarios": [
    {
      "name": "Imagem em lote",
      "situation": "Um kernel ajusta brilho ou soma pixels sobre grandes arrays contíguos.",
      "choice": "Escrever o loop de forma regular e verificar auto-vectorization primeiro.",
      "why": "O padrão de dados é homogêneo e costuma ser excelente para lanes.",
      "caution": "Se o custo virar memória, a vetorização sozinha pode não explicar o resultado final."
    },
    {
      "name": "Parser branchy",
      "situation": "Cada byte pode seguir caminhos bem diferentes dependendo do conteúdo.",
      "choice": "Avaliar se vale reorganizar dados ou separar fast paths antes de insistir em SIMD.",
      "why": "Controle de fluxo irregular costuma atrapalhar vetorização direta.",
      "caution": "Branchless artificial pode piorar clareza e até o desempenho."
    },
    {
      "name": "Kernel numérico crítico",
      "situation": "Uma rotina muito quente domina o perfil e roda sobre dados bem organizados.",
      "choice": "Depois de medir e validar layout, considerar intrinsics específicas da ISA.",
      "why": "Aqui o custo adicional de manutenção pode ter retorno mensurável.",
      "caution": "Mantenha teste de corretude, fallback e clareza sobre alvo de hardware."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
