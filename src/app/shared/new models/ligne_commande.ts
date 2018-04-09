import {Produit} from './produit';
import {Commande} from './commande';

export class Ligne_Commande {
  public ligne_commande_id: number;
  public remise: number = 0;
  public quantite: number = 0;
  public gratuite: number = 0;


  public produit_id: number;
  public commande_id: number;
  public produit: Produit;
  public commande: Commande;
  public editMode: number = 1;
  public total_price: number = 0;
}
