class Viewport2D {
	constructor(canvas2d, option) {
		option = option || {};
		this.width = option.width !== undefined ? option.width : 500;
		this.height = option.height !== undefined ? option.height : 500;

		this.zoom = option.zoom !== undefined ? option.zoom : 1;

		this.defaultColor = 'rgba(0, 255, 255, 1)',
		this.overColor = 'rgba(255, 0, 0, 0.5)',
		this.fabricCanvas = new fabric.Canvas(canvas2d, {
			width: this.width,
			height: this.height
		});
		this.fabricCanvas.selection = false;
		// this.fabricCanvas.setZoom(0.2);
		if(option.bgURL !== undefined) {
			this.loadBG(option.bgURL);
		}
		if(option.svgURL !== undefined) {
			this.loadSVG(option.svgURL);
		}

		this.fabricCanvas.on({
			'mouse:over': option => {
				if(option.target) {
					option.target.set('fill', this.overColor);
					this.fabricCanvas.renderAll();
				}
			},
			'mouse:out': option => {
				if(option.target) {
					option.target.set('fill', this.defaultColor);
					this.fabricCanvas.renderAll();
				}
			},
			'mouse:up': option => {
                if(this.onMouseUp) {
                	this.onMouseUp(option.target);
                }
            }
		});
	}

	onMouseUp() {}

	setZoom(zoom) {
		this.fabricCanvas.setZoom(this.zoom);
		this.fabricCanvas.setWidth(this.width * this.zoom);
		this.fabricCanvas.setHeight(this.height * this.zoom);
		this.fabricCanvas.renderAll();
		this.zoom = zoom;
	}

	loadBG(url) {
		this.fabricCanvas.setBackgroundImage(url, () => {
			// this.setZoom(this.zoom);
			this.fabricCanvas.renderAll();
		});
	}

	loadSVG(url) {
		// console.log(url);
		fabric.loadSVGFromURL(url, (objects, options) => {
			for(let object of objects) {
				object.set('fill', this.defaultColor);
				// object.set('perPixelTargetFind', true);
				// object.set('selectable', false);
				object.setCoords();
				object.set({
					scaleX: this.zoom,
					scaleY: this.zoom
				});
				this.fabricCanvas.add(object);
			}
			console.log(this.fabricCanvas.getZoom());
			// this.setZoom(this.zoom);
			this.fabricCanvas.renderAll();
			// console.log(objects, options);
		});
	}

}

export default Viewport2D;