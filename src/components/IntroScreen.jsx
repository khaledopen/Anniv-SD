import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { RealisticGiftIcon } from './MagicIcons';
import { useReducedMotion } from '../hooks/useReducedMotion';

const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top: `${(i * 37) % 100}%`,
  left: `${(i * 53) % 100}%`,
  size: (i % 3) + 2,
  delay: `${(i % 6) * 0.5}s`,
  duration: `${2.8 + (i % 4) * 0.7}s`,
}));

export default function IntroScreen({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => {
      onOpen();
    }, reducedMotion ? 150 : 850);
  };

  return (
    <AnimatePresence>
      <motion.section
        aria-label="Écran d'introduction"
        initial={{ opacity: 1 }}
        animate={
          opening && !reducedMotion
            ? { opacity: 0, scale: 1.12, filter: 'blur(8px)' }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#4c1d95_0%,#1e0b36_50%,#090412_100%)] px-6 text-center"
      >
        {/* Ambient bokeh halos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-pink-500/20 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-amber-400/15 blur-[120px]"
        />

        {/* Twinkling stars */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {STARS.map((star) => (
            <span
              key={star.id}
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                '--twinkle-delay': star.delay,
                '--twinkle-duration': star.duration,
              }}
              className="animate-twinkle absolute rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
          ))}
        </div>

        {/* Light burst on open */}
        {opening && !reducedMotion && (
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 4.5, opacity: [0, 0.85, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="pointer-events-none absolute h-64 w-64 rounded-full bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300 blur-2xl"
          />
        )}

        {/* Centerpiece gift */}
        <motion.div
          initial={reducedMotion ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 flex max-w-md flex-col items-center"
        >
          <motion.button
            type="button"
            onClick={handleOpen}
            aria-label="Ouvrir la boîte surprise"
            whileHover={reducedMotion ? undefined : { scale: 1.06, rotate: [-1, 1, 0] }}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }}
            className="group relative mb-6 sm:mb-8 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-3xl glass-card shadow-glow transition-shadow duration-500 hover:shadow-[0_0_60px_-8px_rgba(244,114,182,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-500/25 via-transparent to-amber-300/25 opacity-80 group-hover:opacity-100 transition-opacity" />
            <RealisticGiftIcon className="h-14 w-14 sm:h-20 sm:w-20 drop-shadow-[0_10px_22px_rgba(244,114,182,0.55)] transition-transform duration-500 group-hover:scale-110" />
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-amber-300 animate-pulse" />
          </motion.button>

          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-pink-200/80">
            Birthday Magic
          </p>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-gradient-magic mb-8">
            Une surprise spéciale t&apos;attend... 🎁
          </h1>

          <motion.button
            type="button"
            onClick={handleOpen}
            whileHover={reducedMotion ? undefined : { scale: 1.04 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-400 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-glow transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
          >
            <Sparkles className="h-4 w-4" />
            Ouvrir ma surprise
          </motion.button>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
