import { Injectable } from "@angular/core";
import * as THREE from 'three';

// Création d'un service Angular pour gérer la scène 3D et la caméra
@Injectable({ providedIn: 'root'})
    export class sceneService {
        private scene!: THREE.Scene;
        private camera!: THREE.PerspectiveCamera;
        private ambientLight!: THREE.AmbientLight;
        private directionalLight!: THREE.DirectionalLight

        constructor(){
            //Création de la scène
            this.scene = new THREE.Scene;
            this.scene.background = new THREE.Color('#c7def2'); //Couleur de fond de la scène
            const axesHelper = new THREE.AxesHelper(20); //Ajout d'un repère
            this.scene.add(axesHelper)

            //Création de la camera perspective
            this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            this.camera.position.set(10, 10, 10); //Position initiale de la caméra
            this.camera.lookAt(0, 0, 0); //La caméra va regarder au centre de la scène

            //Création d'une lumière ambiante
            this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            this.scene.add(this.ambientLight);

            //Création d'une lumière directionnelle pour créer des ombres
            this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            this.directionalLight.position.set(10, 20, 10); //Position de la lumière
            this.directionalLight.castShadow = true; //Activation des ombres
            this.directionalLight.shadow.mapSize.width = 2048; //Résolution des ombres
            this.directionalLight.shadow.mapSize.height = 2048;
            this.scene.add(this.directionalLight);
        }
        
        //Fonction pour récupérer la scène
        getScene(): THREE.Scene {
            return this.scene;
        }

        //Fonction pour récupérer la caméra
        getCamera(): THREE.PerspectiveCamera {
            return this.camera;
        }
    }