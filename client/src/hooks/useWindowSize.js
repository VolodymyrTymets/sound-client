import React, { useState, useEffect } from 'react';
import { getWindowSize } from '../utils/getWindowSize';

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({});
	useEffect(() => {
		const size = getWindowSize();
		setWindowSize({ ...size })
	}, []);
	return windowSize;
};

export { useWindowSize };