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

const drawBar = function(dataArray, canvasCtx, width, height, styles) {
  canvasCtx.fillRect(0, 0, width, height);
  canvasCtx.beginPath();
  const bufferLength = dataArray.length;
  const barWidth = (width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for(let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    canvasCtx.fillStyle = styles.strokeStyle;
    canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }

  canvasCtx.fillStyle = styles.fillStyle;
};

export { drawBar, getByteFrequencyData };
