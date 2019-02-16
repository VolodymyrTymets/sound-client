const { mean, max, values, range } = require('lodash');
const WavDecoder = require('wav-decoder');
const { fft, spliceSpectrum } = require('../fft/fft');
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


const folderPathM =  path.resolve('./private/parse/m');
const folderPathN =  path.resolve('./private/parse/n');

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
      spectrums.push(spliceSpectrum(spectrum, 40));
    }

    const meanSpectrum = spectrums[0].map(
      (v,i) => mean(spectrums.map(s => s[i])));
    const meanMaxValue = mean(spectrums.map(max));
    return { spectrum: meanSpectrum, meanMaxValue };
  } catch (e) {
    console.log(e)
  }
};

const run = async () => {
  try {
    let meansM = [];
    let meanM = 0;
    const breathToreports = [];
    const nerveToreports = [];

    // read all from m folder
    const filesM = fs.readdirSync(folderPathM);
    for(let i=0; i < filesM.length; i++) {
      const filePath = path.resolve(folderPathM, filesM[i]);
      if(filePath.split('.')[1] !== 'wav') continue;
      console.log('M --->', filePath);
      const { spectrum, meanMaxValue } = await findSpectrum(filePath);
      breathToreports.push([meanMaxValue, ...spectrum]);
      meansM.push(meanMaxValue);
    }
    meanM = mean(meansM);

    // read all from n folder
    const filesN = fs.readdirSync(folderPathN);
    for(let i=0; i < filesN.length; i++) {
      const filePath = path.resolve(folderPathN, filesN[i]);
      if(filePath.split('.')[1] !== 'wav') continue;
      const { spectrum, meanMaxValue } = await findSpectrum(filePath);
      const ratingS = tI(100 - (meanM * 100) / meanMaxValue) || 0;
      nerveToreports.push([meanMaxValue, ...spectrum]);

      console.log(`--> N ${filesN[i]} -> M:${meanM} N:${meanMaxValue} [${ratingS}]`)
    }

    const toReportStr = report => report.map(s => s.join(',')).join('\n');
    fs.writeFileSync(path.resolve(folderPathM, 'report.csv'), toReportStr(breathToreports), 'utf8');
    fs.writeFileSync(path.resolve(folderPathN, 'report.csv'), toReportStr(nerveToreports), 'utf8');
  } catch (e) {
    console.log(e)
  }
};

run();
