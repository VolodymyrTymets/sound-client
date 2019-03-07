import * as R from "ramda";
import { types } from "mobx-state-tree";
import { notify } from "../utils/notify";
import { MeanSpectrumOfBreath } from "../utils/MeanSpectrumOfBreath";
import { staticConfig } from './config'
const meanSpectrumOfBreath = new MeanSpectrumOfBreath(staticConfig);

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
        self.meanOfBreathR = parseInt(100 - (self.meanOfBreath * 100) / self.mean, 10) || 0;
        self.meanOfBreathR = self.meanOfBreathR > 0 ? self.meanOfBreathR : 0;
      }
      self.color = meanSpectrumOfBreath.getColor(self.meanOfBreathR);
      self.meanOfBreathR && notify(self.meanOfBreathR, staticConfig);
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
