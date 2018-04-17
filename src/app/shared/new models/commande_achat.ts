import {Fournisseur} from './fournisseur';
import {Ligne_Commande_Achat} from './ligne_commande_achat';

//TODO fix etat everywhere not boolean

export class CommandeAchat {
  public commande_achat_id: number;
  public fournisseur_id: number;
  public montant: number;
  public n_lot: number;
  public etat: number;
  public fournisseur: Fournisseur = new Fournisseur();
  lignes_commande_achat: Ligne_Commande_Achat[] = [];
  public created_at: Date;
  public deleted_at: Date;
  public updated_at: Date;
}
