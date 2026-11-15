import { useEffect, useState } from 'react';
import { AnimeEntry } from './data/animeVault';
import { DbzBackgroundFX } from './components/DbzBackgroundFX';
import { DossierModal } from './components/DossierModal';
import { Footer } from './components/Footer';
import { HallOfFameSection } from './components/HallOfFameSection';
import { Header, MobileHudDock, ScreenId } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OperatorModal } from './components/OperatorModal';
import { QuizSection } from './components/QuizSection';
import { RouletteSection } from './components/RouletteSection';
import { SurvivalGuideSection } from './components/SurvivalGuideSection';
import { playSynthBeep, startAmbientSynth, stopAmbientSynth } from './utils/synthAudio';

const WATCHLIST_KEY = 'neotokyo99_watchlist';
const COINS_KEY = 'neotokyo99_coins';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('radar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnime, setSelectedAnime] = useState<AnimeEntry | null>(null);
  const [operatorModal, setOperatorModal] = useState<{
    open: boolean;
    tab: 'watchlist' | 'terminal';
  }>({ open: false, tab: 'terminal' });

  const [crtHeavy, setCrtHeavy] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientSynth, setAmbientSynth] = useState(false);
  const [dbzFxEnabled, setDbzFxEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(WATCHLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [coins, setCoins] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(COINS_KEY);
      return raw ? Number(raw) : 3;
    } catch {
      return 3;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlistIds));
    } catch {
      // ignore storage errors
    }
  }, [watchlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(COINS_KEY, String(coins));
    } catch {
      // ignore storage errors
    }
  }, [coins]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    return () => {
      stopAmbientSynth();
    };
  }, []);

  const handlePlaySound = (type: 'click' | 'coin' | 'spin' | 'lock' = 'click') => {
    playSynthBeep(soundEnabled, type);
  };

  const handleNavigate = (screen: ScreenId) => {
    handlePlaySound('click');
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWatchlist = (id: string) => {
    setWatchlistIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      setToast(exists ? 'CASSETTE EJECTED FROM DECK' : 'CASSETTE SAVED TO DECK');
      return next;
    });
  };

  const handleInsertCoin = () => {
    handlePlaySound('coin');
    setCoins((c) => c + 1);
    setToast(`INSERTED COIN // CREDITS: ${coins + 1}`);
  };

  const handleToggleCrt = () => {
    handlePlaySound('click');
    setCrtHeavy((prev) => {
      const next = !prev;
      setToast(next ? 'CRT PRESET: HEAVY PHOSPHOR' : 'CRT PRESET: STANDARD 60Hz');
      return next;
    });
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) playSynthBeep(true, 'lock');
      setToast(next ? 'SYNTH BEEPER: ARMED' : 'SYNTH BEEPER: MUTED');
      return next;
    });
  };

  const handleToggleDbzFx = () => {
    handlePlaySound('click');
    setDbzFxEnabled((prev) => {
      const next = !prev;
      setToast(next ? 'DBZ KI FX: POWERING UP' : 'DBZ KI FX: SUPPRESSED');
      return next;
    });
  };

  const handleToggleAmbientSynth = () => {
    setAmbientSynth((prev) => {
      const next = !prev;
      if (next) {
        startAmbientSynth();
        setToast('AMBIENT SYNTH: 90s LOOP ACTIVE');
      } else {
        stopAmbientSynth();
        setToast('AMBIENT SYNTH: OFFLINE');
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md text-on-background relative">
      <DbzBackgroundFX enabled={dbzFxEnabled} />
      <Header
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && activeScreen !== 'radar' && activeScreen !== 'vault') {
            setActiveScreen('vault');
          }
        }}
        onSelectAnime={(anime) => {
          handlePlaySound('lock');
          setSelectedAnime(anime);
        }}
        crtHeavy={crtHeavy}
        onToggleCrt={handleToggleCrt}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        coins={coins}
        onInsertCoin={handleInsertCoin}
        watchlistCount={watchlistIds.length}
        onOpenOperator={(tab = 'terminal') => {
          handlePlaySound('click');
          setOperatorModal({ open: true, tab });
        }}
      />

      {/* Focused Sub-Screen Navigation Strip */}
      {activeScreen !== 'radar' && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-between bg-surface-container-low border border-primary-container/40 px-4 py-2.5 rounded-DEFAULT">
            <button
              type="button"
              onClick={() => handleNavigate('radar')}
              className="flex items-center gap-2 font-label-md text-label-md text-primary-container hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              RETURN TO FULL BROADCAST (RADAR)
            </button>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
              CHANNEL: {activeScreen.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* MAIN CANVAS */}
      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {activeScreen === 'radar' && (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              crtHeavy={crtHeavy}
              onSelectAnime={setSelectedAnime}
              onPlaySound={handlePlaySound}
              watchlistIds={watchlistIds}
              onToggleWatchlist={handleToggleWatchlist}
            />
            <QuizSection
              onSelectAnime={setSelectedAnime}
              onPlaySound={handlePlaySound}
              watchlistIds={watchlistIds}
              onToggleWatchlist={handleToggleWatchlist}
              crtHeavy={crtHeavy}
            />
            <HallOfFameSection
              onSelectAnime={setSelectedAnime}
              onPlaySound={handlePlaySound}
              watchlistIds={watchlistIds}
              onToggleWatchlist={handleToggleWatchlist}
              searchQuery={searchQuery}
            />
            <RouletteSection
              onSelectAnime={setSelectedAnime}
              onPlaySound={handlePlaySound}
              watchlistIds={watchlistIds}
              onToggleWatchlist={handleToggleWatchlist}
              coins={coins}
              onSpendCoin={() => setCoins((c) => Math.max(0, c - 1))}
              crtHeavy={crtHeavy}
            />
            <SurvivalGuideSection
              onOpenOperator={(tab = 'terminal') => setOperatorModal({ open: true, tab })}
              onPlaySound={handlePlaySound}
            />
          </>
        )}

        {activeScreen === 'quiz' && (
          <QuizSection
            onSelectAnime={setSelectedAnime}
            onPlaySound={handlePlaySound}
            watchlistIds={watchlistIds}
            onToggleWatchlist={handleToggleWatchlist}
            crtHeavy={crtHeavy}
          />
        )}

        {activeScreen === 'vault' && (
          <HallOfFameSection
            onSelectAnime={setSelectedAnime}
            onPlaySound={handlePlaySound}
            watchlistIds={watchlistIds}
            onToggleWatchlist={handleToggleWatchlist}
            searchQuery={searchQuery}
            focusedMode
          />
        )}

        {activeScreen === 'roulette' && (
          <RouletteSection
            onSelectAnime={setSelectedAnime}
            onPlaySound={handlePlaySound}
            watchlistIds={watchlistIds}
            onToggleWatchlist={handleToggleWatchlist}
            coins={coins}
            onSpendCoin={() => setCoins((c) => Math.max(0, c - 1))}
            crtHeavy={crtHeavy}
          />
        )}

        {activeScreen === 'guide' && (
          <SurvivalGuideSection
            onOpenOperator={(tab = 'terminal') => setOperatorModal({ open: true, tab })}
            onPlaySound={handlePlaySound}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onToggleCrt={handleToggleCrt}
        onOpenOperator={(tab = 'terminal') => setOperatorModal({ open: true, tab })}
        onPlaySound={handlePlaySound}
      />

      <MobileHudDock activeScreen={activeScreen} onNavigate={handleNavigate} />

      {/* Retro Toast Banner */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-surface-container-lowest border-2 border-primary-container text-primary-container px-4 py-2.5 rounded-DEFAULT arcade-shadow font-label-md text-label-md tracking-wider uppercase">
          {toast}
        </div>
      )}

      {/* Detailed Cassette Dossier Modal */}
      <DossierModal
        anime={selectedAnime}
        onClose={() => setSelectedAnime(null)}
        isSaved={selectedAnime ? watchlistIds.includes(selectedAnime.id) : false}
        onToggleWatchlist={handleToggleWatchlist}
        onPlaySound={handlePlaySound}
        crtHeavy={crtHeavy}
      />

      {/* Operator Terminal & Saved Cassette Deck Modal */}
      <OperatorModal
        open={operatorModal.open}
        initialTab={operatorModal.tab}
        onClose={() => setOperatorModal((prev) => ({ ...prev, open: false }))}
        watchlistIds={watchlistIds}
        onToggleWatchlist={handleToggleWatchlist}
        onSelectAnime={setSelectedAnime}
        onPlaySound={handlePlaySound}
        crtHeavy={crtHeavy}
        onToggleCrt={handleToggleCrt}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        dbzFxEnabled={dbzFxEnabled}
        onToggleDbzFx={handleToggleDbzFx}
        ambientSynth={ambientSynth}
        onToggleAmbientSynth={handleToggleAmbientSynth}
      />
    </div>
  );
}
