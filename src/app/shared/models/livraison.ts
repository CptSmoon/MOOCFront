import {Client} from "./client";
import {LivraisonProduit} from "./livraison-produit";

export class Livraison {
  livraison_id:number;
  client_id:number;
  facture_id:number;
  montant:number;
  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
  client:Client;
  produits:Array<LivraisonProduit>;


}
