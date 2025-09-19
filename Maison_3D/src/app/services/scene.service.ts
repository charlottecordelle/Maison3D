import { Injectable } from "@angular/core";
import * as THREE from 'three';


@Injectable({ providedIn: 'root'})
    export class sceneService {
        private scene!: THREE.Scene;
        private camera!: THREE.PerspectiveCamera;
        private ambientLight!: THREE.AmbientLight;
        private directionalLight!: THREE.DirectionalLight

        constructor(){
            //création de la scène et ajout d'un repère
            this.scene = new THREE.Scene;
            this.scene.background = new THREE.Color('#c7def2');
            const axesHelper = new THREE.AxesHelper(20);
            this.scene.add(axesHelper)

            //création de la camera
            this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            this.camera.position.set(10, 10, 10);
            this.camera.lookAt(0, 0, 0);

            //paramètres lumières
            this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            this.scene.add(this.ambientLight);

            this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            this.directionalLight.position.set(10, 20, 10);
            this.directionalLight.castShadow = true;
            this.directionalLight.shadow.mapSize.width = 2048;
            this.directionalLight.shadow.mapSize.height = 2048;
            this.scene.add(this.directionalLight);
        }
        
        getScene(): THREE.Scene {
            return this.scene;
        }

        getCamera(): THREE.PerspectiveCamera {
            return this.camera;
        }
    }