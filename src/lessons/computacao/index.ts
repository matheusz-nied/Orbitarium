import type { LessonModule } from "../../types/content";
import { bitsBytesRepresentacaoDadosLesson } from "./bits-bytes-representacao-dados";
import { comoFuncionaUmSistemaOperacionalLesson } from "./como-funciona-um-sistema-operacional";
import { processosThreadsConcorrenciaLesson } from "./processos-threads-concorrencia";
import { memoriaVirtualLesson } from "./memoria-virtual";
import { gpuParaIaLesson } from "./gpu-para-ia";
import { comoFuncionaAInternetLesson } from "./como-funciona-a-internet";
import { comoFuncionaUmBancoDeDadosLesson } from "./como-funciona-um-banco-de-dados";
import { comoFuncionaUmCompiladorLesson } from "./como-funciona-um-compilador";
import { comoUmProgramaViraProcessoLesson } from "./como-um-programa-vira-processo";
import { apisRestLesson } from "./apis-rest";
import { autenticacaoEAutorizacaoLesson } from "./autenticacao-e-autorizacao";
import { filasEArquiteturaEventDrivenLesson } from "./filas-e-arquitetura-event-driven";
import { indicesEBTreesLesson } from "./indices-e-b-trees";
import { isaX86ArmRiscvLesson } from "./isa-x86-arm-riscv";
import { dockerEContainersLesson } from "./docker-e-containers";
import { observabilidadeDeSistemasLesson } from "./observabilidade-de-sistemas";
import { pipelineDeCpuLesson } from "./pipeline-de-cpu";
import { syscallsKernelLesson } from "./syscalls-kernel";
import { tlsEHttpsLesson } from "./tls-e-https";
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
  comoUmProgramaViraProcessoLesson,
  syscallsKernelLesson,
  comoFuncionaUmCompiladorLesson,
  pipelineDeCpuLesson,
  isaX86ArmRiscvLesson,
  apisRestLesson,
  autenticacaoEAutorizacaoLesson,
  tlsEHttpsLesson,
  observabilidadeDeSistemasLesson,
  filasEArquiteturaEventDrivenLesson,
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
