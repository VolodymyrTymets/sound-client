import * as R from "ramda";
import { types } from "mobx-state-tree";
import { MeanSpectrumOfBreath } from "../utils/MeanSpectrumOfBreath";
import { staticConfig } from './config'
const meanSpectrumOfBreath = new MeanSpectrumOfBreath(staticConfig);

const MAX_SPECTRUM_OF_MIC = 100;
const SpectrumInfo = types
  .model("SpectrumInfo", {
    mean: types.number,
    max: types.number,
    meanOfBreath: types.number,
    meanOfBreathR: types.number,
    timeLeft: types.number,
    color: types.string,
  })
  .actions(self => ({
    setMean(spectrum) {
      self.mean = parseInt(R.mean(spectrum), 10);
      self.max = R.reduce(R.max, 0, spectrum);
      meanSpectrumOfBreath.listen(self.mean, self.max);
      self.meanOfBreath = meanSpectrumOfBreath.getMean();
      self.timeLeft = meanSpectrumOfBreath.getTimeLeft();

      if(self.meanOfBreath) {
        /** taking into account that max spectrum of mic can't be > 100, need to calculate how much spectrum of breath
         *  of stimulation bigger than spectrum of normal breath, from range that left.*/
        const left = MAX_SPECTRUM_OF_MIC - self.mean;
        const leftMean = MAX_SPECTRUM_OF_MIC - self.meanOfBreath;
        const newRating = parseInt(100 - (left * 100) / leftMean, 10) || 0;
        if(leftMean > left) {
          self.meanOfBreathR = newRating;
          self.meanOfBreathR = self.meanOfBreathR > 0 ? self.meanOfBreathR : 0;
        }

      }
      self.color = meanSpectrumOfBreath.getColor(self.meanOfBreathR);
      if(self.meanOfBreathR) {
        meanSpectrumOfBreath.soundNotify(self.meanOfBreathR);
      }
    },
    changeConfig(config) {
      meanSpectrumOfBreath.changeConfig(config)
    }
  }));

const spectrumInfo = SpectrumInfo.create({
  mean: 0,
  max: 0,
  meanOfBreath: 0,
  meanOfBreathR: 0,
  timeLeft: -1,
  color: 'black',
});

export { spectrumInfo };
