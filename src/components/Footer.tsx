import { Github, Globe2, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/matheusz-nied",
    icon: Github,
  },
  {
    label: "Portfólio",
    href: "https://theus-dev.vercel.app/",
    icon: Globe2,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/matheusz-nied",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/theusdev_/",
    icon: Instagram,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-slate-950">
            Orbitarium
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Criado por Matheus Nied.
          </p>
        </div>

        <nav className="flex flex-wrap gap-2" aria-label="Redes sociais">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-950"
              href={href}
              key={href}
              rel="noreferrer"
              target="_blank"
              title={label}
            >
              <Icon size={17} aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
