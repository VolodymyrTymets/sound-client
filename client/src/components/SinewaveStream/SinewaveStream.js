import React, { useState, useEffect, useRef } from 'react';
import { range } from 'ramda';
import { drawWave } from "./utils";
import './style.css';
import { meanSpectrumOfBreath } from "../../utils/MeanSpectrumOfBreath";

const time = 10; //seconds
let chunkCount = 0;
const chunkCountsPerSecond = 5;

const Sinewave = ({ wave, spectrumInfo, windowInfo }) => {
  const { sineWaveHeight, sineWaveWidth } = windowInfo;
  const canvas = useRef(null);
  const [imgUrls, setImgUrls] = useState([]);
  const [color, setColor] = useState(meanSpectrumOfBreath.getColor(spectrumInfo.meanOfBreathR));
  useEffect(() => {
    if(!canvas.current) return;
    const { width, height } = canvas.current;
    const canvasCtx = canvas.current.getContext("2d");

    drawWave(wave, canvasCtx, width, height, {
      fillStyle: '#d6d8d9', //fillStyle, // background
      strokeStyle: color, //'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    });

    // draw wave in time
    chunkCount ++;
    if(chunkCount > chunkCountsPerSecond) {
      const url = canvas.current.toDataURL();
      // changeUrls;
      if(time === imgUrls.length) {
        imgUrls.pop();
      }
      const urls = [url, ...imgUrls];
      setImgUrls(urls);

      chunkCount = 0
    }
    if(chunkCount > (chunkCountsPerSecond -1 )) {
      const newColor = meanSpectrumOfBreath.getColor(spectrumInfo.meanOfBreathR);
      setColor(newColor);
    }
  },[wave]);

  return (
    <div className="d-flex flex-row sinewave-container">
      {range(1, time + 1).map((index) =>
        imgUrls[time - index] && <img
          src={imgUrls[time - index]}
          key={`image-${index}`}
          width={(sineWaveWidth ) / (time + 1)}
          height={sineWaveHeight}
        />)
      }
      <canvas
        ref={canvas}
        width={sineWaveWidth / (time + 1)}
        height={sineWaveHeight}
      />
    </div>
  )
};

export default Sinewave

