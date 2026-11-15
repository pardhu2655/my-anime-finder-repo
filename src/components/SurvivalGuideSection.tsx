import { SURVIVAL_RULES } from '../data/animeVault';

interface SurvivalGuideSectionProps {
  onOpenOperator: (tab?: 'watchlist' | 'terminal') => void;
  onPlaySound: (type?: 'click' | 'coin' | 'spin' | 'lock') => void;
}

export function SurvivalGuideSection({
  onOpenOperator,
  onPlaySound,
}: SurvivalGuideSectionProps) {
  return (
    <section id="guide" className="space-y-6">
      <div className="border-b border-outline-variant/40 pb-4">
        <div className="flex items-center gap-2 text-primary-container font-label-md text-label-md tracking-widest uppercase">
          <span className="material-symbols-outlined">menu_book</span>
          FIELD TRANSMISSION MANUAL
        </div>
        <h2 className="text-headline-lg-mobile sm:text-headline-lg font-headline-lg text-on-surface uppercase tracking-tight">
          THE BEGINNER&apos;S SURVIVAL GUIDE: 4 GOLDEN RULES
        </h2>
        <p className="text-on-surface-variant font-body-md text-body-md">
          Avoid the common traps that cause newcomers to abandon the medium. Memorize these four
          tenets before pressing play.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SURVIVAL_RULES.map((rule) => (
          <div
            key={rule.num}
            className="bg-surface-container-low border border-primary-container/30 p-5 rounded-DEFAULT arcade-shadow space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div
                className={`w-8 h-8 rounded-DEFAULT font-headline-sm font-bold flex items-center justify-center tabular-nums ${rule.badgeClass}`}
              >
                {rule.num}
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                {rule.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {rule.description}
              </p>
            </div>
            <div className="font-label-sm text-label-sm text-secondary font-bold pt-2 border-t border-outline-variant/20">
              {rule.verdict}
            </div>
          </div>
        ))}
      </div>

      {/* Community Callout Box */}
      <div className="bg-surface-container p-6 rounded-DEFAULT border border-secondary-container/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-primary-container shrink-0">
            forum
          </span>
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase">
              STILL FEEL LOST? ASK THE OPERATOR
            </h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm">
              Launch the Neo-Tokyo Operator Terminal to match shows by your favorite Hollywood movies,
              check streaming channels, or manage your saved cassette deck.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            onPlaySound('lock');
            onOpenOperator('terminal');
          }}
          className="shrink-0 bg-secondary-container text-white px-5 py-2.5 rounded-DEFAULT font-label-md text-label-md tracking-wider uppercase font-bold hover:bg-secondary-container/90 transition-all cursor-pointer whitespace-nowrap"
        >
          OPEN OPERATOR TERMINAL
        </button>
      </div>
    </section>
  );
}
