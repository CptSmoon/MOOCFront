import {Produit} from './produit';
import {Commande} from './commande';
import {Produit_Base} from './produit_base';
import {CommandeAchat} from './commande_achat';

export class Ligne_Commande_Achat {
  public ligne_commande_achat_id: number;

  public quantite: number;
  public cout: number = 0;
  public coutUnite:number;

  public produit_base_id: number;
  public commande_achat_id: number;
  public produit_base: Produit_Base = new Produit_Base();
  public commande_achat: CommandeAchat;
  public editMode: number = 1;
}
