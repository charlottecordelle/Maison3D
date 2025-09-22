import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { maison } from './maisondonnees';
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
    const maisonData = maison;

    maison.murs.forEach((murData) => {
      this.murService.mur(murData);
    });
    scene.add(this.murService.gethouseGroup());
    
    //plancher
    const plancher = this.planService.plancher(maisonData);
    scene.add(plancher)

    //création sol & plancher
    const sol = this.solService.sol(maisonData);
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