import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

type NimbusDirection = 'ltr' | 'rtl';

const CONTINUOUS_DRAGON_BALLS = [
  { stars: 1, left: '3%', top: '18%', size: 42, dur: 9, delay: 0 },
  { stars: 2, right: '4%', top: '24%', size: 38, dur: 10.5, delay: 1.2 },
  { stars: 3, left: '6%', top: '52%', size: 46, dur: 11, delay: 2.1 },
  { stars: 4, right: '5%', top: '58%', size: 52, dur: 8.5, delay: 0.6 },
  { stars: 5, left: '2.5%', bottom: '18%', size: 40, dur: 9.8, delay: 1.7 },
  { stars: 6, right: '14%', top: '12%', size: 36, dur: 12, delay: 0.9 },
  { stars: 7, left: '16%', bottom: '12%', size: 38, dur: 10, delay: 2.6 },
];

const STAR_OFFSETS: Record<number, Array<[number, number]>> = {
  1: [[50, 50]],
  2: [
    [38, 42],
    [62, 58],
  ],
  3: [
    [50, 32],
    [35, 60],
    [65, 60],
  ],
  4: [
    [36, 36],
    [64, 36],
    [36, 64],
    [64, 64],
  ],
  5: [
    [34, 34],
    [66, 34],
    [50, 50],
    [34, 66],
    [66, 66],
  ],
  6: [
    [35, 30],
    [65, 30],
    [35, 50],
    [65, 50],
    [35, 70],
    [65, 70],
  ],
  7: [
    [50, 26],
    [32, 42],
    [68, 42],
    [50, 50],
    [32, 64],
    [68, 64],
    [50, 76],
  ],
};

interface DbzBackgroundFXProps {
  enabled: boolean;
}

export function DbzBackgroundFX({ enabled }: DbzBackgroundFXProps) {
  const [nimbusPass, setNimbusPass] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Continuous alternating Flying Nimbus flights
  useEffect(() => {
    if (!enabled || reducedMotion) return;
    const interval = setInterval(() => {
      setNimbusPass((prev) => prev + 1);
    }, 5200);
    return () => clearInterval(interval);
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  const direction: NimbusDirection = nimbusPass % 2 === 0 ? 'ltr' : 'rtl';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-20 pointer-events-none overflow-hidden select-none"
    >
      {/* Subtle Side Ki Aura Glows */}
      <motion.div
        animate={{
          opacity: [0.16, 0.3, 0.18, 0.32, 0.16],
          scaleY: [0.95, 1.04, 0.98, 1.05, 0.95],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'bottom center' }}
        className="absolute bottom-0 -left-12 w-36 sm:w-48 h-[72vh] bg-gradient-to-t from-tertiary-fixed-dim/30 via-primary-container/10 to-transparent blur-2xl"
      />
      <motion.div
        animate={{
          opacity: [0.18, 0.32, 0.16, 0.28, 0.18],
          scaleY: [1.02, 0.96, 1.05, 0.98, 1.02],
        }}
        transition={{ duration: 4.9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'bottom center' }}
        className="absolute bottom-0 -right-12 w-36 sm:w-48 h-[72vh] bg-gradient-to-t from-tertiary-fixed-dim/30 via-secondary-container/10 to-transparent blur-2xl"
      />

      {/* 7 Glowing Dragon Balls Orbiting / Floating */}
      {CONTINUOUS_DRAGON_BALLS.map((ball) => (
        <motion.div
          key={ball.stars}
          style={{
            left: ball.left,
            right: ball.right,
            top: ball.top,
            bottom: ball.bottom,
          }}
          animate={{
            y: [0, -22, 6, -14, 0],
            x: [0, 8, -6, 10, 0],
            rotate: [0, 12, -8, 10, 0],
            opacity: [0.35, 0.65, 0.42, 0.6, 0.35],
          }}
          transition={{
            duration: ball.dur,
            delay: ball.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute"
        >
          <svg
            width={ball.size}
            height={ball.size}
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_14px_rgba(255,186,32,0.55)]"
          >
            <defs>
              <radialGradient id={`live-dball-${ball.stars}`} cx="35%" cy="30%" r="68%">
                <stop offset="0%" stopColor="#fff4e8" stopOpacity="0.95" />
                <stop offset="38%" stopColor="#ffd386" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#ffba20" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#ff4a8d" stopOpacity="0.35" />
              </radialGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="44"
              fill={`url(#live-dball-${ball.stars})`}
              stroke="#ffd386"
              strokeWidth="2.5"
              strokeOpacity="0.85"
            />
            {STAR_OFFSETS[ball.stars].map(([cx, cy], idx) => (
              <polygon
                key={idx}
                points={`${cx},${cy - 6} ${cx + 1.8},${cy - 1.8} ${cx + 6.2},${cy - 1.8} ${cx + 2.6},${cy + 1} ${cx + 4},${cy + 5.5} ${cx},${cy + 2.8} ${cx - 4},${cy + 5.5} ${cx - 2.6},${cy + 1} ${cx - 6.2},${cy - 1.8} ${cx - 1.8},${cy - 1.8}`}
                fill="#ff4a8d"
                fillOpacity="0.95"
              />
            ))}
          </svg>
        </motion.div>
      ))}

      {/* Flying Nimbus (Kinto-un) Continuous Flights */}
      <AnimatePresence mode="wait">
        <NimbusDash key={nimbusPass} direction={direction} />
      </AnimatePresence>
    </div>
  );
}

function NimbusDash({ direction }: { direction: NimbusDirection }) {
  const isLtr = direction === 'ltr';
  return (
    <motion.div
      initial={{ x: isLtr ? '-25vw' : '115vw', opacity: 0 }}
      animate={{
        x: isLtr ? '115vw' : '-28vw',
        y: [0, -18, 8, -12, 0],
        opacity: [0, 0.7, 0.7, 0],
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 4.9, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${isLtr ? 'top-[14%]' : 'top-[72%]'} left-0`}
    >
      <svg
        width="220"
        height="100"
        viewBox="140 10 180 95"
        fill="none"
        className={`drop-shadow-[0_0_18px_rgba(255,211,134,0.75)] ${isLtr ? '' : '-scale-x-100'}`}
      >
        {/* Goku Silhouette */}
        <path
          d="M235 46 L228 33 L238 35 L234 22 L245 28 L250 16 L256 27 L268 20 L264 33 L275 34 L265 43 C268 48 269 54 267 59 L240 59 C237 55 236 50 235 46 Z"
          fill="#15111e"
          stroke="#00f0ff"
          strokeWidth="2"
        />
        <path
          d="M237 54 Q215 52 198 60"
          stroke="#ff4a8d"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Golden Kinto-un Nimbus Cloud */}
        <path
          d="M175 74 C175 64 186 58 197 60 C203 50 218 48 228 55 C236 47 254 47 264 56 C276 53 292 60 293 72 C304 74 307 88 294 92 L182 92 C169 90 168 77 175 74 Z"
          fill="url(#nimbusCloudLive)"
          fillOpacity="0.7"
          stroke="#ffd386"
          strokeWidth="2.5"
        />
        <defs>
          <linearGradient id="nimbusCloudLive" x1="170" y1="50" x2="305" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffba20" />
            <stop offset="1" stopColor="#fff4e8" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
