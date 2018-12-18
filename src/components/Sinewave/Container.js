import * as R from 'ramda';
import { renderNothing, compose, lifecycle, withProps, branch } from 'recompose';
import { SinewaveComponent } from './Component';
import { drawWave } from "./utils";

export const Sinewave = compose(
  branch(({ navigatorMicStream }) => R.isNil(navigatorMicStream), renderNothing),
  withProps({
    styles: {
      fillStyle: 'rgb(255, 255, 255)', // background
      strokeStyle: 'rgb(0, 0, 0)', // line color
      lineWidth: 1,
    },
  }),
  lifecycle({
    componentDidMount() {
      const canvas = document.querySelector('.sinewave');
      const { styles, navigatorMicStream } = this.props;
      drawWave(canvas, navigatorMicStream, styles)

      // navigator.mediaDevices.getUserMedia ({ audio: true })
      //   .then(stream => drawWave(canvas, stream, styles))
      //   .catch( function(err) { console.log('The following gUM error occured: ' + err);})
    }
  })
)(SinewaveComponent);

