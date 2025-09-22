import { Injectable } from "@angular/core";
import * as THREE from 'three';

@Injectable({ providedIn: "root"})
    export class planService {
        plancher(maisonData: any): THREE.Mesh {
            const plancherGeo = new THREE.BoxGeometry(maisonData.plancher.largeurPlan, 
                maisonData.plancher.epaisseur, maisonData.plancher.longueurSol);
            const plancherMaterial = new THREE.MeshBasicMaterial({ color: maisonData.plancher.colorPlan});
            const plancher = new THREE.Mesh(plancherGeo, plancherMaterial);
            plancher.position.set(maisonData.plancher.planX, maisonData.plancher.planY, maisonData.plancher.planZ!);
            
            return plancher;
        }
    }