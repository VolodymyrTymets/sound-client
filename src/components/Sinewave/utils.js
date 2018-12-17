
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();


const drawWave =(canvas, stream) => {

  const { width, height  } = canvas;
  const canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);


  const draw = function(dataArray, bufferLength) {

   canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    canvasCtx.fillRect(0, 0, width, height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();
    var sliceWidth = width * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * height/2;

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


  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  analyser.fftSize = 2048;
  const bufferLength = analyser.fftSize;
  console.log(bufferLength);
  let dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);

  setInterval(function () {
    analyser.getByteTimeDomainData(dataArray);
    draw(dataArray, bufferLength);
  }, 50)
}


export { drawWave };