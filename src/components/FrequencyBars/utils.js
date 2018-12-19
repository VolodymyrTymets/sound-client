const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();

const drawBar =(canvas, stream, styles) => {

  const { width, height  } = canvas;
  const canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  source.connect(analyser);


  const draw = function() {
    // todo: comment here if stream
    analyser.getByteFrequencyData(dataArray);
    requestAnimationFrame(draw);
    canvasCtx.fillStyle = styles.fillStyle;
    canvasCtx.fillRect(0, 0, width, height);
    canvasCtx.beginPath();

    const barWidth = (width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      canvasCtx.fillStyle = styles.strokeStyle;
      canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }
  };

  draw();
  // todo: if stream
  // setInterval(function () {
  //   analyser.getByteTimeDomainData(dataArray);
  // }, 37)
}


export { drawBar };