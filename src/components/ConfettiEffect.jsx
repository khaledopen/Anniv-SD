import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useReducedMotion } from '../hooks/useReducedMotion';

const MAGIC_COLORS = ['#f472b6', '#c084fc', '#fde68a', '#fb7185', '#ffffff'];

export function fireMagicConfetti(options = {}) {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  confetti({
    particleCount: 70,
    spread: 75,
    origin: { y: 0.6 },
    colors: MAGIC_COLORS,
    disableForReducedMotion: true,
    ...options,
  });
}

export function fireFireworksBurst() {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  const defaults = {
    startVelocity: 28,
    spread: 360,
    ticks: 70,
    zIndex: 60,
    colors: MAGIC_COLORS,
    disableForReducedMotion: true,
  };

  confetti({ ...defaults, particleCount: 45, origin: { x: 0.25, y: 0.35 } });
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 45, origin: { x: 0.75, y: 0.32 } });
  }, 220);
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 60, origin: { x: 0.5, y: 0.25 } });
  }, 450);
}

export default function ConfettiEffect({ trigger = false }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (trigger && !reducedMotion) {
      fireMagicConfetti({ particleCount: 90, spread: 90, origin: { y: 0.55 } });
    }
  }, [trigger, reducedMotion]);

  return null;
}
