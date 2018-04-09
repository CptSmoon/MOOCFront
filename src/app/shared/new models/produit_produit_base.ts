import {Produit} from './produit';
import {Produit_Base} from './produit_base';
import {Lot} from './lot';

export class Produit_Produit_Base {
  produit_produit_base_id: number;

  produit_base_id: number;
  produit_id: number;
  quantite: number;
  quantite_totale: number = 0;

  livraison_id: number;
  lot_id: number;


  deleted_at: Date;
  created_at: Date;
  updated_at: Date;

  produit_base: Produit_Base;
  produit: Produit;

  lot: Lot;
  editMode: number = 1;
  position: number;
}
