import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

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

    const houseGroup = new THREE.Group();
    houseGroup.rotation.y = Math.PI / 2;
    scene.add(houseGroup)

    //murs
    const largeur = 0.2;
    const longueur1 = 8;
    const longueur2 = 5
    const hauteur = 2.5;

    const mur1Geo = new THREE.BoxGeometry(longueur1, hauteur, largeur);
    const mur1Material = new THREE.MeshBasicMaterial({ color: 'gray' });
    const mur1 = new THREE.Mesh(mur1Geo, mur1Material);
    mur1.position.set(0, hauteur/2, 2.5);
    houseGroup.add(mur1)

    const mur2Geo = new THREE.BoxGeometry(largeur, hauteur, longueur2);
    const mur2Material = new THREE.MeshBasicMaterial({ color: 'gray' })
    const mur2 = new THREE.Mesh(mur2Geo, mur2Material);
    mur2.position.set(-3.9, hauteur/2, 0);
    houseGroup.add(mur2)

    const mur3Geo = new THREE.BoxGeometry(longueur1, hauteur, largeur);
    const mur3Material = new THREE.MeshBasicMaterial({ color: 'gray' });
    const mur3 = new THREE.Mesh(mur3Geo, mur3Material);
    mur3.position.set(0, hauteur/2, -2.5);
    houseGroup.add(mur3)

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
    const solMaterial = new THREE.MeshBasicMaterial({ color: 'beige'});
    const sol = new THREE.Mesh(solGeo, solMaterial);
    sol.position.set(0, 0, 0)
    scene.add(sol)

    const plancherGeo = new THREE.BoxGeometry(largeurplan, epaisseur, longueursol);
    const plancherMaterial = new THREE.MeshBasicMaterial({ color: '#63340b'});
    const plancher = new THREE.Mesh(plancherGeo, plancherMaterial);
    plancher.position.set(0, 2.5, 0);//1.35
    scene.add(plancher)

    const fenlargeur = 1.5;
    const fenlongueur = 1.2;
    const fenepaisseur = 0.05;

    const fen1Geo = new THREE.BoxGeometry(fenlargeur, fenepaisseur, fenlongueur);
    const fen1Material = new THREE.MeshBasicMaterial({ color: 'red' });
    const fen1 = new THREE.Mesh(fen1Geo, fen1Material);
    fen1.position.set(2, 0, 0.9);
    scene.add(fen1)

    const fen2Geo = new THREE.BoxGeometry(fenlargeur, fenepaisseur, fenlongueur);
    const fen2Material = new THREE.MeshBasicMaterial({ color: 'red'});
    const fen2 = new THREE.Mesh(fen2Geo, fen2Material);
    fen2.position.set(5, 3, 0.9);
    scene.add(fen2)

    const porteGeo = new THREE.BoxGeometry(1, 0.05, 2.1);
    const porteMaterial = new THREE.MeshBasicMaterial({ color: 'green'});
    const porte = new THREE.Mesh(porteGeo, porteMaterial);
    porte.position.set(0, 3.5, 0);
    scene.add(porte)

    const renderer = new THREE.WebGLRenderer({ canvas: this.myCanva.nativeElement, antialias: true });
    renderer.setSize(width, height);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
}