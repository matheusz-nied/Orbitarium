import type { PropsWithChildren } from "react";
import { Header } from "./Header";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-50 text-slate-950">
      <Header />
      <main>{children}</main>
    </div>
  );
}
