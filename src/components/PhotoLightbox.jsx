import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function PhotoLightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  const reducedMotion = useReducedMotion();
  const isOpen = currentIndex !== null && photos[currentIndex];
  const photo = isOpen ? photos[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption || 'Aperçu photo'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la galerie"
            className="absolute top-5 right-5 z-20 rounded-full glass-pill p-2.5 text-white/90 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Photo précédente"
            className="absolute left-3 sm:left-6 z-20 rounded-full glass-pill p-3 text-white/90 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <motion.div
            key={photo.id}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-4xl flex-col items-center rounded-2xl glass-card p-3 sm:p-4"
          >
            {photo.type === 'video' || photo.src?.toLowerCase().endsWith('.mp4') ? (
              <video
                src={photo.src}
                controls
                autoPlay
                playsInline
                className="max-h-[72vh] w-auto rounded-xl"
              />
            ) : (
              <img
                src={photo.src}
                alt={photo.alt}
                className="max-h-[72vh] w-auto rounded-xl object-contain"
              />
            )}
            <div className="mt-3 flex w-full items-center justify-between gap-4 px-2 text-sm text-pink-100/90">
              <p className="font-display text-lg sm:text-xl italic">{photo.caption}</p>
              {photo.date && (
                <span className="shrink-0 text-xs uppercase tracking-widest text-amber-200/80">
                  {photo.date}
                </span>
              )}
            </div>
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Photo suivante"
            className="absolute right-3 sm:right-6 z-20 rounded-full glass-pill p-3 text-white/90 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
