# Catálogo de temas para aulas interativas

Este arquivo reúne ideias de temas para criar aulas interativas, profundas e visuais.

Cada tema pode virar uma aula separada no site, com:
- explicação progressiva;
- diagramas;
- interações;
- exemplos;
- erros comuns;
- quiz;
- glossário;
- referências;
- visualizações animadas.

---

# Computação Profunda

## Turing e a Ideia de Computação

Categoria: História da Ciência / Computação  
Nível: Intermediário

Ideia central:
Turing formalizou a noção de computação e abriu caminho para a ciência da computação moderna.

Interações possíveis:
- máquina de Turing;
- fita;
- estados;
- instruções;
- problema da parada.

Tópicos:
- computabilidade;
- algoritmo;
- máquina de Turing;
- problema da parada;
- criptoanálise;
- IA;
- história da computação.

---

## Como Funciona a Internet

Categoria: Computação Profunda  
Nível: Iniciante/intermediário

Ideia central:
A internet é uma rede de protocolos que permite encontrar, transportar e proteger dados entre máquinas.

Interações possíveis:
- DNS lookup;
- request HTTP;
- TCP handshake;
- TLS handshake;
- caminho do navegador ao servidor.

Tópicos:
- IP;
- DNS;
- TCP;
- UDP;
- HTTP;
- HTTPS;
- TLS;
- roteamento;
- cliente e servidor.

---

## DNS, IP, TCP e HTTP

Categoria: Computação Profunda  
Nível: Intermediário

Ideia central:
Cada camada resolve uma parte do problema de comunicação entre computadores.

Interações possíveis:
- resolução de domínio;
- pacotes IP;
- abertura de conexão TCP;
- request/response HTTP;
- comparação TCP vs UDP.

Tópicos:
- endereçamento;
- nomes de domínio;
- portas;
- sockets;
- confiabilidade;
- latência;
- headers;
- status codes.

---

## Como Funciona um Sistema Operacional

Categoria: Computação Profunda  
Nível: Intermediário

Ideia central:
O sistema operacional gerencia recursos e oferece abstrações para programas.

Interações possíveis:
- scheduler de processos;
- memória virtual;
- chamadas de sistema;
- arquivos;
- interrupções.

Tópicos:
- kernel;
- processos;
- threads;
- syscalls;
- escalonamento;
- memória;
- sistema de arquivos;
- drivers.

---

## Processos, Threads e Concorrência

Categoria: Computação Profunda  
Nível: Intermediário

Ideia central:
Concorrência permite lidar com várias tarefas, mas exige controle de sincronização.

Interações possíveis:
- scheduler visual;
- corrida de dados;
- mutex;
- deadlock;
- fila de tarefas.

Tópicos:
- processo;
- thread;
- contexto;
- paralelismo;
- concorrência;
- race condition;
- mutex;
- semáforo;
- deadlock.

---

## Memória Virtual

Categoria: Computação Profunda  
Nível: Intermediário/avançado inicial

Ideia central:
Memória virtual dá a cada processo a ilusão de ter seu próprio espaço de endereçamento.

Interações possíveis:
- endereços virtuais e físicos;
- tabela de páginas;
- page fault;
- swap;
- TLB.

Tópicos:
- paginação;
- endereço virtual;
- endereço físico;
- MMU;
- page table;
- page fault;
- proteção de memória;
- isolamento de processos.

---

## Como Funciona um Banco de Dados

Categoria: Computação Profunda  
Nível: Intermediário

Ideia central:
Banco de dados organiza dados para busca, consistência e persistência confiável.

Interações possíveis:
- tabela e índice;
- busca com/sem índice;
- transação commit/rollback;
- concorrência;
- query planner.

Tópicos:
- tabelas;
- índices;
- SQL;
- transações;
- ACID;
- isolamento;
- locks;
- B-trees;
- logs.

---

## Índices e B-Trees

Categoria: Computação Profunda  
Nível: Intermediário

Ideia central:
Índices aceleram buscas organizando dados em estruturas apropriadas.

Interações possíveis:
- busca sequencial vs índice;
- B-tree visual;
- inserção em árvore;
- busca por intervalo;
- custo de leitura.

Tópicos:
- índice;
- B-tree;
- complexidade;
- páginas de disco;
- busca por chave;
- range scan;
- trade-offs.

---

## Docker e Containers

Categoria: Computação Profunda  
Nível: Intermediário

Ideia central:
Containers empacotam aplicações com isolamento baseado em recursos do sistema operacional.

Interações possíveis:
- camadas de imagem;
- container rodando;
- volume;
- rede entre containers;
- comparação VM vs container.

Tópicos:
- imagem;
- container;
- Dockerfile;
- layers;
- registry;
- volumes;
- networks;
- namespaces;
- cgroups.

---

## Microserviços

Categoria: Computação Profunda / Arquitetura  
Nível: Intermediário

Ideia central:
Microserviços dividem um sistema em serviços independentes, mas aumentam a complexidade distribuída.

Interações possíveis:
- fluxo por API Gateway;
- evento em fila;
- falha e retry;
- tracing distribuído;
- consistência eventual.

Tópicos:
- monolito;
- serviços;
- API Gateway;
- mensageria;
- filas;
- eventos;
- observabilidade;
- resiliência;
- transações distribuídas.

---

# Programação de Baixo Nível

## Como um Programa Vira Processo

Categoria: Programação de Baixo Nível  
Nível: Intermediário

Ideia central:
Um programa no disco se torna um processo na memória por meio de carregamento, linking e inicialização.

Interações possíveis:
- arquivo executável → loader → memória;
- layout de memória;
- stack/heap/code/data;
- argumentos e ambiente;
- syscall exec.

Tópicos:
- executável;
- loader;
- linker;
- ELF;
- processo;
- espaço de endereçamento;
- stack;
- heap;
- segmento de código.

---

## Memória: Stack, Heap e Ponteiros

Categoria: Programação de Baixo Nível  
Nível: Intermediário

Ideia central:
Entender memória é entender onde os dados vivem, quanto tempo duram e como são acessados.

Interações possíveis:
- chamada de função criando stack frame;
- alocação no heap;
- ponteiro apontando para endereço;
- dangling pointer;
- memory leak.

Tópicos:
- stack;
- heap;
- ponteiros;
- endereços;
- alocação;
- desalocação;
- ownership;
- lifetime;
- bugs de memória.

---

## Como Funciona um Compilador

Categoria: Programação de Baixo Nível  
Nível: Intermediário

Ideia central:
Compiladores transformam código de alto nível em código executável por várias etapas.

Interações possíveis:
- código fonte → tokens;
- AST;
- análise semântica;
- IR;
- otimização;
- geração de assembly.

Tópicos:
- léxico;
- parser;
- AST;
- tipos;
- IR;
- otimização;
- backend;
- linking.

---

## Syscalls: Como Programas Conversam com o Kernel

Categoria: Programação de Baixo Nível  
Nível: Intermediário

Ideia central:
Syscalls são a ponte controlada entre programas de usuário e o kernel.

Interações possíveis:
- programa chamando write;
- transição user mode → kernel mode;
- open/read/write;
- erro de permissão;
- comparação função normal vs syscall.

Tópicos:
- user mode;
- kernel mode;
- syscall;
- file descriptor;
- open;
- read;
- write;
- fork;
- exec;
- mmap.

---

## Concorrência em Baixo Nível

Categoria: Programação de Baixo Nível  
Nível: Avançado inicial

Ideia central:
Concorrência exige coordenação para evitar estados inválidos e bugs difíceis.

Interações possíveis:
- race condition;
- mutex;
- atomic operations;
- memory ordering;
- deadlock;
- producer/consumer.

Tópicos:
- threads;
- atomicidade;
- locks;
- mutex;
- spinlock;
- deadlock;
- condição de corrida;
- memória compartilhada.

---

# Hardware e Arquitetura de Computadores

## Como Funciona uma CPU

Categoria: Hardware / Arquitetura  
Nível: Intermediário

Ideia central:
A CPU executa instruções simples em ciclos de busca, decodificação e execução.

Interações possíveis:
- ciclo fetch-decode-execute;
- registradores;
- ALU;
- unidade de controle;
- instrução passando pelo datapath.

Tópicos:
- CPU;
- instrução;
- registradores;
- ALU;
- clock;
- pipeline;
- cache;
- barramentos;
- ISA.

---

## Bits, Portas Lógicas e Circuitos

Categoria: Hardware / Arquitetura  
Nível: Iniciante/intermediário

Ideia central:
Computadores complexos são construídos a partir de operações simples sobre bits.

Interações possíveis:
- portas AND/OR/NOT;
- tabela verdade;
- somador binário;
- flip-flop;
- circuito combinacional.

Tópicos:
- bit;
- binário;
- porta lógica;
- tabela verdade;
- álgebra booleana;
- somador;
- memória básica;
- clock.

---

## Como Funciona a Memória RAM

Categoria: Hardware / Arquitetura  
Nível: Intermediário

Ideia central:
RAM armazena dados temporariamente em endereços acessados pela CPU.

Interações possíveis:
- célula de memória;
- endereço e dado;
- leitura/escrita;
- latência;
- comparação RAM/cache/SSD.

Tópicos:
- memória volátil;
- endereços;
- barramento;
- latência;
- largura de banda;
- DRAM;
- SRAM;
- hierarquia de memória.

---

## Cache de CPU

Categoria: Hardware / Arquitetura  
Nível: Intermediário/avançado inicial

Ideia central:
Cache reduz o custo de acessar memória explorando localidade.

Interações possíveis:
- cache hit/miss;
- linha de cache;
- localidade espacial/temporal;
- L1/L2/L3;
- exemplo de array.

Tópicos:
- memória cache;
- cache line;
- hit;
- miss;
- localidade;
- associatividade;
- políticas de substituição;
- performance.

---

## Pipeline de CPU

Categoria: Hardware / Arquitetura  
Nível: Avançado inicial

Ideia central:
Pipeline permite sobrepor etapas de execução de instruções para aumentar throughput.

Interações possíveis:
- instruções no pipeline;
- hazard;
- stall;
- branch prediction;
- comparação pipeline vs sem pipeline.

Tópicos:
- fetch;
- decode;
- execute;
- memory;
- writeback;
- hazards;
- forwarding;
- branch prediction;
- superscalar.

---

## Instruction Set Architecture: x86, ARM e RISC-V

Categoria: Hardware / Arquitetura  
Nível: Intermediário

Ideia central:
ISA define o contrato entre software e hardware: quais instruções a CPU entende.

Interações possíveis:
- mesma operação em ISAs diferentes;
- registradores;
- instrução load/store;
- comparação CISC vs RISC;
- decodificação de instrução.

Tópicos:
- ISA;
- x86;
- ARM;
- RISC-V;
- registradores;
- instruções;
- modos de endereçamento;
- compatibilidade.

---

## GPU: Por Que Ela É Boa para IA

Categoria: Hardware / IA  
Nível: Intermediário

Ideia central:
GPUs são eficientes para IA porque executam muitas operações matemáticas em paralelo.

Interações possíveis:
- CPU vs GPU;
- matriz multiplicando matriz;
- milhares de threads;
- tensor cores;
- batch processing.

Tópicos:
- paralelismo;
- SIMD/SIMT;
- CUDA;
- tensor cores;
- multiplicação de matrizes;
- VRAM;
- throughput;
- treinamento e inferência.

---

## TPU, NPU e Aceleradores de IA

Categoria: Hardware / IA  
Nível: Intermediário

Ideia central:
Aceleradores de IA são chips especializados para operações comuns em redes neurais.

Interações possíveis:
- CPU vs GPU vs TPU/NPU;
- matriz/tensor;
- fluxo de inferência;
- quantização;
- consumo energético.

Tópicos:
- aceleradores;
- TPU;
- NPU;
- matriz;
- inferência;
- treinamento;
- quantização;
- edge AI;
- eficiência energética.

---

## Como um SSD Funciona

Categoria: Hardware  
Nível: Intermediário

Ideia central:
SSDs armazenam dados em memória flash, com trade-offs de blocos, desgaste e controladora.

Interações possíveis:
- células NAND;
- páginas e blocos;
- wear leveling;
- TRIM;
- leitura vs escrita.

Tópicos:
- NAND flash;
- controladora;
- páginas;
- blocos;
- latência;
- desgaste;
- NVMe;
- SATA;
- TRIM.

---

## Barramentos: PCIe, USB e Comunicação Interna

Categoria: Hardware  
Nível: Intermediário

Ideia central:
Barramentos conectam componentes e definem como dados circulam dentro e fora do computador.

Interações possíveis:
- CPU ↔ RAM ↔ GPU;
- PCIe lanes;
- USB;
- largura de banda;
- latência.

Tópicos:
- barramento;
- PCIe;
- USB;
- SATA;
- NVMe;
- lanes;
- largura de banda;
- latência;
- dispositivos.

---

# Engenharia de Software e Arquitetura

## Monolito vs Microserviços

Categoria: Engenharia de Software  
Nível: Intermediário

Ideia central:
Monolito e microserviços resolvem problemas diferentes e têm custos diferentes.

Interações possíveis:
- fluxo de pedido;
- divisão de serviços;
- falha parcial;
- deploy;
- latência.

Tópicos:
- acoplamento;
- deploy;
- escalabilidade;
- observabilidade;
- complexidade;
- transações;
- comunicação.

---

## Event-Driven Architecture

Categoria: Engenharia de Software  
Nível: Intermediário

Ideia central:
Arquitetura orientada a eventos permite desacoplar serviços por meio de mensagens.

Interações possíveis:
- produtor → broker → consumidores;
- fila vs tópico;
- retry;
- dead letter queue;
- consistência eventual.

Tópicos:
- eventos;
- mensagens;
- Kafka;
- RabbitMQ;
- pub/sub;
- idempotência;
- replay;
- observabilidade.

---

## Observabilidade

Categoria: Engenharia de Software  
Nível: Intermediário

Ideia central:
Observabilidade ajuda a entender o comportamento interno de sistemas a partir de sinais externos.

Interações possíveis:
- logs, métricas e traces;
- request atravessando serviços;
- alerta;
- dashboard;
- debug distribuído.

Tópicos:
- logs;
- métricas;
- traces;
- OpenTelemetry;
- SLO;
- SLIs;
- alertas;
- troubleshooting.

---

## APIs REST

Categoria: Engenharia de Software  
Nível: Iniciante/intermediário

Ideia central:
REST organiza comunicação entre cliente e servidor usando recursos, métodos e representações.

Interações possíveis:
- request/response;
- métodos HTTP;
- status codes;
- recurso;
- paginação.

Tópicos:
- GET;
- POST;
- PUT;
- PATCH;
- DELETE;
- status codes;
- headers;
- JSON;
- autenticação.

---

## GraphQL

Categoria: Engenharia de Software  
Nível: Intermediário

Ideia central:
GraphQL permite que o cliente especifique exatamente quais dados deseja.

Interações possíveis:
- query visual;
- schema;
- resolver;
- overfetching vs underfetching;
- comparação REST vs GraphQL.

Tópicos:
- schema;
- types;
- queries;
- mutations;
- resolvers;
- fragments;
- cache;
- trade-offs.

---

## Autenticação e Autorização

Categoria: Engenharia de Software / Segurança  
Nível: Intermediário

Ideia central:
Autenticação responde “quem é você?”; autorização responde “o que você pode fazer?”.

Interações possíveis:
- login;
- JWT;
- refresh token;
- roles;
- fluxo OAuth.

Tópicos:
- sessão;
- token;
- JWT;
- OAuth;
- refresh token;
- RBAC;
- permissões;
- segurança.

---

# Segurança e Criptografia

## Criptografia Moderna

Categoria: Segurança  
Nível: Intermediário

Ideia central:
Criptografia protege confidencialidade, integridade e autenticidade da informação.

Interações possíveis:
- cifrar/decifrar;
- chave simétrica;
- chave pública/privada;
- assinatura digital;
- troca de chaves.

Tópicos:
- criptografia simétrica;
- assimétrica;
- hash;
- assinatura;
- TLS;
- chaves;
- integridade;
- autenticação.

---

## Hashes

Categoria: Segurança / Computação  
Nível: Iniciante/intermediário

Ideia central:
Hash transforma dados em uma impressão digital de tamanho fixo.

Interações possíveis:
- alterar um caractere e ver hash mudar;
- colisão conceitual;
- senha + salt;
- comparação hash vs criptografia.

Tópicos:
- função hash;
- determinismo;
- avalanche effect;
- colisão;
- salt;
- senhas;
- integridade.

---

## TLS e HTTPS

Categoria: Segurança / Internet  
Nível: Intermediário

Ideia central:
TLS protege comunicação na web usando criptografia, certificados e troca de chaves.

Interações possíveis:
- handshake TLS;
- certificado;
- chave simétrica negociada;
- ataque man-in-the-middle;
- HTTP vs HTTPS.

Tópicos:
- TLS;
- certificado;
- CA;
- chave pública;
- chave simétrica;
- handshake;
- HTTPS;
- segurança web.

---

## Segurança de Memória

Categoria: Segurança / Baixo Nível  
Nível: Intermediário/avançado inicial

Ideia central:
Muitos bugs de segurança surgem de acesso incorreto à memória.

Interações possíveis:
- buffer overflow;
- use-after-free;
- stack overflow;
- layout de memória;
- comparação C vs Rust.

Tópicos:
- overflow;
- ponteiros;
- heap;
- stack;
- memória liberada;
- exploração;
- mitigação;
- linguagens seguras.

---

