import { withWaveHeader } from './wave-heared'
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();

const getByteTimeDomainData = (buffer, fftSize = 32768, rate, channels) => new Promise(resolve =>{
  analyser.fftSize = fftSize;
  audioCtx.decodeAudioData(
    // todo: move to settings
    withWaveHeader(buffer, channels, rate), (audioBuffer) => {
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyser);
      const bufferLength = analyser.fftSize;
      let dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);
      source.start();
      resolve(dataArray);
    })
});


const drawWave = function(dataArray, canvasCtx, width, height, styles) {
  canvasCtx.fillStyle = styles.fillStyle;
  canvasCtx.fillRect(0, 0, width, height);
  canvasCtx.lineWidth = styles.lineWidth;
  canvasCtx.strokeStyle = styles.strokeStyle;
  canvasCtx.beginPath();
  const bufferLength = dataArray.length;

  const sliceWidth = width * 1.0 / bufferLength;
  let x = 0;

  for(let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0; // byte / 2 || 255 / 2
    const y = v * height / 2;

    if(i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }
    x += sliceWidth;
  }

  canvasCtx.lineTo(width, height / 2);
  canvasCtx.stroke();
};


export { getByteTimeDomainData, drawWave };
