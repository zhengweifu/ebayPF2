import Viewport2D from './Viewport2D';

import Viewport3D from './Viewport3D';

import { WEB_ROOT } from './config';

const requestFullScreen = (element) => {
    // Supports most browsers and their versions.
    let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.
        let wscript = new ActiveXObject('WScript.Shell');
        if (wscript !== null) {
            wscript.SendKeys('{F11}');
        }
    }
};

(() => {
	const size = window.Z_PROPS.svgSize;
	const _size = window.document.body.clientWidth > window.document.body.clientHeight ? window.document.body.clientHeight : window.document.body.clientWidth;


	let viewport2d = new Viewport2D(window.Z_PROPS.canvas2d, {
		width: size,
		height: size,
		zoom: _size / size,
		bgURL: `${WEB_ROOT}assets/case/${window.Z_PROPS.svgID}/${window.Z_PROPS.svgID}.jpg`,
		svgURL: `${WEB_ROOT}assets/case/${window.Z_PROPS.svgID}/${window.Z_PROPS.svgID}.svg`
	});

	let viewport3d;

	viewport2d.onMouseUp = (path) => {
		if(path !== null) {
			const imageUrl = `${WEB_ROOT}assets/case/${window.Z_PROPS.svgID}/panoramas/${path.id}.jpg`;
			new THREE.TextureLoader().load(imageUrl, (_texture) => {
				_texture.needsUpdate = true;
				window.Z_PROPS.parent3d.style.display = 'block';
				if(viewport3d === undefined) {
					viewport3d = new Viewport3D(window.Z_PROPS.canvas3d);
				}
				viewport3d.envSphereMaterial.map = _texture;
				viewport3d.envSphereMaterial.needsUpdate = true;
			});
		}
		// console.log(path);
	};

	window.Z_PROPS.fullscreen3d.addEventListener('click', (event) => {
		requestFullScreen(window.Z_PROPS.canvas3d.parentNode);
	}, false);

})();

