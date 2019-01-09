import * as R from "ramda";
import { branch, compose, lifecycle, renderNothing, withProps, mapProps } from 'recompose';
import { FrequencyBarsComponent } from './Component';
import { drawBar, getByteFrequencyData, drawMeanLine } from "./utils";
import { inject, observer } from 'mobx-react';
import { getBackgroundColor } from '../../utils/getBackgroundColor';

export const FrequencyBars = compose(
  observer,
  inject('store'),
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps(({ store: { spectrumInfo, config }}) => ({
    styles: {
      fillStyle: getBackgroundColor(spectrumInfo.meanOfBreathR, spectrumInfo.timeLeft), // background
      strokeStyle: 'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
    fftSize: 256,
    rate: config.mic.rate,
    channels: config.mic.channels,
    meanOfBreath: spectrumInfo.meanOfBreath,
  })),
  lifecycle({
    componentDidMount() {
      const { navigatorMicStream, fftSize, channels, rate, store, meanOfBreath } = this.props;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();

      const canvas = document.querySelector('.frequency-bars');
      const { width, height  } = canvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      navigatorMicStream.on('data', async buffer => {
        const data = await getByteFrequencyData(audioCtx, analyser, buffer, fftSize, rate, channels);
        drawBar(data, store.spectrumInfo, canvasCtx, width, height, this.props.styles);
        store.spectrumInfo.setMean(data);
        store.spectrumInfo.setMax(data);
      });
      navigatorMicStream.on('error', alert);
    },
    // componentDidUpdate(prevProps) {
    //   const { meanOfBreath } = this.props;
    //   if(meanOfBreath !== prevProps.meanOfBreath) {
    //     console.log(meanOfBreath);
    //     const canvas = document.querySelector('.frequency-bars');
    //     const { width, height  } = canvas;
    //     const canvasCtx = canvas.getContext("2d");
    //     drawMeanLine(meanOfBreath, canvasCtx, width, height, this.props.styles);
    //   }
    // }
  }),
  mapProps(R.applySpec({
    frequencyHeight: R.path(['store', 'windowInfo', 'frequencyHeight']),
    frequencyWidth: R.path(['store', 'windowInfo', 'frequencyWidth']),
  }))
)(FrequencyBarsComponent);
