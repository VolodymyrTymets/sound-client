import { withHandlers, compose, lifecycle, withProps } from 'recompose';
import { SinewaveComponent } from './Component';
import { drawWave } from "./utils";

export const Sinewave = compose(
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
      const { styles } = this.props;

      navigator.mediaDevices.getUserMedia ({ audio: true })
        .then(stream => drawWave(canvas, stream, styles))
        .catch( function(err) { console.log('The following gUM error occured: ' + err);})
    }
  })
)(SinewaveComponent);

