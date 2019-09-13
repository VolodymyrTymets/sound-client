import * as R from "ramda";
import {
	compose,
	withProps,
	mapProps,
	withPropsOnChange
} from 'recompose';
import { inject } from 'mobx-react';
import { FrequencyBarsComponent } from './Component';
import { drawBar } from "./utils";

export const FrequencyBars = compose(
	inject('store'),
  withProps(({ color}) => ({
    styles: {
      fillStyle: 'white',
      strokeStyle: color, // line color
      lineWidth: 1,
    },
   })),
	withPropsOnChange(['spectrum'], ({ spectrum, styles }) => {
		const canvas = document.querySelector('.frequency-bars');
		if(!canvas) return;
		const { width, height } = canvas;
		const canvasCtx = canvas.getContext("2d");
		drawBar(spectrum, canvasCtx, width, height, styles);
	}),
  mapProps(R.applySpec({
    frequencyHeight: R.path(['store', 'windowInfo', 'frequencyHeight']),
    frequencyWidth: R.path(['store', 'windowInfo', 'frequencyWidth']),
  }))
)(FrequencyBarsComponent);
