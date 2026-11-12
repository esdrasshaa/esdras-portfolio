"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Hackathon, HackathonImage } from "@/types/data";

type Slide = HackathonImage & {
  eventId: string;
  tag: string;
  title: string;
};

/** Interleave photos from all events so the parade alternates between them. */
function buildSlides(hackathons: Hackathon[]): Slide[] {
  const perEvent = hackathons.map((h) =>
    h.images.map((img) => ({
      ...img,
      eventId: h.id,
      tag: `${h.shortTitle} · ${h.date}`,
      title: h.title,
    }))
  );
  const longest = Math.max(0, ...perEvent.map((list) => list.length));
  const slides: Slide[] = [];
  for (let i = 0; i < longest; i++) {
    for (const list of perEvent) {
      if (list[i]) slides.push(list[i]);
    }
  }
  return slides;
}

export default function HackathonParade({
  hackathons,
}: {
  hackathons: Hackathon[];
}) {
  const slides = useMemo(() => buildSlides(hackathons), [hackathons]);
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<Slide | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const visible = slides.filter(
    (s) => filter === "all" || s.eventId === filter
  );
  // Render the list twice so the CSS animation can loop seamlessly.
  const loop = [...visible, ...visible];

  const filters = [
    { id: "all", label: "All" },
    ...hackathons.map((h) => ({ id: h.id, label: h.shortTitle })),
  ];

  return (
    <section aria-label="Hackathon photos" className="overflow-hidden pb-2 pt-8">
      <div className="container mx-auto mb-5 flex max-w-5xl flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Futury Build Days · 2026</span>
          <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            On the ground at two AI hackathons
          </h2>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos by event">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="parade-mask">
        <div
          key={filter}
          className="parade-track flex w-max gap-[18px] pb-5 pt-1.5"
          style={{ animationDuration: `${Math.max(visible.length, 3) * 7}s` }}
        >
          {loop.map((slide, i) => {
            const isCopy = i >= visible.length;
            return (
              <button
                key={`${slide.src}-${i}`}
                type="button"
                onClick={() => setOpen(slide)}
                aria-hidden={isCopy || undefined}
                tabIndex={isCopy ? -1 : undefined}
                aria-label={`Open photo: ${slide.title}`}
                className="group relative h-[260px] flex-none overflow-hidden rounded-2xl bg-muted shadow-[0_18px_40px_-22px_rgba(9,20,40,.55)] transition-transform duration-300 hover:-translate-y-1.5 md:h-[380px]"
                style={{ aspectRatio: `${slide.width} / ${slide.height}` }}
              >
                <Image
                  src={slide.src}
                  alt={`${slide.tag}: ${slide.title}`}
                  fill
                  sizes="(min-width: 768px) 570px, 390px"
                  className="object-cover"
                  priority={i < 3}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-10 text-left text-white">
                  <span className="block font-mono text-[11px] uppercase tracking-widest opacity-80">
                    {slide.tag}
                  </span>
                  <span className="mt-0.5 block font-display text-lg font-semibold leading-tight">
                    {slide.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black"
          >
            Close
          </button>
          <figure className="m-0" onClick={(e) => e.stopPropagation()}>
            <Image
              src={open.src}
              alt={open.title}
              width={open.width}
              height={open.height}
              sizes="90vw"
              className="max-h-[82vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-3 text-center font-display text-white">
              {open.tag} — {open.title}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
