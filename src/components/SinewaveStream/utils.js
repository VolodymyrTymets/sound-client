import { withWaveHeader } from './wave-heared'
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();

const drawWave =(canvas, stream, styles) => {

  const { width, height  } = canvas;
  const canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  // const source = audioCtx.createMediaStreamSource(stream);
  // source.connect(analyser);
  // // todo: add it into config
  // analyser.fftSize = 32768;
  // const bufferLength = analyser.fftSize;
  // let dataArray = new Uint8Array(bufferLength);
  // source.connect(analyser);


  const draw = function(dataArray, bufferLength) {
    //console.log(dataArray[1024])
    analyser.getByteTimeDomainData(dataArray);
    //console.log(dataArray[1024])
    // requestAnimationFrame(draw);
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
  let letensy = 0
  analyser.fftSize = 32768;
  stream.on('data', buffer => {
    audioCtx.decodeAudioData(
      withWaveHeader(buffer, 2, 44100), (aydioBuffer) => {
        const source = audioCtx.createBufferSource();
        source.buffer = aydioBuffer;
        source.connect(analyser);
        const bufferLength = analyser.fftSize;
        let dataArray = new Uint8Array(bufferLength);
        draw(dataArray, bufferLength)

        source.start();
      })
  })
}


export { drawWave };
