import { Injectable } from "@angular/core";
import * as THREE from 'three';

@Injectable({ providedIn: 'root'})
    export class solService {
        sol(objetData: any): THREE.Mesh {
            const solGeo = new THREE.BoxGeometry(objetData.largeursol, objetData.epaisseur, objetData.longueursol)
            const solMaterial = new THREE.MeshBasicMaterial({ color: objetData.colorsol});
            const sol = new THREE.Mesh(solGeo, solMaterial);
            sol.position.set(objetData.solX, objetData.solY, objetData.solZ)
            
            return sol
        }
    }