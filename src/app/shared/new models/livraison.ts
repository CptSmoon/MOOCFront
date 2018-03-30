import {Client} from "./client";
import {Facture} from "./facture";

export class Livraison {
  livraison_id:number;

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
