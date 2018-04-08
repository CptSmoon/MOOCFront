import {Client} from "./client";
import {Ligne_Commande} from "./ligne_commande";
//TODO fix etat everywhere not boolean

export class Commande {
  public commande_id: number;
  public client: Client = new Client();
  public client_id: number;
  public montant: number;
  public etat : boolean;

  public lignes_commande: Ligne_Commande[] = [];

  public created_at: Date;
  public deleted_at: Date;
  public updated_at: Date;
  public selected:boolean;
}
