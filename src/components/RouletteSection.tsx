import { useMemo, useState } from 'react';
import { ANIME_CATALOG, AnimeEntry, RouletteFilter } from '../data/animeVault';
import { ImageWithFallback } from './ImageWithFallback';

const VIBE_FILTERS: RouletteFilter[] = [
  'SHORT & FINISHED',
  'HIGH ACTION',
  'MIND GAMES',
  'CRY YOUR EYES OUT',
  'ENGLISH DUB APPROVED',
];

interface RouletteSectionProps {
  onSelectAnime: (anime: AnimeEntry) => void;
  onPlaySound: (type?: 'click' | 'coin' | 'spin' | 'lock') => void;
  watchlistIds: string[];
  onToggleWatchlist: (id: string) => void;
  coins: number;
  onSpendCoin: () => void;
  crtHeavy: boolean;
}

export function RouletteSection({
  onSelectAnime,
  onPlaySound,
  watchlistIds,
  onToggleWatchlist,
  coins,
  onSpendCoin,
  crtHeavy,
}: RouletteSectionProps) {
  const [activeFilters, setActiveFilters] = useState<RouletteFilter[]>(['SHORT & FINISHED']);
  const [currentId, setCurrentId] = useState<string>('psycho-pass');
  const [spinning, setSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const matchingPool = useMemo(() => {
    if (activeFilters.length === 0) return ANIME_CATALOG;
    const filtered = ANIME_CATALOG.filter((item) =>
      activeFilters.every((f) => item.tags.includes(f))
    );
    if (filtered.length > 0) return filtered;
    // Fallback to OR matching if strict intersection is empty
    const relaxed = ANIME_CATALOG.filter((item) =>
      activeFilters.some((f) => item.tags.includes(f))
    );
    return relaxed.length > 0 ? relaxed : ANIME_CATALOG;
  }, [activeFilters]);

  const currentAnime = useMemo(() => {
    return (
      ANIME_CATALOG.find((a) => a.id === currentId) ||
      matchingPool[0] ||
      ANIME_CATALOG[0]
    );
  }, [currentId, matchingPool]);

  const isSaved = watchlistIds.includes(currentAnime.id);

  function toggleFilter(filter: RouletteFilter) {
    onPlaySound('click');
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  }

  function handleSpin() {
    if (spinning) return;
    onPlaySound('spin');
    if (coins > 0) {
      onSpendCoin();
    }
    setSpinning(true);

    const pool = matchingPool.length > 1 ? matchingPool.filter((a) => a.id !== currentId) : matchingPool;
    const nextItem = pool[Math.floor(Math.random() * pool.length)] || ANIME_CATALOG[0];

    setTimeout(() => {
      setCurrentId(nextItem.id);
      setSpinCount((c) => c + 1);
      setSpinning(false);
      onPlaySound('lock');
    }, 220);
  }

  return (
    <section
      id="roulette"
      className="bg-surface-container-lowest border-2 border-primary-container rounded-DEFAULT p-6 sm:p-10 arcade-shadow relative overflow-hidden"
    >
      {/* Background CRT Scanline */}
      <div
        className={`${crtHeavy ? 'crt-overlay-heavy' : 'crt-overlay'} absolute inset-0 pointer-events-none`}
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Roulette Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-DEFAULT bg-secondary-container/20 border border-secondary-container text-secondary font-label-sm text-label-sm tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm">casino</span>
            GAMIFIED RANDOMIZER UNIT // SYSTEM 99
          </div>
          <h2 className="text-headline-lg-mobile sm:text-headline-lg font-headline-lg text-primary-container tracking-tight uppercase drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
            ARCADE CASSETTE ROULETTE
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Paralyzed by infinite options? Lock your vibe filters and hit the big arcade button. We
            guarantee a beginner-tested cult favorite every single spin.
          </p>
        </div>

        {/* Filter Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {VIBE_FILTERS.map((filter) => {
            const active = activeFilters.includes(filter);
            return (
              <button
                key={filter}
                type="button"
                onClick={() => toggleFilter(filter)}
                className={`px-3 py-1.5 rounded-DEFAULT border font-label-sm text-label-sm tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'border-secondary-container bg-secondary-container text-white font-bold'
                    : 'border-outline-variant bg-surface-container text-on-surface-variant hover:border-primary-container'
                }`}
              >
                {active ? `* ${filter}` : filter}
              </button>
            );
          })}
        </div>

        {/* Roulette Machine Display Screen */}
        <div className="bg-surface-container-low border border-primary-container/40 rounded-DEFAULT p-6 relative">
          <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-center transition-opacity duration-150 ${
              spinning ? 'opacity-30' : 'opacity-100'
            }`}
          >
            {/* Cassette Artwork */}
            <button
              type="button"
              onClick={() => {
                onPlaySound('lock');
                onSelectAnime(currentAnime);
              }}
              className="md:col-span-4 relative aspect-[4/3] rounded-DEFAULT overflow-hidden border border-outline-variant/60 bg-surface-container-lowest block cursor-pointer group text-left"
            >
              <ImageWithFallback
                src={currentAnime.posterUrl}
                alt={currentAnime.posterAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackLabel={currentAnime.title}
              />
              <div
                className={`${crtHeavy ? 'crt-overlay-heavy' : 'crt-overlay'} absolute inset-0`}
              />
              <div className="absolute top-2 left-2 bg-secondary-container text-white px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-bold">
                {currentAnime.cassetteCode}
              </div>
            </button>

            {/* Cassette Data & Beginner Warning Level */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-tertiary-container font-label-sm text-label-sm uppercase tracking-widest font-bold">
                  {currentAnime.genreLabel}
                </span>
                <span className="text-primary-container font-label-sm text-label-sm font-bold tabular-nums">
                  POOL MATCH: {matchingPool.length} TITLES // VERIFIED
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onPlaySound('lock');
                    onSelectAnime(currentAnime);
                  }}
                  className="text-left text-headline-md font-headline-md text-on-surface hover:text-primary-container transition-colors uppercase cursor-pointer"
                >
                  {currentAnime.title}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onPlaySound('click');
                    onToggleWatchlist(currentAnime.id);
                  }}
                  className={`p-2 rounded-DEFAULT border transition-colors cursor-pointer shrink-0 ${
                    isSaved
                      ? 'bg-secondary-container border-secondary-container text-white'
                      : 'bg-surface-container border-outline-variant text-primary-container hover:border-primary-container'
                  }`}
                  title={isSaved ? 'Saved in Deck' : 'Save to Deck'}
                >
                  <span className="material-symbols-outlined text-lg leading-none">
                    {isSaved ? 'bookmark_added' : 'bookmark_add'}
                  </span>
                </button>
              </div>

              <p className="text-body-sm font-body-sm text-on-surface-variant">
                {currentAnime.synopsis}
              </p>

              {/* Beginner Warning Level / Stats Meters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-surface-container-lowest p-3 rounded-DEFAULT border border-outline-variant/40 font-label-sm text-label-sm tabular-nums">
                <div>
                  <div className="text-on-surface-variant">WEIRDNESS FACTOR</div>
                  <div className="text-secondary font-bold text-sm">
                    {currentAnime.weirdnessScore}
                  </div>
                </div>
                <div>
                  <div className="text-on-surface-variant">PACING MULTIPLIER</div>
                  <div className="text-primary-container font-bold text-sm">
                    {currentAnime.pacingScore}
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-on-surface-variant">LENGTH COMMITMENT</div>
                  <div className="text-tertiary-container font-bold text-sm">
                    {currentAnime.lengthCommitment}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Big Arcade Button */}
          <div className="mt-8 text-center space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleSpin}
                className="inline-flex items-center gap-3 bg-secondary-container text-white font-headline-sm font-bold px-8 py-4 rounded-DEFAULT shadow-[4px_4px_0px_#00f0ff] hover:translate-x-1 hover:translate-y-1 active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
              >
                <span
                  className={`material-symbols-outlined text-2xl ${spinning ? 'animate-spin' : ''}`}
                >
                  autorenew
                </span>
                {spinning ? 'ROLLING CASSETTE DECK...' : 'SPIN FOR A RANDOM MASTERPIECE'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onPlaySound('lock');
                  onSelectAnime(currentAnime);
                }}
                className="inline-flex items-center gap-2 bg-surface-container-high border border-primary-container text-primary-container font-label-md text-label-md px-5 py-4 rounded-DEFAULT hover:bg-primary-container/15 transition-all uppercase tracking-wider cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">info</span>
                OPEN DOSSIER
              </button>
            </div>
            <div className="text-on-surface-variant font-label-sm text-label-sm tabular-nums">
              {coins > 0
                ? `CREDITS: ${coins} // CLICK TO EXECUTE 1999 RNG SEED`
                : `FREE PLAY ENABLED // SPINS THIS SESSION: ${spinCount}`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
