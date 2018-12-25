import * as R from "ramda";
import { branch, compose, lifecycle, renderNothing, withProps, mapProps } from 'recompose';
import { FrequencyBarsComponent } from './Component';
import { drawBar, getByteFrequencyData } from "./utils";
import { inject, observer } from 'mobx-react';
import { getBackgroundColor } from '../../utils/getBackgroundColor';

export const FrequencyBars = compose(
  inject('store'),
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps(({ store: { spectrumInfo, config }}) => ({
    styles: {
      fillStyle: getBackgroundColor(spectrumInfo.meanOfBreathR), // background
      strokeStyle: 'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
    fftSize: 256,
    rate: config.mic.rate,
    channels: config.mic.channels,
  })),
  lifecycle({
    componentDidMount() {
      const { navigatorMicStream, fftSize, channels, rate, store } = this.props;
      const canvas = document.querySelector('.frequency-bars');
      const { width, height  } = canvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      navigatorMicStream.on('data', async buffer => {
        const data = await getByteFrequencyData(buffer, fftSize, rate, channels);
        drawBar(data, canvasCtx, width, height, this.props.styles);
        store.spectrumInfo.setMean(data);
        store.spectrumInfo.setMax(data);
      });
      navigatorMicStream.on('error', alert)
    }
  }),
  mapProps(R.applySpec({
    frequencyHeight: R.path(['store', 'windowInfo', 'frequencyHeight']),
    frequencyWidth: R.path(['store', 'windowInfo', 'frequencyWidth']),
  }))
)(observer(FrequencyBarsComponent));
