import { Injectable } from "@angular/core";
import * as THREE from 'three';
import { CSG } from "three-csg-ts";

//Création d'un service Angular pour faciliter la création de murs, fenêtres et portes
//Avec l'aide de Three.js pour la géométrie 
@Injectable({ providedIn: 'root' })
export class murService {
    private houseGroup: THREE.Group;

    //Création d'un groupe pour les murs et effectuer la rotation en une fois
    constructor() {
        this.houseGroup = new THREE.Group();
        this.houseGroup.rotation.y = Math.PI / 2;
    }

    //Récupération du groupe plus facilement
    gethouseGroup(): THREE.Group {
        return this.houseGroup;
    }

    //Fonction pour créer un mur
    mur(maisonData: any): THREE.Group {
        //Création de la géométrie d'un mur
        const murGeo = new THREE.BoxGeometry(maisonData.longueur1 ?? maisonData.longueur2, //Choix de la longueur du mur
            maisonData.hauteur, 
            maisonData.largeur);
        const murMaterial = new THREE.MeshStandardMaterial({ color: maisonData.colorMur }); //Création du matériau (MeshStandard au lieu de MeshBasic pour avoir les effets lumineux(ombres,etc).)
        const mur = new THREE.Mesh(murGeo, murMaterial); //Création de l'objet
        //Positionnement du mur
        mur.position.set(maisonData.murX, maisonData.murY, maisonData.murZ);
        //Rotation en cas de mur latéral
        if (maisonData.longueur2) {
            mur.rotation.y = Math.PI / 2;
        }
        //Mettre à jour les transformations de l'objet avant CSG
        mur.updateMatrix();
        
        //Conversion du mur en CSG pour soustraire la partie souhaitée
        let murCSG = CSG.fromMesh(mur);

        //Si dans les données du mur il y a une fenêtre, l'ajouter :
        if (maisonData.fenetresMur){
            maisonData.fenetresMur.forEach((fen: any) => {
                //On effectue un trou dans le mur pour ensuite le recouvrir avec la fenêtre
                const trouGeo = new THREE.BoxGeometry(fen.fenLargeur, fen.fenLongueur, maisonData.largeur);
                const trou = new THREE.Mesh(trouGeo);
                trou.position.set(fen.fenX, fen.fenY, fen.fenZ);
                //Si le trou est dans un mur latéral, effectuer une rotation (pour que ce soit bien aligné)
                if (maisonData.longueur2) {
                    trou.rotation.y = Math.PI / 2;
                }
                //Mettre à jour les transformations de l'objet
                trou.updateMatrix();

                //On soustrait pour créer une ouverture
                murCSG = murCSG.subtract(CSG.fromMesh(trou));

                //Ici on crée la fenêtre et on recouvre le trou avec le Mesh
                const fenetreGeo = new THREE.BoxGeometry(fen.fenLargeur, fen.fenLongueur, fen.fenEpaisseur);
                const fenetreMaterial = new THREE.MeshBasicMaterial({ color: fen.colorFen}); //Création du matériau
                const fenetre = new THREE.Mesh(fenetreGeo, fenetreMaterial); //Création de l'objet
                //Positionnement de la fenêtre
                fenetre.position.set(fen.fenX, fen.fenY, fen.fenZ)
                //Si la fenêtre est dans un mur latéral, elle effectue une rotation
                if (maisonData.longueur2) {
                    fenetre.rotation.y = Math.PI / 2;
                }
                //Ajout de la fenêtre dans le groupe
                this.houseGroup.add(fenetre)
            });
        }

        //Si dans les données du mur il y a une fenêtre, l'ajouter :
        if (maisonData.porte){
            maisonData.porte.forEach((Porte: any) => {
                //On effectue un trou dans le mur pour ensuite le recouvrir avec la porte
                const trouPGeo = new THREE.BoxGeometry(Porte.porteLargeur, Porte.porteHauteur, maisonData.largeur);
                const trouP = new THREE.Mesh(trouPGeo);
                trouP.position.set(Porte.porteX, Porte.porteY, Porte.porteZ);
                //Si le trou est dans un mur latéral, effectuer une rotation (pour que ce soit bien aligné)
                if (maisonData.longueur2) {
                    trouP.rotation.y = Math.PI / 2;
                }
                //Mettre à jour les transformations de l'objet
                trouP.updateMatrix();

                //Soustraction pour faire l'ouverture de la porte
                murCSG = murCSG.subtract(CSG.fromMesh(trouP));

                //Création de la porte avec ses caractéristiques
                const porteGeo = new THREE.BoxGeometry(Porte.porteLargeur, Porte.porteHauteur, Porte.porteEpaisseur);
                const porteMaterial = new THREE.MeshBasicMaterial({ color: Porte.colorPorte}); //Création du matériau
                const porte = new THREE.Mesh(porteGeo, porteMaterial) //Création de l'objet
                //Positionnement de la porte, si elle se trouve dans un mur latéral on effectue une rotation
                porte.position.set(Porte.porteX, Porte.porteY, Porte.porteZ)
                if (maisonData.longueur2) {
                    porte.rotation.y = Math.PI / 2;
                }
                //Ajout de la porte dans le groupe
                this.houseGroup.add(porte)
            });
        }

        //Création du mur final avec les soustractions
        const murFinal = CSG.toMesh(murCSG, mur.matrix, mur.material);
        murFinal.position.copy(mur.position); //Position du mur
        this.houseGroup.add(murFinal); //Ajout du mur final dans le groupe

        //Retourne le groupe avec les murs, fenêtres et portes ajoutés
        return this.houseGroup;
    }
}