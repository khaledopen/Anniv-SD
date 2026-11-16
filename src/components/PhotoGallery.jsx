import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, ImageOff, Play } from 'lucide-react';
import PhotoLightbox from './PhotoLightbox';
import { useReducedMotion } from '../hooks/useReducedMotion';

function Clothespin() {
  return (
    <div
      aria-hidden="true"
      className="relative z-20 -mb-2.5 flex flex-col items-center"
    >
      <div className="h-5 w-2.5 rounded-t-sm bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 shadow-sm border border-amber-900/30" />
      <div className="h-1 w-3 rounded-full bg-amber-800/80" />
    </div>
  );
}

function HangingPolaroid({ photo, index, onClick }) {
  const [hasError, setHasError] = useState(false);
  const reducedMotion = useReducedMotion();
  const isVideo = photo.type === 'video' || photo.src?.toLowerCase().endsWith('.mp4');
  const baseRotate = index % 3 === 0 ? -3.5 : index % 3 === 1 ? 2.5 : -1.5;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24, rotate: baseRotate }}
      whileInView={{ opacity: 1, y: 0, rotate: baseRotate }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: reducedMotion ? 0 : (index % 4) * 0.08 }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              rotate: 0,
              y: -8,
              scale: 1.05,
              zIndex: 30,
              transition: { type: 'spring', stiffness: 260, damping: 16 },
            }
      }
      onClick={onClick}
      style={{ transformOrigin: 'top center' }}
      className="group relative flex flex-col items-center cursor-pointer"
    >
      <Clothespin />

      {/* Classic white Polaroid frame */}
      <figure className="w-full max-w-[230px] sm:max-w-[240px] rounded-sm bg-[#fdfbf7] p-2.5 pb-4 shadow-[0_14px_30px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-[0_20px_42px_rgba(244,114,182,0.35)]">
        <div className="relative overflow-hidden bg-neutral-900/90">
          {!hasError ? (
            isVideo ? (
              <>
                <video
                  src={photo.src}
                  muted
                  playsInline
                  preload="metadata"
                  onError={() => setHasError(true)}
                  className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm text-white shadow-lg">
                    <Play className="h-5 w-5 fill-white ml-0.5" />
                  </span>
                </div>
              </>
            ) : (
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                onError={() => setHasError(true)}
                className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )
          ) : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center p-6 text-center text-neutral-400">
              <ImageOff className="mb-2 h-7 w-7" />
              <span className="text-xs">Média introuvable</span>
            </div>
          )}
        </div>

        <figcaption className="mt-2.5 px-1 text-center">
          <p className="font-display text-base sm:text-lg italic leading-snug text-neutral-800">
            {photo.caption}
          </p>
        </figcaption>
      </figure>
    </motion.div>
  );
}

function FairyLightString() {
  const bulbs = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div aria-hidden="true" className="pointer-events-none relative mb-3 h-8 w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M 0 10 Q 600 58 1200 10"
          fill="none"
          stroke="rgba(253, 230, 138, 0.55)"
          strokeWidth="2.5"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-around px-4">
        {bulbs.map((b) => {
          const offset = Math.sin((b / (bulbs.length - 1)) * Math.PI) * 16;
          return (
            <span
              key={b}
              style={{ transform: `translateY(${offset}px)` }}
              className="h-2.5 w-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_4px_rgba(253,224,71,0.85)] animate-pulse"
            />
          );
        })}
      </div>
    </div>
  );
}

export default function PhotoGallery({ photos }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Split photos into rows of 4 for draped fairy-light strings
  const rows = [];
  for (let i = 0; i < photos.length; i += 4) {
    rows.push(photos.slice(i, i + 4));
  }

  return (
    <section id="galerie" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <div className="mb-14 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-pink-200">
          <Camera className="h-3.5 w-3.5 text-amber-300" />
          <span>Galerie de souvenirs</span>
        </div>
        <h2 className="font-display text-3xl font-semibold sm:text-5xl text-gradient-magic">
          Instants capturés
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-pink-100/75">
          Survole chaque Polaroid pour le faire danser et clique pour l&apos;ouvrir en grand.
        </p>
      </div>

      <div className="space-y-12">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="relative">
            <FairyLightString />
            <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-4 place-items-start justify-items-center">
              {row.map((photo, colIdx) => {
                const globalIndex = rowIdx * 4 + colIdx;
                return (
                  <HangingPolaroid
                    key={photo.id}
                    photo={photo}
                    index={globalIndex}
                    onClick={() => setSelectedIndex(globalIndex)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <PhotoLightbox
        photos={photos}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
