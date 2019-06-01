let oscillator = null;
const getOscillator = () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  return oscillator;
};

const soundStart = () => {
  if(!oscillator) {
    oscillator = getOscillator();
    oscillator.start();
  }
};

const soundStop = () => {
  oscillator && oscillator.stop();
  oscillator = null;
};

export { soundStart, soundStop };
