import { useEffect, useMemo, useState } from 'react';
import { ANIME_CATALOG, AnimeEntry, RouletteFilter, VaultCategory } from '../data/animeVault';
import { ImageWithFallback } from './ImageWithFallback';

const VIBE_FILTERS: RouletteFilter[] = [
  'SHORT & FINISHED',
  'HIGH ACTION',
  'MIND GAMES',
  'CRY YOUR EYES OUT',
  'ENGLISH DUB APPROVED',
];

const ROULETTE_HISTORY_KEY = 'neotokyo99_roulette_history';

interface SpinRecord {
  uid: string;
  spinNumber: number;
  animeId: string;
  timestamp: string;
  filtersSnapshot: RouletteFilter[];
}

function parseWinRate(rate: string): number {
  const match = rate.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 95.0;
}

function getJackpotTier(winRate: number): {
  label: string;
  colorClass: string;
} {
  if (winRate >= 98.8) {
    return {
      label: 'S-RANK JACKPOT',
      colorClass: 'text-tertiary-container border-tertiary-container/60 bg-tertiary-container/10',
    };
  }
  if (winRate >= 97.5) {
    return {
      label: 'A-RANK HIT',
      colorClass: 'text-primary-container border-primary-container/60 bg-primary-container/10',
    };
  }
  return {
    label: 'CULT GEM',
    colorClass: 'text-secondary border-secondary-container/60 bg-secondary-container/10',
  };
}

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
  const [history, setHistory] = useState<SpinRecord[]>(() => {
    try {
      const raw = localStorage.getItem(ROULETTE_HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ROULETTE_HISTORY_KEY, JSON.stringify(history));
    } catch {
      // ignore storage errors
    }
  }, [history]);

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
  const spinCount = history.length;

  // Compute historical & pool win-rate telemetry
  const telemetry = useMemo(() => {
    const poolRates = matchingPool.map((a) => parseWinRate(a.successRate));
    const poolAvgWin =
      poolRates.length > 0
        ? (poolRates.reduce((acc, v) => acc + v, 0) / poolRates.length).toFixed(1)
        : '98.0';

    const resolvedHistory = history
      .map((rec) => ({
        record: rec,
        anime: ANIME_CATALOG.find((a) => a.id === rec.animeId),
      }))
      .filter((entry): entry is { record: SpinRecord; anime: AnimeEntry } => Boolean(entry.anime));

    const historyRates = resolvedHistory.map((e) => parseWinRate(e.anime.successRate));
    const sessionAvgWin =
      historyRates.length > 0
        ? (historyRates.reduce((acc, v) => acc + v, 0) / historyRates.length).toFixed(1)
        : null;

    const jackpots = resolvedHistory.filter(
      (e) => parseWinRate(e.anime.successRate) >= 98.5
    ).length;

    const claimed = resolvedHistory.filter((e) => watchlistIds.includes(e.anime.id)).length;

    // Category breakdown (use spin history if available, otherwise current active pool)
    const sourceItems =
      resolvedHistory.length > 0 ? resolvedHistory.map((e) => e.anime) : matchingPool;

    const counts: Record<VaultCategory, number> = {
      universal: 0,
      quick: 0,
      cozy: 0,
      movie: 0,
      legends: 0,
    };
    sourceItems.forEach((item) => {
      counts[item.category] += 1;
    });

    const total = Math.max(1, sourceItems.length);
    const distribution = [
      {
        key: 'universal' as VaultCategory,
        label: 'UNIVERSAL HOOKS',
        pct: Math.round((counts.universal / total) * 100),
        count: counts.universal,
        barClass: 'bg-secondary-container',
        textClass: 'text-secondary',
      },
      {
        key: 'quick' as VaultCategory,
        label: 'QUICK RUNS',
        pct: Math.round((counts.quick / total) * 100),
        count: counts.quick,
        barClass: 'bg-primary-container',
        textClass: 'text-primary-container',
      },
      {
        key: 'cozy' as VaultCategory,
        label: 'COZY INTROS',
        pct: Math.round((counts.cozy / total) * 100),
        count: counts.cozy,
        barClass: 'bg-tertiary-container',
        textClass: 'text-tertiary-container',
      },
      {
        key: 'movie' as VaultCategory,
        label: 'MOVIES',
        pct: Math.round((counts.movie / total) * 100),
        count: counts.movie,
        barClass: 'bg-primary',
        textClass: 'text-primary',
      },
      {
        key: 'legends' as VaultCategory,
        label: 'ALL-TIME LEGENDS',
        pct: Math.round((counts.legends / total) * 100),
        count: counts.legends,
        barClass: 'bg-tertiary-fixed-dim',
        textClass: 'text-tertiary-fixed-dim',
      },
    ];

    return {
      poolAvgWin,
      sessionAvgWin,
      jackpots,
      claimed,
      resolvedHistory,
      distribution,
      usingHistoryDist: resolvedHistory.length > 0,
    };
  }, [matchingPool, history, watchlistIds]);

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

    const pool =
      matchingPool.length > 1 ? matchingPool.filter((a) => a.id !== currentId) : matchingPool;
    const nextItem = pool[Math.floor(Math.random() * pool.length)] || ANIME_CATALOG[0];

    setTimeout(() => {
      setCurrentId(nextItem.id);
      const now = new Date();
      const timeStr = now.toTimeString().slice(0, 8);
      setHistory((prev) => {
        const nextNum = prev.length > 0 ? prev[0].spinNumber + 1 : 1;
        const entry: SpinRecord = {
          uid: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          spinNumber: nextNum,
          animeId: nextItem.id,
          timestamp: timeStr,
          filtersSnapshot: [...activeFilters],
        };
        return [entry, ...prev].slice(0, 20);
      });
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
                  POOL MATCH: {matchingPool.length} TITLES // {currentAnime.successRate}
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

        {/* Visual Summary: Historical Win Rates & Spin Ledger */}
        <div className="bg-surface-container-low border border-outline-variant/50 rounded-DEFAULT p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary-container text-lg">
                analytics
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-wide">
                ODDS TELEMETRY &amp; SPIN LEDGER
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-label-sm text-label-sm text-primary-container tabular-nums">
                {telemetry.usingHistoryDist ? 'LIVE SESSION ROLLS' : 'ACTIVE POOL ODDS'}
              </span>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onPlaySound('click');
                    setHistory([]);
                  }}
                  className="font-label-sm text-label-sm text-secondary hover:text-white border border-secondary-container/50 px-2.5 py-1 rounded-DEFAULT hover:bg-secondary-container/20 transition-colors cursor-pointer"
                >
                  CLEAR LOG
                </button>
              )}
            </div>
          </div>

          {/* 4-Column Win Rate KPI Readout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-label-sm text-label-sm tabular-nums">
            <div className="bg-surface-container-lowest border border-outline-variant/40 p-3 rounded-DEFAULT">
              <div className="text-on-surface-variant">
                {telemetry.sessionAvgWin ? 'SESSION AVG WIN RATE' : 'POOL AVG WIN RATE'}
              </div>
              <div className="text-primary-container font-headline-sm text-2xl font-bold mt-0.5">
                {telemetry.sessionAvgWin || telemetry.poolAvgWin}%
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/40 p-3 rounded-DEFAULT">
              <div className="text-on-surface-variant">TOTAL SPINS LOGGED</div>
              <div className="text-on-surface font-headline-sm text-2xl font-bold mt-0.5">
                {String(spinCount).padStart(2, '0')}
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/40 p-3 rounded-DEFAULT">
              <div className="text-on-surface-variant">S-RANK JACKPOTS (98.5%+)</div>
              <div className="text-tertiary-container font-headline-sm text-2xl font-bold mt-0.5">
                {String(telemetry.jackpots).padStart(2, '0')}
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/40 p-3 rounded-DEFAULT">
              <div className="text-on-surface-variant">CLAIMED TO DECK</div>
              <div className="text-secondary font-headline-sm text-2xl font-bold mt-0.5">
                {String(telemetry.claimed).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Segmented Visual Distribution Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>
                {telemetry.usingHistoryDist
                  ? 'ROLLED CASSETTE DISTRIBUTION BY TIER'
                  : 'CURRENT FILTER POOL DISTRIBUTION BY TIER'}
              </span>
              <span className="tabular-nums">
                POOL AVG: {telemetry.poolAvgWin}% BEGINNER SUCCESS
              </span>
            </div>
            <div className="h-3 w-full bg-surface-container-lowest rounded-DEFAULT overflow-hidden border border-outline-variant/50 flex">
              {telemetry.distribution.map((seg) =>
                seg.pct > 0 ? (
                  <div
                    key={seg.key}
                    style={{ width: `${seg.pct}%` }}
                    className={`${seg.barClass} h-full transition-all duration-300`}
                    title={`${seg.label}: ${seg.pct}% (${seg.count})`}
                  />
                ) : null
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-label-sm text-label-sm tabular-nums pt-0.5">
              {telemetry.distribution.map((seg) => (
                <div key={seg.key} className="flex items-center gap-1.5">
                  <span className={`inline-block w-2.5 h-2.5 rounded-DEFAULT ${seg.barClass}`} />
                  <span className="text-on-surface-variant">{seg.label}:</span>
                  <span className={`font-bold ${seg.textClass}`}>
                    {seg.pct}% ({seg.count})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Spin Results List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              <span>PREVIOUSLY GENERATED RESULTS</span>
              <span className="tabular-nums">SHOWING LATEST {Math.min(history.length, 6)} OF {history.length}</span>
            </div>

            {telemetry.resolvedHistory.length === 0 ? (
              <div className="bg-surface-container-lowest border border-dashed border-outline-variant/60 p-5 rounded-DEFAULT text-center space-y-1">
                <div className="font-label-md text-label-md text-primary-container uppercase">
                  NO SPINS RECORDED YET
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  Hit &ldquo;SPIN FOR A RANDOM MASTERPIECE&rdquo; above to log your roulette pulls,
                  track S-Rank jackpots, and compare historical beginner win rates.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {telemetry.resolvedHistory.slice(0, 6).map(({ record, anime }) => {
                  const winPct = parseWinRate(anime.successRate);
                  const tier = getJackpotTier(winPct);
                  const claimed = watchlistIds.includes(anime.id);

                  return (
                    <div
                      key={record.uid}
                      className="bg-surface-container-lowest border border-outline-variant/50 hover:border-primary-container/70 p-3 rounded-DEFAULT flex items-center gap-3 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onPlaySound('lock');
                          onSelectAnime(anime);
                        }}
                        className="w-16 h-12 rounded-DEFAULT overflow-hidden border border-outline-variant/60 shrink-0 cursor-pointer bg-surface-container"
                        title={`Inspect ${anime.title}`}
                      >
                        <ImageWithFallback
                          src={anime.posterUrl}
                          alt={anime.posterAlt}
                          className="w-full h-full object-cover"
                          fallbackLabel={anime.cassetteCode}
                        />
                      </button>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2 font-label-sm text-label-sm tabular-nums">
                          <span className="text-on-surface-variant">
                            #{String(record.spinNumber).padStart(2, '0')} · {record.timestamp}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded-DEFAULT border font-bold text-[9px] leading-none ${tier.colorClass}`}
                          >
                            {tier.label}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            onPlaySound('lock');
                            onSelectAnime(anime);
                          }}
                          className="text-left font-label-md text-label-md text-on-surface hover:text-primary-container transition-colors truncate block w-full cursor-pointer uppercase"
                        >
                          {anime.title}
                        </button>

                        {/* Mini Win-Rate Bar */}
                        <div className="flex items-center gap-2 font-label-sm text-label-sm tabular-nums">
                          <div className="flex-1 h-1.5 bg-surface-container rounded-DEFAULT overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, winPct)}%` }}
                              className="h-full bg-primary-container"
                            />
                          </div>
                          <span className="text-primary-container font-bold shrink-0">
                            {winPct.toFixed(1)}% WIN
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onPlaySound('click');
                          onToggleWatchlist(anime.id);
                        }}
                        className={`p-1.5 rounded-DEFAULT border transition-colors cursor-pointer shrink-0 ${
                          claimed
                            ? 'bg-secondary-container border-secondary-container text-white'
                            : 'bg-surface-container border-outline-variant text-on-surface-variant hover:text-primary-container hover:border-primary-container'
                        }`}
                        title={claimed ? 'Claimed in Cassette Deck' : 'Claim to Cassette Deck'}
                      >
                        <span className="material-symbols-outlined text-base leading-none">
                          {claimed ? 'bookmark_added' : 'bookmark_add'}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

