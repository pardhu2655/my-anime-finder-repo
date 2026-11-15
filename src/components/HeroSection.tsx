import { useEffect, useMemo, useState } from 'react';
import {
  AnimeEntry,
  HOTLINKED_ASSETS,
  getDailyDateKey,
  getDailyRecommendedAnime,
} from '../data/animeVault';
import { ImageWithFallback } from './ImageWithFallback';
import { ScreenId } from './Header';

interface HeroSectionProps {
  onNavigate: (screen: ScreenId) => void;
  crtHeavy: boolean;
  onSelectAnime: (anime: AnimeEntry) => void;
  onPlaySound: (type?: 'click' | 'coin' | 'spin' | 'lock') => void;
  watchlistIds: string[];
  onToggleWatchlist: (id: string) => void;
}

function getTimeUntilMidnight(now: Date): string {
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0);
  const diffSec = Math.max(0, Math.floor((nextMidnight.getTime() - now.getTime()) / 1000));
  const hrs = String(Math.floor(diffSec / 3600)).padStart(2, '0');
  const mins = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
  const secs = String(diffSec % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

export function HeroSection({
  onNavigate,
  crtHeavy,
  onSelectAnime,
  onPlaySound,
  watchlistIds,
  onToggleWatchlist,
}: HeroSectionProps) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDayKey = getDailyDateKey(now);
  const { anime: dailyPick, dateKey } = useMemo(
    () => getDailyRecommendedAnime(now),
    // Re-seed strictly when the local calendar date changes (every 24h)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDayKey]
  );

  const countdown = getTimeUntilMidnight(now);
  const isDailySaved = watchlistIds.includes(dailyPick.id);

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

      {/* Daily Recommended Anime Spotlight (24-Hour Date-Seeded Rotation) */}
      <div className="relative z-20 mt-8 pt-6 border-t border-primary-container/30">
        <div className="bg-surface-container-low border border-secondary-container/60 rounded-DEFAULT p-4 sm:p-5 arcade-shadow-cyan">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-outline-variant/40">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="holo-stamp text-surface-container-lowest font-label-md text-label-md px-2.5 py-0.5 font-bold rounded-DEFAULT tracking-widest uppercase">
                RECOMMENDED ANIME
              </span>
              <span className="font-label-sm text-label-sm text-primary-container tracking-widest uppercase">
                DAILY BROADCAST PICK // {dateKey}
              </span>
            </div>
            <div className="font-label-sm text-label-sm text-tertiary-container tabular-nums flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>NEXT 24H ROTATION IN {countdown}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <button
              type="button"
              onClick={() => {
                onPlaySound('lock');
                onSelectAnime(dailyPick);
              }}
              className="md:col-span-4 lg:col-span-3 relative aspect-video rounded-DEFAULT overflow-hidden border border-primary-container/50 bg-surface-container-lowest group cursor-pointer block text-left"
            >
              <ImageWithFallback
                src={dailyPick.posterUrl}
                alt={dailyPick.posterAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackLabel={dailyPick.title}
              />
              <div
                className={`${crtHeavy ? 'crt-overlay-heavy' : 'crt-overlay'} absolute inset-0`}
              />
              <div className="absolute top-2 left-2 bg-secondary-container text-white px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-bold">
                {dailyPick.cassetteCode}
              </div>
              <div className="absolute bottom-2 right-2 bg-surface-container-lowest/90 border border-primary-container/50 text-primary-container px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm tabular-nums">
                {dailyPick.imdbRating}
              </div>
            </button>

            <div className="md:col-span-8 lg:col-span-6 space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap font-label-sm text-label-sm">
                <span className="text-tertiary-container font-bold uppercase tracking-wider">
                  {dailyPick.genreLabel}
                </span>
                <span className="text-outline-variant">/</span>
                <span className="text-primary-container font-bold">{dailyPick.successRate}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onPlaySound('lock');
                  onSelectAnime(dailyPick);
                }}
                className="text-left font-headline-md text-headline-sm sm:text-headline-md text-on-surface hover:text-primary-container transition-colors uppercase cursor-pointer block"
              >
                {dailyPick.title}
              </button>
              <p className="text-body-sm font-body-sm text-on-surface-variant line-clamp-2">
                {dailyPick.whyItWorks}
              </p>
            </div>

            <div className="md:col-span-12 lg:col-span-3 flex flex-wrap lg:flex-col gap-2.5 lg:items-stretch shrink-0">
              <button
                type="button"
                onClick={() => {
                  onPlaySound('lock');
                  onSelectAnime(dailyPick);
                }}
                className="flex-1 bg-primary-container text-surface-container-lowest font-label-md text-label-md font-bold px-4 py-2.5 rounded-DEFAULT shadow-[2px_2px_0px_#ff4a8d] hover:translate-x-[1px] hover:translate-y-[1px] transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-lg">play_circle</span>
                INSPECT DAILY PICK
              </button>
              <button
                type="button"
                onClick={() => {
                  onPlaySound('click');
                  onToggleWatchlist(dailyPick.id);
                }}
                className={`px-4 py-2 rounded-DEFAULT border font-label-sm text-label-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isDailySaved
                    ? 'bg-secondary-container border-secondary-container text-white font-bold'
                    : 'bg-surface-container border-outline-variant text-secondary hover:border-secondary-container'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {isDailySaved ? 'bookmark_added' : 'bookmark_add'}
                </span>
                {isDailySaved ? 'SAVED IN DECK' : 'SAVE DAILY PICK'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

