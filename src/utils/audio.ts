/**
 * Web Audio API ambient audio synthesizer
 * Emulates "Late Night Lounge Jazz" warm Rhodes chords & subtle ambient coffee lounge atmosphere
 */

class AmbianceSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentVolume: number = 0.65;
  private vinylNode: AudioBufferSourceNode | null = null;
  private vinylGain: GainNode | null = null;

  private jazzChords: number[][] = [
    // Ebmaj9: Eb3 (155.56), G3 (196.00), Bb3 (233.08), D4 (293.66), F4 (349.23)
    [155.56, 196.00, 233.08, 293.66, 349.23],
    // Cm9: C3 (130.81), Eb3 (155.56), G3 (196.00), Bb3 (233.08), D4 (293.66)
    [130.81, 155.56, 196.00, 233.08, 293.66],
    // Fm9: F3 (174.61), Ab3 (207.65), C4 (261.63), Eb4 (311.13), G4 (392.00)
    [174.61, 207.65, 261.63, 311.13, 392.00],
    // Bb13sus: Bb2 (116.54), Ab3 (207.65), C4 (261.63), D4 (293.66), G4 (392.00)
    [116.54, 207.65, 261.63, 293.66, 392.00]
  ];

  private currentChordIdx = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  private createVinylNoise() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    
    // Pink noise + subtle pops
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Gentle filter
      lastOut = lastOut * 0.95 + white * 0.05;
      // occasional tiny pop
      const pop = Math.random() > 0.9995 ? (Math.random() - 0.5) * 0.4 : 0;
      data[i] = lastOut * 0.025 + pop;
    }

    this.vinylNode = this.ctx.createBufferSource();
    this.vinylNode.buffer = buffer;
    this.vinylNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    this.vinylGain = this.ctx.createGain();
    this.vinylGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    this.vinylNode.connect(filter);
    filter.connect(this.vinylGain);
    this.vinylGain.connect(this.masterGain);
    this.vinylNode.start();
  }

  private playWarmChord(freqs: number[]) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const duration = 5.2;

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle warm detune
      osc.detune.setValueAtTime((Math.random() - 0.5) * 6, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + idx * 80, now);
      filter.Q.setValueAtTime(1.5, now);

      // Smooth attack and long decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06 / (idx + 1), now + 0.8 + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.5);
    });
  }

  public start() {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isRunning) return;
    this.isRunning = true;

    this.createVinylNoise();

    const loop = () => {
      if (!this.isRunning) return;
      const chord = this.jazzChords[this.currentChordIdx];
      this.playWarmChord(chord);
      this.currentChordIdx = (this.currentChordIdx + 1) % this.jazzChords.length;

      this.timerId = window.setTimeout(loop, 4600);
    };

    loop();
  }

  public stop() {
    this.isRunning = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.vinylNode) {
      try {
        this.vinylNode.stop();
        this.vinylNode.disconnect();
      } catch {
        // ignore
      }
      this.vinylNode = null;
    }
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public getState(): boolean {
    return this.isRunning;
  }
}

export const ambianceAudio = new AmbianceSoundEngine();
