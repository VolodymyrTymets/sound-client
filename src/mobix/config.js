import { types } from "mobx-state-tree";

const staticConfig = {
  timeToListen: 10, // seconds
  minRateDif: 10, // %
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
    setMinRateDif(minRateDif = staticConfig.minRateDif) {
      self.minRateDif = minRateDif;
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
