import type { LessonModule } from "../../../types/content";
import { createComputacaoInteractions } from "../_shared/factories";

const interactionConfig = {
  "title": "Criptografia Moderna (Intuição)",
  "pipelineSteps": [
    {
      "name": "Estabelecimento de chaves",
      "summary": "As partes combinam ou derivam segredos adequados ao contexto.",
      "signal": "handshake",
      "risk": "troca de chaves fraca",
      "takeaway": "Sem chaves certas, o resto do protocolo começa torto."
    },
    {
      "name": "Cifra e autenticação",
      "summary": "Os dados são protegidos com algoritmos apropriados e verificação de integridade ou autenticidade.",
      "signal": "nonce e tag",
      "risk": "mensagem alterada ou nonce reutilizado",
      "takeaway": "Sigilo sem autenticidade não basta."
    },
    {
      "name": "Verificação de origem",
      "summary": "Certificados, assinaturas ou contexto de confiança dizem quem pode falar por quem.",
      "signal": "cadeia de certificados",
      "risk": "aceitar origem falsa",
      "takeaway": "Confiar no emissor é parte do problema."
    },
    {
      "name": "Rotação e revogação",
      "summary": "Segredos e credenciais precisam ser atualizados e removidos quando expostos.",
      "signal": "lifecycle de chaves",
      "risk": "segredo eterno",
      "takeaway": "Criptografia também é operação contínua."
    }
  ],
  "leftLabel": "simplicidade operacional",
  "rightLabel": "garantias criptográficas fortes",
  "tradeoffSummary": "Quanto mais você delega segurança a protocolos maduros, mais key management e disciplina operacional precisa abraçar - mas menos improviso perigoso deixa escapar segredos ou aceitar mensagens falsas.",
  "tradeoffRisks": [
    "Operação mais simples, mas com proteção insuficiente para canais hostis.",
    "Boa segurança prática, desde que as premissas sejam respeitadas.",
    "Mais garantias, com maior disciplina de gestão de chaves e compatibilidade.",
    "Complexidade excessiva e soluções caseiras podem introduzir falhas piores do que protocolos padrões."
  ],
  "practiceRule": "reuse protocolos padrão, trate chaves como ativos de primeira classe e faça autenticidade ser explícita",
  "scenarios": [
    {
      "name": "API pública",
      "situation": "Clientes desconhecidos acessam um serviço pela Internet.",
      "choice": "Usar protocolo padronizado como TLS para proteger o transporte e autenticar a origem do servidor.",
      "why": "O problema envolve canal hostil e múltiplos clientes, não apenas cifrar um payload solto.",
      "caution": "Não substitua TLS por criptografia própria no aplicativo."
    },
    {
      "name": "Artefato assinado",
      "situation": "Um time quer provar que um release veio do produtor correto.",
      "choice": "Usar assinatura digital sobre um hash do conteúdo, com gestão confiável da chave privada.",
      "why": "Aqui a pergunta central é autoria verificável, não só sigilo.",
      "caution": "Hash sem assinatura não responde quem publicou o artefato."
    },
    {
      "name": "Segredo interno",
      "situation": "Serviços internos precisam compartilhar um segredo de alta sensibilidade.",
      "choice": "Distribuir o segredo por mecanismo confiável e armazená-lo com políticas explícitas de rotação e acesso.",
      "why": "A criptografia falha rápido quando key management é improvisado.",
      "caution": "Copiar chaves em código ou variáveis sem governança vira risco operacional."
    }
  ]
};

export const interactions = createComputacaoInteractions(interactionConfig) satisfies LessonModule["interactions"];
