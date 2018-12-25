const config = {
  mic: {
    rate: process.env.MIC_RATE || 44100,
    channels: parseInt(process.env.MIC_CHANNELS || 2, 10),
    debug: true,
    exitOnSilence: 6,
    device: process.env.MIC_NAME || 'hw:1'
  },
  port: process.env.PORT || 3001
};

console.log('with config ->', config);
module.exports = { config };
