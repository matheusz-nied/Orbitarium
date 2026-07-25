# Hallucination Audit - manifesto_aulas_ia.json (`toCreate`)

## Escopo

- Aulas auditadas: **59**
- Fonte da lista: `/workspace/prompts/manifesto_aulas_ia.json` -> `toCreate`
- Arquivos inspecionados: `content.ts` correspondentes em `src/lessons/**`

## Resultado resumido

- **Issues encontrados:** 11
- **Issues corrigidos:** 11
- **Issues restantes (confirmados):** 0

## Metodologia

1. Mapeamento automático dos 59 `lessonId` do manifesto para seus respectivos `content.ts`.
2. Extração e triagem de referências, URLs e linhas com numerais potencialmente factuais.
3. Verificação automatizada de URLs com foco em 404 e slugs claramente errados.
4. Checagem cruzada de anos em referências arXiv, comparando o ano declarado no `source` com o ano implícito no identificador arXiv quando a citação dizia explicitamente `arXiv`.
5. Verificação pontual via busca web/fetch para referências suspeitas, especialmente:
   - papers filosóficos recentes em `agencia-autonomia-limites-llms`
   - OWASP 2025 e materiais da Microsoft sobre prompt injection
   - páginas da OpenAI com slugs parecidos
6. Revisão manual direcionada para alegações contestáveis, definições de glossário e claims numéricos.

## O que foi confirmado como problema

| Lesson ID | Categoria | Problema confirmado | Correção aplicada |
| --- | --- | --- | --- |
| `pre-treino-dados-scaling-laws` | Ano de paper | `The Pile` estava como `Gao et al., 2020 — arXiv`, mas o link `arXiv:2101.00027` corresponde a 2021. | Ajustado para `Gao et al., 2021 — arXiv`. |
| `alucinacoes-em-ia` | Ano de paper | `Survey of Hallucination in Natural Language Generation` estava como `Ji et al., 2023 — arXiv`, mas o link `arXiv:2202.03629` corresponde a 2022. | Ajustado para `Ji et al., 2022 — arXiv`. |
| `alucinacoes-em-ia` | Ano de paper | `A Survey on Hallucination in Large Language Models...` estava como `Huang et al., 2024 — arXiv`, mas o link `arXiv:2311.05232` corresponde a 2023. | Ajustado para `Huang et al., 2023 — arXiv`. |
| `prompt-engineering-com-fundamento` | Ano de paper | `ReAct` estava como `Yao et al., 2023 — arXiv`, mas o link `arXiv:2210.03629` corresponde a 2022. | Ajustado para `Yao et al., 2022 — arXiv`. |
| `rag-retrieval-augmented-generation` | Ano de paper | `Lost in the Middle` estava como `Liu et al., 2024 — arXiv`, mas o link `arXiv:2307.03172` corresponde a 2023. | Ajustado para `Liu et al., 2023 — arXiv`. |
| `rag-retrieval-augmented-generation` | Ano de paper | `Retrieval-Augmented Generation for Large Language Models: A Survey` estava como `Gao et al., 2024 — arXiv`, mas o link `arXiv:2312.10997` corresponde a 2023. | Ajustado para `Gao et al., 2023 — arXiv`. |
| `chunking-ranking-bases-vetoriais` | Ano de paper | `Lost in the Middle` repetia o mesmo ano incorreto (`2024 — arXiv`) para `arXiv:2307.03172`. | Ajustado para `Liu et al., 2023 — arXiv`. |
| `inferencia-latencia-batching-throughput` | URL quebrada | Link `TensorRT Best Practices` apontava para `.../10.15.1/.../best-practices.html`, retornando 404. | Trocado para `https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/best-practices.html`. |
| `gpus-vram-custo-real-ia` | URL quebrada | Repetia o mesmo link 404 de `TensorRT Best Practices`. | Trocado para `https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/best-practices.html`. |
| `privacidade-pii-dados-sensiveis-ia` | URL migrada/quebrada | Link de Presidio usava o domínio antigo `microsoft.github.io/presidio/...`, que falhou na checagem direta; o projeto migrou para o domínio Data Privacy Stack. | Trocado para `https://presidio.dataprivacystack.org/getting_started/getting_started_text/`. |
| `agencia-autonomia-limites-llms` | URL incorreta | A referência `Why language models hallucinate` apontava para `openai.com/research/...`, mas a página canônica atual é `openai.com/index/...`. | Trocado para `https://openai.com/index/why-language-models-hallucinate/` e `source` simplificado para `OpenAI`. |

## O que parecia suspeito, mas foi validado

- Os papers filosóficos recentes em `agencia-autonomia-limites-llms` com DOIs Springer 2025/2026 **existem**.
- `BenchmarkCards: Standardized Documentation for Large Language Model Benchmarks` **existe** e o arXiv `2410.12974` está coerente com a obra.
- `OWASP Top 10 for LLM Applications 2025` **existe**.
- `Defending Against Indirect Prompt Injection Attacks With Spotlighting` **existe** e a URL da Microsoft Research está coerente.
- O post `How Microsoft defends against indirect prompt injection attacks` **existe**.

## O que NAO foi confirmado como problema

- **Nenhum título de paper foi confirmado como fabricado** nas 59 aulas.
- **Nenhuma autoria foi confirmada como inventada** nas 59 aulas.
- **Nenhuma definição de glossário foi confirmada como factualmente errada** nas 59 aulas auditadas.
- **Nenhuma alegação numérica factual sem fonte foi confirmada** entre as 59 novas aulas; os numerais encontrados estavam em:
  - exemplos hipotéticos claramente didáticos,
  - fórmulas,
  - nomes de papers/datasets,
  - percentis e métricas explicadas conceitualmente.
- **Nenhum claim excessivamente confiante como “ciência liquidada” foi confirmado** após revisão manual direcionada; as aulas mais sensíveis já estavam escritas com ressalvas adequadas.

## Observações

- Alguns hosts retornaram `403` para automação (`openai.com`, alguns links Microsoft e DOI/Wiley), o que **nao** foi tratado automaticamente como evidência de URL falsa. Nesses casos, a validação foi feita por busca web e pelo padrão canônico da página.
- O critério aqui foi conservador: **corrigir apenas o que pôde ser confirmado**, preferindo remover inconsistência de metadado ou ajustar URL canônica em vez de “inventar” nova referência.
