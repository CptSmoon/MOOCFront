import {Client} from './client';
import {Ligne_Commande} from './ligne_Commande';

export class Commande {
  public commande_id: number;
  public date: string;
  public client: Client = new Client();
  public montant: number;
  public lignes_commande: Ligne_Commande[] = [];
}
