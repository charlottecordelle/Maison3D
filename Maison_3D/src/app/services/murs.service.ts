import { Injectable } from "@angular/core";
import * as THREE from 'three';
import { CSG } from "three-csg-ts";

@Injectable({ providedIn: 'root' })
export class murService {
    private houseGroup: THREE.Group;

    constructor() {
        this.houseGroup = new THREE.Group();
        this.houseGroup.rotation.y = Math.PI / 2;
    }

    gethouseGroup(): THREE.Group {
        return this.houseGroup;
    }

    //murs avec fenetre
    mur(maisonData: any): THREE.Group {
        const murGeo = new THREE.BoxGeometry(maisonData.longueur1 ?? maisonData.longueur2, maisonData.hauteur, maisonData.largeur);
        const murMaterial = new THREE.MeshStandardMaterial({ color: maisonData.colorMur });
        const mur = new THREE.Mesh(murGeo, murMaterial);
        mur.position.set(maisonData.murX, maisonData.murY, maisonData.murZ);
        if (maisonData.longueur2) {
            mur.rotation.y = Math.PI / 2;
        }
        mur.updateMatrix();
        
        let murCSG = CSG.fromMesh(mur);

        if (maisonData.fenetresMur){
            maisonData.fenetresMur.forEach((fen: any) => {
                const trouGeo = new THREE.BoxGeometry(fen.fenLargeur, fen.fenLongueur, maisonData.largeur);
                const trou = new THREE.Mesh(trouGeo);
                trou.position.set(fen.fenX, fen.fenY, fen.fenZ);
                if (maisonData.longueur2) {
                    trou.rotation.y = Math.PI / 2;
                }
                trou.updateMatrix();

                murCSG = murCSG.subtract(CSG.fromMesh(trou));

                const fenetreGeo = new THREE.BoxGeometry(fen.fenLargeur, fen.fenLongueur, fen.fenEpaisseur);
                const fenetreMaterial = new THREE.MeshBasicMaterial({ color: fen.colorFen});
                const fenetre = new THREE.Mesh(fenetreGeo, fenetreMaterial);
                fenetre.position.set(fen.fenX, fen.fenY, fen.fenZ)
                if (maisonData.longueur2) {
                    fenetre.rotation.y = Math.PI / 2;
                }
                this.houseGroup.add(fenetre)
            });
        }

        if (maisonData.porte){
            maisonData.porte.forEach((Porte: any) => {
                const trouPGeo = new THREE.BoxGeometry(Porte.porteLargeur, Porte.porteHauteur, maisonData.largeur);
                const trouP = new THREE.Mesh(trouPGeo);
                trouP.position.set(Porte.porteX, Porte.porteY, Porte.porteZ);
                if (maisonData.longueur2) {
                    trouP.rotation.y = Math.PI / 2;
                }
                trouP.updateMatrix();

                murCSG = murCSG.subtract(CSG.fromMesh(trouP));

                const porteGeo = new THREE.BoxGeometry(Porte.porteLargeur, Porte.porteHauteur, Porte.porteEpaisseur);
                const porteMaterial = new THREE.MeshBasicMaterial({ color: Porte.colorPorte});
                const porte = new THREE.Mesh(porteGeo, porteMaterial);
                porte.position.set(Porte.porteX, Porte.porteY, Porte.porteZ)
                if (maisonData.longueur2) {
                    porte.rotation.y = Math.PI / 2;
                }
                this.houseGroup.add(porte)
            });
        }

        const murFinal = CSG.toMesh(murCSG, mur.matrix, mur.material);
        murFinal.position.copy(mur.position);
        this.houseGroup.add(murFinal);

        return this.houseGroup;
    }
}