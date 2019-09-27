import React, { useEffect, useRef } from "react";
import { drawBar } from "./utils";

const FrequencyBarsStream = ({ spectrum, windowInfo, color }) => {
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

export default FrequencyBarsStream;