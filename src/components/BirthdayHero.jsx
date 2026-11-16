import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, CalendarHeart } from 'lucide-react';
import FloatingBalloons from './FloatingBalloons';
import ConfettiEffect from './ConfettiEffect';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function BirthdayHero({ data, onDiscover }) {
  const reducedMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const headline = `Happy Birthday, ${data.birthdayName} ! 🎂`;
  const words = headline.split(' ');

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-8"
    >
      <ConfettiEffect trigger />
      <FloatingBalloons />

      {/* Ambient halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-pink-500/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-amber-300/15 blur-[120px]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
        {/* Text column */}
        <div className="text-center lg:col-span-7 lg:text-left">
          {data.birthdayDate && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-pink-200"
            >
              <CalendarHeart className="h-3.5 w-3.5 text-amber-300" />
              <span>{data.birthdayDate}</span>
            </motion.div>
          )}

          <h1
            aria-label={headline}
            className="font-display text-4xl font-semibold leading-[1.12] sm:text-6xl lg:text-7xl"
          >
            {words.map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className="inline-block whitespace-nowrap mr-[0.28em]"
              >
                {Array.from(word).map((char, charIndex) => {
                  const globalIdx = wordIndex * 6 + charIndex;
                  return (
                    <motion.span
                      key={`${char}-${charIndex}`}
                      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.38,
                        delay: reducedMotion ? 0 : 0.03 * globalIdx,
                        ease: 'easeOut',
                      }}
                      className="inline-block text-gradient-magic"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.65 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pink-100/85 sm:text-lg lg:mx-0"
          >
            {data.heroMessage}
          </motion.p>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.85 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <button
              type="button"
              onClick={onDiscover}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-400 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-glow transition-all hover:scale-[1.03] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            >
              <Sparkles className="h-4 w-4" />
              Découvrir la surprise
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Main photo column */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:col-span-5"
        >
          <div className="relative rounded-[2rem] glass-card p-3 shadow-glow">
            <div className="overflow-hidden rounded-[1.5rem] bg-purple-950/60">
              {!imgError ? (
                <img
                  src={data.mainPhoto.src}
                  alt={data.mainPhoto.alt}
                  onError={() => setImgError(true)}
                  className="h-auto w-full object-contain transition-transform duration-700 hover:scale-[1.03]"
                />
              ) : (
                <div className="flex aspect-[4/5] flex-col items-center justify-center p-6 text-center text-pink-200/80">
                  <Sparkles className="mb-2 h-8 w-8 text-amber-300" />
                  <p className="text-sm">Photo principale indisponible</p>
                </div>
              )}
            </div>
            {data.mainPhoto.caption && (
              <p className="mt-3 pb-1 text-center font-display text-lg italic text-pink-100/90">
                {data.mainPhoto.caption}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
