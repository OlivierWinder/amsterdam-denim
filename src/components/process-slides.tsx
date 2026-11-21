import { processSteps, type ProcessStep } from "@/lib/process-data";

function ProcessVideoBox({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  const id = youtubeId.trim();

  return (
    <div className="w-full">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {id ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-white/75"
            aria-label={`${title} YouTube video — set youtubeId`}
          >
            <div
              aria-hidden
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/55"
            >
              <span className="ml-1 block h-0 w-0 border-y-[9px] border-y-transparent border-l-[16px] border-l-white/85" />
            </div>
            <p className="text-[11px] tracking-[0.16em] uppercase">YouTube</p>
            <p className="mt-1 text-[11px] tracking-[0.04em] text-white/45">
              youtubeId
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProcessSection({ step, n }: { step: ProcessStep; n: number }) {
  return (
    <section
      id={step.id}
      className="bg-white text-black scroll-mt-[var(--nav-h)]"
    >
      <div className="md:grid md:min-h-dvh md:grid-cols-[min(36rem,42%)_1fr] md:pt-[calc(var(--nav-h)+2rem)]">
        <div className="px-6 pt-[calc(var(--nav-h)+2rem)] pb-6 md:sticky md:top-[calc(var(--nav-h)+2rem)] md:self-start md:px-8 md:pt-0 md:pb-8">
          <div className="max-w-xl space-y-5 text-[18px] leading-[1.55] text-black">
            <h2 className="text-[16px] leading-snug font-normal tracking-[0.08em] uppercase">
              {n} {step.title}
            </h2>
            {step.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="min-w-0 px-6 pb-10 md:px-0 md:pb-8">
          <ProcessVideoBox youtubeId={step.youtubeId} title={step.title} />
        </div>
      </div>
    </section>
  );
}

export function ProcessSlides() {
  return (
    <main className="bg-white">
      <h1 className="sr-only">The process</h1>
      {processSteps.map((step, i) => (
        <ProcessSection key={step.id} step={step} n={i + 1} />
      ))}
    </main>
  );
}
