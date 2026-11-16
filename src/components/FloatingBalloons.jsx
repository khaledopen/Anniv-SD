import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const BALLOONS = [
  { id: 1, left: '6%', size: 68, color: 'from-pink-300/75 to-rose-500/75', delay: 0, duration: 9 },
  { id: 2, left: '16%', size: 52, color: 'from-purple-300/70 to-violet-600/70', delay: 1.2, duration: 11 },
  { id: 3, left: '82%', size: 64, color: 'from-amber-200/75 to-pink-400/75', delay: 0.6, duration: 10 },
  { id: 4, left: '91%', size: 50, color: 'from-fuchsia-300/70 to-purple-600/70', delay: 2, duration: 12 },
];

export default function FloatingBalloons() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {BALLOONS.map((b) => (
        <motion.div
          key={b.id}
          style={{ left: b.left, width: b.size, height: b.size * 1.22 }}
          className="absolute -bottom-24 flex flex-col items-center"
          initial={{ y: 0, opacity: 0.55 }}
          animate={
            reducedMotion
              ? { y: -120, opacity: 0.45 }
              : {
                  y: [0, -760],
                  x: [0, 18, -14, 10, 0],
                  opacity: [0, 0.75, 0.75, 0],
                }
          }
          transition={
            reducedMotion
              ? { duration: 1 }
              : {
                  duration: b.duration,
                  delay: b.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        >
          <div
            className={`w-full h-full rounded-[50%_50%_46%_46%] bg-gradient-to-br ${b.color} backdrop-blur-sm border border-white/30 shadow-glow relative`}
          >
            <div className="absolute top-2.5 left-3 w-3 h-5 rounded-full bg-white/45 rotate-[-20deg]" />
          </div>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
}
