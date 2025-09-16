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
    scene.background = new THREE.Color('skyblue');

    const canvas = this.myCanva.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const renderer = new THREE.WebGLRenderer({ canvas: this.myCanva.nativeElement, antialias: true });
    renderer.setSize(width, height);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
}
