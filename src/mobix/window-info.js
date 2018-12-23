import * as R from "ramda";
import { types } from "mobx-state-tree";

const WindowInfo = types
  .model("WindowInfo", {
    sineWaveHeight: types.number,
    frequencyHeight: types.number,
    sineWaveWidth: types.number,
    frequencyWidth: types.number,
  })
  .actions(self => ({
    init() {
      const windowHeight = window.innerHeight;
      self.sineWaveHeight = (windowHeight * 0.7) / 2;
      self.frequencyHeight = (windowHeight * 0.7) / 2;
      self.sineWaveWidth = window.innerWidth - 30;
      self.frequencyWidth = window.innerWidth - 30;
    },
  }));

const windowInfo = WindowInfo.create({
  sineWaveHeight: 0,
  frequencyHeight: 0,
  sineWaveWidth: 0,
  frequencyWidth: 0,
});

export { windowInfo };
