import { types } from "mobx-state-tree";
import { getWindowSize } from '../utils/getWindowSize';

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
      const windowSize = getWindowSize();

      self.sineWaveHeight = (windowSize.height * 0.5);
      self.frequencyHeight = (windowSize.height * 0.4);
      self.sineWaveWidth = windowSize.width;
      self.frequencyWidth = windowSize.width < XS_SIZE ? windowSize.width : windowSize.width / 2;
      self.isFrequencyFullScreen = windowSize.width < XS_SIZE ? true : false;
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
