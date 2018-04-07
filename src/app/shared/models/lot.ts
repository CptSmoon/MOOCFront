import {Produit} from './produit';
import {Formule} from './formule';
import {Lot_Produit_Base} from "../new models/lot_produit_base";
import {Produit_Base} from "../new models/produit_base";

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
  lots_produits_bases : Lot_Produit_Base[];
  produits_bases : Produit_Base[];
}
