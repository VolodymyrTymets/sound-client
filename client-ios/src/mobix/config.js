import { types } from "mobx-state-tree";

const staticConfig = {
  timeToListen: 2, // seconds
  minRateDif: 20, // %
  maxRateDif: 50, // %
  sinewaveScale: 1.9,
  minBreathTime: 100 // miliseconds
};

const Config = types
  .model("SpectrumInfo", {
    mic:  types.frozen({
      rate: types.number,
      channels: types.number,
      device: types.string,
    }),
    url: types.string,
    timeToListen: types.number,
    minRateDif: types.number,
    maxRateDif: types.number,
    sinewaveScale: types.number,
    minBreathTime: types.number,
  })
  .actions(self => ({
    setMic(rate, channels, device) {
      self.mic = { rate, channels, device };
    },
    setUrl(url) {
      self.url = url;
    },
    setRate(min = staticConfig.minRateDif, max = staticConfig.maxRateDif) {
      self.minRateDif = min;
      self.maxRateDif = max;
    },
    setMaxRateDif(maxRateDif = staticConfig.maxRateDif) {
      self.maxRateDif = maxRateDif;
    },
    setMinBreathTime(minBreathTime = staticConfig.minBreathTime) {
      self.minBreathTime = minBreathTime;
    },
   }));

const config = Config.create({
  mic: {
    rate: 0,
    channels: 0,
    device: 1,
  },
  url:'',
  ...staticConfig,
});

export { config, staticConfig };
