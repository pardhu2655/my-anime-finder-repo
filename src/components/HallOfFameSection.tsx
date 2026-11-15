import { useMemo, useState } from 'react';
import { ANIME_CATALOG, AnimeEntry, VaultCategory } from '../data/animeVault';
import { ImageWithFallback } from './ImageWithFallback';

interface HallOfFameSectionProps {
  onSelectAnime: (anime: AnimeEntry) => void;
  onPlaySound: (type?: 'click' | 'coin' | 'spin' | 'lock') => void;
  watchlistIds: string[];
  onToggleWatchlist: (id: string) => void;
  searchQuery: string;
  focusedMode?: boolean;
}

export function HallOfFameSection({
  onSelectAnime,
  onPlaySound,
  watchlistIds,
  onToggleWatchlist,
  searchQuery,
  focusedMode = false,
}: HallOfFameSectionProps) {
  const [selectedTier, setSelectedTier] = useState<'all' | VaultCategory>('all');

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ANIME_CATALOG.filter((item) => {
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.synopsis.toLowerCase().includes(q) ||
        item.genreLabel.toLowerCase().includes(q) ||
        item.platforms.some((p) => p.toLowerCase().includes(q));
      const matchesTier = selectedTier === 'all' || item.category === selectedTier;
      return matchesSearch && matchesTier;
    });
  }, [searchQuery, selectedTier]);

  const universal = filteredCatalog.filter((i) => i.category === 'universal').slice(0, 3);
  const quick = filteredCatalog
    .filter((i) => i.category === 'quick')
    .filter((i) =>
      focusedMode
        ? true
        : ['cowboy-bebop', 'cyberpunk-edgerunners', 'demon-slayer'].includes(i.id)
    );
  const cozy = filteredCatalog.filter((i) => i.category === 'cozy');
  const movies = filteredCatalog.filter((i) => i.category === 'movie');
  const legends = filteredCatalog.filter((i) => i.category === 'legends');

  const showTier = (cat: VaultCategory) => selectedTier === 'all' || selectedTier === cat;

  return (
    <section id="hall-of-fame" className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/40 pb-4">
        <div>
          <div className="flex items-center gap-2 text-primary-container font-label-md text-label-md tracking-widest uppercase">
            <span className="material-symbols-outlined">video_library</span>
            ARCHIVAL CASSETTE VAULT
          </div>
          <h2 className="text-headline-lg-mobile sm:text-headline-lg font-headline-lg text-on-surface uppercase tracking-tight">
            THE HALL OF FAME STARTER TIERS
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Curated cassettes engineered specifically to bypass beginner fatigue. Handpicked for
            stellar pacing, zero required anime trivia, and instant narrative hooks.
          </p>
        </div>

        {/* Interactive Tier Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1.5 border border-outline-variant/40 rounded-DEFAULT shrink-0">
          {[
            { id: 'all', label: 'ALL TIERS' },
            { id: 'universal', label: '01 HOOKS' },
            { id: 'quick', label: '02 QUICK RUNS' },
            { id: 'cozy', label: '03 COZY' },
            { id: 'movie', label: '04 MOVIES' },
            { id: 'legends', label: '05 LEGENDS' },
          ].map((tab) => {
            const active = selectedTier === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onPlaySound('click');
                  setSelectedTier(tab.id as 'all' | VaultCategory);
                }}
                className={`px-2.5 py-1 rounded-DEFAULT font-label-sm text-label-sm tracking-wider uppercase transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-primary-container text-surface-container-lowest font-bold'
                    : 'text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredCatalog.length === 0 && (
        <div className="bg-surface-container-low border border-secondary-container/40 p-8 rounded-DEFAULT text-center space-y-2">
          <div className="font-headline-sm text-headline-sm text-secondary-container uppercase">
            NO CASSETTES FOUND IN THIS SECTOR
          </div>
          <p className="text-on-surface-variant text-body-sm">
            Try clearing your search filter or switching back to ALL TIERS.
          </p>
        </div>
      )}

      {/* TIER 1: Universal Entry Hooks */}
      {showTier('universal') && universal.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-l-4 border-secondary-container pl-3 py-1 bg-surface-container-low">
            <div className="flex items-center gap-3">
              <span className="font-label-md text-label-md text-secondary-container uppercase tracking-wider font-bold">
                CATEGORY 01 //
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                THE UNIVERSAL ENTRY HOOKS (INSTANT ADDICTION)
              </h3>
            </div>
            <span className="hidden sm:inline-block font-label-sm text-label-sm text-tertiary-container bg-surface-container-high px-2 py-0.5 rounded-DEFAULT">
              HIGH-SPEED CLIFFHANGERS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {universal.map((anime) => (
              <PosterCassetteCard
                key={anime.id}
                anime={anime}
                isSaved={watchlistIds.includes(anime.id)}
                onToggleSave={() => {
                  onPlaySound('click');
                  onToggleWatchlist(anime.id);
                }}
                onInspect={() => {
                  onPlaySound('lock');
                  onSelectAnime(anime);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* TIER 2: No-Commitment Quick Runs */}
      {showTier('quick') && quick.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-l-4 border-primary-container pl-3 py-1 bg-surface-container-low">
            <div className="flex items-center gap-3">
              <span className="font-label-md text-label-md text-primary-container uppercase tracking-wider font-bold">
                CATEGORY 02 //
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                THE NO-COMMITMENT QUICK RUNS (&lt;26 EPISODES)
              </h3>
            </div>
            <span className="hidden sm:inline-block font-label-sm text-label-sm text-primary-container bg-surface-container-high px-2 py-0.5 rounded-DEFAULT">
              BINGE IN 1-2 NIGHTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quick.map((anime) => (
              <PosterCassetteCard
                key={anime.id}
                anime={anime}
                isSaved={watchlistIds.includes(anime.id)}
                onToggleSave={() => {
                  onPlaySound('click');
                  onToggleWatchlist(anime.id);
                }}
                onInspect={() => {
                  onPlaySound('lock');
                  onSelectAnime(anime);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* TIER 3 & 4: Split Bento Pods */}
      {(showTier('cozy') || showTier('movie')) && (cozy.length > 0 || movies.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          {/* Category 3: Heartwarming & Cozy Intros */}
          {showTier('cozy') && cozy.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-l-4 border-tertiary-container pl-3 py-1 bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-tertiary-container uppercase tracking-wider font-bold">
                    CATEGORY 03 //
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                    HEARTWARMING &amp; COZY INTROS
                  </h3>
                </div>
              </div>
              <div className="space-y-3">
                {cozy.map((anime) => (
                  <CompactCassetteRow
                    key={anime.id}
                    anime={anime}
                    hoverBorder="hover:border-secondary-container"
                    isSaved={watchlistIds.includes(anime.id)}
                    onToggleSave={() => {
                      onPlaySound('click');
                      onToggleWatchlist(anime.id);
                    }}
                    onInspect={() => {
                      onPlaySound('lock');
                      onSelectAnime(anime);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Category 4: Masterpiece Movies */}
          {showTier('movie') && movies.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-l-4 border-secondary-container pl-3 py-1 bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-secondary-container uppercase tracking-wider font-bold">
                    CATEGORY 04 //
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                    THE MASTERPIECE MOVIES (NO TV REQUIRED)
                  </h3>
                </div>
              </div>
              <div className="space-y-3">
                {movies.map((anime) => (
                  <CompactCassetteRow
                    key={anime.id}
                    anime={anime}
                    hoverBorder="hover:border-primary-container"
                    isSaved={watchlistIds.includes(anime.id)}
                    onToggleSave={() => {
                      onPlaySound('click');
                      onToggleWatchlist(anime.id);
                    }}
                    onInspect={() => {
                      onPlaySound('lock');
                      onSelectAnime(anime);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TIER 5: All-Time Greats & Shonen Legends */}
      {showTier('legends') && legends.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-l-4 border-tertiary-container pl-3 py-1 bg-surface-container-low">
            <div className="flex items-center gap-3">
              <span className="font-label-md text-label-md text-tertiary-container uppercase tracking-wider font-bold">
                CATEGORY 05 //
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                ALL-TIME GREATS &amp; ICONIC LEGENDS (TITANS OF THE MEDIUM)
              </h3>
            </div>
            <span className="hidden sm:inline-block font-label-sm text-label-sm text-tertiary-container bg-surface-container-high px-2 py-0.5 rounded-DEFAULT">
              HISTORIC MASTERPIECES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legends.map((anime) => (
              <PosterCassetteCard
                key={anime.id}
                anime={anime}
                isSaved={watchlistIds.includes(anime.id)}
                onToggleSave={() => {
                  onPlaySound('click');
                  onToggleWatchlist(anime.id);
                }}
                onInspect={() => {
                  onPlaySound('lock');
                  onSelectAnime(anime);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

interface PosterCassetteCardProps {
  anime: AnimeEntry;
  isSaved: boolean;
  onToggleSave: () => void;
  onInspect: () => void;
}

function PosterCassetteCard({
  anime,
  isSaved,
  onToggleSave,
  onInspect,
}: PosterCassetteCardProps) {
  return (
    <article className="bg-surface-container-low border border-primary-container/30 rounded-DEFAULT p-4 arcade-shadow flex flex-col justify-between hover:border-primary-container transition-all group">
      <div className="space-y-3">
        <button
          type="button"
          onClick={onInspect}
          className="relative w-full aspect-video rounded-DEFAULT overflow-hidden border border-outline-variant/40 bg-surface-container-lowest block cursor-pointer text-left"
        >
          <ImageWithFallback
            src={anime.posterUrl}
            alt={anime.posterAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            fallbackLabel={anime.title}
          />
          <div className="absolute top-2 left-2 bg-secondary-container text-white px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-bold">
            {anime.badge}
          </div>
          <div className="absolute top-2 right-2 holo-stamp text-surface-container-lowest px-1.5 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-bold">
            {anime.stamp}
          </div>
        </button>

        <div>
          <button
            type="button"
            onClick={onInspect}
            className="text-left font-headline-sm text-headline-sm text-on-surface uppercase group-hover:text-primary-container transition-colors cursor-pointer"
          >
            {anime.title}
          </button>
          <div className="text-tertiary-container font-label-sm text-label-sm font-bold">
            {anime.subtitle}
          </div>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">{anime.synopsis}</p>
      </div>

      <div className="pt-4 border-t border-outline-variant/30 mt-4 flex items-center justify-between gap-2 text-label-sm font-label-sm">
        <span className="text-primary-container font-bold tabular-nums">{anime.successRate}</span>
        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant hidden sm:inline">
            {anime.platforms.slice(0, 2).join(' // ')}
          </span>
          <button
            type="button"
            onClick={onToggleSave}
            className={`p-1 rounded-DEFAULT border transition-colors cursor-pointer ${
              isSaved
                ? 'border-secondary-container text-secondary-container bg-secondary-container/10'
                : 'border-outline-variant/60 text-on-surface-variant hover:text-primary-container hover:border-primary-container'
            }`}
            title={isSaved ? 'Remove from Deck' : 'Save to Deck'}
          >
            <span className="material-symbols-outlined text-base leading-none">
              {isSaved ? 'bookmark_added' : 'bookmark_add'}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

interface CompactCassetteRowProps {
  anime: AnimeEntry;
  hoverBorder: string;
  isSaved: boolean;
  onToggleSave: () => void;
  onInspect: () => void;
}

function CompactCassetteRow({
  anime,
  hoverBorder,
  isSaved,
  onToggleSave,
  onInspect,
}: CompactCassetteRowProps) {
  return (
    <div
      className={`bg-surface-container-low border border-outline-variant/50 p-4 rounded-DEFAULT flex items-center justify-between gap-4 ${hoverBorder} transition-all`}
    >
      <button
        type="button"
        onClick={onInspect}
        className="space-y-1 text-left flex-1 min-w-0 cursor-pointer group"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors">
            {anime.title}
          </span>
          <span className="text-label-sm font-label-sm bg-surface-container-high px-2 py-0.5 rounded-DEFAULT text-secondary font-bold">
            {anime.subtitle}
          </span>
        </div>
        <p className="text-on-surface-variant text-body-sm font-body-sm max-w-md">
          {anime.synopsis}
        </p>
      </button>

      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right tabular-nums">
          <div className="text-primary-container font-label-md text-label-md font-bold">
            {anime.episodesLabel}
          </div>
          <div className="text-on-surface-variant font-label-sm text-label-sm">
            {anime.platforms[0]}
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleSave}
          className={`p-1.5 rounded-DEFAULT border transition-colors cursor-pointer ${
            isSaved
              ? 'border-secondary-container text-secondary-container bg-secondary-container/10'
              : 'border-outline-variant/50 text-on-surface-variant hover:text-primary-container hover:border-primary-container'
          }`}
          title={isSaved ? 'Remove from Deck' : 'Save to Deck'}
        >
          <span className="material-symbols-outlined text-base leading-none">
            {isSaved ? 'bookmark_added' : 'bookmark_add'}
          </span>
        </button>
      </div>
    </div>
  );
}
