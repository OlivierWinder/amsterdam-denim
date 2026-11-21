"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";
import type { StyleStill } from "@/lib/styles-data";

const PEEK = 1 / 3;
const STILL_VH = 0.78;
const CAPTION_H = 28;

type Props = {
  stills: StyleStill[];
};

function prefixStarts(widths: number[]) {
  const starts = [0];
  for (let i = 0; i < widths.length; i++) starts.push(starts[i] + widths[i]);
  return starts;
}

export function StyleImageCarousel({ stills }: Props) {
  const n = stills.length;
  const frameRef = useRef<HTMLDivElement>(null);
  const accRef = useRef(0);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origin: number;
    axis: "pending" | "x" | "y";
  } | null>(null);
  const txRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [tx, setTx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [stillH, setStillH] = useState(520);
  const [display, setDisplay] = useState(false);
  const [displayIn, setDisplayIn] = useState(false);
  const labelId = useId();

  const widths = stills.map((s) => stillH * (s.width / s.height));
  const starts = prefixStarts(widths);

  const translateFor = useCallback(
    (i: number) => {
      if (n === 0) return 0;
      if (i === n - 1 && n > 1) {
        return -(starts[i] - widths[i - 1] * PEEK);
      }
      return -starts[i];
    },
    [n, starts, widths]
  );

  const frameW = (() => {
    if (n === 0) return 0;
    if (index === n - 1 && n > 1) {
      return widths[index] + widths[index - 1] * PEEK;
    }
    if (index < n - 1) return widths[index] + widths[index + 1] * PEEK;
    return widths[index];
  })();

  useEffect(() => {
    txRef.current = tx;
  }, [tx]);

  useEffect(() => {
    const measure = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const vh = window.innerHeight;
      const maxFromVh = vh * STILL_VH;
      const typical = Math.max(
        ...stills.map((s) => s.width / s.height),
        0.8
      );
      if (!desktop) {
        const available = Math.max(220, window.innerWidth - 48);
        const hFromWidth = available / (typical * (1 + PEEK));
        setStillH(Math.min(maxFromVh * 0.72, hFromWidth));
        return;
      }
      const copyCol = Math.min(36 * 16, window.innerWidth * 0.42);
      const gap = 48;
      const available = Math.max(220, window.innerWidth - copyCol - gap);
      const hFromWidth = available / (typical * (1 + PEEK));
      setStillH(Math.min(maxFromVh, hFromWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [stills]);

  const displayTx = dragging ? tx : translateFor(index);

  const snapTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(n - 1, i));
      setIndex(next);
      const x = translateFor(next);
      setTx(x);
      txRef.current = x;
    },
    [n, translateFor]
  );

  const nearest = useCallback(
    (x: number) => {
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < n; i++) {
        const d = Math.abs(x - translateFor(i));
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      return best;
    },
    [n, translateFor]
  );

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      accRef.current += e.deltaY;
      if (accRef.current > 48) {
        snapTo(index + 1);
        accRef.current = 0;
      } else if (accRef.current < -48) {
        snapTo(index - 1);
        accRef.current = 0;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [index, snapTo]);

  const onPointerDown = (e: ReactPointerEvent) => {
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origin: translateFor(index),
      axis: e.pointerType === "touch" ? "pending" : "x",
    };
    if (e.pointerType !== "touch") {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(true);
    }
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (drag.axis === "pending") {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        drag.axis = "x";
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setDragging(true);
      } else {
        drag.axis = "y";
        dragRef.current = null;
        return;
      }
    }
    if (drag.axis !== "x") return;
    e.preventDefault();
    const minTx = translateFor(n - 1);
    const maxTx = translateFor(0);
    const next = Math.min(maxTx, Math.max(minTx, drag.origin + dx));
    txRef.current = next;
    setTx(next);
  };

  const endDrag = (e: ReactPointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const wasX = drag.axis === "x" || dragging;
    dragRef.current = null;
    if (!wasX) return;
    setDragging(false);
    snapTo(nearest(txRef.current));
  };

  const openDisplay = () => {
    setDisplay(true);
    requestAnimationFrame(() => setDisplayIn(true));
  };

  const closeDisplay = () => {
    setDisplayIn(false);
    window.setTimeout(() => setDisplay(false), 320);
  };

  useEffect(() => {
    if (!display) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDisplay();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [display]);

  if (n === 0) return null;

  return (
    <div className="relative w-full md:flex md:justify-end">
      <div className="w-full md:w-auto">
        <div className="mb-2 flex justify-end pr-5 md:pr-8">
          <button
            type="button"
            onClick={openDisplay}
            className="text-[11px] tracking-[0.14em] uppercase underline underline-offset-4 transition-opacity hover:opacity-50"
          >
            DISPLAY
          </button>
        </div>

        <div className="relative">
          <div
            ref={frameRef}
            role="region"
            aria-labelledby={labelId}
            className="relative overflow-hidden touch-pan-y"
            style={{ width: frameW, height: stillH + CAPTION_H }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <span id={labelId} className="sr-only">
              Style stills
            </span>
            <div
              className={cn(
                "flex h-full",
                !dragging && "transition-transform duration-300 ease-out"
              )}
              style={{ transform: `translateX(${displayTx}px)` }}
            >
              {stills.map((still) => {
                const w = stillH * (still.width / still.height);
                return (
                  <figure
                    key={still.src + still.caption}
                    className="relative h-full shrink-0"
                    style={{ width: w }}
                  >
                    <Image
                      src={still.src}
                      alt={still.alt}
                      width={still.width}
                      height={still.height}
                      className="object-cover"
                      style={{ height: stillH, width: w }}
                      sizes={`${Math.round(w)}px`}
                      draggable={false}
                    />
                    <figcaption className="mt-1 text-[0.64rem] italic text-black/75">
                      {still.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous still"
            disabled={index === 0}
            onClick={() => snapTo(index - 1)}
            className="absolute left-0 z-10 -translate-y-1/2 px-2 text-2xl leading-none text-black/70 transition-opacity hover:opacity-50 disabled:opacity-20"
            style={{ top: stillH / 2 }}
          >
            {"<"}
          </button>
          <button
            type="button"
            aria-label="Next still"
            disabled={index === n - 1}
            onClick={() => snapTo(index + 1)}
            className="absolute right-0 z-10 -translate-y-1/2 px-2 text-2xl leading-none text-black/70 transition-opacity hover:opacity-50 disabled:opacity-20"
            style={{ top: stillH / 2 }}
          >
            {">"}
          </button>
        </div>
      </div>

      {display ? (
        <div
          className={cn(
            "fixed inset-0 z-[400] flex flex-col bg-black transition-opacity duration-300",
            displayIn ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            type="button"
            onClick={closeDisplay}
            className="absolute top-4 right-6 z-10 text-sm tracking-[0.12em] text-white uppercase underline underline-offset-4"
          >
            Close
          </button>
          <div
            className={cn(
              "flex h-full items-center gap-8 overflow-x-auto px-10 py-16 transition-transform duration-500 ease-out",
              displayIn ? "translate-y-0" : "translate-y-10"
            )}
          >
            {stills.map((still) => (
              <figure key={still.src + still.caption} className="shrink-0">
                <Image
                  src={still.src}
                  alt={still.alt}
                  width={still.width}
                  height={still.height}
                  className="h-[min(70vh,720px)] w-auto object-contain"
                />
                <figcaption className="mt-2 text-[0.64rem] italic text-white/80">
                  {still.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
