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
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-md rounded-3xl glass-card p-8 sm:p-10 text-center shadow-glow"
            >
              <div className="mx-auto mb-5 sm:mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400/25 to-amber-300/20 border border-white/20 shadow-glow">
                <RealisticEnvelopeIcon className="h-12 w-12 sm:h-16 sm:w-16 drop-shadow-[0_8px_18px_rgba(244,114,182,0.45)]" />
              </div>
              <p className="font-display text-2xl italic text-pink-50 mb-6">
                Une enveloppe t&apos;est destinée...
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-400 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-glow transition hover:scale-[1.03] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
              >
                <MailOpen className="h-4 w-4" />
                Lire ton message
              </button>
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
