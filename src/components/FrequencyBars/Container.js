import * as R from "ramda";
import { branch, compose, lifecycle, renderNothing, withProps } from 'recompose';
import { FrequencyBarsComponent } from './Component';
import { drawBar } from "./utils";


export const FrequencyBars = compose(
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
      const canvas = document.querySelector('.frequency-bars');
      const { styles, navigatorMicStream } = this.props;
      drawBar(canvas, navigatorMicStream, styles)
    }
  })
)(FrequencyBarsComponent);

