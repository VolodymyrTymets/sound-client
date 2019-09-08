import { types } from "mobx-state-tree";
const XS_SIZE = 568;
const WindowInfo = types
  .model("WindowInfo", {
    sineWaveHeight: types.number,
    frequencyHeight: types.number,
    sineWaveWidth: types.number,
    frequencyWidth: types.number,
    isInteracted: types.boolean,
    isFrequencyFullScreen: types.boolean,
  })
  .actions(self => ({
    init() {
      const windowHeight = window.innerHeight;
      self.sineWaveHeight = (windowHeight * 0.4) || 250;
      self.frequencyHeight = (windowHeight * 0.7) || 250;
      self.sineWaveWidth = window.innerWidth;
      self.frequencyWidth = window.innerWidth < XS_SIZE ? window.innerWidth : window.innerWidth / 2;
      self.isFrequencyFullScreen = window.innerWidth < XS_SIZE ? true : false;
    },
    interactWithWindow () {
      self.isInteracted = true;
    }
  }));

const windowInfo = WindowInfo.create({
  sineWaveHeight: 0,
  frequencyHeight: 0,
  sineWaveWidth: 0,
  frequencyWidth: 0,
  isInteracted: false,
  isFrequencyFullScreen: true,
});

export { windowInfo };
