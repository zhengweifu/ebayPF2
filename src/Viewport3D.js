class Viewport3D {
	constructor(canvas) {
		this.canvas = canvas;

		this.width = this.canvas.clientWidth;
		this.height = this.canvas.clientHeight;

		this.scene = new THREE.Scene();

		let envSphereGeometry = new THREE.SphereGeometry(600, 100, 100);
        this.envSphereMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: 1, wireframe: false});
       	let envSphereMesh = new THREE.Mesh(envSphereGeometry, this.envSphereMaterial);

        this.scene.add(envSphereMesh);

        this.camera = new THREE.PerspectiveCamera(53, this.width / this.height, 0.01, 5000);

        this.camera.position.set(0, 0, 15);


		this.renderer = new THREE.WebGLRenderer({canvas : this.canvas, alpha: true, antialias: true});
		this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.autoClear = false;

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        // console.log(this.controls);
        this.controls.minDistance = 0;
        this.controls.maxDistance = 200;
        this.controls.zoomSpeed = 2;
        this.controls.noPan = true;
        // this.controls.autoRotate = true;
        // this.controls.autoRotateSpeed = 0.2;
	
		window.addEventListener('resize', event => {
            this.resizeWindow(this.canvas.parentNode.clientWidth, this.canvas.parentNode.clientHeight);
        }, false );

        this.resizeWindow();
        this.renderLoop();
	}

	render() {
		this.scene.updateMatrixWorld();
        this.camera.updateProjectionMatrix();
        // console.log('dddddd')
        this.renderer.clear();

        this.controls.update();

        this.resizeWindow(this.canvas.parentNode.clientWidth, this.canvas.parentNode.clientHeight);

        this.renderer.render(this.scene, this.camera);
	}

	renderLoop() {
		if(window.requestAnimationFrame) {
            requestAnimationFrame(this.renderLoop.bind(this));
            this.render();
        } else {
            console.error('没有发现 window.requestAnimationFrame');
        }
	}

	// resize window
    resizeWindow(width, height) {
    	console.log(width, height);
        // resize camera aspect
        let w = width ? width : this.canvas.clientWidth, h = height ? height : this.canvas.clientHeight;
        this.width = w;
        this.height = h;

        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();

        // resize viewport width and height
        this.renderer.setSize(w, h, true);
    }


}

export default Viewport3D;