import Link from "next/link";
import { withBase } from "@/lib/base-path";

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-stone-900">
      <h1 className="sr-only">Atelier — bespoke denim, Amsterdam</h1>
      <video
        src={withBase("/hero/P1090100.mp4")}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-[var(--nav-h)]">
        <Link
          href="/order"
          className="border border-white px-8 py-2 font-serif text-[0.86rem] tracking-[0.08em] text-white uppercase transition-opacity hover:opacity-50"
        >
          Order
        </Link>
      </div>
    </main>
  );
}
