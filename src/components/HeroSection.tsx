import { HOTLINKED_ASSETS } from '../data/animeVault';
import { ImageWithFallback } from './ImageWithFallback';
import { ScreenId } from './Header';

interface HeroSectionProps {
  onNavigate: (screen: ScreenId) => void;
  crtHeavy: boolean;
}

export function HeroSection({ onNavigate, crtHeavy }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative rounded-lg border border-primary-container/40 bg-surface-container-lowest p-6 sm:p-10 arcade-shadow overflow-hidden"
    >
      {/* Ambient CRT scanline overlay */}
      <div
        className={`${crtHeavy ? 'crt-overlay-heavy' : 'crt-overlay'} absolute inset-0 z-10 pointer-events-none`}
      />

      {/* Glowing Scanline Ticker */}
      <div className="relative z-20 flex items-center justify-between border-b border-primary-container/30 pb-3 mb-8 bg-surface-container-low/70 px-4 py-2 rounded-DEFAULT backdrop-blur-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse shadow-[0_0_8px_#ff4a8d] shrink-0" />
          <span className="font-label-md text-label-md text-primary-container tracking-widest truncate">
            SYS.STATUS: BROADCAST LIVE // 4,892 NEWBIES CONVERTED THIS WEEK // INSERT COIN TO ROLL
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-on-surface-variant font-label-sm text-label-sm shrink-0">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">videocam</span> NTSC 60Hz
          </span>
          <span className="text-tertiary-container font-bold">CH-99 STEREO</span>
        </div>
      </div>

      {/* Hero Main Content Grid */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-DEFAULT bg-surface-container-high border border-secondary-container text-secondary font-label-sm text-label-sm uppercase tracking-widest">
            <span className="material-symbols-outlined text-xs text-secondary-container">
              auto_awesome
            </span>
            OVERWHELMED BY 10,000 ANIME? LET OUR 1999 CYBER-ORACLE FIND YOUR GATEWAY
          </div>

          <h1 className="text-display-hero-mobile sm:text-display-hero font-display-hero text-on-surface tracking-tight uppercase leading-none text-balance">
            HOW TO CHOOSE YOUR{' '}
            <span className="text-primary-container drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]">
              FIRST ANIME
            </span>{' '}
            WITHOUT GETTING OVERWHELMED
          </h1>

          <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl">
            Tired of confusing 900-episode sagas, filler episodes, and obscure inside jokes? Step
            into our retro cybernetic chamber. In three simple answers, our neural engine delivers
            the exact beginner masterpiece tailored to your tastes.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('quiz')}
              className="flex items-center gap-3 bg-primary-container text-surface-container-lowest font-headline-sm font-bold px-6 py-4 rounded-DEFAULT arcade-shadow hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-wider cursor-pointer"
            >
              <span className="material-symbols-outlined">play_arrow</span>
              LAUNCH 3-QUESTION GATEWAY QUIZ
            </button>
            <button
              type="button"
              onClick={() => onNavigate('roulette')}
              className="flex items-center gap-3 bg-surface-container-high border-2 border-secondary-container text-secondary font-headline-sm font-bold px-6 py-4 rounded-DEFAULT shadow-[4px_4px_0px_#00f0ff] hover:bg-secondary-container/20 hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-wider cursor-pointer"
            >
              <span className="material-symbols-outlined text-secondary-container">casino</span>
              SPIN ANIME ROULETTE
            </button>
          </div>
        </div>

        {/* Hero Visual/CRT Arcade Deck */}
        <div className="lg:col-span-4 relative">
          <div className="bg-surface-container-low border-2 border-primary-container/50 rounded-DEFAULT p-4 arcade-shadow-cyan">
            <div className="relative aspect-video rounded-DEFAULT overflow-hidden border border-outline-variant/60 mb-4 bg-surface-container-lowest">
              <ImageWithFallback
                src={HOTLINKED_ASSETS.heroAlley}
                alt="Retro 1990s cyberpunk anime alleyway with neon ramen stand"
                className="w-full h-full object-cover"
                fallbackLabel="VAULT #99 FEED"
              />
              <div className="absolute bottom-2 left-2 bg-surface-container-lowest/80 border border-primary-container/80 px-2 py-0.5 text-primary-container font-label-sm text-label-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error animate-ping" /> REC [SP-01]
              </div>
              <div className="absolute top-2 right-2 bg-secondary-container text-white px-2 py-0.5 rounded-DEFAULT font-label-sm font-bold text-label-sm">
                VAULT #99
              </div>
            </div>

            {/* LED Statistics Display */}
            <div className="grid grid-cols-3 gap-2 bg-surface-container-lowest p-3 border border-outline-variant/40 rounded-DEFAULT text-center font-label-sm text-label-sm tabular-nums">
              <div className="border-r border-outline-variant/40 pr-1">
                <div className="text-tertiary-container font-bold text-base">0</div>
                <div className="text-on-surface-variant leading-tight">Fillers Filtered</div>
              </div>
              <div className="border-r border-outline-variant/40 pr-1">
                <div className="text-primary-container font-bold text-base">100%</div>
                <div className="text-on-surface-variant leading-tight">No-Cringe Gateways</div>
              </div>
              <div>
                <div className="text-secondary font-bold text-base">&lt; 25</div>
                <div className="text-on-surface-variant leading-tight">Eps Fast-Tracks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
