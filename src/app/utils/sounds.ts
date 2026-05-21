// Animal sound playback.
//
// Strategy: for each animal we first try to play a real MP3 located in
// /public/sounds/<id>.mp3 (drop your hooksounds.com downloads there using the
// exact ids from data.ts — e.g. "leao.mp3", "preguica.mp3"). If that file is
// missing or fails to load, we fall back to a Web Audio synthesis so the app
// always makes some noise, even on a fresh deploy.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    const Ctor = window.AudioContext || (window as any).webkitAudioContext;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

// --- MP3 layer ----------------------------------------------------------------

// Cache one HTMLAudioElement per animal. Re-using elements (instead of `new
// Audio()` on every click) avoids the file being re-downloaded each replay.
const audioCache = new Map<string, HTMLAudioElement>();
// Which ids we've already proven have no MP3 file — skips repeat fetches.
const missingMp3 = new Set<string>();
// Which ids currently have an in-flight audio element so we can stop them
// before starting a replay.
const playing = new Set<string>();

function mp3Url(id: string): string {
  // Resolved relative to the app root; Vite serves /public verbatim.
  return `${import.meta.env.BASE_URL}sounds/${id}.mp3`;
}

function tryPlayMp3(id: string): Promise<boolean> {
  if (missingMp3.has(id)) return Promise.resolve(false);

  let el = audioCache.get(id);
  if (!el) {
    el = new Audio(mp3Url(id));
    el.preload = "auto";
    audioCache.set(id, el);
  }

  // Stop any previous instance so back-to-back clicks always restart cleanly.
  try {
    el.pause();
    el.currentTime = 0;
  } catch {
    /* some browsers throw if currentTime is set before metadata loaded */
  }

  return new Promise((resolve) => {
    let settled = false;
    const cleanup = () => {
      el!.removeEventListener("playing", onPlaying);
      el!.removeEventListener("error", onError);
      el!.removeEventListener("ended", onEnded);
    };
    const onPlaying = () => {
      if (settled) return;
      settled = true;
      playing.add(id);
      resolve(true);
    };
    const onError = () => {
      if (settled) return;
      settled = true;
      missingMp3.add(id);
      cleanup();
      resolve(false);
    };
    const onEnded = () => {
      playing.delete(id);
      cleanup();
    };
    el!.addEventListener("playing", onPlaying, { once: true });
    el!.addEventListener("error", onError, { once: true });
    el!.addEventListener("ended", onEnded, { once: true });

    el!.play().catch(() => {
      if (settled) return;
      settled = true;
      missingMp3.add(id);
      cleanup();
      resolve(false);
    });
  });
}

// --- Synthesized fallback voicings -------------------------------------------

type EnvelopeOptions = {
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  peak?: number;
  end?: number;
};

function envelope(
  param: AudioParam,
  start: number,
  duration: number,
  {
    attack = 0.02,
    decay = 0.1,
    sustain = 0.7,
    release = 0.2,
    peak = 1,
    end = 0.0001,
  }: EnvelopeOptions = {},
) {
  param.cancelScheduledValues(start);
  param.setValueAtTime(0.0001, start);
  param.exponentialRampToValueAtTime(peak, start + attack);
  param.exponentialRampToValueAtTime(Math.max(peak * sustain, 0.0001), start + attack + decay);
  param.setValueAtTime(Math.max(peak * sustain, 0.0001), start + duration - release);
  param.exponentialRampToValueAtTime(Math.max(end, 0.0001), start + duration);
}

function noiseBuffer(audio: AudioContext, duration: number) {
  const len = Math.floor(audio.sampleRate * duration);
  const buf = audio.createBuffer(1, len, audio.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buf;
}

function roar(audio: AudioContext, base: number, duration: number, gainScale = 1) {
  const t0 = audio.currentTime;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);

  const noise = audio.createBufferSource();
  noise.buffer = noiseBuffer(audio, duration);
  const bp = audio.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 4;
  bp.frequency.setValueAtTime(base * 2.5, t0);
  bp.frequency.exponentialRampToValueAtTime(base, t0 + duration);
  noise.connect(bp).connect(out);

  const osc = audio.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(base * 1.4, t0);
  osc.frequency.exponentialRampToValueAtTime(base * 0.6, t0 + duration);
  const oscGain = audio.createGain();
  oscGain.gain.value = 0.4;
  osc.connect(oscGain).connect(out);

  envelope(out.gain, t0, duration, { attack: 0.05, decay: 0.2, sustain: 0.9, release: 0.4, peak: 0.5 * gainScale });

  noise.start(t0);
  osc.start(t0);
  noise.stop(t0 + duration);
  osc.stop(t0 + duration);
}

function trumpet(audio: AudioContext, duration: number) {
  const t0 = audio.currentTime;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);

  const osc = audio.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(160, t0);
  osc.frequency.linearRampToValueAtTime(420, t0 + 0.15);
  osc.frequency.setValueAtTime(420, t0 + duration - 0.2);
  osc.frequency.exponentialRampToValueAtTime(120, t0 + duration);

  const lp = audio.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1200;

  osc.connect(lp).connect(out);
  envelope(out.gain, t0, duration, { attack: 0.05, decay: 0.1, sustain: 0.9, release: 0.3, peak: 0.45 });
  osc.start(t0);
  osc.stop(t0 + duration);
}

function moo(audio: AudioContext) {
  const t0 = audio.currentTime;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);

  const osc = audio.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(140, t0);
  osc.frequency.linearRampToValueAtTime(180, t0 + 0.15);
  osc.frequency.linearRampToValueAtTime(110, t0 + 0.9);

  const lp = audio.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 900;

  osc.connect(lp).connect(out);
  envelope(out.gain, t0, 1.0, { attack: 0.08, decay: 0.1, sustain: 0.95, release: 0.25, peak: 0.4 });
  osc.start(t0);
  osc.stop(t0 + 1.0);
}

function bark(audio: AudioContext, count: number, base: number) {
  const t = audio.currentTime;
  for (let i = 0; i < count; i++) {
    const start = t + i * 0.25;
    const osc = audio.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(base, start);
    osc.frequency.exponentialRampToValueAtTime(base * 0.6, start + 0.15);

    const g = audio.createGain();
    g.gain.value = 0;
    osc.connect(g).connect(audio.destination);
    envelope(g.gain, start, 0.15, { attack: 0.01, decay: 0.05, sustain: 0.6, release: 0.05, peak: 0.35 });
    osc.start(start);
    osc.stop(start + 0.2);
  }
}

function howl(audio: AudioContext) {
  const t0 = audio.currentTime;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);

  const osc = audio.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(220, t0);
  osc.frequency.linearRampToValueAtTime(440, t0 + 0.4);
  osc.frequency.setValueAtTime(440, t0 + 1.0);
  osc.frequency.linearRampToValueAtTime(220, t0 + 1.5);

  const lfo = audio.createOscillator();
  lfo.frequency.value = 5;
  const lfoGain = audio.createGain();
  lfoGain.gain.value = 12;
  lfo.connect(lfoGain).connect(osc.frequency);

  osc.connect(out);
  envelope(out.gain, t0, 1.5, { attack: 0.1, decay: 0.1, sustain: 0.9, release: 0.4, peak: 0.4 });

  osc.start(t0);
  lfo.start(t0);
  osc.stop(t0 + 1.5);
  lfo.stop(t0 + 1.5);
}

function whale(audio: AudioContext) {
  const t0 = audio.currentTime;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);

  const osc = audio.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, t0);
  osc.frequency.linearRampToValueAtTime(240, t0 + 1.0);
  osc.frequency.linearRampToValueAtTime(90, t0 + 2.0);

  const lp = audio.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 700;

  osc.connect(lp).connect(out);
  envelope(out.gain, t0, 2.0, { attack: 0.3, decay: 0.4, sustain: 0.9, release: 0.5, peak: 0.35 });
  osc.start(t0);
  osc.stop(t0 + 2.0);
}

function dolphin(audio: AudioContext) {
  const t0 = audio.currentTime;
  for (let i = 0; i < 4; i++) {
    const start = t0 + i * 0.12;
    const osc = audio.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2000, start);
    osc.frequency.exponentialRampToValueAtTime(4500, start + 0.08);
    const g = audio.createGain();
    g.gain.value = 0;
    osc.connect(g).connect(audio.destination);
    envelope(g.gain, start, 0.1, { attack: 0.005, decay: 0.02, sustain: 0.6, release: 0.04, peak: 0.25 });
    osc.start(start);
    osc.stop(start + 0.12);
  }
}

function shark(audio: AudioContext) {
  const t0 = audio.currentTime;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);

  const noise = audio.createBufferSource();
  noise.buffer = noiseBuffer(audio, 1.5);

  const bp = audio.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 2;
  bp.frequency.setValueAtTime(400, t0);
  bp.frequency.exponentialRampToValueAtTime(2200, t0 + 0.6);
  bp.frequency.exponentialRampToValueAtTime(300, t0 + 1.5);

  noise.connect(bp).connect(out);
  envelope(out.gain, t0, 1.5, { attack: 0.2, decay: 0.2, sustain: 0.8, release: 0.4, peak: 0.55 });
  noise.start(t0);
  noise.stop(t0 + 1.5);
}

function bubbles(audio: AudioContext) {
  const t0 = audio.currentTime;
  for (let i = 0; i < 8; i++) {
    const start = t0 + i * 0.12 + Math.random() * 0.04;
    const osc = audio.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(300 + Math.random() * 400, start);
    osc.frequency.exponentialRampToValueAtTime(900 + Math.random() * 400, start + 0.1);
    const g = audio.createGain();
    g.gain.value = 0;
    osc.connect(g).connect(audio.destination);
    envelope(g.gain, start, 0.15, { attack: 0.005, decay: 0.03, sustain: 0.5, release: 0.05, peak: 0.2 });
    osc.start(start);
    osc.stop(start + 0.2);
  }
}

function oink(audio: AudioContext) {
  const t = audio.currentTime;
  for (let i = 0; i < 3; i++) {
    const start = t + i * 0.3;
    const osc = audio.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, start);
    osc.frequency.linearRampToValueAtTime(280, start + 0.05);
    osc.frequency.linearRampToValueAtTime(180, start + 0.2);

    const lp = audio.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1500;

    const g = audio.createGain();
    g.gain.value = 0;
    osc.connect(lp).connect(g).connect(audio.destination);
    envelope(g.gain, start, 0.25, { attack: 0.02, decay: 0.05, sustain: 0.85, release: 0.05, peak: 0.35 });
    osc.start(start);
    osc.stop(start + 0.3);
  }
}

function neigh(audio: AudioContext) {
  const t0 = audio.currentTime;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);

  const osc = audio.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(420, t0);
  osc.frequency.linearRampToValueAtTime(520, t0 + 0.1);
  for (let i = 0; i < 6; i++) {
    osc.frequency.linearRampToValueAtTime(360 + (i % 2) * 200, t0 + 0.15 + i * 0.08);
  }
  osc.frequency.linearRampToValueAtTime(280, t0 + 1.0);

  const bp = audio.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 3;
  bp.frequency.value = 800;

  osc.connect(bp).connect(out);
  envelope(out.gain, t0, 1.0, { attack: 0.04, decay: 0.1, sustain: 0.85, release: 0.2, peak: 0.4 });
  osc.start(t0);
  osc.stop(t0 + 1.0);
}

function baa(audio: AudioContext) {
  const t0 = audio.currentTime;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);
  const osc = audio.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(400, t0);

  const lfo = audio.createOscillator();
  lfo.frequency.value = 14;
  const lfoGain = audio.createGain();
  lfoGain.gain.value = 30;
  lfo.connect(lfoGain).connect(osc.frequency);

  const lp = audio.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1500;

  osc.connect(lp).connect(out);
  envelope(out.gain, t0, 0.8, { attack: 0.04, decay: 0.08, sustain: 0.85, release: 0.2, peak: 0.4 });
  osc.start(t0);
  lfo.start(t0);
  osc.stop(t0 + 0.8);
  lfo.stop(t0 + 0.8);
}

function squawk(audio: AudioContext, base: number) {
  const t = audio.currentTime;
  for (let i = 0; i < 3; i++) {
    const start = t + i * 0.2;
    const osc = audio.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(base, start);
    osc.frequency.linearRampToValueAtTime(base * 1.4, start + 0.05);
    osc.frequency.linearRampToValueAtTime(base * 0.7, start + 0.15);
    const g = audio.createGain();
    g.gain.value = 0;
    osc.connect(g).connect(audio.destination);
    envelope(g.gain, start, 0.18, { attack: 0.005, decay: 0.04, sustain: 0.7, release: 0.05, peak: 0.3 });
    osc.start(start);
    osc.stop(start + 0.2);
  }
}

function monkey(audio: AudioContext) {
  const t = audio.currentTime;
  for (let i = 0; i < 5; i++) {
    const start = t + i * 0.13;
    const osc = audio.createOscillator();
    osc.type = "square";
    const f = 700 + Math.random() * 400;
    osc.frequency.setValueAtTime(f, start);
    osc.frequency.exponentialRampToValueAtTime(f * 1.4, start + 0.04);
    osc.frequency.exponentialRampToValueAtTime(f * 0.7, start + 0.1);
    const g = audio.createGain();
    g.gain.value = 0;
    osc.connect(g).connect(audio.destination);
    envelope(g.gain, start, 0.11, { attack: 0.005, decay: 0.02, sustain: 0.6, release: 0.04, peak: 0.25 });
    osc.start(start);
    osc.stop(start + 0.12);
  }
}

function penguin(audio: AudioContext) {
  const t = audio.currentTime;
  for (let i = 0; i < 4; i++) {
    const start = t + i * 0.18;
    const osc = audio.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(900, start);
    osc.frequency.linearRampToValueAtTime(700, start + 0.1);
    const g = audio.createGain();
    g.gain.value = 0;
    osc.connect(g).connect(audio.destination);
    envelope(g.gain, start, 0.13, { attack: 0.005, decay: 0.03, sustain: 0.7, release: 0.04, peak: 0.25 });
    osc.start(start);
    osc.stop(start + 0.14);
  }
}

function walrusGrunt(audio: AudioContext) {
  const t = audio.currentTime;
  for (let i = 0; i < 3; i++) {
    const start = t + i * 0.4;
    const osc = audio.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(110, start);
    osc.frequency.linearRampToValueAtTime(85, start + 0.3);
    const lp = audio.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 600;
    const g = audio.createGain();
    g.gain.value = 0;
    osc.connect(lp).connect(g).connect(audio.destination);
    envelope(g.gain, start, 0.3, { attack: 0.04, decay: 0.05, sustain: 0.9, release: 0.1, peak: 0.45 });
    osc.start(start);
    osc.stop(start + 0.35);
  }
}

function slothYawn(audio: AudioContext) {
  const t0 = audio.currentTime;
  const duration = 1.8;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);

  const noise = audio.createBufferSource();
  noise.buffer = noiseBuffer(audio, duration);
  const bp = audio.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 6;
  bp.frequency.setValueAtTime(500, t0);
  bp.frequency.linearRampToValueAtTime(900, t0 + duration * 0.5);
  bp.frequency.linearRampToValueAtTime(400, t0 + duration);
  noise.connect(bp).connect(out);

  const osc = audio.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(180, t0);
  osc.frequency.linearRampToValueAtTime(140, t0 + duration);
  const og = audio.createGain();
  og.gain.value = 0.15;
  osc.connect(og).connect(out);

  envelope(out.gain, t0, duration, { attack: 0.3, decay: 0.2, sustain: 0.9, release: 0.4, peak: 0.4 });
  noise.start(t0);
  osc.start(t0);
  noise.stop(t0 + duration);
  osc.stop(t0 + duration);
}

function jaguarSnarl(audio: AudioContext) {
  roar(audio, 70, 1.2, 1.0);
}

function giraffeHum(audio: AudioContext) {
  const t0 = audio.currentTime;
  const out = audio.createGain();
  out.gain.value = 0;
  out.connect(audio.destination);
  const osc = audio.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(95, t0);
  osc.frequency.linearRampToValueAtTime(110, t0 + 1.0);
  osc.frequency.linearRampToValueAtTime(85, t0 + 1.8);
  osc.connect(out);
  envelope(out.gain, t0, 1.8, { attack: 0.2, decay: 0.2, sustain: 0.9, release: 0.4, peak: 0.45 });
  osc.start(t0);
  osc.stop(t0 + 1.8);
}

function zebraBray(audio: AudioContext) {
  const t0 = audio.currentTime;
  for (let i = 0; i < 2; i++) {
    const start = t0 + i * 0.6;
    const osc = audio.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(280, start);
    osc.frequency.linearRampToValueAtTime(180, start + 0.4);
    const lp = audio.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1200;
    const g = audio.createGain();
    g.gain.value = 0;
    osc.connect(lp).connect(g).connect(audio.destination);
    envelope(g.gain, start, 0.45, { attack: 0.03, decay: 0.1, sustain: 0.9, release: 0.2, peak: 0.4 });
    osc.start(start);
    osc.stop(start + 0.5);
  }
}

function playSynth(id: string): void {
  const audio = getCtx();
  switch (id) {
    case "leao":
      roar(audio, 90, 1.3);
      return;
    case "elefante":
      trumpet(audio, 1.1);
      return;
    case "girafa":
      giraffeHum(audio);
      return;
    case "zebra":
      zebraBray(audio);
      return;
    case "macaco":
      monkey(audio);
      return;
    case "onca":
      jaguarSnarl(audio);
      return;
    case "tucano":
      squawk(audio, 800);
      return;
    case "preguica":
      slothYawn(audio);
      return;
    case "baleia":
      whale(audio);
      return;
    case "golfinho":
      dolphin(audio);
      return;
    case "tubarao":
      shark(audio);
      return;
    case "polvo":
      bubbles(audio);
      return;
    case "vaca":
      moo(audio);
      return;
    case "porco":
      oink(audio);
      return;
    case "cavalo":
      neigh(audio);
      return;
    case "ovelha":
      baa(audio);
      return;
    case "pinguim":
      penguin(audio);
      return;
    case "urso":
      roar(audio, 75, 1.5, 0.9);
      return;
    case "morsa":
      walrusGrunt(audio);
      return;
    case "lobo":
      howl(audio);
      return;
    default:
      bark(audio, 2, 500);
  }
}

// --- Public API ---------------------------------------------------------------

export async function playAnimalSound(id: string): Promise<void> {
  // Resume the audio context on demand (browsers need a user gesture first).
  getCtx();

  const ok = await tryPlayMp3(id);
  if (!ok) {
    playSynth(id);
  }
}

// Pre-arm the audio context. Call from a click/tap so the first real play has
// no latency. Safe to call repeatedly.
export function unlockAudio(): void {
  getCtx();
}
