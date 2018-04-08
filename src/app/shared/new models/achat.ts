import {Fournisseur} from './fournisseur';
import {Operation} from './operation';
import {Ligne_Achat} from './ligne_achat';

export class Achat {
  achat_id: number;
  fournisseur_id: number;
  operation_id: number;
  montant: number;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
  fournisseur: Fournisseur = new Fournisseur();
  operation: Operation;
  lignes_achat: Ligne_Achat[] = [];
  commande_achat_id: number;
}
