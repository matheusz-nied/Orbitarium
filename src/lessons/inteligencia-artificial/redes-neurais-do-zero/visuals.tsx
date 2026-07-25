import type { LessonModule } from "../../../types/content";

export const visuals = {
  "redes-neurais-hero": RedesNeuraisHeroVisual,
  "motivacao-aprendizado": MotivacaoAprendizadoVisual,
  "neuronio-anatomia": NeuronioAnatomiaVisual,
  "camadas-composicao": CamadasComposicaoVisual,
  "forward-pass-diagrama": ForwardPassDiagramaVisual,
  "perda-como-bussola": PerdaComoBussolaVisual,
  "treinamento-em-loop": TreinamentoEmLoopVisual,
} satisfies LessonModule["visuals"];

function RedesNeuraisHeroVisual() {
  return (
    <figure className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-900/10">
      <svg className="w-full" viewBox="0 0 760 420" role="img" aria-label="Rede neural transformando entradas em previsões">
        <defs>
          <linearGradient id="rnHeroBg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="55%" stopColor="#f5f3ff" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <rect width="760" height="420" rx="28" fill="url(#rnHeroBg)" />
        <text x="380" y="52" textAnchor="middle" fill="#312e81" fontSize="26" fontWeight="900">
          Da entrada bruta à previsão
        </text>
        {[130, 210, 290].map((y, i) => (
          <g key={y}>
            <circle cx="100" cy={y} r="24" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
            <text x="100" y={y + 6} textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="900">
              x{i + 1}
            </text>
          </g>
        ))}
        {[150, 270].map((y, i) => (
          <g key={y}>
            <circle cx="320" cy={y} r="30" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
            <text x="320" y={y + 6} textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="900">
              h{i + 1}
            </text>
          </g>
        ))}
        <circle cx="560" cy="210" r="34" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="560" y="216" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">
          ŷ
        </text>
        {[[100,130,320,150],[100,130,320,270],[100,210,320,150],[100,210,320,270],[100,290,320,150],[100,290,320,270],[320,150,560,210],[320,270,560,210]].map(([x1,y1,x2,y2], idx) => (
          <path key={idx} d={`M ${x1 + 24} ${y1} C ${x1 + 90} ${y1}, ${x2 - 90} ${y2}, ${x2 - 30} ${y2}`} stroke={idx < 6 ? "#818cf8" : "#5eead4"} strokeWidth="4" fill="none" strokeLinecap="round" />
        ))}
        <rect x="70" y="335" width="620" height="54" rx="18" fill="#ffffff" stroke="#c7d2fe" strokeWidth="2" />
        <text x="380" y="367" textAnchor="middle" fill="#334155" fontSize="15" fontWeight="800">
          pesos definem influência • bias desloca a resposta • camadas compõem padrões
        </text>
      </svg>
    </figure>
  );
}

function MotivacaoAprendizadoVisual() {
  return (
    <figure className="rounded-[2rem] border border-sky-200 bg-sky-50 p-4 shadow-xl shadow-sky-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Comparação entre regras manuais e aprendizado por dados">
        <rect width="760" height="340" rx="28" fill="#f0f9ff" />
        <text x="380" y="48" textAnchor="middle" fill="#0c4a6e" fontSize="22" fontWeight="900">
          Regras manuais vs aprendizado por exemplos
        </text>
        <rect x="70" y="90" width="260" height="180" rx="20" fill="#ffffff" stroke="#0ea5e9" strokeWidth="3" />
        <text x="200" y="126" textAnchor="middle" fill="#0369a1" fontSize="17" fontWeight="900">Sistema baseado em regras</text>
        <text x="95" y="165" fill="#0f172a" fontSize="14" fontWeight="700">• se borda forte e simetria alta...</text>
        <text x="95" y="195" fill="#0f172a" fontSize="14" fontWeight="700">• se ruído baixo e brilho médio...</text>
        <text x="95" y="225" fill="#0f172a" fontSize="14" fontWeight="700">• se caso raro, adicione outra regra...</text>
        <rect x="430" y="90" width="260" height="180" rx="20" fill="#ffffff" stroke="#22c55e" strokeWidth="3" />
        <text x="560" y="126" textAnchor="middle" fill="#166534" fontSize="17" fontWeight="900">Rede treinada com dados</text>
        <circle cx="500" cy="175" r="22" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <circle cx="620" cy="175" r="22" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <circle cx="560" cy="235" r="22" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <path d="M522 175h76" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
        <path d="M515 191l30 28" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
        <path d="M605 191l-30 28" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
        <text x="560" y="315" textAnchor="middle" fill="#166534" fontSize="15" fontWeight="800">
          a regra útil emerge do ajuste dos parâmetros
        </text>
      </svg>
    </figure>
  );
}

function NeuronioAnatomiaVisual() {
  return (
    <figure className="rounded-[2rem] border border-violet-200 bg-violet-50 p-4 shadow-xl shadow-violet-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Anatomia de um neurônio artificial">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">
          Cada neurônio faz uma conta pequena
        </text>
        {[110, 170, 230].map((y, i) => (
          <g key={y}>
            <circle cx="110" cy={y} r="22" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
            <text x="110" y={y + 6} textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="900">x{i + 1}</text>
            <path d={`M 132 ${y} C 190 ${y}, 230 ${y}, 285 ${y}`} stroke="#a78bfa" strokeWidth="4" fill="none" strokeLinecap="round" />
            <text x="205" y={y - 10} textAnchor="middle" fill="#6d28d9" fontSize="12" fontWeight="800">w{i + 1}</text>
          </g>
        ))}
        <circle cx="370" cy="170" r="54" fill="#ffffff" stroke="#7c3aed" strokeWidth="4" />
        <text x="370" y="160" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">Σ + b</text>
        <text x="370" y="186" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="800">soma ponderada</text>
        <path d="M424 170h88" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
        <rect x="520" y="132" width="100" height="76" rx="18" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="570" y="164" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">φ(z)</text>
        <text x="570" y="188" textAnchor="middle" fill="#0f766e" fontSize="12" fontWeight="800">ativação</text>
        <path d="M620 170h44" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        <circle cx="688" cy="170" r="22" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="688" y="176" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="900">a</text>
        <text x="380" y="300" textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="800">
          pesos dizem “quanto ouvir” • bias ajusta o limiar • ativação molda a resposta
        </text>
      </svg>
    </figure>
  );
}

function CamadasComposicaoVisual() {
  return (
    <figure className="rounded-[2rem] border border-teal-200 bg-teal-50 p-4 shadow-xl shadow-teal-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Camadas compondo representações cada vez mais abstratas">
        <rect width="760" height="360" rx="28" fill="#f0fdfa" />
        <text x="380" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">
          Camadas transformam a linguagem interna da rede
        </text>
        {[120, 180, 240].map((y, i) => <circle key={`i-${i}`} cx="100" cy={y} r="22" fill="#ffffff" stroke="#14b8a6" strokeWidth="3" />)}
        {[110, 170, 230, 290].map((y, i) => <circle key={`h1-${i}`} cx="300" cy={y} r="22" fill="#ffffff" stroke="#2dd4bf" strokeWidth="3" />)}
        {[140, 220].map((y, i) => <circle key={`h2-${i}`} cx="500" cy={y} r="26" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />)}
        <circle cx="670" cy="180" r="28" fill="#ffffff" stroke="#115e59" strokeWidth="3" />
        {[[100,120,300,110],[100,120,300,170],[100,180,300,170],[100,180,300,230],[100,240,300,230],[100,240,300,290],[300,110,500,140],[300,170,500,140],[300,230,500,220],[300,290,500,220],[500,140,670,180],[500,220,670,180]].map(([x1,y1,x2,y2], idx) => (
          <path key={idx} d={`M ${x1 + 22} ${y1} C ${x1 + 90} ${y1}, ${x2 - 90} ${y2}, ${x2 - 24} ${y2}`} stroke="#5eead4" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        ))}
        <text x="100" y="326" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="800">entradas</text>
        <text x="300" y="326" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="800">traços simples</text>
        <text x="500" y="326" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="800">combinações úteis</text>
        <text x="670" y="326" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="800">decisão</text>
      </svg>
    </figure>
  );
}

function ForwardPassDiagramaVisual() {
  return (
    <figure className="rounded-[2rem] border border-amber-200 bg-amber-50 p-4 shadow-xl shadow-amber-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Forward pass passando por etapas sucessivas">
        <rect width="760" height="360" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#92400e" fontSize="22" fontWeight="900">
          Forward pass = executar a rede como ela está agora
        </text>
        <rect x="70" y="110" width="150" height="130" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
        <text x="145" y="150" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">Entradas</text>
        <text x="145" y="186" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">features observadas</text>
        <path d="M220 175h70" stroke="#b45309" strokeWidth="5" strokeLinecap="round" />
        <path d="M280 165l12 10l-12 10" fill="#b45309" />
        <rect x="300" y="110" width="160" height="130" rx="18" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
        <text x="380" y="150" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">Camada oculta</text>
        <text x="380" y="176" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">nova representação</text>
        <text x="380" y="204" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="700">a partir dos sinais</text>
        <path d="M460 175h70" stroke="#b45309" strokeWidth="5" strokeLinecap="round" />
        <path d="M520 165l12 10l-12 10" fill="#b45309" />
        <rect x="540" y="110" width="150" height="130" rx="18" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
        <text x="615" y="150" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">Saída</text>
        <text x="615" y="186" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">previsão atual</text>
        <text x="380" y="305" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="800">
          ainda não há correção aqui — só produção de uma previsão
        </text>
      </svg>
    </figure>
  );
}

function PerdaComoBussolaVisual() {
  return (
    <figure className="rounded-[2rem] border border-rose-200 bg-rose-50 p-4 shadow-xl shadow-rose-900/5">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Função de perda como bússola do treinamento">
        <rect width="760" height="340" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">
          A perda transforma erro em direção de melhoria
        </text>
        <circle cx="210" cy="185" r="88" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <circle cx="210" cy="185" r="56" fill="none" stroke="#fda4af" strokeWidth="2" />
        <circle cx="210" cy="185" r="24" fill="#fecdd3" stroke="#e11d48" strokeWidth="3" />
        <circle cx="145" cy="125" r="10" fill="#be123c" />
        <text x="145" y="108" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="800">estado atual</text>
        <path d="M145 125 C 165 150, 185 165, 205 180" stroke="#be123c" strokeWidth="4" fill="none" strokeDasharray="7 7" />
        <text x="210" y="298" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="800">menos perda = melhor alinhamento com o alvo</text>
        <rect x="430" y="108" width="250" height="154" rx="18" fill="#ffffff" stroke="#fb7185" strokeWidth="3" />
        <text x="555" y="145" textAnchor="middle" fill="#9f1239" fontSize="17" fontWeight="900">Sem perda</text>
        <text x="555" y="174" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">a rede produz números</text>
        <text x="555" y="196" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">mas não sabe o que melhorar</text>
        <text x="555" y="230" textAnchor="middle" fill="#be123c" fontSize="14" fontWeight="900">Com perda, existe bússola</text>
      </svg>
    </figure>
  );
}

function TreinamentoEmLoopVisual() {
  return (
    <figure className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-4 shadow-xl shadow-emerald-900/5">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Loop de treinamento de uma rede neural">
        <rect width="760" height="360" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">
          Aprender = prever, medir erro, ajustar, repetir
        </text>
        <g>
          <rect x="100" y="130" width="120" height="80" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
          <text x="160" y="176" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">dados</text>
        </g>
        <g>
          <rect x="320" y="130" width="120" height="80" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
          <text x="380" y="176" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">previsão</text>
        </g>
        <g>
          <rect x="540" y="130" width="120" height="80" rx="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
          <text x="600" y="176" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">ajuste</text>
        </g>
        <path d="M220 170h90" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
        <path d="M300 160l12 10l-12 10" fill="#10b981" />
        <path d="M440 170h90" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
        <path d="M520 160l12 10l-12 10" fill="#10b981" />
        <path d="M600 220 C 600 290, 160 290, 160 220" stroke="#059669" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M170 230l-10 -10l-10 10" fill="#059669" />
        <text x="380" y="315" textAnchor="middle" fill="#065f46" fontSize="15" fontWeight="800">
          a melhora não é instantânea; ela emerge do ciclo repetido
        </text>
      </svg>
    </figure>
  );
}
