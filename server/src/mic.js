const mic = require('mic');

const micConfig = {
  rate: 44100,
  channels: 2,
  debug: false,
  exitOnSilence: 6,
  device: 'hw:0',
};

const micInstance = mic(micConfig);
const micInputStream = micInstance.getAudioStream();
micInputStream.on('error', err => {
  console.log('data ->', err);
  micInstance.stop();
});
// micInputStream.on('data', data => {
//   console.log('data ->', data);
// });
micInstance.start();

module.exports = { micInputStream };

