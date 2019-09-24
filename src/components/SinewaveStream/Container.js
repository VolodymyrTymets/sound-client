import * as R from 'ramda';
import { inject, observer } from "mobx-react";
import { compose, lifecycle, withProps, mapProps, withState, withHandlers, withPropsOnChange } from 'recompose';
import { SinewaveComponent } from './Component';
import { drawWave } from "./utils";

const n = 2;
const time = 5; //seconds
let chunkCount = 0;
const chunkCountsPerSecond = 5;

export const Sinewave = observer(compose(
  inject('store'),
  withProps(({ color, store: { config }}) => ({
    styles: {
      fillStyle: '#d6d8d9', //fillStyle, // background
      strokeStyle: color, //'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
    fftSize: 32768,
    rate: config.mic.rate,
    channels: config.mic.channels,
    sinewaveScale: config.sinewaveScale,
    chunkCount: time * n,
  })),
  withState('imgUrls', 'setImgUrls', []),
  withHandlers({
    changeUrls: ({ setImgUrls, imgUrls, chunkCount}) => (url) => {
      if(chunkCount === imgUrls.length) {
        imgUrls.pop();
      }
      const urls = [url, ...imgUrls];
      setImgUrls(urls)
    }
  }),
  withPropsOnChange(['wave'], ({ wave, styles, changeUrls }) => {
    const canvas = document.querySelector('.sinewave');
    if(!canvas) return;
    const { width, height } = canvas;
    const canvasCtx = canvas.getContext("2d");
    drawWave(wave, canvasCtx, width, height, styles);

    // draw wave in time
    chunkCount ++;
    if(chunkCount > chunkCountsPerSecond) {
      const url = canvas.toDataURL();
      changeUrls(url);
      chunkCount = 0
    }

  }),
  mapProps(R.applySpec({
    sineWaveHeight: R.path(['store', 'windowInfo', 'sineWaveHeight']),
    sineWaveWidth: R.path(['store', 'windowInfo', 'sineWaveWidth']),
    wavesCount: R.path(['wavesCount']),
    imgUrls: R.path(['imgUrls']),
    chunkCount: R.path(['chunkCount']),
  })),
)(SinewaveComponent));

