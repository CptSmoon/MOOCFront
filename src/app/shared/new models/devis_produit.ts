import {Produit} from './produit';
import {Devis} from './devis';

export class Devis_Produit {
  devis_produit_id: number;
  devis_id: number;
  produit_id: number;
  quantite: number;
  gratuite: number = 0;
  remise: number = 0;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
  produit: Produit;
  editMode: number;
  devis: Devis;
  total_price: number = 0;
}
