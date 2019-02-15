const { mean, max, values } = require('lodash');
const WavDecoder = require('wav-decoder');
const { fft } = require('../fft/fft');
const path = require('path');
const fs = require('fs');

const CHANK_LENGTH = 4096;

const decode = filePath => {
  const readFile = filepath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filepath, (err, buffer) => {
        if (err) {
          return reject(err);
        }
        return resolve(buffer);
      });
    });
  };

  return readFile(filePath).then((buffer) => {
    return WavDecoder.decode(buffer);
  });
};


const filePath1 =  path.resolve('./private/parse/m', `${process.argv[2]}.wav`);
const filePath2 =  path.resolve('./private/parse/n', `${process.argv[3]}.wav`);
const tI = (n) => parseInt(n, 10);

const findSpectrum = async (filePath) => {
  try {
    const spectrums = [];
    const audioData = await decode(filePath);
    const wave = values(audioData.channelData[0]);

    for(let i=0; i < wave.length; i = i + CHANK_LENGTH) {
      const chank = wave.slice(i, i + CHANK_LENGTH);
      if (chank.length < CHANK_LENGTH) continue;
      const { spectrum } = fft(chank);
      spectrums.push(spectrum);
    }
    const maxes = spectrums.map(s => max(s));
    return mean(maxes);
  } catch (e) {
    console.log(e)
  }
};

const run = async () => {
  try {
    const meanM = await findSpectrum(filePath1);
    const meanN = await findSpectrum(filePath2);
    const ratingS = tI(100 - (meanM * 100) / meanN) || 0;
    console.log(`---> M:${meanM} N:${meanN} [${ratingS}]`)
  } catch (e) {
    console.log(e)
  }
};

run();
