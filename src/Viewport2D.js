class Viewport2D {
	constructor(canvas2d, option) {
		option = option || {};
		this.width = option.width !== undefined ? option.width : 500;
		this.height = option.height !== undefined ? option.height : 500;

		this.zoom = option.zoom !== undefined ? option.zoom : 1;

		this.recordZoom = 1;

		this.defaultColor = 'rgba(255, 255, 255, 0.1)',
		this.overColor = 'rgba(255, 0, 0, 0.5)',
		this.fabricCanvas = new fabric.Canvas(canvas2d, {
			width: this.width * this.zoom,
			height: this.height * this.zoom
		});
		this.fabricCanvas.selection = false;

		if(option.svgURL !== undefined) {
			this.loadSVG(option.svgURL, () => {
				if(option.bgURL !== undefined) {
					this.loadBG(option.bgURL);
				}
			});
		}

		this.fabricCanvas.on({
			'mouse:over': option => {
				if(option.target) {
					option.target.set('fill', this.overColor);
					this.fabricCanvas.renderAll();
					if(this.onOver) {
						this.onOver(option.target);
					}
				}
			},
			'mouse:out': option => {
				if(option.target) {
					option.target.set('fill', this.defaultColor);
					this.fabricCanvas.renderAll();
					if(this.onOut) {
						this.onOut(option.target);
					}
				}
			},
			'mouse:up': option => {
                if(this.onMouseUp) {
                	this.onMouseUp(option.target);
                }
            }
		});
	}

	onOver() {}

	onOut() {}

	onMouseUp() {}

	setObjectZoom(object, zoom) {
		object.set({
			left: object.left * zoom,
			top: object.top * zoom,
			scaleX: object.scaleX * zoom,
			scaleY: object.scaleY * zoom,
		});
		object.setCoords();
	}

	setZoom(zoom) {
		this.fabricCanvas.setWidth(this.width * this.zoom);
		this.fabricCanvas.setHeight(this.height * this.zoom);
		let objects = this.fabricCanvas.getObjects();
		this.zoom = zoom;
		const sz = this.zoom / this.recordZoom;
		this.recordZoom = zoom;
		let bgImage = this.fabricCanvas.backgroundImage;
		if(bgImage) {
			this.setObjectZoom(bgImage, sz);
		}
		for(let object of objects) {
			this.setObjectZoom(object, sz);
		}
		this.fabricCanvas.renderAll();
	}

	loadBG(url, onFinish) {
		this.fabricCanvas.setBackgroundImage(url, (img) => {
			this.setObjectZoom(this.fabricCanvas.backgroundImage, this.zoom / this.recordZoom);
			if(onFinish) {
				onFinish(img);
			}
			this.fabricCanvas.renderAll();
		});
	}

	loadSVG(url, onFinish) {
		// console.log(url);
		fabric.loadSVGFromURL(url, (objects, options) => {
			for(let object of objects) {
				object.set('fill', this.defaultColor);
				object.set('perPixelTargetFind', true);
				object.set('selectable', false);
				this.setObjectZoom(object, this.zoom / this.recordZoom);
				this.fabricCanvas.add(object);
			}

			if(onFinish) {
				onFinish(objects);
			}
			this.fabricCanvas.renderAll();
		});
	}

}

export default Viewport2D;