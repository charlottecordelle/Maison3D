//Caractéristiques d'un mur
export interface murs {
    murX: number;
    murY: number;
    murZ: number;
    largeur: number;
    longueur1?: number;
    longueur2?: number
    hauteur: number;
    colorMur: string;
    fenetresMur?: fenetre[];
    porte?: porte[]
}

//Caractéristiques d'une fenêtre
export interface fenetre {
    fenLargeur: number;
    fenLongueur: number;
    fenEpaisseur: number;
    fenX: number;
    fenY: number;
    fenZ: number;
    colorFen: string;
}

//Caractéristiques d'une porte
export interface porte {
    porteLargeur: number;
    porteHauteur: number;
    porteEpaisseur: number;
    colorPorte: string;
    porteX: number;
    porteY: number;
    porteZ: number;
}

//Caractéristiques du sol
export interface sol {
    solX: number;
    solY: number;
    solZ: number;
    largeurSol: number;
    longueurSol: number;
    epaisseur: number;
    colorSol: string;
}

//Caractéristiques du plancher
export interface plancher {
    longueurSol: number;
    epaisseur: number;
    largeurPlan: number;
    planX: number;
    planY: number;
    planZ: number;
    colorPlan: string;
}

//Globalité de la maison regroupant murs (les portes et fenêtres sont déjà dedans), sol et plancher
export interface maison {
    murs: murs[];
    sol: sol;
    plancher: plancher
}

//Données de la maison
export const maison: maison = {
    murs: [
        {
            //Données du premier mur
            murX: 0, murY: 2.5/2, murZ: 2.5, // Hauteur du mur divisée par 2 (pour centrer sur l’axe Y) sur chaque objet
            longueur1: 8, hauteur: 2.5, largeur: 0.2,
            colorMur: '#939597',
            //Ajout d'une fenêtre et ses données (C'est ici qu'on va les ajouté pour chaque mur)
            fenetresMur: [
                { fenLargeur: 1.5, fenLongueur: 1.2, fenEpaisseur: 0.05, fenX: 0, fenY: 2.5/2, fenZ: 2.5, colorFen: '#ae2012' }
            ]
        },
        {
            //Données du deuxième mur
            murX: -3.9, murY: 2.5/2, murZ: 0,
            longueur2: 5, hauteur: 2.5, largeur: 0.2,
            colorMur: '#939597',
            //Ajout d'une porte et ses données (C'est ici qu'on va les ajouté pour chaque mur)
            porte: [
                { porteLargeur: 1, porteHauteur: 2.1, porteEpaisseur: 0.05, porteX: -3.9, porteY: 2.5/2, porteZ: 0, colorPorte: '#386641' }
            ],
        },
        {
            //Données du troisième mur
            murX: 0, murY: 2.5/2, murZ: -2.5,
            longueur1: 8, hauteur: 2.5, largeur: 0.2,
            colorMur: '#939597',
            //Ajout d'une fenêtre et ses données
            fenetresMur: [
                { fenLargeur: 1.5, fenLongueur: 1.2, fenEpaisseur: 0.05, fenX: 0, fenY: 2.5/2, fenZ: -2.5, colorFen: '#ae2012' }
            ]
        },
        {
            //Données du quatrième mur
            murX: 3.9, murY: 2.5/2, murZ: 0,
            longueur2: 5, hauteur: 2.5, largeur: 0.2,
            colorMur: '#939597',
            //Ajout d'une fenêtre et ses données
            fenetresMur: [
                { fenLargeur: 2, fenLongueur: 1.5, fenEpaisseur: 0.05, fenX: 3.9, fenY: 2.5/2, fenZ: 0, colorFen: '#ae2012' }
            ]
        }
    ],
    sol: {
        //Données du sol
        solX: 0, solY: 0, solZ: 0, largeurSol: 5, longueurSol: 8, epaisseur: 0.2, colorSol: '#7f4f24'
    },
    plancher: {
        //Données du plancher
        planX: 0, planY: 2.5, planZ: 0, largeurPlan: 6, longueurSol: 8, epaisseur: 0.2, colorPlan: '#1b263b'
    }
};
