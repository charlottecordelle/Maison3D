import { Injectable } from "@angular/core";
import * as THREE from 'three';

@Injectable({ providedIn: "root"})
    export class planService {
        plancher(objetData: any): THREE.Mesh {
            const plancherGeo = new THREE.BoxGeometry(objetData.largeurplan, objetData.epaisseur, objetData.longueursol);
            const plancherMaterial = new THREE.MeshBasicMaterial({ color: objetData.colorplan});
            const plancher = new THREE.Mesh(plancherGeo, plancherMaterial);
            plancher.position.set(objetData.planX, objetData.planY, objetData.planZ!);
            
            return plancher;
        }
    }