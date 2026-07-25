# Validação acadêmica — Computação Onda 2

## Escopo validado

Pasta: `src/lessons/computacao/`

Aulas revisadas:

1. `como-um-programa-vira-processo`
2. `syscalls-kernel`
3. `como-funciona-um-compilador`
4. `pipeline-de-cpu`
5. `isa-x86-arm-riscv`
6. `apis-rest`
7. `autenticacao-e-autorizacao`
8. `tls-e-https`
9. `observabilidade-de-sistemas`
10. `filas-e-arquitetura-event-driven`

## Critérios

- precisão conceitual
- uso correto de termos técnicos
- alinhamento com documentação oficial e material didático confiável
- distinção entre simplificação didática aceitável e simplificação enganosa
- consistência entre conteúdo principal e interações pedagógicas

## Resultado geral

- **Críticos:** 0
- **Maiores:** 3
- **Menores:** 2
- **Correções aplicadas nesta rodada:** 3 maiores
- **Aulas sem achados críticos/maiores:** 7 de 10

## Achados por aula

| Aula | Status | Observação |
| --- | --- | --- |
| `como-um-programa-vira-processo` | major corrigido | Ajustado o papel do kernel vs. loader dinâmico no caminho de `execve` para executáveis ELF dinamicamente ligados. |
| `syscalls-kernel` | ok | Sem achados críticos/maiores. Conteúdo conceitualmente sólido. |
| `como-funciona-um-compilador` | major corrigido | Ajustada a distinção entre compilação, geração de objeto e etapas posteriores da toolchain, como assembler/linker. |
| `pipeline-de-cpu` | ok | Sem achados críticos/maiores. Taxonomia de hazards e trade-offs bem apresentada. |
| `isa-x86-arm-riscv` | ok | Sem achados críticos/maiores. Diferença entre ISA, ABI e microarquitetura está coerente. |
| `apis-rest` | major corrigido | Corrigida a ambiguidade entre REST em sentido acadêmico estrito e uso pragmático de mercado para APIs HTTP orientadas a recursos. |
| `autenticacao-e-autorizacao` | minor | Poderia nomear explicitamente OAuth 2.0 como autorização delegada e citar OIDC ao falar de autenticação federada. |
| `tls-e-https` | minor | Poderia explicitar melhor que validação de certificado inclui hostname/SAN, validade e cadeia de confiança, não só “ter um certificado”. |
| `observabilidade-de-sistemas` | ok | Sem achados críticos/maiores. Conteúdo bem alinhado a OpenTelemetry/SRE. |
| `filas-e-arquitetura-event-driven` | ok | Sem achados críticos/maiores. Boas ressalvas sobre idempotência e limites de exactly-once. |

## Correções aplicadas

### 1) `como-um-programa-vira-processo`

**Severidade:** major

**Problema:** o texto atribuía ao kernel o carregamento de bibliotecas compartilhadas em executáveis dinâmicos de forma excessivamente direta. Isso simplifica demais o fluxo real em Linux/ELF e pode levar o aluno a perder a distinção entre o trabalho do kernel e o do interpretador/loader dinâmico.

**Correção aplicada:**

- o conteúdo principal agora explica que:
  - o kernel valida o executável e prepara a nova imagem;
  - em binários ELF dinamicamente ligados, o kernel transfere o controle ao interpretador indicado;
  - o loader dinâmico em espaço de usuário resolve e carrega bibliotecas compartilhadas antes de a aplicação assumir o controle.
- a interação visual foi alinhada com essa distinção.

**Arquivos alterados:**

- `src/lessons/computacao/como-um-programa-vira-processo/content.ts`
- `src/lessons/computacao/como-um-programa-vira-processo/interactions.tsx`

### 2) `como-funciona-um-compilador`

**Severidade:** major

**Problema:** a narrativa aproximava demais “compilar” de “gerar executável final”, o que pode confundir compilador com toolchain completa. Em cursos introdutórios isso é comum, mas academicamente vale separar compilação, geração de código/objeto, montagem e linking.

**Correção aplicada:**

- o texto de abertura passou a dizer explicitamente que, em toolchains reais, o compilador frequentemente produz assembly, código de máquina ou arquivo objeto;
- ficou claro que assembler e linker podem completar o caminho até o binário final;
- a interação do pipeline do compilador foi ajustada para refletir essa continuidade da toolchain.

**Arquivos alterados:**

- `src/lessons/computacao/como-funciona-um-compilador/content.ts`
- `src/lessons/computacao/como-funciona-um-compilador/interactions.tsx`

### 3) `apis-rest`

**Severidade:** major

**Problema:** a aula usava “REST” de modo suficientemente pragmático para o mercado, mas sem distinguir de forma explícita o sentido acadêmico estrito formulado por Roy Fielding. Isso podia induzir a equivalência incorreta entre:

- “API HTTP com recursos, métodos e status bem usados”
- e “REST completo”

**Correção aplicada:**

- o objetivo de aprendizagem foi refinado para explicitar a diferença entre o sentido acadêmico e o uso pragmático;
- a introdução agora registra que REST, em sentido estrito, inclui restrições como statelessness, cache, mensagens autodescritivas e hipermídia;
- a seção de limites do estilo passou a listar as restrições centrais do estilo REST;
- o glossário foi ajustado;
- as interações trocaram rótulos que tratavam o caso pragmático como se fosse automaticamente “REST completo”.

**Arquivos alterados:**

- `src/lessons/computacao/apis-rest/content.ts`
- `src/lessons/computacao/apis-rest/interactions.tsx`

## Itens menores mantidos sem alteração

Mantidos como observações por não configurarem erro crítico/maior e para preservar a edição cirúrgica pedida:

1. `autenticacao-e-autorizacao`: oportunidade de separar com mais nitidez OAuth 2.0 e OpenID Connect.
2. `tls-e-https`: oportunidade de tornar a validação de identidade do servidor mais operacional, citando hostname/SAN e validade.

## Fontes de checagem usadas nesta validação

- `execve(2)` — Linux man-pages  
  https://man7.org/linux/man-pages/man2/execve.2.html
- Roy Fielding, *Representational State Transfer (REST)*  
  https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm
- RFC 9110 — HTTP Semantics  
  https://www.rfc-editor.org/rfc/rfc9110.html
- LLVM Tutorial — *My First Language Frontend with LLVM*  
  https://llvm.org/docs/tutorial/MyFirstLanguageFrontend/index.html
- Referências já presentes nas próprias aulas (OWASP, RFC 8446, OpenTelemetry, OSTEP, MIT OCW, RISC-V, Intel, Arm, RabbitMQ, Kafka, Google SRE, Prometheus)

## Verificação executada

Comando executado:

```bash
npm run build
```

Resultado:

- `validate:lessons` passou
- `tsc -b` passou
- `vite build` passou

## Resumo executivo

O conjunto está **forte academicamente** e não apresentou erros críticos. Os problemas relevantes encontrados foram de **nuance técnica importante**, não de base conceitual ampla. As três correções aplicadas melhoram fidelidade sem mudar o estilo didático das aulas.
