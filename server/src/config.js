const config = {
  mic: {
    rate: process.env.MIC_RATE || 44100,
    channels: parseInt(process.env.MIC_CHANNELS || 2, 10),
    debug: false,
    exitOnSilence: 6,
    device: `${process.env.MIC_NAME || 'hw'}:${process.env.CARD  || 1}`,
    card: process.env.CARD || 1,
    micDeviceName: process.env.MID_DEVICE || 'Mic'
  },
  gpio: {
    mic: 13,
    nerve: 26,
    muscle: 19,
    switcher: 6,
  },
  spectrumWorker: {
    minRateDif: parseInt(process.env.MIN_RATE || 50), // %
    maxRateDif: parseInt(process.env.MAx_RATE || 90), // %
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
