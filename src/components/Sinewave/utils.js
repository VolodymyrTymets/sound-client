const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();

const drawWave =(canvas, stream, styles) => {

  const { width, height  } = canvas;
  const canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  analyser.fftSize = 2048;
  const bufferLength = analyser.fftSize;
  console.log(bufferLength);
  let dataArray = new Uint8Array(bufferLength);
  source.connect(analyser);


  const draw = function() {
    // todo: comment here if stream
    analyser.getByteTimeDomainData(dataArray);
    requestAnimationFrame(draw);
    canvasCtx.fillStyle = styles.fillStyle;
    canvasCtx.fillRect(0, 0, width, height);
    canvasCtx.lineWidth = styles.lineWidth;
    canvasCtx.strokeStyle = styles.strokeStyle;
    canvasCtx.beginPath();

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

  draw();
  // todo: if stream
  // setInterval(function () {
  //   analyser.getByteTimeDomainData(dataArray);
  // }, 37)
}


export { drawWave };