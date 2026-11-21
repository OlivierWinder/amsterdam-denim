import type { ReactNode } from "react";

export function PageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#fafafa] px-6 pt-[var(--nav-h)] pb-20 md:px-8">
      <article className="w-full max-w-xl py-8 text-left">
        <h1 className="text-[16px] font-normal tracking-[0.08em] uppercase">
          {title}
        </h1>
        <div className="mt-8 space-y-5 text-[18px] leading-[1.55] text-black">
          {children}
        </div>
      </article>
    </main>
  );
}
