import * as R from "ramda";
import { types } from "mobx-state-tree";

let oscillator = null;
const getOscillator = () => {
  // todo: move to some fn
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  return oscillator;
};


const SpectrumInfo = types
  .model("SpectrumInfo", {
    mean: types.number,
    max: types.number,
  })
  .actions(self => ({
    setMean(spectrum) {
      self.mean = parseInt(R.mean(spectrum), 10);
      // todo: replace to config value
      if(self.mean > 50) {
        if(!oscillator) {
          oscillator = getOscillator();
          oscillator.start();
        }
      } else {
        oscillator && oscillator.stop();
        oscillator = null;
      }
    },
    setMax(spectrum) {
      self.max = R.reduce(R.max, 0, spectrum)
    }
  }));

const spectrumInfo = SpectrumInfo.create({
  mean: 0,
  max: 0
});

export { spectrumInfo };
