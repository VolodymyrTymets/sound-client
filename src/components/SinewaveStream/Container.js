import * as R from 'ramda';
import { inject, observer } from "mobx-react";
import {renderNothing, compose, lifecycle, withProps, branch, mapProps, withState, withHandlers } from 'recompose';
import { SinewaveComponent } from './Component';
import { drawWave, getByteTimeDomainData } from "./utils";

const n = 2;
const time = 15; //seconds
export const Sinewave = observer(compose(
  inject('store'),
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps(({ color, store: { spectrumInfo, config }}) => ({
    styles: {
      fillStyle: 'white', //fillStyle, // background
      strokeStyle: color, //'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
    fftSize: 32768,
    rate: config.mic.rate,
    channels: config.mic.channels,
    sinewaveScale: config.sinewaveScale,
    chunkCount: time * n,
  })),
  withState('imgUrl', 'setImgUrl'),
  withState('isLoading', 'setIsLoading', true),
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
  lifecycle({
    async componentDidMount() {
      const { navigatorMicStream, fftSize, rate, channels, sinewaveScale, setImgUrl, changeUrls, setIsLoading } = this.props;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();

      const canvas = document.querySelector('.sinewave');
      const { width, height  } = canvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      let interval = null;
      navigatorMicStream.on('data', async buffer => {
        setIsLoading(false);
        const wave = await getByteTimeDomainData(audioCtx, analyser, buffer, fftSize, rate, channels, sinewaveScale);
        drawWave(wave, canvasCtx, width, height, this.props.styles);
        interval = interval || setInterval(() => {
            const url = canvas.toDataURL();
            changeUrls(url);
          },
          (fftSize / rate)  * 1000)
      })
    },
  }),
  mapProps(R.applySpec({
    sineWaveHeight: R.path(['store', 'windowInfo', 'sineWaveHeight']),
    sineWaveWidth: R.path(['store', 'windowInfo', 'sineWaveWidth']),
    wavesCount: R.path(['wavesCount']),
    imgUrl: R.path(['imgUrl']),
    imgUrls: R.path(['imgUrls']),
    chunkCount: R.path(['chunkCount']),
    isLoading: R.path(['isLoading']),
  })),
)(SinewaveComponent));

