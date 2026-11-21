"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { catalogStills, type CatalogView } from "@/lib/catalog-data";

function Lightbox({
  views,
  index,
  copy,
  onClose,
  onPrev,
  onNext,
}: {
  views: CatalogView[];
  index: number;
  copy?: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = views[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="fixed inset-0 z-[500] bg-black"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-6 z-20 text-sm tracking-[0.12em] text-white uppercase underline underline-offset-4"
      >
        Close
      </button>
      <div className="flex h-full flex-col lg:flex-row">
        {copy ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 px-6 pt-6 pr-24 lg:w-[min(28rem,34%)] lg:px-8 lg:pt-8 lg:pr-8"
          >
            <p className="font-serif text-[18px] leading-[1.55] text-white">
              {copy}
            </p>
          </div>
        ) : null}
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-6">
          {/* Native img so the overlay does not depend on next/image layout. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92dvh] w-auto max-w-full object-contain"
          />
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute top-1/2 left-2 z-10 -translate-y-1/2 px-3 text-3xl text-white/80 transition-opacity hover:opacity-50"
          >
            {"<"}
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 px-3 text-3xl text-white/80 transition-opacity hover:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CatalogGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const liveItem = catalogStills.find((still) => still.live);
  const views = liveItem?.views ?? (liveItem ? [liveItem] : []);
  const count = views.length;

  return (
    <main className="bg-black pt-[var(--nav-h)]">
      <h1 className="sr-only">Catalog</h1>
      <div className="grid grid-cols-2 gap-0 lg:grid-cols-3">
        {catalogStills.map((still) =>
          still.live ? (
            <button
              key={still.src}
              type="button"
              aria-label={`Open ${still.alt}`}
              onClick={() => setOpen(0)}
              className="relative block aspect-[1080/1350] w-full cursor-pointer overflow-hidden"
            >
              <Image
                src={still.src}
                alt={still.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="pointer-events-none object-cover"
              />
            </button>
          ) : (
            <div
              key={still.src}
              aria-hidden="true"
              className="relative aspect-[1080/1350] w-full cursor-default overflow-hidden"
            >
              <Image
                src={still.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="pointer-events-none object-cover opacity-40 grayscale"
              />
            </div>
          )
        )}
      </div>

      {open !== null && count > 0
        ? createPortal(
            <Lightbox
              views={views}
              index={open}
              copy={liveItem?.copy}
              onClose={() => setOpen(null)}
              onPrev={() =>
                setOpen((i) => (i === null ? i : (i - 1 + count) % count))
              }
              onNext={() => setOpen((i) => (i === null ? i : (i + 1) % count))}
            />,
            document.body
          )
        : null}
    </main>
  );
}
