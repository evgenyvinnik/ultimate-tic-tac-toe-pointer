import { useState, useEffect } from 'react';

const getSize = () => ({
	x: document.documentElement.clientWidth,
	y: document.documentElement.clientHeight,
});

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState(getSize());

	useEffect(() => {
		const onResize = () => {
			setWindowSize(getSize());
		};

		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return windowSize;
};
