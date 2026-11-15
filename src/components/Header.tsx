import { useMemo, useState } from 'react';
import { ANIME_CATALOG, AnimeEntry, HOTLINKED_ASSETS } from '../data/animeVault';
import { ImageWithFallback } from './ImageWithFallback';

export type ScreenId = 'radar' | 'quiz' | 'vault' | 'roulette' | 'guide';

interface HeaderProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectAnime: (anime: AnimeEntry) => void;
  crtHeavy: boolean;
  onToggleCrt: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  coins: number;
  onInsertCoin: () => void;
  watchlistCount: number;
  onOpenOperator: (tab?: 'watchlist' | 'terminal') => void;
}

export function Header({
  activeScreen,
  onNavigate,
  searchQuery,
  onSearchChange,
  onSelectAnime,
  crtHeavy,
  onToggleCrt,
  soundEnabled,
  onToggleSound,
  coins,
  onInsertCoin,
  watchlistCount,
  onOpenOperator,
}: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ANIME_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.genreLabel.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.platforms.some((p) => p.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [searchQuery]);

  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'quiz', label: 'GATEWAY QUIZ' },
    { id: 'vault', label: 'HALL OF FAME' },
    { id: 'roulette', label: 'ROULETTE' },
    { id: 'guide', label: 'CHANNELS' },
  ];

  return (
    <header className="w-full bg-surface-container-lowest border-b border-primary-container/30 shadow-[0_4px_0_0_#ff4a8d] sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 py-3 max-w-full mx-auto gap-4">
        {/* Brand Logo / Product Name */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('radar')}
            className="w-8 h-8 rounded-DEFAULT bg-secondary-container flex items-center justify-center text-surface-container-lowest font-headline-sm font-bold arcade-shadow-cyan hover:translate-x-[1px] hover:translate-y-[1px] transition-transform cursor-pointer"
            title="Return to Main Radar Broadcast"
          >
            <span className="material-symbols-outlined text-surface-container-lowest">
              terminal
            </span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('radar')}
            className="text-left text-lg sm:text-headline-sm font-headline-sm uppercase tracking-widest text-primary-container drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            NEO-TOKYO.99 // ARCHIVE
          </button>
          <button
            type="button"
            onClick={() => onNavigate('radar')}
            className={`hidden xl:inline-flex items-center px-2 py-0.5 rounded-DEFAULT border font-label-sm text-label-sm tracking-widest whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              activeScreen === 'radar'
                ? 'bg-primary-container/15 border-primary-container text-primary-container'
                : 'bg-surface-container-high border-primary-container/40 text-primary-container hover:border-primary-container'
            }`}
            title="View Full Broadcast Feed"
          >
            SYS_READY v1.99
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-6">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={
                  isActive
                    ? 'border-b-2 border-secondary-container text-secondary-container font-label-md text-label-md tracking-wider pb-1 transition-all whitespace-nowrap shrink-0 cursor-pointer'
                    : 'text-on-surface-variant font-label-md text-label-md tracking-wider hover:text-primary-container hover:bg-surface-container-high transition-all px-2 py-1 rounded-DEFAULT whitespace-nowrap shrink-0 cursor-pointer'
                }
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Trailing Actions & Search & Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Search Console Quick Inset */}
          <div className="relative hidden xl:flex items-center bg-surface-container-lowest border border-outline-variant/60 px-3 py-1.5 rounded-DEFAULT focus-within:border-primary-container">
            <span className="material-symbols-outlined text-outline-variant text-base mr-2">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
              placeholder="SEARCH ARCHIVE: [ENTER KEYWORD]..."
              className="bg-transparent border-none outline-none p-0 text-on-surface text-label-sm font-label-sm placeholder:text-outline w-48"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="text-secondary-container font-label-sm text-label-sm ml-1 cursor-pointer hover:text-white"
                title="Clear Search"
              >
                ×
              </button>
            ) : (
              <span className="text-primary-container font-label-sm cursor-blink">█</span>
            )}

            {/* Instant Search Results Dropdown */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-80 bg-surface-container-lowest border border-primary-container rounded-DEFAULT arcade-shadow z-50 overflow-hidden">
                <div className="px-3 py-1.5 bg-surface-container-low border-b border-outline-variant/40 flex items-center justify-between font-label-sm text-label-sm text-primary-container">
                  <span>ARCHIVE QUERY RESULTS</span>
                  <span>{searchResults.length} FOUND</span>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-3 text-body-sm text-on-surface-variant">
                    No cassettes matched "{searchQuery}". Try "Cyberpunk", "Noir", or "Ghibli".
                  </div>
                ) : (
                  <div className="divide-y divide-outline-variant/30">
                    {searchResults.map((anime) => (
                      <button
                        key={anime.id}
                        type="button"
                        onMouseDown={() => {
                          onSelectAnime(anime);
                          setSearchFocused(false);
                        }}
                        className="w-full text-left p-2.5 hover:bg-surface-container-high transition-colors flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="font-label-md text-label-md text-on-surface truncate">
                            {anime.title}
                          </div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant truncate">
                            {anime.episodesLabel} // {anime.platforms.join(', ')}
                          </div>
                        </div>
                        <span className="text-primary-container font-label-sm text-label-sm shrink-0">
                          OPEN →
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Trailing Icon Actions */}
          <div className="hidden sm:flex items-center gap-1 text-on-surface-variant">
            <button
              type="button"
              onClick={() => onOpenOperator('terminal')}
              className="p-1.5 hover:text-primary-container hover:bg-surface-container-high rounded-DEFAULT transition-all cursor-pointer"
              title="Open Terminal Command Deck"
            >
              <span className="material-symbols-outlined">terminal</span>
            </button>
            <button
              type="button"
              onClick={onToggleCrt}
              className={`p-1.5 rounded-DEFAULT transition-all cursor-pointer ${
                crtHeavy
                  ? 'text-primary-container bg-surface-container-high border border-primary-container/50'
                  : 'hover:text-primary-container hover:bg-surface-container-high'
              }`}
              title={crtHeavy ? 'CRT Scanlines: Heavy' : 'CRT Scanlines: Standard'}
            >
              <span className="material-symbols-outlined">tv</span>
            </button>
            <button
              type="button"
              onClick={onToggleSound}
              className={`p-1.5 rounded-DEFAULT transition-all cursor-pointer ${
                soundEnabled
                  ? 'text-secondary-container bg-surface-container-high'
                  : 'hover:text-primary-container hover:bg-surface-container-high'
              }`}
              title={soundEnabled ? 'Audio Synth Beeper: ON' : 'Audio Synth Beeper: MUTED'}
            >
              <span className="material-symbols-outlined">
                {soundEnabled ? 'volume_up' : 'volume_off'}
              </span>
            </button>
          </div>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={onInsertCoin}
            className="hidden lg:flex items-center gap-1.5 border border-secondary-container text-secondary-container px-3 py-1 rounded-DEFAULT font-label-md text-label-md tracking-widest hover:bg-secondary-container/20 active:translate-y-[1px] transition-all whitespace-nowrap shrink-0 cursor-pointer tabular-nums"
            title="Insert Arcade Credit for Roulette"
          >
            <span>INSERT COIN</span>
            <span className="text-tertiary-container">[{String(coins).padStart(2, '0')}]</span>
          </button>

          {/* Trailing Primary Action */}
          <button
            type="button"
            onClick={() => onNavigate('quiz')}
            className="flex items-center bg-primary-container text-surface-container-lowest font-label-md text-label-md px-4 py-2 rounded-DEFAULT uppercase tracking-wider font-bold shadow-[2px_2px_0px_#ff4a8d] hover:translate-x-[1px] hover:translate-y-[1px] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            START SIGNAL
          </button>

          {/* Cyberpunk Avatar / Watchlist Deck Trigger */}
          <button
            type="button"
            onClick={() => onOpenOperator('watchlist')}
            className="w-9 h-9 rounded-DEFAULT border border-primary-container/80 overflow-hidden relative p-0.5 bg-surface-container shrink-0 cursor-pointer hover:border-secondary-container transition-colors"
            title={`Saved Cassettes Deck (${watchlistCount})`}
          >
            <ImageWithFallback
              src={HOTLINKED_ASSETS.avatar}
              alt="Cyberpunk anime operator profile avatar"
              className="w-full h-full object-cover"
              fallbackLabel="OP-99"
            />
            {watchlistCount > 0 && (
              <span className="absolute -bottom-0.5 -right-0.5 bg-secondary-container text-white font-label-sm text-[9px] leading-none px-1 py-0.5 font-bold tabular-nums">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

interface MobileHudDockProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export function MobileHudDock({ activeScreen, onNavigate }: MobileHudDockProps) {
  const dockItems: { id: ScreenId; label: string; icon: string }[] = [
    { id: 'radar', label: 'RADAR', icon: 'radar' },
    { id: 'quiz', label: 'MATCHMAKER', icon: 'psychology' },
    { id: 'vault', label: 'VAULT', icon: 'movie' },
    { id: 'roulette', label: 'ROULETTE', icon: 'casino' },
    { id: 'guide', label: 'SYSTEM', icon: 'tune' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-around items-center px-2 py-2 bg-surface-container-lowest border-t border-primary-container/30 shadow-[0_-4px_0_0_#ff4a8d]">
      {dockItems.map((item) => {
        const isActive = activeScreen === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={
              isActive
                ? 'flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-DEFAULT px-2.5 py-1 shadow-[2px_2px_0px_#00f0ff] font-label-sm text-label-sm font-bold cursor-pointer'
                : 'flex flex-col items-center justify-center text-on-surface-variant px-2.5 py-1 font-label-sm text-label-sm hover:text-primary hover:bg-surface-container-high transition-all cursor-pointer'
            }
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
