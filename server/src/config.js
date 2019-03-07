const config = {
  mic: {
    rate: process.env.MIC_RATE || 44100,
    channels: parseInt(process.env.MIC_CHANNELS || 2, 10),
    debug: false,
    exitOnSilence: 6,
    device: process.env.MIC_NAME || 'hw:1'
  },
  gpio: {
    mic: 13,
    nerve: 26,
    muscle: 19,
    switcher: 6,
  },
  spectrumWorker: {
    minRateDif: parseInt(process.env.RATE || 10), // %
    timeToLearn: 10, // seconds

  },
  notifier: {
    minBreathTime: parseInt(process.env.BT || 100), // milliseconds
  },
  DEBUG_MODE: process.env.DEBUG || true,
  port: process.env.PORT || 3001
};

console.log('with config ->', config);
module.exports = { config };
