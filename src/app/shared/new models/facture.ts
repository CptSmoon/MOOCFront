import {Client} from "./client";
import {Mode_Paiement} from "./mode_paiement";

export class Facture {
  facture_id:number;
  montant:number;
  client_id:number;
  mode_paiement_id:number;
  client:Client;
  mode_paiement:Mode_Paiement;

}
