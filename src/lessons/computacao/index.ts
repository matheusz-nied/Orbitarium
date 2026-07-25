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
import { performanceMentalModelLesson } from "./performance-mental-model";
import { medirAntesDeOtimizarLesson } from "./medir-antes-de-otimizar";
import { cpuBoundIoBoundMemoryBoundLesson } from "./cpu-bound-io-bound-memory-bound";
import { latenciaVsThroughputLesson } from "./latencia-vs-throughput";
import { ampdalELimitesDoParalelismoLesson } from "./ampdal-e-limites-do-paralelismo";
import { custoDeAbstracoesLesson } from "./custo-de-abstracoes";
import { flamegraphsEProfilingLesson } from "./flamegraphs-e-profiling";
import { benchmarkingHonestoLesson } from "./benchmarking-honesto";
import { localityDataOrientedDesignLesson } from "./locality-data-oriented-design";
import { falseSharingECacheLinesLesson } from "./false-sharing-e-cache-lines";
import { alocacaoArenaPoolBumpLesson } from "./alocacao-arena-pool-bump";
import { stackVsHeapNaPraticaLesson } from "./stack-vs-heap-na-pratica";
import { zeroCopyEBuffersLesson } from "./zero-copy-e-buffers";
import { simdIntuicaoLesson } from "./simd-intuicao";
import { branchPredictionECodigoQuenteLesson } from "./branch-prediction-e-codigo-quente";
import { undefinedBehaviorMindsetLesson } from "./undefined-behavior-mindset";
import { rustOwnershipBorrowingLesson } from "./rust-ownership-borrowing";
import { rustLifetimesIntuicaoLesson } from "./rust-lifetimes-intuicao";
import { rustTiposTraitsZeroCostLesson } from "./rust-tipos-traits-zero-cost";
import { rustErrorHandlingLesson } from "./rust-error-handling";
import { rustCollectionsEAlocacaoLesson } from "./rust-collections-e-alocacao";
import { rustConcurrencySendSyncLesson } from "./rust-concurrency-send-sync";
import { rustAsyncIntuicaoLesson } from "./rust-async-intuicao";
import { rustUnsafeBoundariesLesson } from "./rust-unsafe-boundaries";
import { rustFfiECLesson } from "./rust-ffi-e-c";
import { rustToolingCargoPerfLesson } from "./rust-tooling-cargo-perf";
import { goModeloMentalLesson } from "./go-modelo-mental";
import { goGoroutinesSchedulerLesson } from "./go-goroutines-scheduler";
import { goChannelsVsMemoriaCompartilhadaLesson } from "./go-channels-vs-memoria-compartilhada";
import { goEscapeAnalysisLesson } from "./go-escape-analysis";
import { goGcELatenciaLesson } from "./go-gc-e-latencia";
import { goSyncAtomicMutexLesson } from "./go-sync-atomic-mutex";
import { goPprofEBenchmarksLesson } from "./go-pprof-e-benchmarks";
import { goNetHttpPerformanceLesson } from "./go-net-http-performance";
import { goContextCancelamentoLesson } from "./go-context-cancelamento";
import { goVsRustQuandoUsarLesson } from "./go-vs-rust-quando-usar";
import { metodologiaDeOtimizacaoLesson } from "./metodologia-de-otimizacao";
import { contencaoLocksEFilasLesson } from "./contencao-locks-e-filas";
import { lockFreeComCuidadoLesson } from "./lock-free-com-cuidado";
import { syscallsEOverheadDeIoLesson } from "./syscalls-e-overhead-de-io";
import { networkPerformanceBasicsLesson } from "./network-performance-basics";
import { compiladoresEOtimizacoesLesson } from "./compiladores-e-otimizacoes";
import { debuggingNativoLesson } from "./debugging-nativo";
import { performanceEmProducaoLesson } from "./performance-em-producao";

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
  performanceMentalModelLesson,
  medirAntesDeOtimizarLesson,
  cpuBoundIoBoundMemoryBoundLesson,
  latenciaVsThroughputLesson,
  ampdalELimitesDoParalelismoLesson,
  custoDeAbstracoesLesson,
  flamegraphsEProfilingLesson,
  benchmarkingHonestoLesson,
  localityDataOrientedDesignLesson,
  falseSharingECacheLinesLesson,
  alocacaoArenaPoolBumpLesson,
  stackVsHeapNaPraticaLesson,
  zeroCopyEBuffersLesson,
  simdIntuicaoLesson,
  branchPredictionECodigoQuenteLesson,
  undefinedBehaviorMindsetLesson,
  rustOwnershipBorrowingLesson,
  rustLifetimesIntuicaoLesson,
  rustTiposTraitsZeroCostLesson,
  rustErrorHandlingLesson,
  rustCollectionsEAlocacaoLesson,
  rustConcurrencySendSyncLesson,
  rustAsyncIntuicaoLesson,
  rustUnsafeBoundariesLesson,
  rustFfiECLesson,
  rustToolingCargoPerfLesson,
  goModeloMentalLesson,
  goGoroutinesSchedulerLesson,
  goChannelsVsMemoriaCompartilhadaLesson,
  goEscapeAnalysisLesson,
  goGcELatenciaLesson,
  goSyncAtomicMutexLesson,
  goPprofEBenchmarksLesson,
  goNetHttpPerformanceLesson,
  goContextCancelamentoLesson,
  goVsRustQuandoUsarLesson,
  metodologiaDeOtimizacaoLesson,
  contencaoLocksEFilasLesson,
  lockFreeComCuidadoLesson,
  syscallsEOverheadDeIoLesson,
  networkPerformanceBasicsLesson,
  compiladoresEOtimizacoesLesson,
  debuggingNativoLesson,
  performanceEmProducaoLesson,
] satisfies LessonModule[];

