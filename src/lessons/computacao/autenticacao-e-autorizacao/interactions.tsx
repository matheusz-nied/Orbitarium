import type { LessonModule } from "../../../types/content";
import { buildComputacaoInteractions } from "../shared/lessonFactory";

export const interactions = buildComputacaoInteractions({
  "flow": {
    "id": "auth-flow-lab",
    "eyebrow": "Fluxo",
    "title": "Siga o caminho da identidade até o acesso",
    "description": "Veja onde identidade, estado e política realmente entram em jogo.",
    "tone": "indigo",
    "icon": "KeyRound",
    "stages": [
      {
        "label": "Credencial",
        "detail": "O usuário ou sistema apresenta um autenticador para provar identidade.",
        "cue": "senha, MFA, chave, provedor"
      },
      {
        "label": "Verificação",
        "detail": "O sistema valida a prova e decide se a identidade pode ser estabelecida.",
        "cue": "AuthN"
      },
      {
        "label": "Sessão/Token",
        "detail": "Um vínculo de continuidade passa a representar chamadas futuras.",
        "cue": "estado autenticado"
      },
      {
        "label": "Política",
        "detail": "Cada ação relevante ainda precisa ser confrontada com regras de acesso.",
        "cue": "AuthZ"
      },
      {
        "label": "Recurso",
        "detail": "O acesso só é concedido quando identidade e permissão combinam com o contexto.",
        "cue": "decisão final"
      }
    ]
  },
  "compare": {
    "id": "identity-models-lab",
    "eyebrow": "Veículos de estado",
    "title": "Compare sessão, JWT e API key",
    "description": "Observe como cada mecanismo organiza ergonomia, revogação e uso esperado.",
    "tone": "violet",
    "icon": "ArrowRightLeft",
    "options": [
      {
        "label": "Sessão",
        "headline": "Estado centralizado e fácil revogação",
        "bullets": [
          "O servidor mantém o vínculo autenticado.",
          "Boa ergonomia para aplicações web tradicionais.",
          "Facilita invalidação central quando bem desenhada."
        ]
      },
      {
        "label": "JWT/Access token",
        "headline": "Contexto portável, mas sensível a escopo e validade",
        "bullets": [
          "Escala bem em cenários distribuídos.",
          "Expiração, rotação e claims precisam ser pensadas com cuidado.",
          "Não substitui política de recurso."
        ]
      },
      {
        "label": "API key",
        "headline": "Identidade de integração mais simples e mais estreita",
        "bullets": [
          "Funciona bem para serviços e automações.",
          "Costuma ser inadequada para papéis humanos ricos.",
          "Exige gestão clara de escopo, rotação e auditoria."
        ]
      }
    ]
  },
  "slider": {
    "id": "privilege-dial-lab",
    "eyebrow": "Política",
    "title": "Ajuste a granularidade de acesso",
    "description": "Compare modelos amplos e simples com modelos mais finos e auditáveis.",
    "tone": "emerald",
    "icon": "BarChart3",
    "axisLabel": "Modelo de privilégio",
    "states": [
      {
        "label": "Permissões muito amplas",
        "summary": "Tudo fica fácil no curto prazo, mas o sistema começa a superconceder acesso e a esconder risco.",
        "leftLabel": "Simplicidade inicial",
        "leftValue": 88,
        "rightLabel": "Controle fino",
        "rightValue": 24,
        "takeaway": "O atalho costuma virar dívida de segurança e governança.",
        "metrics": [
          {
            "label": "Modelagem",
            "value": "Simples"
          },
          {
            "label": "Risco de excesso",
            "value": "Alto"
          },
          {
            "label": "Auditoria",
            "value": "Pobre"
          },
          {
            "label": "Escalabilidade política",
            "value": "Baixa"
          }
        ]
      },
      {
        "label": "Papéis bem definidos",
        "summary": "RBAC bem desenhado oferece um bom ponto médio para muitos produtos.",
        "leftLabel": "Simplicidade inicial",
        "leftValue": 62,
        "rightLabel": "Controle fino",
        "rightValue": 70,
        "takeaway": "É o patamar mais comum de maturidade útil antes de políticas contextuais mais ricas.",
        "metrics": [
          {
            "label": "Modelagem",
            "value": "Moderada"
          },
          {
            "label": "Risco de excesso",
            "value": "Médio"
          },
          {
            "label": "Auditoria",
            "value": "Boa"
          },
          {
            "label": "Escalabilidade política",
            "value": "Boa"
          }
        ]
      },
      {
        "label": "Política contextual",
        "summary": "A decisão considera atributos, relação com o recurso, tenant, ambiente e escopo delegado.",
        "leftLabel": "Simplicidade inicial",
        "leftValue": 30,
        "rightLabel": "Controle fino",
        "rightValue": 92,
        "takeaway": "Mais caro de desenhar e testar, mas muito melhor para cenários sensíveis e multi-tenant.",
        "metrics": [
          {
            "label": "Modelagem",
            "value": "Alta"
          },
          {
            "label": "Risco de excesso",
            "value": "Menor"
          },
          {
            "label": "Auditoria",
            "value": "Muito boa"
          },
          {
            "label": "Escalabilidade política",
            "value": "Alta"
          }
        ]
      }
    ]
  }
}) satisfies LessonModule["interactions"];
