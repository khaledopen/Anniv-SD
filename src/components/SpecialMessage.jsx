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
              className="w-full max-w-lg flex flex-col items-center text-center"
            >
              <motion.div
                onClick={() => setIsOpen(true)}
                animate={
                  reducedMotion
                    ? undefined
                    : { y: [0, -8, 0], rotate: [0, 0.8, -0.8, 0] }
                }
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                className="group relative w-full cursor-pointer overflow-hidden rounded-3xl glass-card p-2 shadow-glow transition-shadow duration-500 hover:shadow-[0_0_60px_-8px_rgba(244,114,182,0.7)]"
              >
                <img
                  src="/photos/envelope-special.png"
                  alt="Un message spécial pour toi"
                  className="h-auto w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </motion.div>

              <motion.button
                type="button"
                onClick={() => setIsOpen(true)}
                whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-pink-200 via-pink-100 to-rose-200 px-8 py-3.5 text-sm sm:text-base font-semibold text-purple-950 shadow-glow transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
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
