import React, { useEffect, useRef } from "react";
import { compose } from "ramda";
import { inject, observer } from 'mobx-react';
import { drawBar } from "./utils";

const FrequencyBarsStream = ({ spectrum, store, color }) => {
	const { windowInfo } = store;
	const { frequencyHeight, frequencyWidth } = windowInfo;
	const canvas = useRef(null);

	useEffect(() => {
		if(!canvas.current) return;
		const { width, height } = canvas.current;
		const canvasCtx = canvas.current.getContext("2d");
		drawBar(spectrum, canvasCtx, width, height, {
			fillStyle: 'white', //fillStyle, // background
			strokeStyle: color, //'rgb(0, 0, 0)', // line color
			lineWidth: 1,
		});
	},[spectrum]);
	return (
		<div className="d-flex flex-row">
			<canvas
				ref={canvas}
				width={frequencyWidth}
				height={frequencyHeight}
			/>
		</div>
	)
};

export default observer(compose(
	inject('store'),
)(FrequencyBarsStream));
