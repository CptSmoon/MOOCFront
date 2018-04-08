import {Produit} from "./produit";

export class Livraison_Produit {
  livraison_produit_id:number;
  livraison_id:number;
  produit_id:number;
  quantite:number;
  gratuite:number = 0;
  remise:number = 0;
  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
  produit:Produit;
  editMode:number;
}