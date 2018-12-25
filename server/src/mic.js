const mic = require('mic');
const { config } = require('./config');

const micInstance = mic(config.mic);
const micInputStream = micInstance.getAudioStream();
micInputStream.on('error', err => {
  console.log('data ->', err);
  micInstance.stop();
});
micInstance.start();

module.exports = { micInputStream };

