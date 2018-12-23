import * as R from 'ramda';
import { inject, observer } from "mobx-react";
import {renderNothing, compose, lifecycle, withProps, branch, mapProps} from 'recompose';
import { SinewaveComponent } from './Component';
import { drawWave, getByteTimeDomainData } from "./utils";

export const Sinewave = compose(
  inject('store'),
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps(({ store: { spectrumInfo }}) => ({
    styles: {
      fillStyle: `rgb(255, ${255 - spectrumInfo.mean}, ${255 - spectrumInfo.mean})`,//'rgb(255, 255, 255)', // background
      strokeStyle: 'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
    fftSize: 32768,
  })),
  lifecycle({
    async componentDidMount() {
      const { navigatorMicStream, fftSize } = this.props;
      const canvas = document.querySelector('.sinewave');
      const { width, height  } = canvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      navigatorMicStream.on('data', async buffer => {
        const wave = await getByteTimeDomainData(buffer, fftSize);
        drawWave(wave, canvasCtx, width, height, this.props.styles);
      })



    }
  }),
  mapProps(R.applySpec({
    sineWaveHeight: R.path(['store', 'windowInfo', 'sineWaveHeight']),
    sineWaveWidth: R.path(['store', 'windowInfo', 'sineWaveWidth']),
    wavesCount: R.path(['wavesCount']),
  })),
)(observer(SinewaveComponent));

