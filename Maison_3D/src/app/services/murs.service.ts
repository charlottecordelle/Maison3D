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

    murFen(objetData: any): THREE.Group {
        const trouGeo = new THREE.BoxGeometry(objetData.fenlargeur, objetData.fenlongueur, objetData.largeur);
        const trou = new THREE.Mesh(trouGeo);
        trou.position.set(objetData.murX, objetData.murY, objetData.murZ)

        const murGeo = new THREE.BoxGeometry(objetData.longueur1, objetData.hauteur, objetData.largeur);
        const murMaterial = new THREE.MeshStandardMaterial({ color: objetData.colormur });
        const mur = new THREE.Mesh(murGeo, murMaterial);
        mur.position.set(objetData.murX, objetData.murY, objetData.murZ);

        const murCSG = CSG.fromMesh(mur);
        const trouCSG = CSG.fromMesh(trou);
        const murtrouCSG = murCSG.subtract(trouCSG);
        const murtrou = CSG.toMesh(murtrouCSG, mur.matrix, mur.material);
        murtrou.position.copy(mur.position);
        this.houseGroup.add(murtrou)

        const fenGeo = new THREE.BoxGeometry(objetData.fenlargeur, objetData.fenlongueur, objetData.fenepaisseur);
        const fenMaterial = new THREE.MeshBasicMaterial({ color: objetData.colorfen});
        const fen = new THREE.Mesh(fenGeo, fenMaterial);

        fen.position.copy(trou.position);
        this.houseGroup.add(fen)

        return this.houseGroup;
    }

    murPorte(objetData: any): THREE.Group {
        const trouGeo = new THREE.BoxGeometry(objetData.largeur, objetData.portehauteur, objetData.portelargeur);
        const trou = new THREE.Mesh(trouGeo);
        trou.position.set(objetData.murX, objetData.murY, objetData.murZ);

        const murGeo = new THREE.BoxGeometry(objetData.largeur, objetData.hauteur, objetData.longueur2);
        const murMaterial = new THREE.MeshStandardMaterial({ color: objetData.colormur })
        const mur = new THREE.Mesh(murGeo, murMaterial);
        mur.position.set(objetData.murX, objetData.murY, objetData.murZ);

        const murCSG = CSG.fromMesh(mur);
        const trouCSG = CSG.fromMesh(trou);
        const murtrouCSG = murCSG.subtract(trouCSG);
        const murtrou = CSG.toMesh(murtrouCSG, mur.matrix, mur.material);
        murtrou.position.copy(mur.position);
        this.houseGroup.add(murtrou)

        const porteGeo = new THREE.BoxGeometry(objetData.portepaisseur, objetData.portehauteur, objetData.portelargeur);
        const porteMaterial = new THREE.MeshBasicMaterial({ color: objetData.colorporte});
        const porte = new THREE.Mesh(porteGeo, porteMaterial);

        porte.position.copy(trou.position);
        this.houseGroup.add(porte)

        return this.houseGroup
    }

    mur(objetData: any): THREE.Group {
        const murGeo = new THREE.BoxGeometry(objetData.largeur, objetData.hauteur, objetData.longueur2);
        const murMaterial = new THREE.MeshStandardMaterial({ color: objetData.colormur });
        const mur = new THREE.Mesh(murGeo, murMaterial);
        mur.position.set(objetData.murX, objetData.murY, objetData.murZ);
        this.houseGroup.add(mur)

        return this.houseGroup
    }
}