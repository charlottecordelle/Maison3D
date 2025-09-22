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
  //Récupération du canvas depuis le HTML
  @ViewChild('myCanva', { static: true }) myCanva!: ElementRef<HTMLCanvasElement>;

  constructor(
    private murService: murService,
    private planService: planService,
    private solService: solService,
    private sceneService: sceneService,
  ) {}

  ngAfterViewInit() {
    //Initialisation et dimensions du canvas
    const canvas = this.myCanva.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    //Récupération de la scène et de la caméra depuis le sceneService
    const scene = this.sceneService.getScene();
    const camera = this.sceneService.getCamera();

    //Ajout des murs avec le murService
    const maisonData = maison;

    maison.murs.forEach((murData) => {
      this.murService.mur(murData); //Ici on génère chaque mur et l'ajoute au groupe
    });
    scene.add(this.murService.gethouseGroup()); //Ajout du groupe de murs à la scène
    
    //Ajout du plancher avec planService
    const plancher = this.planService.plancher(maisonData);
    scene.add(plancher)

    //Ajout du sol avec solService
    const sol = this.solService.sol(maisonData);
    scene.add(sol)

    //Paramètres du renderer
    const renderer = new THREE.WebGLRenderer({ canvas: this.myCanva.nativeElement, antialias: true });
    renderer.setSize(width, height); //Adapter la taille du rendu à celle du canvas
    renderer.shadowMap.enabled = true; //Ajout des ombres
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; //Ajout des ombres douces

    //Contrôles de la scène
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    //Fonction pour réinitialiser la position de la caméra à l'aide d'un bouton
    function resetcamera() {
      camera.position.set(10, 10, 10); //Position de la caméra par défaut
      controls.target.set(0, 0, 0); //Cible (centre de la scène)
      controls.update();
    }

    document.getElementById("resetcamera")!.addEventListener("click", () => {
      resetcamera();
    });

    //Animation du rendu avec une boucle
    const animate = () => {
      requestAnimationFrame(animate); //Relance en continu
      controls.update(); //Met à jour les mouvements de la caméra
      renderer.render(scene, camera); //Affiche la scène
    };
    animate(); //Lance l'animation
  }
}