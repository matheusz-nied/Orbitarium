import type { LessonModule } from "../../types/content";
import { bitsBytesRepresentacaoDadosLesson } from "./bits-bytes-representacao-dados";
import { comoFuncionaUmaCpuLesson } from "./como-funciona-uma-cpu";
import { memoriaStackHeapPonteirosLesson } from "./memoria-stack-heap-ponteiros";
import { cacheDeCpuLesson } from "./cache-de-cpu";
import { comoFuncionaUmSistemaOperacionalLesson } from "./como-funciona-um-sistema-operacional";
import { processosThreadsConcorrenciaLesson } from "./processos-threads-concorrencia";
import { memoriaVirtualLesson } from "./memoria-virtual";
import { gpuParaIaLesson } from "./gpu-para-ia";
import { comoFuncionaAInternetLesson } from "./como-funciona-a-internet";
import { comoFuncionaUmBancoDeDadosLesson } from "./como-funciona-um-banco-de-dados";
import { indicesEBTreesLesson } from "./indices-e-b-trees";
import { dockerEContainersLesson } from "./docker-e-containers";
import { comoUmProgramaViraProcessoLesson } from "./como-um-programa-vira-processo";
import { syscallsKernelLesson } from "./syscalls-kernel";
import { comoFuncionaUmCompiladorLesson } from "./como-funciona-um-compilador";
import { pipelineDeCpuLesson } from "./pipeline-de-cpu";
import { isaX86ArmRiscvLesson } from "./isa-x86-arm-riscv";
import { apisRestLesson } from "./apis-rest";
import { autenticacaoEAutorizacaoLesson } from "./autenticacao-e-autorizacao";
import { tlsEHttpsLesson } from "./tls-e-https";
import { observabilidadeDeSistemasLesson } from "./observabilidade-de-sistemas";
import { filasEArquiteturaEventDrivenLesson } from "./filas-e-arquitetura-event-driven";
import { turingEAIdeiaDeComputacaoLesson } from "./turing-e-a-ideia-de-computacao";
import { algoritmosEComplexidadeLesson } from "./algoritmos-e-complexidade";
import { estruturasDeDadosEssenciaisLesson } from "./estruturas-de-dados-essenciais";
import { recursaoEDividirParaConquistarLesson } from "./recursao-e-dividir-para-conquistar";
import { dnsIpTcpHttpLesson } from "./dns-ip-tcp-http";
import { tcpVsUdpLatenciaConfiabilidadeLesson } from "./tcp-vs-udp-latencia-confiabilidade";
import { sistemasDistribuidosFundamentosLesson } from "./sistemas-distribuidos-fundamentos";
import { capConsistenciaDisponibilidadeLesson } from "./cap-consistencia-disponibilidade";
import { balanceamentoECdnLesson } from "./balanceamento-e-cdn";
import { sistemaDeArquivosLesson } from "./sistema-de-arquivos";
import { transacoesAcidIsolamentoLesson } from "./transacoes-acid-isolamento";
import { comoFuncionaAMemoriaRamLesson } from "./como-funciona-a-memoria-ram";
import { bitsPortasLogicasCircuitosLesson } from "./bits-portas-logicas-circuitos";
import { hashesEIntegridadeLesson } from "./hashes-e-integridade";
import { criptografiaModernaIntuicaoLesson } from "./criptografia-moderna-intuicao";
import { segurancaDeMemoriaLesson } from "./seguranca-de-memoria";
import { monolitoVsMicroservicosLesson } from "./monolito-vs-microservicos";
import { graphqlComoContratoLesson } from "./graphql-como-contrato";
import { tpuNpuAceleradoresLesson } from "./tpu-npu-aceleradores";
import { ssdEStorageLesson } from "./ssd-e-storage";
import { pcieBarramentosLesson } from "./pcie-barramentos";
import { concorrenciaBaixoNivelLesson } from "./concorrencia-baixo-nivel";
import { linuxPermissoesProcessosLesson } from "./linux-permissoes-processos";
import { httpCachingLesson } from "./http-caching";

export const computacaoLessonModules = [
  bitsBytesRepresentacaoDadosLesson,
  comoFuncionaUmaCpuLesson,
  memoriaStackHeapPonteirosLesson,
  cacheDeCpuLesson,
  comoFuncionaUmSistemaOperacionalLesson,
  processosThreadsConcorrenciaLesson,
  memoriaVirtualLesson,
  gpuParaIaLesson,
  comoFuncionaAInternetLesson,
  comoFuncionaUmBancoDeDadosLesson,
  indicesEBTreesLesson,
  dockerEContainersLesson,
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
  turingEAIdeiaDeComputacaoLesson,
  algoritmosEComplexidadeLesson,
  estruturasDeDadosEssenciaisLesson,
  recursaoEDividirParaConquistarLesson,
  dnsIpTcpHttpLesson,
  tcpVsUdpLatenciaConfiabilidadeLesson,
  sistemasDistribuidosFundamentosLesson,
  capConsistenciaDisponibilidadeLesson,
  balanceamentoECdnLesson,
  sistemaDeArquivosLesson,
  transacoesAcidIsolamentoLesson,
  comoFuncionaAMemoriaRamLesson,
  bitsPortasLogicasCircuitosLesson,
  hashesEIntegridadeLesson,
  criptografiaModernaIntuicaoLesson,
  segurancaDeMemoriaLesson,
  monolitoVsMicroservicosLesson,
  graphqlComoContratoLesson,
  tpuNpuAceleradoresLesson,
  ssdEStorageLesson,
  pcieBarramentosLesson,
  concorrenciaBaixoNivelLesson,
  linuxPermissoesProcessosLesson,
  httpCachingLesson,
] satisfies LessonModule[];

