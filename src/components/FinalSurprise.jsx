import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Share2, RotateCcw, Check } from 'lucide-react';
import { fireFireworksBurst } from './ConfettiEffect';
import { useReducedMotion } from '../hooks/useReducedMotion';

const FINAL_STARS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: `${(i * 41) % 100}%`,
  left: `${(i * 61) % 100}%`,
  size: (i % 3) + 2,
  delay: `${(i % 5) * 0.4}s`,
}));

export default function FinalSurprise({ message, name, onReplayMemories }) {
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleShare = async () => {
    const shareData = {
      title: `Joyeux Anniversaire ${name} ✨`,
      text: `Découvre cette surprise d'anniversaire pour ${name} !`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2600);
      }
    } catch {
      // User cancelled share dialog or clipboard unavailable
    }
  };

  return (
    <section
      id="final"
      className="relative overflow-hidden px-4 py-28 sm:px-8 text-center"
    >
      {/* Starry backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {FINAL_STARS.map((star) => (
          <span
            key={star.id}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              '--twinkle-delay': star.delay,
            }}
            className="animate-twinkle absolute rounded-full bg-amber-100/80 shadow-[0_0_10px_rgba(253,230,138,0.85)]"
          />
        ))}
      </div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        onViewportEnter={() => fireFireworksBurst()}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-3xl rounded-3xl glass-card p-8 sm:p-14 shadow-glow"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400/30 to-amber-300/30 border border-white/25">
          <Sparkles className="h-8 w-8 text-amber-200" />
        </div>

        <h2 className="font-display text-3xl font-semibold leading-snug sm:text-5xl text-gradient-magic">
          {message}
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onReplayMemories}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-400 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-glow transition hover:scale-[1.03] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
          >
            <RotateCcw className="h-4 w-4" />
            Revoir nos souvenirs
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full glass-pill px-6 py-3.5 text-sm sm:text-base font-medium text-pink-100 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Share2 className="h-4 w-4" />}
            {copied ? 'Lien copié !' : 'Partager'}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
