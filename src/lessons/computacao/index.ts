import type { LessonModule } from "../../types/content";
import { bitsBytesRepresentacaoDadosLesson } from "./bits-bytes-representacao-dados";
import { comoFuncionaUmSistemaOperacionalLesson } from "./como-funciona-um-sistema-operacional";
import { processosThreadsConcorrenciaLesson } from "./processos-threads-concorrencia";
import { memoriaVirtualLesson } from "./memoria-virtual";
import { gpuParaIaLesson } from "./gpu-para-ia";
import { comoFuncionaAInternetLesson } from "./como-funciona-a-internet";
import { comoFuncionaUmBancoDeDadosLesson } from "./como-funciona-um-banco-de-dados";
import { indicesEBTreesLesson } from "./indices-e-b-trees";
import { dockerEContainersLesson } from "./docker-e-containers";
import { turingEAIdeiaDeComputacaoLesson } from "./turing-e-a-ideia-de-computacao";
import { algoritmosEComplexidadeLesson } from "./algoritmos-e-complexidade";
import { estruturasDeDadosEssenciaisLesson } from "./estruturas-de-dados-essenciais";
import { recursaoEDividirParaConquistarLesson } from "./recursao-e-dividir-para-conquistar";
import { dnsIpTcpHttpLesson } from "./dns-ip-tcp-http";
import { tcpVsUdpLatenciaConfiabilidadeLesson } from "./tcp-vs-udp-latencia-confiabilidade";
import { sistemasDistribuidosFundamentosLesson } from "./sistemas-distribuidos-fundamentos";
import { capConsistenciaDisponibilidadeLesson } from "./cap-consistencia-disponibilidade";

export const computacaoLessonModules = [
  bitsBytesRepresentacaoDadosLesson,
  comoFuncionaUmSistemaOperacionalLesson,
  processosThreadsConcorrenciaLesson,
  memoriaVirtualLesson,
  gpuParaIaLesson,
  comoFuncionaAInternetLesson,
  comoFuncionaUmBancoDeDadosLesson,
  indicesEBTreesLesson,
  dockerEContainersLesson,
  turingEAIdeiaDeComputacaoLesson,
  algoritmosEComplexidadeLesson,
  estruturasDeDadosEssenciaisLesson,
  recursaoEDividirParaConquistarLesson,
  dnsIpTcpHttpLesson,
  tcpVsUdpLatenciaConfiabilidadeLesson,
  sistemasDistribuidosFundamentosLesson,
  capConsistenciaDisponibilidadeLesson,
] satisfies LessonModule[];
