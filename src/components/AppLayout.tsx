import type { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-stone-50 text-slate-950">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
