import * as R from 'ramda';
import { inject } from "mobx-react";
import {renderNothing, compose, lifecycle, withProps, branch, mapProps} from 'recompose';
import { SinewaveComponent } from './Component';
import { drawWave, getByteTimeDomainData } from "./utils";


const waves = [];
const pushHead = (arr, schank) => {
  arr.shift();
  arr.push(schank);
};
export const Sinewave = compose(
  inject('store'),
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps({
    styles: {
      fillStyle: 'rgb(255, 255, 255)', // background
      strokeStyle: 'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
    fftSize: 32768,
    wavesCount: 4,
  }),
  lifecycle({
    componentWillMount() {
      const { fftSize, wavesCount } = this.props;
      for(let i = 0; i < wavesCount; i++) {
       waves.push(new Uint8Array(fftSize));
      }
    },
    async componentDidMount() {
      const { styles, navigatorMicStream, fftSize, store } = this.props;

      //canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      navigatorMicStream.on('data', async buffer => {
        const data = await getByteTimeDomainData(buffer, fftSize);
        // drawWave(data, canvasCtx, width, height, styles);
        pushHead(waves, data);
        // todo: test if it help
        waves.forEach((wave, index) => {
          const canvas = document.querySelector(`.sinewave-${index}`);
          const { width, height  } = canvas;
          const canvasCtx = canvas.getContext("2d");

          drawWave(wave, canvasCtx, width, height, styles);
        })
      })
    }
  }),
  mapProps(R.applySpec({
    sineWaveHeight: R.path(['store', 'windowInfo', 'sineWaveHeight']),
    wavesCount: R.path(['wavesCount']),
  })),
)(SinewaveComponent);

