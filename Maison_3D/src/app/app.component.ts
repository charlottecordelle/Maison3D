import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { objets } from './maisondonnees';
import { murService } from './services/murs.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myCanva', { static: true }) myCanva!: ElementRef<HTMLCanvasElement>;

  constructor(private murService: murService) {}

  ngAfterViewInit() {
    //création de la scène et ajout d'un repère
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#c7def2');
    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper)

    //récupération du canva dans HTML
    const canvas = this.myCanva.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    //création de la camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    //lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    //ajout des murs à l'aide du murService
    const objetData = objets[0];

    const mur1Data = {
      ...objetData,
      murX: objetData.mur1X,
      murY: objetData.mur1Y,
      murZ: objetData.mur1Z,
    };

    this.murService.murFen(mur1Data);
    scene.add(this.murService.gethouseGroup());

    const mur2Data = {
      ...objetData,
      murX: objetData.mur2X,
      murY: objetData.mur2Y,
      murZ: objetData.mur2Z,
    };

    this.murService.murPorte(mur2Data);
    scene.add(this.murService.gethouseGroup());

    const mur3Data = {
      ...objetData,
      murX: objetData.mur3X,
      murY: objetData.mur3Y,
      murZ: objetData.mur3Z,
    };

    this.murService.murFen(mur3Data);
    scene.add(this.murService.gethouseGroup());

    const mur4Data = {
      ...objetData,
      murX: objetData.mur4X,
      murY: objetData.mur4Y,
      murZ: objetData.mur4Z,
    };

    this.murService.mur(mur4Data);
    scene.add(this.murService.gethouseGroup());

    //création sol & plancher
    const solGeo = new THREE.BoxGeometry(objetData.largeursol, objetData.epaisseur, objetData.longueursol)
    const solMaterial = new THREE.MeshBasicMaterial({ color: objetData.colorsol});
    const sol = new THREE.Mesh(solGeo, solMaterial);
    sol.position.set(objetData.solX, objetData.solY, objetData.solZ)
    scene.add(sol)

    const plancherGeo = new THREE.BoxGeometry(objetData.largeurplan, objetData.epaisseur, objetData.longueursol);
    const plancherMaterial = new THREE.MeshBasicMaterial({ color: objetData.colorplan});
    const plancher = new THREE.Mesh(plancherGeo, plancherMaterial);
    plancher.position.set(objetData.planX, objetData.planY, objetData.planZ!);
    scene.add(plancher)

    //paramètres du rendu
    const renderer = new THREE.WebGLRenderer({ canvas: this.myCanva.nativeElement, antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //contrôles de la scène
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    //réinitialiser la position de la caméra à l'aide d'un bouton
    function resetcamera() {
      camera.position.set(10, 10, 10);
      controls.target.set(0, 0, 0);
      controls.update();
    }

    document.getElementById("resetcamera")!.addEventListener("click", () => {
      resetcamera();
    });

    //animer le rendu
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
}