export interface objets {
    mur1X: number;
    mur1Y: number;
    mur1Z: number;
    mur2X: number;
    mur2Y: number;
    mur2Z: number;
    mur3X: number;
    mur3Y: number;
    mur3Z: number;
    mur4X: number;
    mur4Y: number;
    mur4Z: number;
    largeur: number;
    longueur1: number;
    longueur2: number
    hauteur: number;
    fenlargeur: number;
    fenlongueur: number;
    fenepaisseur: number;
    portelargeur: number;
    portehauteur: number;
    portepaisseur: number;
    largeursol: number;
    longueursol: number;
    epaisseur: number;
    largeurplan: number;
    solX: number;
    solY: number;
    solZ: number;
    planX: number;
    planY: number;
    planZ: number;
    colormur: string;
    colorfen: string;
    colorporte: string;
    colorplan: string;
    colorsol: string;
}

export const objets: objets[] = [
    {
        mur1X: 0, mur1Y: 2.5/2, mur1Z: 2.5,
        mur2X: -3.9, mur2Y: 2.5/2, mur2Z: 0,
        mur3X: 0, mur3Y: 2.5/2, mur3Z: -2.5,
        mur4X: 3.9, mur4Y: 2.5/2, mur4Z: 0,
        solX: 0, solY: 0, solZ: 0,
        planX: 0, planY: 2.5, planZ: 0,
        largeur: 0.2, longueur1: 8, longueur2: 5, hauteur: 2.5,
        fenlargeur: 1.5, fenlongueur: 1.2, fenepaisseur: 0.05,
        portelargeur: 1, portehauteur: 2.1, portepaisseur: 0.05,
        largeursol: 5, longueursol: 8, epaisseur: 0.2,
        largeurplan: 6, colormur: '#939597', colorfen: '#ae2012', 
        colorporte: '#386641', colorplan: '#1b263b', colorsol: '#7f4f24'
    }
]