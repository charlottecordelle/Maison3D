import { Injectable } from "@angular/core";
import * as THREE from 'three';


//Création d'un service Angular pour faciliter la création du plancher
//Avec l'aide de Three.js pour la géométrie
@Injectable({ providedIn: "root"})
    export class planService {
        plancher(maisonData: any): THREE.Mesh {
            //Création de la géometrie du plancher
            const plancherGeo = new THREE.BoxGeometry(maisonData.plancher.largeurPlan, 
                maisonData.plancher.epaisseur, maisonData.plancher.longueurSol);
            //Création du matériau
            const plancherMaterial = new THREE.MeshBasicMaterial({ color: maisonData.plancher.colorPlan});
            //Création de l'objet
            const plancher = new THREE.Mesh(plancherGeo, plancherMaterial);
            //Positionnement du plancher
            plancher.position.set(maisonData.plancher.planX, maisonData.plancher.planY, maisonData.plancher.planZ!);
            
            //Retourner le rendu final du plancher
            return plancher;
        }
    }