import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Sparkles } from 'lucide-react';
import { RealisticEnvelopeIcon } from './MagicIcons';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function SpecialMessage({ message }) {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <section id="message" className="relative mx-auto max-w-3xl px-4 py-24 sm:px-8">
      <div className="mb-12 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-pink-200">
          <Mail className="h-3.5 w-3.5 text-amber-300" />
          <span>Lettre personnelle</span>
        </div>
        <h2 className="font-display text-3xl font-semibold sm:text-5xl text-gradient-magic">
          {message.title}
        </h2>
      </div>

      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-envelope"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.45 }}
              className="relative w-full max-w-md flex flex-col items-center text-center pt-10"
            >
              {/* Floating neon hearts */}
              <motion.span
                aria-hidden="true"
                animate={reducedMotion ? undefined : { y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute left-2 top-16 text-2xl text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.9)]"
              >
                ♡
              </motion.span>
              <motion.span
                aria-hidden="true"
                animate={reducedMotion ? undefined : { y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3.8, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute right-3 top-10 text-3xl text-fuchsia-300 drop-shadow-[0_0_12px_rgba(232,121,249,0.9)]"
              >
                ♡
              </motion.span>

              {/* Custom 3D-style animated envelope */}
              <motion.div
                onClick={() => setIsOpen(true)}
                animate={
                  reducedMotion
                    ? undefined
                    : { y: [0, -8, 0], rotate: [0, 0.6, -0.6, 0] }
                }
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={reducedMotion ? undefined : { scale: 1.04, y: -10 }}
                whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                className="group relative w-72 sm:w-80 h-52 sm:h-56 cursor-pointer select-none"
              >
                {/* Back flap (open triangle) */}
                <div
                  className="absolute -top-12 left-0 right-0 h-20 bg-gradient-to-b from-pink-200 to-pink-300 shadow-inner"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />

                {/* Cream letter peeking out */}
                <motion.div
                  initial={reducedMotion ? false : { y: 8 }}
                  whileHover={reducedMotion ? undefined : { y: -8 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="absolute left-4 right-4 -top-6 h-36 rounded-t-xl bg-gradient-to-b from-[#fffaf0] to-[#fde8d7] p-4 shadow-lg border border-amber-200/60 flex flex-col items-center justify-start"
                >
                  <p className="font-script text-2xl sm:text-3xl text-purple-900 leading-tight mt-1">
                    Un message spécial pour toi{' '}
                    <span className="text-rose-500 not-italic">❤️</span>
                  </p>
                </motion.div>

                {/* Envelope front body */}
                <div className="absolute inset-0 top-6 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-pink-500 shadow-[0_20px_50px_rgba(236,72,153,0.45)] border border-white/25 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/15"
                    style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }}
                  />
                </div>

                {/* Wax seal with heart */}
                <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-rose-500 to-red-700 shadow-[0_0_22px_rgba(251,191,36,0.85)] border-2 border-amber-200/80 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-lg text-amber-100 drop-shadow">♥</span>
                </div>
              </motion.div>

              <motion.button
                type="button"
                onClick={() => setIsOpen(true)}
                whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-pink-200 via-pink-100 to-rose-200 px-8 py-3.5 text-sm sm:text-base font-semibold text-purple-950 shadow-glow transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
              >
                <MailOpen className="h-4 w-4" />
                Lire mon message →
              </motion.button>
            </motion.div>
          ) : (
            <motion.article
              key="open-letter"
              initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full rounded-3xl glass-card p-7 sm:p-12 shadow-glow"
            >
              <Sparkles className="absolute top-6 right-6 h-5 w-5 text-amber-300/80" />

              <p className="font-script text-3xl sm:text-4xl text-amber-200 mb-6">
                {message.greeting}
              </p>

              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-pink-50/90">
                {message.paragraphs.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: reducedMotion ? 0 : 0.18 * (idx + 1),
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.p
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: reducedMotion ? 0 : 0.2 * (message.paragraphs.length + 1),
                }}
                className="mt-8 font-display text-xl italic text-pink-200 text-right"
              >
                {message.signature}
              </motion.p>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
