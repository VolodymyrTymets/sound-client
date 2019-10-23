import React, { useState, useEffect } from 'react';
import { InteractWindow } from "../components/InteractWindow";
import { MainView } from "../components/MainView";
import { getWindowSize } from "../utils/getWindowSize";

const XS_SIZE = 568;
const MainPage = () => {
	const [isInteracted, setIsInteracted] = useState(false);
	const [windowInfo, setWindowInfo] = useState({})

	useEffect(() => {
		const windowSize = getWindowSize();
		setWindowInfo({
	 		sineWaveHeight: (windowSize.height * 0.5),
	    frequencyHeight: (windowSize.height * 0.4),
		  sineWaveWidth: windowSize.width,
		  frequencyWidth: windowSize.width < XS_SIZE ? windowSize.width : windowSize.width / 2,
		  isFrequencyFullScreen: windowSize.width < XS_SIZE ? true : false,
		})

		window.addEventListener('resize', () => {
			const windowSize = getWindowSize();
			console.log('isFrequencyFullScreen',windowSize.width)
			console.log('isFrequencyFullScreen', windowSize.width < XS_SIZE ? true : false,)
			setWindowInfo({
				sineWaveHeight: (windowSize.height * 0.5),
				frequencyHeight: (windowSize.height * 0.4),
				sineWaveWidth: windowSize.width,
				frequencyWidth: windowSize.width < XS_SIZE ? windowSize.width : windowSize.width / 2,
				isFrequencyFullScreen: windowSize.width < XS_SIZE ? true : false,
			})
		})

	}, []);

	return isInteracted ? <MainView windowInfo={windowInfo} /> : <InteractWindow onClick={() => setIsInteracted(true)} />
};

export default MainPage