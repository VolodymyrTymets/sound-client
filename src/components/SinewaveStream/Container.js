import * as R from 'ramda';
import { inject, observer } from "mobx-react";
import {renderNothing, compose, lifecycle, withProps, branch, mapProps} from 'recompose';
import { SinewaveComponent } from './Component';
import { drawWave, getByteTimeDomainData } from "./utils";

export const Sinewave = observer(compose(
  inject('store'),
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps(({ fillStyle, store: { spectrumInfo, config }}) => ({
    styles: {
      fillStyle: fillStyle, // background
      strokeStyle: 'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
    fftSize: 32768,
    rate: config.mic.rate,
    channels: config.mic.channels,
  })),
  lifecycle({
    async componentDidMount() {
      const { navigatorMicStream, fftSize, rate, channels } = this.props;
      const canvas = document.querySelector('.sinewave');
      const { width, height  } = canvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      navigatorMicStream.on('data', async buffer => {
        const wave = await getByteTimeDomainData(buffer, fftSize, rate, channels);
        drawWave(wave, canvasCtx, width, height, this.props.styles);
      })
    },
  }),
  mapProps(R.applySpec({
    sineWaveHeight: R.path(['store', 'windowInfo', 'sineWaveHeight']),
    sineWaveWidth: R.path(['store', 'windowInfo', 'sineWaveWidth']),
    wavesCount: R.path(['wavesCount']),
  })),
)(SinewaveComponent));

