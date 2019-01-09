let oscillator = null;
const getOscillator = () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  return oscillator;
};


const notify = (meanOfBreathR, config) => {
  // todo: uncomment after testing
  // if(meanOfBreathR > config.minRateDif) {
  //   if(!oscillator) {
  //     oscillator = getOscillator();
  //     oscillator.start();
  //   }
  // } else {
  //   oscillator && oscillator.stop();
  //   oscillator = null;
  // }
};

export { notify };
