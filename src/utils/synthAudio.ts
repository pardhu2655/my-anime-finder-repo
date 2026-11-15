let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playSynthBeep(
  enabled: boolean,
  type: 'click' | 'coin' | 'spin' | 'lock' = 'click'
) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (type === 'click') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  } else if (type === 'coin') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.08);
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  } else if (type === 'spin') {
    const notes = [330, 440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const t = now + idx * 0.045;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.055);
    });
  } else if (type === 'lock') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(660, now + 0.06);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }
}

// 90s Atmospheric Cyber-Arcade Ambient Synth Loop
interface AmbientEngineState {
  running: boolean;
  masterGain: GainNode | null;
  oscillators: OscillatorNode[];
  stepTimer: ReturnType<typeof setInterval> | null;
  fadeOutTimer: ReturnType<typeof setTimeout> | null;
}

const ambientState: AmbientEngineState = {
  running: false,
  masterGain: null,
  oscillators: [],
  stepTimer: null,
  fadeOutTimer: null,
};

// 90s cyber-noir progression: Am9 -> Fmaj7 -> Dm9 -> Em7
const CHORD_SEQUENCE = [
  { bass: 110.0, arp: [220.0, 261.63, 329.63, 493.88, 392.0, 329.63, 261.63, 246.94] },
  { bass: 87.31, arp: [174.61, 220.0, 261.63, 329.63, 261.63, 220.0, 196.0, 220.0] },
  { bass: 73.42, arp: [146.83, 220.0, 261.63, 329.63, 293.66, 261.63, 220.0, 196.0] },
  { bass: 82.41, arp: [164.81, 246.94, 293.66, 392.0, 329.63, 293.66, 246.94, 220.0] },
];

export function startAmbientSynth() {
  if (ambientState.running) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ambientState.fadeOutTimer) {
    clearTimeout(ambientState.fadeOutTimer);
    ambientState.fadeOutTimer = null;
  }

  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.0001, now);
  masterGain.gain.exponentialRampToValueAtTime(0.065, now + 0.9);
  masterGain.connect(ctx.destination);

  // Warm analog lowpass filter with slow LFO sweep
  const padFilter = ctx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.setValueAtTime(520, now);
  padFilter.Q.setValueAtTime(2.2, now);
  padFilter.connect(masterGain);

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(0.14, now);
  lfoGain.gain.setValueAtTime(220, now);
  lfo.connect(lfoGain);
  lfoGain.connect(padFilter.frequency);
  lfo.start(now);

  // Detuned 90s pad drone oscillators
  const padA = ctx.createOscillator();
  const padB = ctx.createOscillator();
  const subPad = ctx.createOscillator();
  const padGain = ctx.createGain();
  padGain.gain.setValueAtTime(0.38, now);

  padA.type = 'sawtooth';
  padB.type = 'sawtooth';
  subPad.type = 'triangle';

  padA.frequency.setValueAtTime(CHORD_SEQUENCE[0].bass, now);
  padA.detune.setValueAtTime(-7, now);
  padB.frequency.setValueAtTime(CHORD_SEQUENCE[0].bass * 2, now);
  padB.detune.setValueAtTime(7, now);
  subPad.frequency.setValueAtTime(CHORD_SEQUENCE[0].bass * 1.5, now);

  padA.connect(padGain);
  padB.connect(padGain);
  subPad.connect(padGain);
  padGain.connect(padFilter);

  padA.start(now);
  padB.start(now);
  subPad.start(now);

  // Subtle stereo-style echo feedback loop for cyber-arcade arpeggio notes
  const arpFilter = ctx.createBiquadFilter();
  arpFilter.type = 'lowpass';
  arpFilter.frequency.setValueAtTime(1400, now);
  arpFilter.connect(masterGain);

  const delay = ctx.createDelay();
  delay.delayTime.setValueAtTime(0.375, now);
  const delayFeedback = ctx.createGain();
  delayFeedback.gain.setValueAtTime(0.32, now);
  const delayWet = ctx.createGain();
  delayWet.gain.setValueAtTime(0.45, now);

  delay.connect(delayFeedback);
  delayFeedback.connect(delay);
  delay.connect(delayWet);
  delayWet.connect(arpFilter);

  let step = 0;
  const triggerArpStep = () => {
    if (!ambientState.running) return;
    const chordIdx = Math.floor(step / 8) % CHORD_SEQUENCE.length;
    const noteIdx = step % 8;
    const chord = CHORD_SEQUENCE[chordIdx];
    const t = ctx.currentTime;

    // Shift warm pad root on bar transitions
    if (noteIdx === 0) {
      padA.frequency.setTargetAtTime(chord.bass, t, 0.25);
      padB.frequency.setTargetAtTime(chord.bass * 2, t, 0.25);
      subPad.frequency.setTargetAtTime(chord.bass * 1.5, t, 0.25);
    }

    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(chord.arp[noteIdx], t);

    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.24, t + 0.025);
    env.gain.exponentialRampToValueAtTime(0.0008, t + 0.42);

    osc.connect(env);
    env.connect(arpFilter);
    env.connect(delay);

    osc.start(t);
    osc.stop(t + 0.45);
    step += 1;
  };

  ambientState.running = true;
  ambientState.masterGain = masterGain;
  ambientState.oscillators = [lfo, padA, padB, subPad];

  triggerArpStep();
  ambientState.stepTimer = setInterval(triggerArpStep, 320);
}

export function stopAmbientSynth() {
  if (!ambientState.running) return;
  ambientState.running = false;

  if (ambientState.stepTimer) {
    clearInterval(ambientState.stepTimer);
    ambientState.stepTimer = null;
  }

  const ctx = audioCtx;
  const master = ambientState.masterGain;
  const oscs = [...ambientState.oscillators];
  ambientState.masterGain = null;
  ambientState.oscillators = [];

  if (ctx && master) {
    const now = ctx.currentTime;
    try {
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    } catch {
      // ignore gain ramp errors
    }

    ambientState.fadeOutTimer = setTimeout(() => {
      oscs.forEach((o) => {
        try {
          o.stop();
          o.disconnect();
        } catch {
          // already stopped
        }
      });
      try {
        master.disconnect();
      } catch {
        // already disconnected
      }
      ambientState.fadeOutTimer = null;
    }, 440);
  } else {
    oscs.forEach((o) => {
      try {
        o.stop();
        o.disconnect();
      } catch {
        // ignore
      }
    });
  }
}
