import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { CSG } from 'three-csg-ts';
import { objets } from './maisondonnees';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myCanva', { static: true }) myCanva!: ElementRef<HTMLCanvasElement>;

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

    //création d'un groupe pour les murs et fenêtres
    const houseGroup = new THREE.Group();
    houseGroup.rotation.y = Math.PI / 2;
    scene.add(houseGroup)

    //création de trous dans les murs pour les combler à l'aide des fenêtres et de la porte
    const objetData = objets[0]

    const trou1Geo = new THREE.BoxGeometry(objetData.fenlargeur, objetData.fenlongueur, objetData.largeur);
    const trou1 = new THREE.Mesh(trou1Geo);
    trou1.position.set(objetData.mur1X, objetData.mur1Y, objetData.mur1Z)

    const mur1Geo = new THREE.BoxGeometry(objetData.longueur1, objetData.hauteur, objetData.largeur);
    const mur1Material = new THREE.MeshStandardMaterial({ color: objetData.colormur });
    const mur1 = new THREE.Mesh(mur1Geo, mur1Material);
    mur1.position.set(objetData.mur1X, objetData.mur1Y, objetData.mur1Z);

    const mur1CSG = CSG.fromMesh(mur1);
    const trou1CSG = CSG.fromMesh(trou1);
    const murtrou1CSG = mur1CSG.subtract(trou1CSG);
    const murtrou1 = CSG.toMesh(murtrou1CSG, mur1.matrix, mur1.material);
    murtrou1.position.copy(mur1.position);
    houseGroup.add(murtrou1)

    const fen1Geo = new THREE.BoxGeometry(objetData.fenlargeur, objetData.fenlongueur, objetData.fenepaisseur);
    const fen1Material = new THREE.MeshBasicMaterial({ color: objetData.colorfen});
    const fen1 = new THREE.Mesh(fen1Geo, fen1Material);

    fen1.position.copy(trou1.position);
    houseGroup.add(fen1)

    //porte & mur2
    const trou2Geo = new THREE.BoxGeometry(objetData.largeur, objetData.portehauteur, objetData.portelargeur);
    const trou2 = new THREE.Mesh(trou2Geo);
    trou2.position.set(objetData.mur2X, objetData.mur2Y, objetData.mur2Z);

    const mur2Geo = new THREE.BoxGeometry(objetData.largeur, objetData.hauteur, objetData.longueur2);
    const mur2Material = new THREE.MeshStandardMaterial({ color: objetData.colormur })
    const mur2 = new THREE.Mesh(mur2Geo, mur2Material);
    mur2.position.set(objetData.mur2X, objetData.mur1Y, objetData.mur2Z);

    const mur2CSG = CSG.fromMesh(mur2);
    const trou2CSG = CSG.fromMesh(trou2);
    const murtrou2CSG = mur2CSG.subtract(trou2CSG);
    const murtrou2 = CSG.toMesh(murtrou2CSG, mur2.matrix, mur2.material);
    murtrou2.position.copy(mur2.position);
    houseGroup.add(murtrou2)

    const porteGeo = new THREE.BoxGeometry(objetData.portepaisseur, objetData.portehauteur, objetData.portelargeur);
    const porteMaterial = new THREE.MeshBasicMaterial({ color: objetData.colorporte});
    const porte = new THREE.Mesh(porteGeo, porteMaterial);

    porte.position.copy(trou2.position);
    houseGroup.add(porte)

    //fenetre2 & mur3
    const trou3Geo = new THREE.BoxGeometry(objetData.fenlargeur, objetData.fenlongueur, objetData.largeur);
    const trou3 = new THREE.Mesh(trou3Geo);
    trou3.position.set(objetData.mur3X, objetData.mur3Y, objetData.mur3Z);

    const mur3Geo = new THREE.BoxGeometry(objetData.longueur1, objetData.hauteur, objetData.largeur);
    const mur3Material = new THREE.MeshStandardMaterial({ color: objetData.colormur });
    const mur3 = new THREE.Mesh(mur3Geo, mur3Material);
    mur3.position.set(objetData.mur3X, objetData.mur3Y, objetData.mur3Z);

    const mur3CSG = CSG.fromMesh(mur3);
    const trou3CSG = CSG.fromMesh(trou3);
    const murtrou3CSG = mur3CSG.subtract(trou3CSG);
    const murtrou3 = CSG.toMesh(murtrou3CSG, mur3.matrix, mur3.material);
    murtrou3.position.copy(mur3.position);
    houseGroup.add(murtrou3)

    const fen2Geo = new THREE.BoxGeometry(objetData.fenlargeur, objetData.fenlongueur, objetData.fenepaisseur);
    const fen2Material = new THREE.MeshBasicMaterial({ color: objetData.colorfen});
    const fen2 = new THREE.Mesh(fen2Geo, fen2Material);

    fen2.position.copy(trou3.position);
    houseGroup.add(fen2)

    //dernier mur
    const mur4Geo = new THREE.BoxGeometry(objetData.largeur, objetData.hauteur, objetData.longueur2);
    const mur4Material = new THREE.MeshStandardMaterial({ color: objetData.colormur });
    const mur4 = new THREE.Mesh(mur4Geo, mur4Material);
    mur4.position.set(objetData.mur4X, objetData.mur4Y, objetData.mur4Z);
    houseGroup.add(mur4)

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