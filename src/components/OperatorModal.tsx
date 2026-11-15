import { useEffect, useMemo, useState } from 'react';
import { ANIME_CATALOG, AnimeEntry } from '../data/animeVault';

interface OperatorModalProps {
  open: boolean;
  initialTab: 'watchlist' | 'terminal';
  onClose: () => void;
  watchlistIds: string[];
  onToggleWatchlist: (id: string) => void;
  onSelectAnime: (anime: AnimeEntry) => void;
  onPlaySound: (type?: 'click' | 'coin' | 'spin' | 'lock') => void;
  crtHeavy: boolean;
  onToggleCrt: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

interface OperatorPreset {
  label: string;
  query: string;
  animeIds: string[];
  note: string;
}

const OPERATOR_PRESETS: OperatorPreset[] = [
  {
    label: 'IF YOU LIKED ARCANE / SPIDER-VERSE',
    query: 'arcane',
    animeIds: ['cyberpunk-edgerunners', 'demon-slayer'],
    note: 'Hyper-stylized animation, kinetic fights, and unforgettable visual direction.',
  },
  {
    label: 'IF YOU LIKED INCEPTION / BLACK MIRROR',
    query: 'mind',
    animeIds: ['psycho-pass', 'death-note', 'erased'],
    note: 'Sharp psychological thrillers with grounded rules and relentless twists.',
  },
  {
    label: 'IF YOU LIKED LORD OF THE RINGS',
    query: 'fantasy',
    animeIds: ['frieren', 'fma-brotherhood', 'attack-on-titan'],
    note: 'Rich worldbuilding, atmospheric journeys, and cohesive overarching plots.',
  },
  {
    label: '100% ENGLISH DUB MASTERCLASSES',
    query: 'dub',
    animeIds: ['cowboy-bebop', 'fma-brotherhood', 'death-note', 'cyberpunk-edgerunners'],
    note: 'Universally acclaimed English voice casts—watch comfortably with zero subtitles.',
  },
];

export function OperatorModal({
  open,
  initialTab,
  onClose,
  watchlistIds,
  onToggleWatchlist,
  onSelectAnime,
  onPlaySound,
  crtHeavy,
  onToggleCrt,
  soundEnabled,
  onToggleSound,
}: OperatorModalProps) {
  const [tab, setTab] = useState<'watchlist' | 'terminal'>(initialTab);
  const [selectedPreset, setSelectedPreset] = useState<OperatorPreset>(OPERATOR_PRESETS[0]);
  const [terminalInput, setTerminalInput] = useState('');

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab, open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const savedAnime = useMemo(
    () => ANIME_CATALOG.filter((a) => watchlistIds.includes(a.id)),
    [watchlistIds]
  );

  const terminalMatches = useMemo(() => {
    const q = terminalInput.trim().toLowerCase();
    if (!q) {
      return ANIME_CATALOG.filter((a) => selectedPreset.animeIds.includes(a.id));
    }
    return ANIME_CATALOG.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.genreLabel.toLowerCase().includes(q) ||
        a.synopsis.toLowerCase().includes(q) ||
        a.whyItWorks.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [terminalInput, selectedPreset]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl bg-surface-container-lowest border-2 border-secondary-container rounded-DEFAULT arcade-shadow-cyan overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-surface-container-low border-b border-primary-container/30 gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onPlaySound('click');
                setTab('terminal');
              }}
              className={`px-3 py-1 rounded-DEFAULT font-label-md text-label-md tracking-wider uppercase cursor-pointer ${
                tab === 'terminal'
                  ? 'bg-primary-container text-surface-container-lowest font-bold'
                  : 'text-on-surface-variant hover:text-primary-container'
              }`}
            >
              OPERATOR TERMINAL
            </button>
            <button
              type="button"
              onClick={() => {
                onPlaySound('click');
                setTab('watchlist');
              }}
              className={`px-3 py-1 rounded-DEFAULT font-label-md text-label-md tracking-wider uppercase cursor-pointer tabular-nums ${
                tab === 'watchlist'
                  ? 'bg-secondary-container text-white font-bold'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              CASSETTE DECK ({savedAnime.length})
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onPlaySound('click');
              onClose();
            }}
            className="text-on-surface-variant hover:text-secondary-container font-label-md text-label-md px-2 py-1 border border-outline-variant/40 rounded-DEFAULT cursor-pointer"
          >
            [ESC] CLOSE
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {tab === 'watchlist' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                    YOUR SAVED STARTER CASSETTES
                  </h3>
                  <p className="text-body-sm text-on-surface-variant">
                    Saved locally in your browser so you never lose your beginner queue.
                  </p>
                </div>
              </div>

              {savedAnime.length === 0 ? (
                <div className="bg-surface-container-low border border-outline-variant/40 p-8 rounded-DEFAULT text-center space-y-2">
                  <span className="material-symbols-outlined text-4xl text-outline">
                    video_library
                  </span>
                  <div className="font-headline-sm text-headline-sm text-on-surface uppercase">
                    CASSETTE DECK IS EMPTY
                  </div>
                  <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
                    Bookmark shows from the 30-Second Starter Quiz, Hall of Fame, or Arcade Roulette
                    to build your zero-filler weekend queue.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedAnime.map((anime) => (
                    <div
                      key={anime.id}
                      className="bg-surface-container-low border border-primary-container/30 p-4 rounded-DEFAULT flex items-center justify-between gap-4"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onPlaySound('lock');
                          onClose();
                          onSelectAnime(anime);
                        }}
                        className="text-left min-w-0 flex-1 cursor-pointer group"
                      >
                        <div className="font-label-sm text-label-sm text-tertiary-container font-bold">
                          {anime.cassetteCode} // {anime.episodesLabel}
                        </div>
                        <div className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors truncate">
                          {anime.title}
                        </div>
                        <div className="text-body-sm text-on-surface-variant truncate">
                          {anime.platforms.join(' // ')}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onPlaySound('click');
                          onToggleWatchlist(anime.id);
                        }}
                        className="px-3 py-1.5 border border-secondary-container/60 text-secondary hover:bg-secondary-container hover:text-white rounded-DEFAULT font-label-sm text-label-sm uppercase cursor-pointer transition-colors shrink-0"
                      >
                        EJECT
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {/* System CRT & Audio Switches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-surface-container-low p-4 rounded-DEFAULT border border-outline-variant/40">
                <button
                  type="button"
                  onClick={onToggleCrt}
                  className="flex items-center justify-between p-2.5 bg-surface-container border border-outline-variant/40 rounded-DEFAULT hover:border-primary-container transition-colors cursor-pointer"
                >
                  <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">tv</span>
                    CRT SCANLINE PRESET
                  </span>
                  <span className="font-label-sm text-label-sm text-primary-container font-bold">
                    {crtHeavy ? 'HEAVY 99' : 'STANDARD'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onToggleSound}
                  className="flex items-center justify-between p-2.5 bg-surface-container border border-outline-variant/40 rounded-DEFAULT hover:border-secondary-container transition-colors cursor-pointer"
                >
                  <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-container">
                      {soundEnabled ? 'volume_up' : 'volume_off'}
                    </span>
                    SYNTH AUDIO BEEPER
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">
                    {soundEnabled ? 'ACTIVE' : 'MUTED'}
                  </span>
                </button>
              </div>

              {/* Operator Command Prompt */}
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-primary-container uppercase tracking-wider block">
                  OPERATOR QUERY // TYPE GENRE, VIBE, OR PLATFORM
                </label>
                <div className="flex items-center bg-surface-container-low border border-primary-container/50 px-3 py-2 rounded-DEFAULT">
                  <span className="font-label-md text-primary-container mr-2">&gt;_</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Try: Netflix, thriller, jazz, ghibli, cyberpunk..."
                    className="bg-transparent border-none outline-none w-full text-on-surface font-label-md text-label-md placeholder:text-outline"
                  />
                </div>
              </div>

              {/* Hollywood Bridge Presets */}
              <div className="space-y-2">
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  OR PICK A WESTERN TV / MOVIE BRIDGE:
                </div>
                <div className="flex flex-wrap gap-2">
                  {OPERATOR_PRESETS.map((preset) => {
                    const active = !terminalInput && selectedPreset.label === preset.label;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          onPlaySound('click');
                          setTerminalInput('');
                          setSelectedPreset(preset);
                        }}
                        className={`px-3 py-1.5 rounded-DEFAULT border font-label-sm text-label-sm transition-all cursor-pointer ${
                          active
                            ? 'bg-secondary-container border-secondary-container text-white font-bold'
                            : 'bg-surface-container border-outline-variant text-on-surface-variant hover:border-primary-container'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Output Results */}
              <div className="space-y-3 bg-surface-container-low p-4 rounded-DEFAULT border border-outline-variant/40">
                <div className="font-label-sm text-label-sm text-tertiary-container uppercase">
                  {terminalInput
                    ? `SEARCH RESULTS FOR "${terminalInput.toUpperCase()}"`
                    : `OPERATOR NOTE: ${selectedPreset.note}`}
                </div>

                {terminalMatches.length === 0 ? (
                  <p className="text-body-sm text-on-surface-variant">
                    No direct matches found. Clear the input or choose a bridge preset above.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {terminalMatches.map((anime) => (
                      <button
                        key={anime.id}
                        type="button"
                        onClick={() => {
                          onPlaySound('lock');
                          onClose();
                          onSelectAnime(anime);
                        }}
                        className="text-left p-3 bg-surface-container border border-outline-variant/50 hover:border-primary-container rounded-DEFAULT transition-all cursor-pointer space-y-1"
                      >
                        <div className="font-label-sm text-label-sm text-primary-container font-bold">
                          {anime.episodesLabel} // {anime.platforms[0]}
                        </div>
                        <div className="font-headline-sm text-lg text-on-surface uppercase">
                          {anime.title}
                        </div>
                        <div className="text-body-sm text-on-surface-variant line-clamp-2">
                          {anime.whyItWorks}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
