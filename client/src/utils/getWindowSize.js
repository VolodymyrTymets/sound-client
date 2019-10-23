import queryString from 'query-string';

const getWindowSize = () => {
	const parsed = queryString.parse(window.location.search);
	const queryWidth = parsed.width ? parseInt(parsed.width, 10) : 0;
	const queryHeight = parsed.height ? parseInt(parsed.height, 10) : 0;
	return {
		height: queryHeight || window.outerHeight,
		width: queryWidth || window.outerWidth
	}
};
export { getWindowSize };