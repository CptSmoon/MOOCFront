import {Produit} from './produit';
import {Formule} from './formule';

export class Lot {
  lot_id: number;
  produit_id: number;
  formule_id: number;
  quantite: number;
  cout: number;
  reference: string;
  is_finnished : boolean;
  produit: Produit;
  formule: Formule = new Formule();
  created_at : Date;
}
