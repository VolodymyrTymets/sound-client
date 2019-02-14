const mic = require('mic');
const path = require('path');
const fs = require('fs');

const config = {
  mic: {
    rate: process.env.MIC_RATE || 44100,
    channels: parseInt(process.env.MIC_CHANNELS || 2, 10),
    debug: false,
    exitOnSilence: 6,
    device: process.env.MIC_NAME || 'hw:1'
  },
  fileName: `${process.argv[2]}.raw`
};
const filePath =  path.resolve('./private/records', config.fileName);

console.log('file path ->', filePath);

const micInstance = mic(config.mic);

const micInputStream = micInstance.getAudioStream();

const outputFileStream = fs.WriteStream(filePath);

micInputStream.pipe(outputFileStream);

micInputStream.on('error', (err) => {
  cosole.log('--->Error in Input Stream: ');
  cosole.log(err);
});

process.on('exit', () => {
  micInstance.stop();
});
process.on('SIGINT', async () => process.exit());

micInstance.start();