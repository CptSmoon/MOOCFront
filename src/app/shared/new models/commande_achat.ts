import {Client} from "./client";
import {Ligne_Commande} from "./ligne_commande";
import {Fournisseur} from "./fournisseur";
//TODO fix etat everywhere not boolean

export class Commande_Achat {
  public commande_achat_id: number;

  public client_id: number;
  public fournisseur_id: number;
  public montant: number;
  public etat : boolean;

  public client: Client = new Client();
  public fournisseur: Fournisseur ;

  // public lignes_commande: Ligne_Commande[] = [];

  public created_at: Date;
  public deleted_at: Date;
  public updated_at: Date;
}
