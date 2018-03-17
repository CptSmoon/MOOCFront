import {Produit} from './produit';

export class Ligne_Commande {
  public ligne_commande_id: number;
  public produit: Produit;
  public produit_id: number;
  public commande_id: number;
  public quantity: number = 0;
  public editMode: number = 1;
}
