import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ImageOff } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function TimelinePhoto({ src, alt }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-purple-950/60 text-pink-200/60">
        <ImageOff className="h-6 w-6" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className="h-auto w-full rounded-xl object-contain"
    />
  );
}

export default function MemoriesTimeline({ memories }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 36,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 84%',
            once: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="souvenirs"
      ref={containerRef}
      className="relative mx-auto max-w-5xl px-4 py-24 sm:px-8"
    >
      <div className="mb-16 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-pink-200">
          <Heart className="h-3.5 w-3.5 text-pink-400" />
          <span>Chronologie</span>
        </div>
        <h2 className="font-display text-3xl font-semibold sm:text-5xl text-gradient-magic">
          Nos plus beaux souvenirs
        </h2>
      </div>

      <div className="relative">
        {/* Vertical glowing line */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-4 w-[2px] bg-gradient-to-b from-pink-400/70 via-purple-400/50 to-amber-300/60 md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-12">
          {memories.map((memory, index) => {
            const isLeft = index % 2 === 0;
            return (
              <article
                key={memory.id}
                className={`timeline-item relative flex flex-col md:flex-row ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center gap-6 md:gap-10`}
              >
                {/* Node dot */}
                <div
                  aria-hidden="true"
                  className="absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-amber-200 bg-pink-500 shadow-[0_0_16px_rgba(244,114,182,0.9)] md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                />

                {/* Content card */}
                <div className="ml-10 w-[calc(100%-2.5rem)] md:ml-0 md:w-[calc(50%-2.5rem)]">
                  <div className="rounded-2xl glass-card p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1">
                    {memory.date && (
                      <span className="inline-block rounded-full bg-pink-500/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-200">
                        {memory.date}
                      </span>
                    )}
                    <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                      {memory.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-pink-100/80">
                      {memory.message}
                    </p>
                    {memory.photo && (
                      <div className="mt-4 overflow-hidden rounded-xl bg-purple-950/40 p-1.5">
                        <TimelinePhoto src={memory.photo} alt={memory.alt || memory.title} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
