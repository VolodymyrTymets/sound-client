import { withWaveHeader } from "../SinewaveStream/wave-heared";
import * as R from "ramda";

const getByteFrequencyData = (audioCtx, analyser, buffer, fftSize = 2048, rate, channels) => new Promise(resolve =>{
  analyser.fftSize = fftSize;
  audioCtx.decodeAudioData(
    withWaveHeader(buffer, channels, rate), (audioBuffer) => {
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyser);
      const bufferLength = analyser.fftSize;
      let dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      source.start();
      resolve(dataArray);
    })
});

const drawLines = (spectrumInfo, minRateDif, canvasCtx, width, height, styles) => {
  canvasCtx.beginPath();
  const maxOfBreath = spectrumInfo.maxOfBreath / 2;
  canvasCtx.moveTo(0, maxOfBreath + (maxOfBreath * (minRateDif / 100)));
  canvasCtx.lineTo(width, maxOfBreath + (maxOfBreath * (minRateDif / 100)));
  canvasCtx.moveTo(0, height - spectrumInfo.max / 2);
  canvasCtx.lineTo(width, height - spectrumInfo.max / 2);
  canvasCtx.stroke();
};

const drawBar = function(dataArray, spectrumInfo, minRateDif, canvasCtx, width, height, styles) {
  canvasCtx.fillStyle = styles.fillStyle;
  canvasCtx.fillRect(0, 0, width, height);
  canvasCtx.beginPath();
  const bufferLength = dataArray.length;
  const barWidth = (width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for(let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    canvasCtx.fillStyle = styles.strokeStyle;
    canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

    x += barWidth + 1;
  }
  if (spectrumInfo.meanOfBreath) {
    drawLines(spectrumInfo, minRateDif, canvasCtx, width, height, styles)
  }
};

export { drawBar, getByteFrequencyData, drawLines };
