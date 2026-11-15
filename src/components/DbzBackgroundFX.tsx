import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

type DbzScene = 'nimbus' | 'kamehameha' | 'dragonballs' | 'saiyan-aura' | 'radar';

const SCENES: DbzScene[] = [
  'nimbus',
  'dragonballs',
  'kamehameha',
  'saiyan-aura',
  'radar',
];

const DRAGON_BALL_CONFIGS = [
  { stars: 1, x: '12%', delay: 0.1, duration: 4.8, size: 52 },
  { stars: 2, x: '26%', delay: 0.45, duration: 5.1, size: 44 },
  { stars: 3, x: '42%', delay: 0.25, duration: 4.6, size: 56 },
  { stars: 4, x: '58%', delay: 0.6, duration: 5.0, size: 60 },
  { stars: 5, x: '74%', delay: 0.3, duration: 4.9, size: 46 },
  { stars: 6, x: '86%', delay: 0.55, duration: 5.2, size: 50 },
  { stars: 7, x: '93%', delay: 0.15, duration: 4.7, size: 42 },
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
  const [sceneIndex, setSceneIndex] = useState(0);
  const [activeScene, setActiveScene] = useState<DbzScene | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) {
      setActiveScene(null);
      return;
    }

    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const runCycle = (idx: number) => {
      setActiveScene(SCENES[idx % SCENES.length]);
      // Play scene for 5.2s, then fade out for a calm 2.4s breather before next DBZ scene
      hideTimer = setTimeout(() => {
        setActiveScene(null);
        nextTimer = setTimeout(() => {
          setSceneIndex((prev) => {
            const next = (prev + 1) % SCENES.length;
            runCycle(next);
            return next;
          });
        }, 2400);
      }, 5200);
    };

    showTimer = setTimeout(() => {
      runCycle(sceneIndex);
    }, 650);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
    // Intentionally start/stop cleanly when enabled or reducedMotion changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      <AnimatePresence mode="wait">
        {activeScene === 'nimbus' && <FlyingNimbusScene key="nimbus" />}
        {activeScene === 'dragonballs' && <DragonBallsScene key="dragonballs" />}
        {activeScene === 'kamehameha' && <KamehamehaScene key="kamehameha" />}
        {activeScene === 'saiyan-aura' && <SaiyanAuraScene key="saiyan-aura" />}
        {activeScene === 'radar' && <DragonRadarScene key="radar" />}
      </AnimatePresence>
    </div>
  );
}

function FlyingNimbusScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0"
    >
      {/* Anime atmospheric speed streaks */}
      <motion.div
        initial={{ x: '-30vw', opacity: 0 }}
        animate={{ x: '115vw', opacity: [0, 0.24, 0.24, 0] }}
        transition={{ duration: 4.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[16%] left-0 flex items-center"
      >
        {/* Golden/Cyan Speed Trail */}
        <svg
          width="340"
          height="110"
          viewBox="0 0 340 110"
          fill="none"
          className="drop-shadow-[0_0_16px_rgba(255,211,134,0.45)]"
        >
          {/* Speed lines trailing behind Nimbus */}
          <line x1="0" y1="62" x2="175" y2="62" stroke="#ffd386" strokeWidth="2.5" strokeOpacity="0.65" />
          <line x1="35" y1="74" x2="195" y2="74" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.55" />
          <line x1="15" y1="84" x2="160" y2="84" stroke="#ffba20" strokeWidth="2" strokeOpacity="0.4" />

          {/* Spiky-haired martial artist silhouette on Nimbus */}
          <path
            d="M235 46 L228 33 L238 35 L234 22 L245 28 L250 16 L256 27 L268 20 L264 33 L275 34 L265 43 C268 48 269 54 267 59 L240 59 C237 55 236 50 235 46 Z"
            fill="#15111e"
            stroke="#00f0ff"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          {/* Flowing sash / tail accent */}
          <path
            d="M237 54 Q215 52 198 60"
            stroke="#ff4a8d"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />

          {/* Flying Nimbus (Kinto-un) Cloud */}
          <path
            d="M175 74 C175 64 186 58 197 60 C203 50 218 48 228 55 C236 47 254 47 264 56 C276 53 292 60 293 72 C304 74 307 88 294 92 L182 92 C169 90 168 77 175 74 Z"
            fill="url(#nimbusGrad)"
            fillOpacity="0.35"
            stroke="#ffd386"
            strokeWidth="2"
            strokeOpacity="0.75"
          />
          <defs>
            <linearGradient id="nimbusGrad" x1="170" y1="50" x2="305" y2="92" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffba20" />
              <stop offset="1" stopColor="#ffd386" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Secondary high-altitude silhouette arc */}
      <motion.div
        initial={{ x: '110vw', opacity: 0 }}
        animate={{ x: '-25vw', opacity: [0, 0.16, 0.16, 0] }}
        transition={{ duration: 4.5, delay: 0.6, ease: 'easeInOut' }}
        className="absolute bottom-[18%] left-0"
      >
        <div className="w-64 h-1 bg-gradient-to-r from-transparent via-primary-container/50 to-transparent blur-[1px]" />
      </motion.div>
    </motion.div>
  );
}

function DragonBallsScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="absolute inset-0"
    >
      {DRAGON_BALL_CONFIGS.map((ball) => (
        <motion.div
          key={ball.stars}
          style={{ left: ball.x }}
          initial={{ y: '108vh', opacity: 0, scale: 0.75, rotate: -20 }}
          animate={{
            y: ['105vh', '52vh', '-12vh'],
            opacity: [0, 0.34, 0.28, 0],
            scale: [0.8, 1.05, 0.9],
            rotate: [0, 25, 60],
          }}
          transition={{
            duration: ball.duration,
            delay: ball.delay,
            ease: 'easeOut',
          }}
          className="absolute top-0"
        >
          <svg
            width={ball.size}
            height={ball.size}
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_16px_rgba(255,186,32,0.5)]"
          >
            <defs>
              <radialGradient id={`dball-${ball.stars}`} cx="35%" cy="30%" r="68%">
                <stop offset="0%" stopColor="#fff4e8" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#ffd386" stopOpacity="0.7" />
                <stop offset="85%" stopColor="#ffba20" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ff4a8d" stopOpacity="0.3" />
              </radialGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="44"
              fill={`url(#dball-${ball.stars})`}
              stroke="#ffd386"
              strokeWidth="2.5"
              strokeOpacity="0.8"
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
    </motion.div>
  );
}

function KamehamehaScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center"
    >
      {/* Charging Ki Core on left */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{
          scale: [0.2, 1.35, 0.9, 1.5, 0.4],
          opacity: [0, 0.4, 0.45, 0.35, 0],
        }}
        transition={{ duration: 4.8, ease: 'easeInOut' }}
        className="absolute left-4 sm:left-10 top-[36%] w-28 h-28 rounded-full bg-primary-container/30 border-2 border-primary-container/70 blur-[2px] shadow-[0_0_45px_rgba(0,240,255,0.6)]"
      />

      {/* Energy Beam Wave firing across the viewport */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 0.08, 1.15, 1.25],
          opacity: [0, 0.28, 0.26, 0],
        }}
        transition={{ duration: 4.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left center' }}
        className="absolute left-12 top-[39%] w-[95vw] h-14 sm:h-20 rounded-full bg-gradient-to-r from-primary/60 via-primary-container/40 to-transparent blur-[3px]"
      />

      {/* Crisp inner core beam */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 0.05, 1.15, 1.2],
          opacity: [0, 0.35, 0.3, 0],
        }}
        transition={{ duration: 4.3, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left center' }}
        className="absolute left-12 top-[41.5%] w-[95vw] h-4 rounded-full bg-gradient-to-r from-white/70 via-primary-container/60 to-transparent"
      />

      {/* Ki Shockwave Rings */}
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          initial={{ x: 40, scale: 0.5, opacity: 0 }}
          animate={{
            x: [40, 240 + ring * 260, 560 + ring * 260],
            scale: [0.6, 1.2, 1.8],
            opacity: [0, 0.3, 0],
          }}
          transition={{ duration: 3.4, delay: 0.9 + ring * 0.35, ease: 'easeOut' }}
          className="absolute top-[34%] w-16 h-32 rounded-full border-2 border-primary-container/50"
        />
      ))}
    </motion.div>
  );
}

function SaiyanAuraScene() {
  const sparks = [
    { left: '6%', delay: 0.1, dur: 3.2, color: 'bg-tertiary-fixed-dim' },
    { left: '11%', delay: 0.6, dur: 2.9, color: 'bg-primary-container' },
    { left: '18%', delay: 1.0, dur: 3.4, color: 'bg-tertiary-container' },
    { left: '82%', delay: 0.25, dur: 3.1, color: 'bg-tertiary-container' },
    { left: '89%', delay: 0.8, dur: 2.8, color: 'bg-primary-container' },
    { left: '94%', delay: 0.4, dur: 3.5, color: 'bg-tertiary-fixed-dim' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0"
    >
      {/* Left & Right Golden Super Saiyan Ki Aura Pillars */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.6 }}
        animate={{ opacity: [0, 0.22, 0.16, 0.24, 0], scaleY: [0.6, 1.05, 0.95, 1.1, 0.8] }}
        transition={{ duration: 4.8, ease: 'easeInOut' }}
        style={{ transformOrigin: 'bottom center' }}
        className="absolute bottom-0 left-0 w-44 h-[75vh] bg-gradient-to-t from-tertiary-fixed-dim/35 via-tertiary-container/15 to-transparent blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, scaleY: 0.6 }}
        animate={{ opacity: [0, 0.22, 0.16, 0.24, 0], scaleY: [0.6, 1.05, 0.95, 1.1, 0.8] }}
        transition={{ duration: 4.8, ease: 'easeInOut' }}
        style={{ transformOrigin: 'bottom center' }}
        className="absolute bottom-0 right-0 w-44 h-[75vh] bg-gradient-to-t from-tertiary-fixed-dim/35 via-primary-container/15 to-transparent blur-2xl"
      />

      {/* Anti-gravity rising golden & cyan ki pebbles / sparks */}
      {sparks.map((s, idx) => (
        <motion.div
          key={idx}
          style={{ left: s.left }}
          initial={{ y: '95vh', opacity: 0, scale: 0.7 }}
          animate={{ y: ['95vh', '20vh'], opacity: [0, 0.45, 0], scale: [0.7, 1.2, 0.5] }}
          transition={{ duration: s.dur, delay: s.delay, ease: 'easeOut' }}
          className={`absolute top-0 w-2 h-6 rounded-full ${s.color} blur-[1px]`}
        />
      ))}

      {/* Super Saiyan Lightning Arcs */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.35, 0, 0.3, 0] }}
        transition={{ duration: 3.6, delay: 0.7, ease: 'easeInOut' }}
        viewBox="0 0 200 400"
        className="absolute bottom-8 left-4 w-32 h-64"
        fill="none"
      >
        <path
          d="M40 380 L70 300 L45 270 L95 190 L65 160 L120 70"
          stroke="#00f0ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0, 0.35, 0] }}
        transition={{ duration: 3.6, delay: 1.0, ease: 'easeInOut' }}
        viewBox="0 0 200 400"
        className="absolute bottom-8 right-4 w-32 h-64"
        fill="none"
      >
        <path
          d="M155 370 L120 290 L145 255 L95 180 L125 145 L75 55"
          stroke="#ffd386"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

function DragonRadarScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: [0, 0.25, 0.25, 0], scale: [0.88, 1, 1, 1.04] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 5.0, ease: 'easeInOut' }}
      className="absolute right-6 sm:right-14 bottom-20 w-72 h-72 sm:w-96 sm:h-96"
    >
      <div className="relative w-full h-full rounded-full border-2 border-primary-container/45 bg-primary-container/5 flex items-center justify-center">
        {/* Radar Grid Rings */}
        <div className="absolute inset-6 rounded-full border border-primary-container/30" />
        <div className="absolute inset-14 rounded-full border border-primary-container/25" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-primary-container/25" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-primary-container/25" />

        {/* Rotating Sweeper */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(0,240,255,0.28) 0deg, rgba(0,240,255,0) 65deg, transparent 360deg)',
          }}
        />

        {/* Center Triangle Cursor */}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-secondary-container/80" />

        {/* Blinking Dragon Ball Blips */}
        {[
          { top: '26%', left: '34%', delay: 0.2 },
          { top: '31%', left: '38%', delay: 0.35 },
          { top: '62%', left: '68%', delay: 0.6 },
          { top: '24%', left: '66%', delay: 0.9 },
        ].map((blip, i) => (
          <motion.div
            key={i}
            style={{ top: blip.top, left: blip.left }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.3, 0.9] }}
            transition={{ duration: 1.2, delay: blip.delay, repeat: Infinity }}
            className="absolute w-3 h-3 rounded-full bg-tertiary-fixed-dim shadow-[0_0_12px_#ffba20]"
          />
        ))}
      </div>
    </motion.div>
  );
}
