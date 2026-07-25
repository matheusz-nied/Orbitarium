import type { LessonModule } from "../../../types/content";

export const visuals = {
  "bits-bytes-hero": BitsBytesHeroVisual,
  "bit-foundation": BitFoundationVisual,
  "byte-hex-grid": ByteHexGridVisual,
  "signed-unsigned-visual": SignedUnsignedVisual,
  "utf8-visual": Utf8Visual,
  "float-layout": FloatLayoutVisual,
  "endianness-visual": EndiannessVisual,
  "same-bits-many-meanings": SameBitsManyMeaningsVisual,
} satisfies LessonModule["visuals"];

function BitsBytesHeroVisual() {
  return (
    <Figure title="O mesmo alfabeto mínimo representa dados muito diferentes" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 360" role="img" aria-label="Sequências de bits sendo interpretadas como texto, número e imagem">
        <rect width="760" height="360" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="24" fontWeight="900">Bits não carregam significado sozinhos</text>
        <rect x="70" y="96" width="620" height="64" rx="18" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
        <text x="380" y="135" textAnchor="middle" fill="#4338ca" fontSize="24" fontWeight="900">01000001 00101101 00110001</text>
        <path d="M190 180v36" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <path d="M380 180v36" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <path d="M570 180v36" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <Box x={90} y={220} w={200} h={90} title="Texto" body="A - 1" color="#4f46e5" />
        <Box x={280} y={220} w={200} h={90} title="Inteiro" body="65, 45, 49" color="#0f766e" />
        <Box x={470} y={220} w={200} h={90} title="Estrutura" body="Parte de um arquivo" color="#b45309" />
      </svg>
    </Figure>
  );
}

function BitFoundationVisual() {
  return (
    <Figure title="Um bit é uma decisão entre dois estados" tone="teal">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Dois estados físicos virando 0 e 1">
        <rect width="760" height="320" rx="28" fill="#f0fdfa" />
        <text x="380" y="46" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Hardware detecta diferenças, software interpreta</text>
        <circle cx="190" cy="150" r="56" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
        <text x="190" y="145" textAnchor="middle" fill="#1d4ed8" fontSize="18" fontWeight="900">Tensão baixa</text>
        <text x="190" y="176" textAnchor="middle" fill="#2563eb" fontSize="36" fontWeight="900">0</text>
        <circle cx="570" cy="150" r="56" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" />
        <text x="570" y="145" textAnchor="middle" fill="#166534" fontSize="18" fontWeight="900">Tensão alta</text>
        <text x="570" y="176" textAnchor="middle" fill="#16a34a" fontSize="36" fontWeight="900">1</text>
        <path d="M260 150h240" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
        <path d="M488 140l12 10l-12 10" fill="#64748b" />
        <text x="380" y="278" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="800">O bit é simples porque o circuito precisa ser confiável</text>
      </svg>
    </Figure>
  );
}

function ByteHexGridVisual() {
  const bits = ["1", "0", "1", "1", "0", "1", "0", "0"];
  return (
    <Figure title="Hexadecimal reduz ruído visual" tone="violet">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Um byte dividido em dois grupos de quatro bits">
        <rect width="760" height="340" rx="28" fill="#faf5ff" />
        <text x="380" y="48" textAnchor="middle" fill="#6d28d9" fontSize="22" fontWeight="900">1 byte = 8 bits = 2 dígitos hex</text>
        {bits.map((bit, index) => (
          <g key={index}>
            <rect
              x={110 + index * 70}
              y="110"
              width="56"
              height="72"
              rx="14"
              fill={index < 4 ? "#ede9fe" : "#ddd6fe"}
              stroke="#8b5cf6"
              strokeWidth="3"
            />
            <text x={138 + index * 70} y="155" textAnchor="middle" fill="#5b21b6" fontSize="28" fontWeight="900">{bit}</text>
          </g>
        ))}
        <rect x="170" y="220" width="160" height="72" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="250" y="248" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">1011 = B</text>
        <text x="250" y="275" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">alto nibble</text>
        <rect x="430" y="220" width="160" height="72" rx="18" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
        <text x="510" y="248" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="900">0100 = 4</text>
        <text x="510" y="275" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">baixo nibble</text>
        <text x="380" y="316" textAnchor="middle" fill="#6d28d9" fontSize="18" fontWeight="900">10110100 = B4</text>
      </svg>
    </Figure>
  );
}

function SignedUnsignedVisual() {
  return (
    <Figure title="O mesmo byte muda de valor quando muda a interpretação" tone="rose">
      <svg className="w-full" viewBox="0 0 760 320" role="img" aria-label="Comparação entre inteiro com sinal e sem sinal">
        <rect width="760" height="320" rx="28" fill="#fff1f2" />
        <text x="380" y="48" textAnchor="middle" fill="#be123c" fontSize="22" fontWeight="900">11111111 não é sempre 255</text>
        <rect x="80" y="92" width="600" height="76" rx="20" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
        <text x="380" y="138" textAnchor="middle" fill="#9f1239" fontSize="28" fontWeight="900">11111111</text>
        <Box x={110} y={202} w={240} h={80} title="Sem sinal" body="255" color="#e11d48" />
        <Box x={410} y={202} w={240} h={80} title="Complemento de dois" body="-1" color="#0f766e" />
      </svg>
    </Figure>
  );
}

function Utf8Visual() {
  return (
    <Figure title="Texto é um protocolo entre símbolos e bytes" tone="amber">
      <svg className="w-full" viewBox="0 0 760 350" role="img" aria-label="Representação de caracteres em UTF-8">
        <rect width="760" height="350" rx="28" fill="#fffbeb" />
        <text x="380" y="48" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="900">UTF-8 usa 1 ou mais bytes por caractere</text>
        <Box x={70} y={95} w={180} h={90} title="A" body="41" color="#2563eb" />
        <Box x={290} y={95} w={180} h={90} title="ç" body="C3 A7" color="#0f766e" />
        <Box x={510} y={95} w={180} h={90} title="🙂" body="F0 9F 99 82" color="#d97706" />
        <text x="380" y="240" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">Mais símbolos exigem mais bytes</text>
        <rect x="120" y="264" width="520" height="46" rx="14" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
        <text x="380" y="292" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="700">Compatibilidade com ASCII + extensão para Unicode</text>
      </svg>
    </Figure>
  );
}

function FloatLayoutVisual() {
  return (
    <Figure title="Ponto flutuante troca precisão local por alcance global" tone="indigo">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Partes de um número de ponto flutuante">
        <rect width="760" height="340" rx="28" fill="#eef2ff" />
        <text x="380" y="48" textAnchor="middle" fill="#3730a3" fontSize="22" fontWeight="900">Sinal + expoente + significando</text>
        <rect x="90" y="118" width="60" height="80" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="3" />
        <text x="120" y="150" textAnchor="middle" fill="#991b1b" fontSize="16" fontWeight="900">S</text>
        <text x="120" y="174" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="700">sinal</text>
        <rect x="154" y="118" width="200" height="80" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
        <text x="254" y="150" textAnchor="middle" fill="#1d4ed8" fontSize="16" fontWeight="900">Expoente</text>
        <text x="254" y="174" textAnchor="middle" fill="#1d4ed8" fontSize="13" fontWeight="700">escala do número</text>
        <rect x="358" y="118" width="312" height="80" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
        <text x="514" y="150" textAnchor="middle" fill="#166534" fontSize="16" fontWeight="900">Significando</text>
        <text x="514" y="174" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="700">dígitos relevantes</text>
        <text x="380" y="250" textAnchor="middle" fill="#3730a3" fontSize="18" fontWeight="900">valor ≈ sinal × significando × base^expoente</text>
        <text x="380" y="288" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">Ótimo para faixa grande • imperfeito para muitos decimais</text>
      </svg>
    </Figure>
  );
}

function EndiannessVisual() {
  const little = ["78", "56", "34", "12"];
  const big = ["12", "34", "56", "78"];
  return (
    <Figure title="Ordem de bytes importa na memória" tone="emerald">
      <svg className="w-full" viewBox="0 0 760 340" role="img" aria-label="Comparação entre little-endian e big-endian">
        <rect width="760" height="340" rx="28" fill="#ecfdf5" />
        <text x="380" y="48" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">Valor abstrato: 0x12345678</text>
        <text x="190" y="92" textAnchor="middle" fill="#047857" fontSize="16" fontWeight="900">Little-endian</text>
        <text x="570" y="92" textAnchor="middle" fill="#047857" fontSize="16" fontWeight="900">Big-endian</text>
        {little.map((value, index) => (
          <MemoryCell key={`l-${index}`} x={72 + index * 72} y={126} value={value} />
        ))}
        {big.map((value, index) => (
          <MemoryCell key={`b-${index}`} x={452 + index * 72} y={126} value={value} />
        ))}
        <text x="190" y="250" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">menor endereço → byte menos significativo</text>
        <text x="570" y="250" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">menor endereço → byte mais significativo</text>
      </svg>
    </Figure>
  );
}

function SameBitsManyMeaningsVisual() {
  return (
    <Figure title="Representação é contrato" tone="slate">
      <svg className="w-full" viewBox="0 0 760 330" role="img" aria-label="Mesmo padrão de bits com interpretações diferentes">
        <rect width="760" height="330" rx="28" fill="#f8fafc" />
        <text x="380" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">01000001 depende da pergunta feita</text>
        <Box x={80} y={96} w={180} h={82} title="Como número" body="65" color="#2563eb" />
        <Box x={290} y={96} w={180} h={82} title="Como ASCII" body="A" color="#7c3aed" />
        <Box x={500} y={96} w={180} h={82} title="Como byte bruto" body="0x41" color="#0f766e" />
        <rect x="120" y="224" width="520" height="54" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="380" y="257" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="800">Sem tipo, formato ou protocolo, o bit é só padrão</text>
      </svg>
    </Figure>
  );
}

function Figure({
  title,
  tone,
  children,
}: {
  title: string;
  tone: "indigo" | "teal" | "violet" | "rose" | "amber" | "emerald" | "slate";
  children: React.ReactNode;
}) {
  const styles: Record<typeof tone, string> = {
    indigo: "border-indigo-200 bg-indigo-50",
    teal: "border-teal-200 bg-teal-50",
    violet: "border-violet-200 bg-violet-50",
    rose: "border-rose-200 bg-rose-50",
    amber: "border-amber-200 bg-amber-50",
    emerald: "border-emerald-200 bg-emerald-50",
    slate: "border-slate-200 bg-white",
  };

  return (
    <figure className={`overflow-hidden rounded-[2rem] border p-4 shadow-xl shadow-slate-900/5 ${styles[tone]}`}>
      <figcaption className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-slate-500">
        {title}
      </figcaption>
      {children}
    </figure>
  );
}

function Box({
  x,
  y,
  w,
  h,
  title,
  body,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  body: string;
  color: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="18" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + w / 2} y={y + 30} textAnchor="middle" fill={color} fontSize="16" fontWeight="900">{title}</text>
      <text x={x + w / 2} y={y + 58} textAnchor="middle" fill="#475569" fontSize="14" fontWeight="700">{body}</text>
    </g>
  );
}

function MemoryCell({ x, y, value }: { x: number; y: number; value: string }) {
  return (
    <g>
      <rect x={x} y={y} width="60" height="60" rx="12" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
      <text x={x + 30} y={y + 37} textAnchor="middle" fill="#047857" fontSize="16" fontWeight="900">{value}</text>
    </g>
  );
}
