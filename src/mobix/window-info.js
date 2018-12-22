import * as R from "ramda";
import { types } from "mobx-state-tree";

const WindowInfo = types
  .model("WindowInfo", {
    sineWaveHeight: types.number,
    frequencyHeight: types.number,
  })
  .actions(self => ({
    init(spectrum) {
      const windowHeight = window.innerHeight;
      self.sineWaveHeight = (windowHeight * 0.7) / 2;
      self.frequencyHeight = (windowHeight * 0.7) / 2;
    },
  }));

const windowInfo = WindowInfo.create({
  sineWaveHeight: 0,
  frequencyHeight: 0
});

export { windowInfo };