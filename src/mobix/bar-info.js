import * as R from "ramda";
import { types } from "mobx-state-tree";

const BarInfo = types
  .model("Todo", {
    mean: types.number,
  })
  .actions(self => ({
    setMean(spectrum) {
      const mean = R.mean(spectrum);
      self.mean = mean
    }
  }));

const barInfo = BarInfo.create({
  mean: 0,
});

export { barInfo };