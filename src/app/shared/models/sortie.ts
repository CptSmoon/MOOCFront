import {Client} from './client';
import {Ligne_Commande} from './ligne_Commande';

export class Commande {
  public commande_id: number;
  public client: Client = new Client();
  public client_id: number;
  public montant: number;
  public lignes_commande: Ligne_Commande[] = [];

  public created_at: Date;
  public deleted_at: Date;
  public updated_at: Date;
}
