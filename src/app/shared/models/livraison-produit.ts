import {Produit} from "./produit";

export class LivraisonProduit {
  livraison_produit_id:number;
  livraison_id:number;
  produit_id:number;
  quantite:number;
  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
  produit:Produit;
}
