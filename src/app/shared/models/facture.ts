import {Client} from "./client";
import {Livraison} from "./livraison";

export class Facture {
  facture_id:number;
  montant:number;
  client_id:number;
  client:Client;
  livraisons:Array<Livraison>;

}
