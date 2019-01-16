import { withWaveHeader } from "../SinewaveStream/wave-heared";

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
  const moveTo = height - spectrumInfo.meanOfBreath;
  const withRating = moveTo - (moveTo * ( minRateDif / 100));

  const moveToLive = height - spectrumInfo.mean;
  const withRatingLive = moveToLive - (moveToLive * ( minRateDif / 100));

  canvasCtx.moveTo(0 , withRating);
  canvasCtx.lineTo(width, withRating);
  canvasCtx.strokeStyle = styles.meanLine.strokeStyle;
  canvasCtx.lineWidth = styles.meanLine.lineWidth;
  canvasCtx.stroke();

  canvasCtx.moveTo(0, withRatingLive);
  canvasCtx.lineTo(width, withRatingLive);
  canvasCtx.strokeStyle = styles.liveLine.strokeStyle;
  canvasCtx.lineWidth = styles.liveLine.lineWidth;
  canvasCtx.stroke();
};

const drawBar = function(dataArray, spectrumInfo, minRateDif, canvasCtx, width, height, styles) {
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

  canvasCtx.fillStyle = styles.fillStyle;
};

export { drawBar, getByteFrequencyData, drawLines };
