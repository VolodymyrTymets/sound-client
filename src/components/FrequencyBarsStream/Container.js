import * as R from "ramda";
import { branch, compose, lifecycle, renderNothing, withProps, mapProps } from 'recompose';
import { FrequencyBarsComponent } from './Component';
import { drawBar, getByteFrequencyData } from "./utils";
import { inject, observer } from 'mobx-react';

export const FrequencyBars = compose(
  observer,
  inject('store'),
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps(({ color, store: { spectrumInfo, config }}) => ({
    styles: {
      fillStyle: 'white',
      strokeStyle: color, // line color
      lineWidth: 1,
      // meanLine: {
      //   strokeStyle: '#ff0000', // line color
      //   lineWidth: 1,
      // },
      // liveLine: {
      //   strokeStyle: '#28a745', // line color
      //   lineWidth: 1,
      // }
    },
    fftSize: 256,
    rate: config.mic.rate,
    channels: config.mic.channels,
    minRateDif: config.minRateDif,
  })),
  lifecycle({
    componentDidMount() {
      const { navigatorMicStream, fftSize, channels, rate, store, minRateDif } = this.props;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();

      const canvas = document.querySelector('.frequency-bars');
      const { width, height  } = canvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      navigatorMicStream.on('data', async buffer => {
        const data = await getByteFrequencyData(audioCtx, analyser, buffer, fftSize, rate, channels);
        drawBar(data, store.spectrumInfo, minRateDif, canvasCtx, width, height, this.props.styles);
        store.spectrumInfo.setMean(data);
      });
      navigatorMicStream.on('error', alert);
    },
  }),
  mapProps(R.applySpec({
    frequencyHeight: R.path(['store', 'windowInfo', 'frequencyHeight']),
    frequencyWidth: R.path(['store', 'windowInfo', 'frequencyWidth']),
  }))
)(FrequencyBarsComponent);
