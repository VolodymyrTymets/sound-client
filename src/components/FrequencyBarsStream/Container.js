import * as R from "ramda";
import { branch, compose, lifecycle, renderNothing, withProps, mapProps } from 'recompose';
import { FrequencyBarsComponent } from './Component';
import { drawBar, getByteFrequencyData } from "./utils";
import { inject, observer } from 'mobx-react';

export const FrequencyBars = compose(
  inject('store'),
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps(({ store: { spectrumInfo }}) => ({
    styles: {
      fillStyle: `rgb(255, ${255 - spectrumInfo.mean}, ${255 - spectrumInfo.mean})`, //'rgb(255, 255, 255)', // background
      strokeStyle: 'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
    fftSize: 2048,
  })),
  lifecycle({
    componentDidMount() {
      const { navigatorMicStream, fftSize, store } = this.props;
      const canvas = document.querySelector('.frequency-bars');
           const { width, height  } = canvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      navigatorMicStream.on('data', async buffer => {
        const data = await getByteFrequencyData(buffer, fftSize);
        drawBar(data, canvasCtx, width, height, this.props.styles);
        store.spectrumInfo.setMean(data);
        store.spectrumInfo.setMax(data);
      })
    }
  }),
  mapProps(R.applySpec({
    frequencyHeight: R.path(['store', 'windowInfo', 'frequencyHeight']),
    frequencyWidth: R.path(['store', 'windowInfo', 'frequencyWidth']),
  }))
)(observer(FrequencyBarsComponent));
