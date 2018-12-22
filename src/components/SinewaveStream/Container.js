import * as R from 'ramda';
import { renderNothing, compose, lifecycle, withProps, branch } from 'recompose';
import { SinewaveComponent } from './Component';
import { drawWave, getByteTimeDomainData } from "./utils";

export const Sinewave = compose(
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps({
    styles: {
      fillStyle: 'rgb(255, 255, 255)', // background
      strokeStyle: 'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
    fftSize: 32768,
  }),
  lifecycle({
    async componentDidMount() {
      const { styles, navigatorMicStream, fftSize } = this.props;

      const canvas = document.querySelector('.sinewave');
      const { width, height  } = canvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      navigatorMicStream.on('data', async buffer => {
        const data = await getByteTimeDomainData(buffer, fftSize);
        drawWave(data, canvasCtx, width, height, styles);
      })
    }
  })
)(SinewaveComponent);

