import { ScreenId } from './Header';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
  onToggleCrt: () => void;
  onOpenOperator: (tab?: 'watchlist' | 'terminal') => void;
  onPlaySound: (type?: 'click' | 'coin' | 'spin' | 'lock') => void;
}

export function Footer({
  onNavigate,
  onToggleCrt,
  onOpenOperator,
  onPlaySound,
}: FooterProps) {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/40 mt-auto w-full pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 py-6 max-w-full mx-auto gap-4">
        {/* Footer Copyright Text */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="text-headline-sm font-headline-sm uppercase text-primary-container">
            NEO-TOKYO.99
          </span>
          <span className="text-on-surface-variant font-label-sm text-label-sm text-center sm:text-left">
            © 1999 NEO-TOKYO SIGNAL CORP // BROADCAST ARCHIVE REEL #404. ALL CHANNELS MONITORED.
          </span>
        </div>

        {/* Links Array */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => {
              onPlaySound('click');
              onToggleCrt();
            }}
            className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary-container hover:underline transition-all cursor-pointer"
          >
            CRT PRESETS
          </button>
          <button
            type="button"
            onClick={() => {
              onPlaySound('click');
              onOpenOperator('terminal');
            }}
            className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary-container hover:underline transition-all cursor-pointer"
          >
            TERMINAL LOGS
          </button>
          <button
            type="button"
            onClick={() => {
              onPlaySound('click');
              onNavigate('roulette');
            }}
            className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary-container hover:underline transition-all cursor-pointer"
          >
            EMERGENCY BROADCAST
          </button>
          <button
            type="button"
            onClick={() => {
              onPlaySound('click');
              onNavigate('guide');
            }}
            className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary-container hover:underline transition-all cursor-pointer"
          >
            SIGNAL SPECS
          </button>
          <button
            type="button"
            onClick={() => {
              onPlaySound('lock');
              onOpenOperator('watchlist');
            }}
            className="text-primary-container font-label-sm text-label-sm hover:text-primary-container hover:underline transition-all font-bold cursor-pointer"
          >
            CASSETTE DECK
          </button>
        </div>
      </div>
    </footer>
  );
}
