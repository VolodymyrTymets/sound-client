import { types } from "mobx-state-tree";

const WindowInfo = types
  .model("WindowInfo", {
    sineWaveHeight: types.number,
    frequencyHeight: types.number,
    sineWaveWidth: types.number,
    frequencyWidth: types.number,
    isInteracted: types.boolean,
  })
  .actions(self => ({
    init() {
      const windowHeight = window.innerHeight;
      self.sineWaveHeight = (windowHeight * 0.35);
      self.frequencyHeight = (windowHeight * 0.35);
      self.sineWaveWidth = window.innerWidth;
      self.frequencyWidth = window.innerWidth;
    },
    interactWithWindow () {
      self.isInteracted = true;
      console.log(  self.isInteracted)
    }
  }));

const windowInfo = WindowInfo.create({
  sineWaveHeight: 0,
  frequencyHeight: 0,
  sineWaveWidth: 0,
  frequencyWidth: 0,
  isInteracted: false,
});

export { windowInfo };
