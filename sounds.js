(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }
  function tone(type, startFrequency, endFrequency, duration, volume) {
    const context = getAudio();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(startFrequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), now + duration);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }
  window.SOUNDS = {
    flap() { try { tone('sawtooth', 680, 360, 0.13, 0.12); } catch (error) {} },
    score() { try { tone('sine', 620, 980, 0.2, 0.14); } catch (error) {} },
    crash() { try { tone('triangle', 240, 70, 0.36, 0.18); } catch (error) {} }
  };
})();
