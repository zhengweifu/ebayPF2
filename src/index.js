import Viewport2D from './Viewport2D';

import { WEB_ROOT } from './config';

(() => {
	console.log(window.Z_PROPS);

	let viewport2d = new Viewport2D(window.Z_PROPS.canvas2d, {
		width: 4096,
		height: 4096,
		zoom: 0.2,
		bgURL: `${WEB_ROOT}assets/case/${window.Z_PROPS.svgID}/${window.Z_PROPS.svgID}.jpg`,
		svgURL: `${WEB_ROOT}assets/case/${window.Z_PROPS.svgID}/${window.Z_PROPS.svgID}.svg`
	});

	viewport2d.onMouseUp = (path) => {
		console.log(path);
	};

	// viewport2d.loadSVG();
})();

