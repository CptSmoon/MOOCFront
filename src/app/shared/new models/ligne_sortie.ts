import {Produit} from "./produit";

export class Ligne_Sortie {
  public ligne_sortie_id: number;
  public produit: Produit;
  public produit_id: number;
  public sortie_id: number;
  public quantity: number = 0;
  public editMode: number = 1;
  public total_price:number;
  public quantite_reelle:number;

}
