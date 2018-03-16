import {Produit} from './produit';

export class Ligne_Commande {
  public ligne_commande_id: number;
  public produit: Produit;
  public quantity: number;
  public editMode: boolean = true;
}
