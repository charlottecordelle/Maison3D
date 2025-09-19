import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { objets } from './maisondonnees';
import { murService } from './services/murs.service';
import { planService } from './services/plancher.service';
import { solService } from './services/sol.service';
import { sceneService } from './services/scene.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myCanva', { static: true }) myCanva!: ElementRef<HTMLCanvasElement>;

  constructor(
    private murService: murService,
    private planService: planService,
    private solService: solService,
    private sceneService: sceneService,
  ) {}

  ngAfterViewInit() {
    //récupération du canva dans HTML
    const canvas = this.myCanva.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    //récupération de la scène et de la caméra
    const scene = this.sceneService.getScene();
    const camera = this.sceneService.getCamera();

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

    //plancher
    const plancher = this.planService.plancher(objetData);
    scene.add(plancher)

    //création sol & plancher
    const sol = this.solService.sol(objetData);
    scene.add(sol)

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