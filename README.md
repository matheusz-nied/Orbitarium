<div align="center">

# Orbitarium

**Plataforma educacional interativa para disciplinas complexas**

Cada aula é uma experiência guiada — não apenas texto, mas simuladores, quizzes, diagramas animados e progressão didática estruturada.

[**Ver demo ao vivo →**](https://orbitarium-edu.netlify.app) &nbsp;·&nbsp; [Reportar bug](https://github.com/matheusz-nied/orbitarium/issues) &nbsp;·&nbsp; [Sugerir tema](https://github.com/matheusz-nied/orbitarium/issues)

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

</div>

---

## O projeto

O Orbitarium nasceu de uma premissa simples: temas como astrofísica e inteligência artificial são frequentemente mal ensinados porque o material é estático. Texto não transmite órbitas. Parágrafos não ensinam espaços vetoriais.

A plataforma resolve isso separando conteúdo de apresentação. Cada aula vive em um arquivo TypeScript fortemente tipado — um contrato de dados com seções, blocos didáticos, quiz, glossário e referências. A camada de UI consome esses dados e injeta componentes interativos sob demanda: simuladores, calculadoras, timelines animadas, diagramas SVG.

O resultado é uma aula que pode ser criada rapidamente sem tocar no layout, e um layout que evolui sem quebrar nenhuma aula existente.

---

## Decisões de arquitetura

### Separação estrita entre dados e UI

O conteúdo de cada aula é definido em `content.ts`, tipado pelo contrato `LessonContent`. A camada de apresentação não sabe nada sobre astrofísica ou embeddings — ela apenas renderiza o que os dados descrevem.

```typescript
// Uma aula é um objeto de dados puro.
// O layout nunca precisa mudar para acomodar novo conteúdo.
export const burracosNegrosContent: LessonContent = {
  id: "buracos-negros",
  sections: [...],
  quiz: [...],
  glossary: [...],
}
```

### Injeção de componentes visuais por ID

As interações são mapeadas por identificadores estáticos. A aula declara `visual: "horizonte-eventos"` — o runtime resolve qual componente React renderizar. Isso mantém os arquivos de conteúdo limpos e permite substituir ou evoluir componentes sem alterar os dados.

```typescript
// content.ts — declara o que precisa, não como renderizar
{ visual: "horizonte-eventos", interactive: "simulador-orbital" }

// visuals.tsx — resolve o componente em runtime
const visualMap: Record<string, React.ComponentType> = {
  "horizonte-eventos": HorizonteEventosVisual,
  "simulador-orbital": SimuladorOrbital,
}
```

### Schema pedagógico como cidadão de primeira classe

O modelo de dados não é uma coleção genérica de strings. É estruturado em torno de como pessoas aprendem:

- `blocks` com tipos explícitos: `definition`, `insight`, `mistake`, `example`
- `timeline` para contextualização histórica
- `quiz` com feedback por resposta
- `glossary` com definições precisas
- `prerequisites` e `learningObjectives` declarados formalmente

### Validação automatizada de conteúdo

```bash
npm run validate:lessons
```

Nenhuma aula quebra silenciosamente em produção. O pipeline verifica schema, campos obrigatórios e consistência antes de qualquer build.

---

## Stack

| Camada | Tecnologia | Decisão |
|---|---|---|
| Framework | React 19 | Padrões modernos, Server Components prontos para uso futuro |
| Linguagem | TypeScript 5 | Tipagem estrita do schema ao componente |
| Build | Vite 7 | HMR instantâneo, bundle otimizado |
| Estilos | Tailwind CSS v4 | Design system baseado em utilidades, sem CSS customizado desnecessário |
| Animações | Framer Motion | Micro-interações e transições de página sem janks |
| Roteamento | React Router v7 | Navegação SPA declarativa |

---

## Como rodar

```bash
git clone https://github.com/seu-usuario/orbitarium.git
cd orbitarium
npm install
npm run dev
```

Abra `http://localhost:5173`.

**Scripts disponíveis:**

```bash
npm run dev              # Servidor de desenvolvimento com HMR
npm run validate:lessons # Valida o schema de todas as aulas
npm run typecheck        # Verificação TypeScript sem build
npm run build            # validate → typecheck → bundle de produção
```

---

## Estrutura relevante

```
src/
├── types/
│   └── content.ts          # Contrato central — LessonContent e tipos relacionados
├── data/
│   └── lessons/            # Uma pasta por aula, um arquivo content.ts por aula
├── components/
│   ├── lesson/
│   │   ├── visuals.tsx     # Mapa de ID → componente visual
│   │   └── interactions.tsx# Mapa de ID → componente interativo
│   └── ui/                 # Componentes de apresentação reutilizáveis
└── pages/
    └── LessonPage.tsx      # Consome LessonContent, delega renderização
```

---

<div align="center">
<sub>Construído com atenção a didática, arquitetura e detalhe de interface.</sub>
</div>