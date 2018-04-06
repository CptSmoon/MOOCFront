import {Client} from "./client";
import {Facture} from "./facture";
import {Livraison_Produit} from "./livraison_produit";

export class Livraison {
  livraison_id:number;
  produits:Array<Livraison_Produit>
  date_echeance:Date;
  date:Date;
  etat:Boolean;
  montant:number;

  client_id:number;
  facture_id:number;


  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
  client:Client;
  facture:Facture;


}
