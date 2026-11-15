import { useEffect } from 'react';
import { AnimeEntry } from '../data/animeVault';
import { ImageWithFallback } from './ImageWithFallback';

interface DossierModalProps {
  anime: AnimeEntry | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleWatchlist: (id: string) => void;
  onPlaySound: (type?: 'click' | 'coin' | 'spin' | 'lock') => void;
  crtHeavy: boolean;
}

export function DossierModal({
  anime,
  onClose,
  isSaved,
  onToggleWatchlist,
  onPlaySound,
  crtHeavy,
}: DossierModalProps) {
  useEffect(() => {
    if (!anime) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [anime, onClose]);

  if (!anime) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
    >
      <div
        className="w-full max-w-2xl bg-surface-container-lowest border-2 border-primary-container rounded-DEFAULT arcade-shadow overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-surface-container-low border-b border-primary-container/30">
          <div className="flex items-center gap-2 font-label-md text-label-md text-primary-container">
            <span className="material-symbols-outlined text-base">videocam</span>
            <span>{anime.cassetteCode} // BEGINNER DOSSIER</span>
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          <div className="relative aspect-video rounded-DEFAULT overflow-hidden border border-outline-variant/60 bg-surface-container">
            <ImageWithFallback
              src={anime.posterUrl}
              alt={anime.posterAlt}
              className="w-full h-full object-cover"
              fallbackLabel={anime.title}
            />
            <div className={`${crtHeavy ? 'crt-overlay-heavy' : 'crt-overlay'} absolute inset-0`} />
            <div className="absolute top-3 left-3 bg-secondary-container text-white px-2.5 py-1 rounded-DEFAULT font-label-sm text-label-sm font-bold">
              {anime.badge}
            </div>
            <div className="absolute top-3 right-3 holo-stamp text-surface-container-lowest px-2.5 py-1 rounded-DEFAULT font-label-sm text-label-sm font-bold">
              {anime.stamp}
            </div>
            <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 px-2.5 py-1 rounded-DEFAULT border border-primary-container/50 text-primary-container font-label-sm text-label-sm flex items-center gap-1 tabular-nums">
              <span className="material-symbols-outlined text-xs">star</span>
              <span>{anime.imdbRating}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-label-sm text-label-sm text-tertiary-container uppercase tracking-widest font-bold">
              {anime.subtitle}
            </div>
            <h3
              id="dossier-title"
              className="text-headline-md font-headline-md text-on-surface uppercase"
            >
              {anime.title}
            </h3>
            <p className="text-body-md text-on-surface-variant">{anime.synopsis}</p>
          </div>

          {/* Diagnostic Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-surface-container-low p-3.5 rounded-DEFAULT border border-outline-variant/40 font-label-sm text-label-sm tabular-nums">
            <div>
              <div className="text-on-surface-variant">WEIRDNESS FACTOR</div>
              <div className="text-secondary font-bold text-sm">{anime.weirdnessScore}</div>
            </div>
            <div>
              <div className="text-on-surface-variant">PACING MULTIPLIER</div>
              <div className="text-primary-container font-bold text-sm">{anime.pacingScore}</div>
            </div>
            <div>
              <div className="text-on-surface-variant">COMMITMENT</div>
              <div className="text-tertiary-container font-bold text-sm">
                {anime.lengthCommitment}
              </div>
            </div>
          </div>

          {/* Episode 1 Hook & Dub Verdict */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-container p-4 rounded-DEFAULT border border-primary-container/30 space-y-1.5">
              <div className="font-label-sm text-label-sm text-primary-container font-bold uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">bolt</span>
                EPISODE 1 HOOK
              </div>
              <p className="text-body-sm text-on-surface-variant">{anime.episodeOneHook}</p>
            </div>
            <div className="bg-surface-container p-4 rounded-DEFAULT border border-secondary-container/30 space-y-1.5">
              <div className="font-label-sm text-label-sm text-secondary font-bold uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">headphones</span>
                SUB VS DUB VERDICT
              </div>
              <p className="text-body-sm text-on-surface-variant">{anime.dubVerdict}</p>
            </div>
          </div>

          {/* Streaming Platforms */}
          <div className="bg-surface-container-low p-4 rounded-DEFAULT border border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                AVAILABLE STREAMING CHANNELS
              </div>
              <div className="font-label-md text-label-md text-primary-container mt-0.5">
                {anime.platforms.join('  //  ')}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onPlaySound('lock');
                onToggleWatchlist(anime.id);
              }}
              className={`px-4 py-2.5 rounded-DEFAULT font-label-md text-label-md uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 ${
                isSaved
                  ? 'bg-secondary-container text-white shadow-[2px_2px_0px_#00f0ff]'
                  : 'bg-primary-container text-surface-container-lowest shadow-[2px_2px_0px_#ff4a8d]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {isSaved ? 'bookmark_added' : 'bookmark_add'}
              </span>
              {isSaved ? 'SAVED IN CASSETTE DECK' : 'SAVE TO CASSETTE DECK'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
