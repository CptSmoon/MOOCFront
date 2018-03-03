import {Produit} from "./produit";



export class Formule {
  public formule_id : number;
  public produit_id : number;
  public produit : Produit;
  public formules_matieres_premieres : Formule_Matiere_Premiere[];
}

export class Formule_Matiere_Premiere {
  public id : number;
  public formule_id : number;
  public matiere_premiere_id : number;
  public unite_id : number;
  public quantite : number;
}
