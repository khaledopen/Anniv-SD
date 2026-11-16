import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Wind, RotateCcw, Sparkles } from 'lucide-react';
import { fireMagicConfetti } from './ConfettiEffect';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CANDLE_COUNT = 5;

export default function BirthdayCake({ name }) {
  const [litCandles, setLitCandles] = useState(
    Array.from({ length: CANDLE_COUNT }, () => true)
  );
  const [isBlowing, setIsBlowing] = useState(false);
  const reducedMotion = useReducedMotion();

  const allOut = litCandles.every((lit) => !lit);

  const handleBlowCandles = () => {
    if (isBlowing || allOut) return;
    setIsBlowing(true);

    if (reducedMotion) {
      setLitCandles(Array.from({ length: CANDLE_COUNT }, () => false));
      setIsBlowing(false);
      return;
    }

    litCandles.forEach((_, idx) => {
      setTimeout(() => {
        setLitCandles((prev) => {
          const next = [...prev];
          next[idx] = false;
          return next;
        });

        if (idx === CANDLE_COUNT - 1) {
          setIsBlowing(false);
          fireMagicConfetti({ particleCount: 95, spread: 85, origin: { y: 0.65 } });
        }
      }, idx * 240);
    });
  };

  const handleReset = () => {
    setIsBlowing(false);
    setLitCandles(Array.from({ length: CANDLE_COUNT }, () => true));
  };

  return (
    <section id="gateau" className="relative mx-auto max-w-3xl px-4 py-24 sm:px-8 text-center">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-pink-200">
          <Cake className="h-3.5 w-3.5 text-amber-300" />
          <span>Le vœu d&apos;anniversaire</span>
        </div>
        <h2 className="font-display text-3xl font-semibold sm:text-5xl text-gradient-magic">
          Fais un vœu, {name} ✨
        </h2>
        <p className="mt-3 text-sm sm:text-base text-pink-100/75">
          Ferme les yeux un instant et souffle les bougies.
        </p>
      </div>

      <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl glass-card p-8 sm:p-10 shadow-glow">
        {/* Cake illustration */}
        <div className="relative mt-6 mb-8 flex flex-col items-center">
          {/* Candles */}
          <div className="relative z-10 flex items-end gap-5 sm:gap-7 -mb-1">
            {litCandles.map((isLit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Flame */}
                <div className="h-7 flex items-end justify-center">
                  <AnimatePresence>
                    {isLit && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="animate-flicker relative h-6 w-3.5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_16px_rgba(251,191,36,0.95)]"
                      >
                        <div className="absolute bottom-1 left-1/2 h-2.5 w-1.5 -translate-x-1/2 rounded-full bg-white/90" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Wick */}
                <div className="h-2 w-[2px] bg-amber-950" />
                {/* Candle body */}
                <div className="h-11 w-3 rounded-t-sm bg-gradient-to-b from-pink-200 via-pink-400 to-purple-500 border border-white/30" />
              </div>
            ))}
          </div>

          {/* Top tier */}
          <div className="relative h-14 w-48 sm:w-56 rounded-t-2xl bg-gradient-to-b from-pink-300 to-pink-500 border-t-4 border-pink-100 shadow-inner">
            <div className="flex justify-around pt-1">
              {[0, 1, 2, 3, 4].map((d) => (
                <div key={d} className="h-3.5 w-5 rounded-b-full bg-pink-100/90" />
              ))}
            </div>
          </div>

          {/* Bottom tier */}
          <div className="relative h-16 w-60 sm:w-72 rounded-t-xl rounded-b-2xl bg-gradient-to-b from-purple-400 to-violet-700 border-t-4 border-amber-200/90 shadow-lg">
            <div className="flex justify-around pt-1">
              {[0, 1, 2, 3, 4, 5].map((d) => (
                <div key={d} className="h-3 w-5 rounded-b-full bg-amber-100/85" />
              ))}
            </div>
          </div>

          {/* Cake plate */}
          <div className="mt-1 h-3 w-72 sm:w-80 rounded-full bg-gradient-to-r from-amber-200/40 via-white/70 to-amber-200/40 shadow-glow-gold" />
        </div>

        {/* Wish message after blowing */}
        <AnimatePresence>
          {allOut && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 rounded-2xl bg-pink-500/15 border border-pink-300/30 px-5 py-4"
            >
              <p className="font-display text-xl sm:text-2xl italic text-amber-200 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 shrink-0" />
                Que tous tes vœux se réalisent !
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {!allOut ? (
            <button
              type="button"
              onClick={handleBlowCandles}
              disabled={isBlowing}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-400 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-glow transition hover:scale-[1.03] hover:brightness-110 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            >
              <Wind className="h-4 w-4" />
              {isBlowing ? 'Souffle en cours...' : 'Souffler les bougies'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full glass-pill px-6 py-3 text-sm font-medium text-pink-100 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
            >
              <RotateCcw className="h-4 w-4" />
              Recommencer
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
