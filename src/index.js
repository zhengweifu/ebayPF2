import Viewport3D from './Viewport3D';

import ProjectLoader from './ProjectLoader';

import { WEB_ROOT } from './config';

import { LoadMeshForCO } from './ZUtils/LoadMeshForGenerator';

import co from 'co';

const selfmm = 'ebay+2017+demo';

class Overly {
	constructor(url = undefined, isLogin = false) {
		this.createOverly(url, isLogin);
	}

	/**
	 * 创建蒙版
	 */
	createOverly(url, isLogin = false) {
	     // 加入蒙版
	    this.overly = document.createElement('div');
	    this.overly.style.position = 'fixed';
	    this.overly.style.top = '0px';
	    this.overly.style.left = '-100%';
	    this.overly.style.width = '100%';
	    this.overly.style.height = '100%';
	    this.overly.style.zIndex = isLogin ? '1000' : '999';
	    this.overly.style.backgroundColor = 'rgba(255, 255, 255, 1)';

	    let logoElement;
	    if(isLogin) {
	    	logoElement = document.createElement('div');
	    	logoElement.style.width = '200px';
	    	logoElement.style.height = '50px';

			let sElement = document.createElement('span');
			sElement.innerText = '输入密码：';
			sElement.style.height = '30px';
			logoElement.appendChild(sElement);

			let iElement = document.createElement('input');
			iElement.type = 'password';
			iElement.style.width = '200px';
	    	iElement.style.height = '20px';
	    	logoElement.appendChild(iElement);

	    	iElement.addEventListener('change', (e) => {
	    		if(e.target.value === selfmm) {
	    			this.setOverlyVisible(false);
	    			let selfmmEle = window.parent.document.getElementById('self-mm');
	    			if(selfmmEle) {
	    				selfmmEle.value = selfmm;
	    			}
	    		}
	    	}, false);

	    	this.overly.appendChild(logoElement);
	    } else {
		    logoElement = new Image();
		    logoElement.onload = () => {
		        this.overly.appendChild(logoElement);
		    };
		    logoElement.src = url !== undefined ? url : `${WEB_ROOT}assets/icons/loading.gif`;
		}

	    logoElement.style.position = 'absolute';
	    logoElement.style.top = 0;
	    logoElement.style.bottom = 0;
	    logoElement.style.left = 0;
	    logoElement.style.right = 0;
	    logoElement.style.margin = 'auto';

	    document.body.appendChild(this.overly);
	}

	/**
     * 设置蒙版的显示或者隐藏
     * @param {Bool} visible 显示或者隐藏
     */
    setOverlyVisible(visible) {
        if(visible) {
            this.overly.style.left = '0px';
        } else {
            this.overly.style.left = '-100%';
        }
    }
}

(() => {
	let selfmmEle = window.parent.document.getElementById('self-mm');
	if(selfmmEle && selfmmEle.value == selfmm) {} else {
		let overlymm = new Overly(undefined, true);
		overlymm.setOverlyVisible(true);
	}

	let overly = new Overly();
	overly.setOverlyVisible(true);
	let viewport3d;
	const projectUrl = `${WEB_ROOT}assets/case/${window.Z_PROPS.caseID}/${window.Z_PROPS.sectionID}/project.json`;
	const htmlUrl = window.location.origin + window.location.pathname;
	ProjectLoader.parse(projectUrl, (data) => {
		if(viewport3d === undefined) {
			viewport3d = new Viewport3D(window.Z_PROPS.canvas3d, {
				pre_href:  htmlUrl + '?caseID=' + window.Z_PROPS.caseID + '&sectionID=',
				geometries: data.geometries
			});
		}
		viewport3d.envSphereMaterial.map = data.texture;
		viewport3d.envSphereMaterial.needsUpdate = true;
		overly.setOverlyVisible(false);
		viewport3d.aniActionPlay(viewport3d.cameraMixer, viewport3d.cameraStartClip);
	});
})();