import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { CSG } from 'three-csg-ts';

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
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#c7def2');
    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper)

    const canvas = this.myCanva.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('0xffffff, 1');
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const houseGroup = new THREE.Group();
    houseGroup.rotation.y = Math.PI / 2;
    scene.add(houseGroup)

    //murs etc
    const largeur = 0.2;
    const longueur1 = 8;
    const longueur2 = 5
    const hauteur = 2.5;

    const fenlargeur = 1.5;
    const fenlongueur = 1.2;
    const fenepaisseur = 0.05;

    const trou1Geo = new THREE.BoxGeometry(fenlargeur, fenlongueur, largeur);
    const trou1 = new THREE.Mesh(trou1Geo);
    trou1.position.set(0, hauteur/2, 2.5)

    const mur1Geo = new THREE.BoxGeometry(longueur1, hauteur, largeur);
    const mur1Material = new THREE.MeshBasicMaterial({ color: 'gray' });
    const mur1 = new THREE.Mesh(mur1Geo, mur1Material);
    mur1.position.set(0, hauteur/2, 2.5);

    const mur1CSG = CSG.fromMesh(mur1);
    const trou1CSG = CSG.fromMesh(trou1);
    const murtrou1CSG = mur1CSG.subtract(trou1CSG);
    const murtrou1 = CSG.toMesh(murtrou1CSG, mur1.matrix, mur1.material);
    murtrou1.position.copy(mur1.position);
    houseGroup.add(murtrou1)

    const fen1Geo = new THREE.BoxGeometry(fenlargeur, fenlongueur, fenepaisseur);
    const fen1Material = new THREE.MeshBasicMaterial({ color: '#ae2012'});
    const fen1 = new THREE.Mesh(fen1Geo, fen1Material);

    fen1.position.copy(trou1.position);
    houseGroup.add(fen1)

    const portelargeur = 1;
    const portehauteur = 2.1;
    const portepaisseur = 0.05;

    const trou2Geo = new THREE.BoxGeometry(largeur, portehauteur, portelargeur);
    const trou2 = new THREE.Mesh(trou2Geo);
    trou2.position.set(-3.9, hauteur/2, 0);

    const mur2Geo = new THREE.BoxGeometry(largeur, hauteur, longueur2);
    const mur2Material = new THREE.MeshBasicMaterial({ color: 'gray' })
    const mur2 = new THREE.Mesh(mur2Geo, mur2Material);
    mur2.position.set(-3.9, hauteur/2, 0);

    const mur2CSG = CSG.fromMesh(mur2);
    const trou2CSG = CSG.fromMesh(trou2);
    const murtrou2CSG = mur2CSG.subtract(trou2CSG);
    const murtrou2 = CSG.toMesh(murtrou2CSG, mur2.matrix, mur2.material);
    murtrou2.position.copy(mur2.position);
    houseGroup.add(murtrou2)

    const porteGeo = new THREE.BoxGeometry(portepaisseur, portehauteur, portelargeur);
    const porteMaterial = new THREE.MeshBasicMaterial({ color: '#386641'});
    const porte = new THREE.Mesh(porteGeo, porteMaterial);

    porte.position.copy(trou2.position);
    houseGroup.add(porte)

    const trou3Geo = new THREE.BoxGeometry(fenlargeur, fenlongueur, largeur);
    const trou3 = new THREE.Mesh(trou3Geo);
    trou3.position.set(0, hauteur/2, -2.5);

    const mur3Geo = new THREE.BoxGeometry(longueur1, hauteur, largeur);
    const mur3Material = new THREE.MeshBasicMaterial({ color: 'gray' });
    const mur3 = new THREE.Mesh(mur3Geo, mur3Material);
    mur3.position.set(0, hauteur/2, -2.5);

    const mur3CSG = CSG.fromMesh(mur3);
    const trou3CSG = CSG.fromMesh(trou3);
    const murtrou3CSG = mur3CSG.subtract(trou3CSG);
    const murtrou3 = CSG.toMesh(murtrou3CSG, mur3.matrix, mur3.material);
    murtrou3.position.copy(mur3.position);
    houseGroup.add(murtrou3)

    const fen2Geo = new THREE.BoxGeometry(fenlargeur, fenlongueur, fenepaisseur);
    const fen2Material = new THREE.MeshBasicMaterial({ color: '#ae2012'});
    const fen2 = new THREE.Mesh(fen2Geo, fen2Material);

    fen2.position.copy(trou3.position);
    houseGroup.add(fen2)

    const mur4Geo = new THREE.BoxGeometry(largeur, hauteur, longueur2);
    const mur4Material = new THREE.MeshBasicMaterial({ color:'gray' });
    const mur4 = new THREE.Mesh(mur4Geo, mur4Material);
    mur4.position.set(3.9, hauteur/2, 0);
    houseGroup.add(mur4)

    const largeursol = 5;
    const longueursol = 8;
    const epaisseur = 0.20;
    const largeurplan = 6;

    const solGeo = new THREE.BoxGeometry(largeursol, epaisseur, longueursol)
    const solMaterial = new THREE.MeshBasicMaterial({ color: '#7f4f24'});
    const sol = new THREE.Mesh(solGeo, solMaterial);
    sol.position.set(0, 0, 0)
    scene.add(sol)

    const plancherGeo = new THREE.BoxGeometry(largeurplan, epaisseur, longueursol);
    const plancherMaterial = new THREE.MeshBasicMaterial({ color: '#1b263b'});
    const plancher = new THREE.Mesh(plancherGeo, plancherMaterial);
    plancher.position.set(0, 2.5, 0);
    scene.add(plancher)

    const renderer = new THREE.WebGLRenderer({ canvas: this.myCanva.nativeElement, antialias: true });
    renderer.setSize(width, height);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    function resetcamera() {
      camera.position.set(10, 10, 10);
      controls.target.set(0, 0, 0);
      controls.update();
    }

    document.getElementById("resetcamera")!.addEventListener("click", () => {
      resetcamera();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
}