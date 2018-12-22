import * as R from "ramda";
import { types } from "mobx-state-tree";

const SpectrumInfo = types
  .model("SpectrumInfo", {
    mean: types.number,
    max: types.number,
  })
  .actions(self => ({
    setMean(spectrum) {
      self.mean = parseInt(R.mean(spectrum), 10)
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