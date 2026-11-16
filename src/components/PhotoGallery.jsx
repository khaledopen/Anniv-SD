import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, ImageOff, Play } from 'lucide-react';
import PhotoLightbox from './PhotoLightbox';
import { useReducedMotion } from '../hooks/useReducedMotion';

function PolaroidCard({ photo, index, onClick }) {
  const [hasError, setHasError] = useState(false);
  const reducedMotion = useReducedMotion();
  const tilt = index % 2 === 0 ? -1.2 : 1.2;
  const isVideo = photo.type === 'video' || photo.src?.toLowerCase().endsWith('.mp4');

  return (
    <motion.figure
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: reducedMotion ? 0 : (index % 4) * 0.08 }}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -6, rotate: tilt, scale: 1.02, transition: { duration: 0.25 } }
      }
      onClick={onClick}
      className="mb-6 break-inside-avoid cursor-pointer rounded-2xl glass-card p-3 pb-4 transition-shadow duration-300 hover:shadow-glow"
    >
      <div className="relative overflow-hidden rounded-xl bg-purple-950/50">
        {!hasError ? (
          isVideo ? (
            <>
              <video
                src={photo.src}
                muted
                playsInline
                preload="metadata"
                onError={() => setHasError(true)}
                className="h-auto w-full object-contain transition-transform duration-500 hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="flex h-12 w-12 items-center justify-center rounded-full glass-pill text-white shadow-glow">
                  <Play className="h-5 w-5 fill-white/90 ml-0.5" />
                </span>
              </div>
            </>
          ) : (
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              onError={() => setHasError(true)}
              className="h-auto w-full object-contain transition-transform duration-500 hover:scale-[1.03]"
            />
          )
        ) : (
          <div className="flex aspect-[4/3] flex-col items-center justify-center p-6 text-center text-pink-200/70">
            <ImageOff className="mb-2 h-7 w-7" />
            <span className="text-xs">Média introuvable</span>
          </div>
        )}
      </div>

      <figcaption className="mt-3 px-1">
        <p className="font-display text-lg italic leading-snug text-pink-50">
          {photo.caption}
        </p>
        {photo.date && (
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-amber-200/75">
            {photo.date}
          </p>
        )}
      </figcaption>
    </motion.figure>
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
          Clique sur chaque Polaroid pour l&apos;admirer en grand format.
        </p>
      </div>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {photos.map((photo, index) => (
          <PolaroidCard
            key={photo.id}
            photo={photo}
            index={index}
            onClick={() => setSelectedIndex(index)}
          />
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
