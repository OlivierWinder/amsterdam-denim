"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ATELIER_RED, primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

function NavLinks({
  pathname,
  onNavigate,
  stacked,
}: {
  pathname: string;
  onNavigate?: () => void;
  stacked?: boolean;
}) {
  return (
    <>
      {primaryNav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "uppercase transition-opacity hover:opacity-50",
              stacked && "text-[0.86rem] tracking-[0.08em]"
            )}
            style={active ? { color: ATELIER_RED } : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const setH = () => {
      document.documentElement.style.setProperty(
        "--nav-h",
        `${el.offsetHeight}px`
      );
    };
    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", closeOnDesktop);
    return () => mq.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary"
        className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between gap-x-4 border-b border-[#cfcfcf] bg-[#fafafa] px-3.5 py-[0.85rem] font-serif text-[0.86rem] tracking-[0.08em] text-black"
      >
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-50">
          <Image
            src="/logo.png"
            alt="Olivier Winder — Bespoke Jeans Amsterdam"
            width={1920}
            height={392}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <div className="hidden items-center justify-end gap-x-4 lg:flex">
          <NavLinks pathname={pathname} />
        </div>
        <button
          type="button"
          className="relative z-50 flex h-8 w-8 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <span className="text-xl leading-none" aria-hidden>
              ×
            </span>
          ) : (
            <span className="flex flex-col gap-[5px]" aria-hidden>
              <span className="block h-px w-5 bg-black" />
              <span className="block h-px w-5 bg-black" />
              <span className="block h-px w-5 bg-black" />
            </span>
          )}
        </button>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex items-center justify-center font-serif text-black transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        )}
        style={{
          top: "var(--nav-h)",
          backgroundColor: "rgba(250,250,250,0.92)",
        }}
        onClick={() => setOpen(false)}
      >
        <div
          className="flex flex-col items-center justify-center gap-7"
          onClick={(e) => e.stopPropagation()}
        >
          <NavLinks
            pathname={pathname}
            stacked
            onNavigate={() => setOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
