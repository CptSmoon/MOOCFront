import {Produit} from "./produit";
import {Facture} from "./facture";

export class Facture_Produit {
  facture_produit_id:number;
  facture_id:number;
  produit_id:number;
  quantite:number;
  gratuite:number = 0;
  remise:number = 0;
  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
  produit:Produit;
  editMode:number;
  facture:Facture;
}
