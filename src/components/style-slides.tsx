"use client";

import Image from "next/image";
import Link from "next/link";
import { StyleImageCarousel } from "@/components/style-image-carousel";
import {
  bespokeJumps,
  bespokeParagraphs,
  styleSlides,
  type StyleSlide,
} from "@/lib/styles-data";
import { jumpToId } from "@/lib/utils";

function SectionTitle({
  heading,
  kicker,
}: {
  heading: string;
  kicker?: string;
}) {
  return (
    <h2 className="text-[16px] leading-snug font-normal tracking-[0.08em] uppercase">
      {heading}
      {kicker ? (
        <>
          {" "}
          — <span className="text-[0.68em]">{kicker}</span>
        </>
      ) : null}
    </h2>
  );
}

function SlideCopy({ slide }: { slide: StyleSlide }) {
  return (
    <div className="max-w-xl space-y-5 text-[18px] leading-[1.55] text-black">
      <SectionTitle heading={slide.heading} kicker={slide.kicker} />
      {slide.paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}
      {slide.list ? (
        <ul className="list-disc space-y-1 pl-5">
          {slide.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {slide.closer ? <p>{slide.closer}</p> : null}
    </div>
  );
}

function StyleSection({ slide }: { slide: StyleSlide }) {
  return (
    <section
      id={slide.id}
      className="bg-white text-black scroll-mt-[var(--nav-h)]"
    >
      <div className="md:grid md:min-h-dvh md:grid-cols-[min(36rem,42%)_1fr] md:pt-[calc(var(--nav-h)+2rem)]">
        <div className="px-6 pt-[calc(var(--nav-h)+2rem)] pb-6 md:sticky md:top-[calc(var(--nav-h)+2rem)] md:self-start md:px-8 md:pt-0 md:pb-8">
          <SlideCopy slide={slide} />
        </div>
        <div className="min-w-0 px-6 pb-10 md:px-0 md:pb-8">
          <StyleImageCarousel stills={slide.stills} />
        </div>
      </div>
    </section>
  );
}

function BespokeOpener() {
  const last = bespokeParagraphs[2];
  const [before, after] = last.split("see overview");

  return (
    <section
      id="bespoke"
      className="relative min-h-dvh scroll-mt-[var(--nav-h)]"
    >
      <Image
        src="/home-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/85" />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 py-[calc(var(--nav-h)+2rem)] text-center">
        <div className="max-w-xl space-y-5 text-[18px] leading-[1.55] text-black">
          <SectionTitle heading="Bespoke" />
          <p>{bespokeParagraphs[0]}</p>
          <p>{bespokeParagraphs[1]}</p>
          <p>
            {before}
            <button
              type="button"
              onClick={() => jumpToId("standard-jeans")}
              className="underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              see overview
            </button>
            {after}
          </p>
        </div>
        <p className="mt-10 text-[16px] tracking-[0.04em] text-black">
          {bespokeJumps.map((jump, i) => (
            <span key={jump.href}>
              {i > 0 ? " * " : null}
              <Link
                href={jump.href}
                className="underline-offset-4 transition-opacity hover:opacity-50 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  jumpToId(jump.href.slice(1));
                }}
              >
                {jump.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export function StyleSlides() {
  return (
    <main className="bg-white">
      <h1 className="sr-only">Style</h1>
      <BespokeOpener />
      {styleSlides.map((slide) => (
        <StyleSection key={slide.id} slide={slide} />
      ))}
    </main>
  );
}
