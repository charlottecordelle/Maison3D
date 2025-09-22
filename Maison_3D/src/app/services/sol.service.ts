import { Injectable } from "@angular/core";
import * as THREE from 'three';

@Injectable({ providedIn: 'root'})
    export class solService {
        sol(maisonData: any): THREE.Mesh {
            const solGeo = new THREE.BoxGeometry(maisonData.sol.largeurSol, maisonData.sol.epaisseur, maisonData.sol.longueurSol)
            const solMaterial = new THREE.MeshBasicMaterial({ color: maisonData.sol.colorSol});
            const sol = new THREE.Mesh(solGeo, solMaterial);
            sol.position.set(maisonData.sol.solX, maisonData.sol.solY, maisonData.sol.solZ)
            
            return sol
        }
    }