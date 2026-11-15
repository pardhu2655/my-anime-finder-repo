import { useMemo, useState } from 'react';
import {
  AnimeEntry,
  BINGE_OPTIONS,
  BingeType,
  COMMITMENT_OPTIONS,
  CommitmentType,
  PACING_OPTIONS,
  PacingType,
  matchQuizRecommendation,
} from '../data/animeVault';
import { ImageWithFallback } from './ImageWithFallback';

interface QuizSectionProps {
  onSelectAnime: (anime: AnimeEntry) => void;
  onPlaySound: (type?: 'click' | 'coin' | 'spin' | 'lock') => void;
  watchlistIds: string[];
  onToggleWatchlist: (id: string) => void;
  crtHeavy: boolean;
}

export function QuizSection({
  onSelectAnime,
  onPlaySound,
  watchlistIds,
  onToggleWatchlist,
  crtHeavy,
}: QuizSectionProps) {
  const [binge, setBinge] = useState<BingeType>('got');
  const [commitment, setCommitment] = useState<CommitmentType>('season');
  const [pacing, setPacing] = useState<PacingType>('fast');
  const [touchedSteps, setTouchedSteps] = useState<Set<number>>(new Set([1]));

  const { anime: matchedAnime, compatibility } = useMemo(
    () => matchQuizRecommendation(binge, commitment, pacing),
    [binge, commitment, pacing]
  );

  const isSaved = watchlistIds.includes(matchedAnime.id);
  const completedSteps = Math.min(3, touchedSteps.size);

  return (
    <section id="quiz" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/40 pb-4">
        <div>
          <div className="flex items-center gap-2 text-primary-container font-label-md text-label-md tracking-widest uppercase">
            <span className="material-symbols-outlined">psychology</span>
            NEURAL PATHFINDER ENGINE
          </div>
          <h2 className="text-headline-lg-mobile sm:text-headline-lg font-headline-lg text-on-surface uppercase tracking-tight">
            THE 30-SECOND STARTER QUIZ
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Answer 3 quick preferences. Our arcade logic cross-references 15,000 user reviews to
            reveal your zero-friction anime match.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 border border-primary-container/30 rounded-DEFAULT tabular-nums shrink-0">
          <span className="font-label-md text-label-md text-secondary-container">
            STEP: 0{completedSteps}/03
          </span>
          <span className="text-outline-variant font-label-sm text-label-sm">
            {completedSteps === 3 ? '// SIGNAL LOCKED' : '// CALIBRATING'}
          </span>
        </div>
      </div>

      {/* Quiz Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Quiz Selector Console (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-surface-container-low border border-primary-container/40 p-6 rounded-DEFAULT arcade-shadow">
          {/* STEP 1 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label className="font-label-md text-label-md uppercase tracking-wider text-primary-container flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-primary-container text-surface-container-lowest font-bold rounded-DEFAULT">
                  1
                </span>
                WHAT DO YOU NORMALLY BINGE ON TV?
              </label>
              <span className="text-on-surface-variant font-label-sm text-label-sm hidden sm:inline">
                SELECT PREFERRED TONE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BINGE_OPTIONS.map((opt, idx) => {
                const selected = binge === opt.id;
                const isWide = idx === BINGE_OPTIONS.length - 1;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onPlaySound('click');
                      setBinge(opt.id);
                      setTouchedSteps((prev) => new Set(prev).add(1));
                    }}
                    className={`text-left p-3 rounded-DEFAULT border transition-all flex items-center justify-between group cursor-pointer ${
                      isWide ? 'sm:col-span-2' : ''
                    } ${
                      selected
                        ? 'border-secondary-container bg-secondary-container/10 text-on-surface hover:bg-secondary-container/20'
                        : 'border-outline-variant bg-surface-container hover:border-primary-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <div>
                      <div
                        className={`font-label-md text-label-md ${
                          selected
                            ? 'text-secondary group-hover:text-white font-bold'
                            : 'text-on-surface group-hover:text-primary-container'
                        }`}
                      >
                        {selected ? `* ${opt.label}` : opt.label}
                      </div>
                      <div className="text-on-surface-variant text-label-sm font-label-sm">
                        {opt.subtitle}
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined shrink-0 ${
                        selected
                          ? 'text-secondary-container opacity-100'
                          : 'text-primary-container opacity-0 group-hover:opacity-60'
                      }`}
                    >
                      {selected ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="space-y-3 pt-2">
            <label className="font-label-md text-label-md uppercase tracking-wider text-primary-container flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-primary-container text-surface-container-lowest font-bold rounded-DEFAULT">
                2
              </span>
              COMMITMENT LEVEL // EPISODE COUNT
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {COMMITMENT_OPTIONS.map((opt) => {
                const selected = commitment === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onPlaySound('click');
                      setCommitment(opt.id);
                      setTouchedSteps((prev) => new Set(prev).add(2));
                    }}
                    className={`p-3 text-center rounded-DEFAULT border transition-all cursor-pointer ${
                      selected
                        ? 'border-secondary-container bg-secondary-container/10'
                        : 'border-outline-variant bg-surface-container hover:border-primary-container'
                    }`}
                  >
                    <div
                      className={`font-label-md text-label-md ${
                        selected ? 'text-secondary font-bold' : 'text-on-surface'
                      }`}
                    >
                      {selected ? `* ${opt.label}` : opt.label}
                    </div>
                    <div
                      className={`text-label-sm font-label-sm font-bold ${
                        selected ? 'text-primary-container' : 'text-on-surface-variant'
                      }`}
                    >
                      {opt.duration}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3 */}
          <div className="space-y-3 pt-2">
            <label className="font-label-md text-label-md uppercase tracking-wider text-primary-container flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-primary-container text-surface-container-lowest font-bold rounded-DEFAULT">
                3
              </span>
              NARRATIVE PACING SENSOR
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PACING_OPTIONS.map((opt) => {
                const selected = pacing === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onPlaySound('lock');
                      setPacing(opt.id);
                      setTouchedSteps((prev) => new Set(prev).add(3));
                    }}
                    className={`p-3 text-left rounded-DEFAULT border transition-all flex items-center gap-3 cursor-pointer ${
                      selected
                        ? 'border-secondary-container bg-secondary-container/10'
                        : 'border-outline-variant bg-surface-container hover:border-primary-container'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-2xl ${
                        selected ? 'text-secondary-container' : 'text-outline'
                      }`}
                    >
                      {opt.icon}
                    </span>
                    <div>
                      <div
                        className={`font-label-md text-label-md ${
                          selected ? 'text-secondary font-bold' : 'text-on-surface'
                        }`}
                      >
                        {selected ? `* ${opt.label}` : opt.label}
                      </div>
                      <div className="text-on-surface-variant text-label-sm font-label-sm">
                        {opt.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Diagnostic Readout */}
          <div className="bg-surface-container-lowest p-3 border border-outline-variant/30 rounded-DEFAULT flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant tabular-nums">
            <span>ORACLE STATUS: MATCH LOCK ON {compatibility}</span>
            <span className="text-primary-container font-bold cursor-blink">UPDATED LIVE █</span>
          </div>
        </div>

        {/* Right: Dynamic Live Result Preview Card (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container border-2 border-secondary-container rounded-DEFAULT p-6 arcade-shadow-cyan flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none" />
          <div>
            {/* Match Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
              <span className="holo-stamp text-surface-container-lowest font-label-md text-label-md px-3 py-1 font-bold rounded-DEFAULT tracking-widest uppercase">
                PERFECT MATCH FOUND
              </span>
              <span className="font-label-md text-label-md text-primary-container font-bold tracking-widest tabular-nums">
                {compatibility}
              </span>
            </div>

            {/* Anime Title & Year */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-surface-container-high text-tertiary-container border border-tertiary-container/40 px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-bold uppercase">
                  {matchedAnime.genreLabel}
                </span>
                <span className="bg-surface-container-high text-secondary border border-secondary-container/40 px-2 py-0.5 rounded-DEFAULT font-label-sm text-label-sm font-bold uppercase">
                  CERTIFIED GATEWAY
                </span>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface uppercase">
                {matchedAnime.title}
              </h3>
            </div>

            {/* CRT Poster Frame */}
            <div className="relative aspect-video rounded-DEFAULT overflow-hidden border border-outline-variant/80 mb-4 bg-surface-container-lowest group">
              <ImageWithFallback
                src={matchedAnime.posterUrl}
                alt={matchedAnime.posterAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackLabel={matchedAnime.title}
              />
              <div className={`${crtHeavy ? 'crt-overlay-heavy' : 'crt-overlay'} absolute inset-0`} />
              <div className="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-1 rounded-DEFAULT border border-primary-container/40 text-primary-container font-label-sm text-label-sm flex items-center gap-1.5 tabular-nums">
                <span className="material-symbols-outlined text-xs">star</span>
                <span>{matchedAnime.imdbRating}</span>
              </div>
              <div className="absolute bottom-2 right-2 bg-surface-container-lowest/90 px-2 py-1 rounded-DEFAULT border border-outline-variant text-on-surface-variant font-label-sm text-label-sm">
                {matchedAnime.platforms.join(' // ')}
              </div>
            </div>

            {/* Why it works for beginners */}
            <div className="space-y-2 mb-4 bg-surface-container-low p-3.5 border border-outline-variant/40 rounded-DEFAULT">
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                WHY IT WORKS FOR BEGINNERS:
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {matchedAnime.whyItWorks}
              </p>
            </div>
          </div>

          {/* Card Foot Actions */}
          <div className="space-y-2.5 pt-2 border-t border-outline-variant/30">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onPlaySound('lock');
                  onSelectAnime(matchedAnime);
                }}
                className="flex-1 bg-primary-container text-surface-container-lowest font-headline-sm font-bold py-3 px-4 rounded-DEFAULT arcade-shadow hover:translate-x-0.5 hover:translate-y-0.5 transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined">play_circle</span>
                WHERE TO WATCH (EPISODE 1)
              </button>
              <button
                type="button"
                onClick={() => {
                  onPlaySound('click');
                  onToggleWatchlist(matchedAnime.id);
                }}
                className={`px-3.5 py-3 rounded-DEFAULT border transition-all cursor-pointer flex items-center justify-center ${
                  isSaved
                    ? 'bg-secondary-container border-secondary-container text-white'
                    : 'bg-surface-container-low border-outline-variant text-primary-container hover:border-primary-container'
                }`}
                title={isSaved ? 'Saved in Cassette Deck' : 'Save to Cassette Deck'}
              >
                <span className="material-symbols-outlined">
                  {isSaved ? 'bookmark_added' : 'bookmark_add'}
                </span>
              </button>
            </div>
            <div className="text-center">
              <span className="text-on-surface-variant font-label-sm text-label-sm">
                COMMUNITY RATING: ZERO CRINGE GUARANTEE ★★★★★
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
