import { Injectable } from "@angular/core";
import * as THREE from 'three';


//Création d'un service Angular pour faciliter la création du sol
//Avec l'aide de Three.js pour la géométrie
@Injectable({ providedIn: 'root'})
    export class solService {
        sol(maisonData: any): THREE.Mesh {
            //Création de la géometrie du sol
            const solGeo = new THREE.BoxGeometry(maisonData.sol.largeurSol, maisonData.sol.epaisseur, maisonData.sol.longueurSol)
            //Création du matériau
            const solMaterial = new THREE.MeshBasicMaterial({ color: maisonData.sol.colorSol});
            //Création de l'objet
            const sol = new THREE.Mesh(solGeo, solMaterial);
            //Positionnement du sol
            sol.position.set(maisonData.sol.solX, maisonData.sol.solY, maisonData.sol.solZ)
            
            //Retourner le rendu final du sol
            return sol
        }
    }