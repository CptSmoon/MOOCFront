import {Client} from "./client";
import {Mode_Paiement} from "./mode_paiement";
import {Facture_Produit} from "./facture_produit";


export class Facture {
  facture_id:number;
  montant:number;
  client_id:number;
  mode_paiement_id:number;
  client:Client;
  mode_paiement:Mode_Paiement;
  produits: Facture_Produit[]= [];
  etat:number;

  totalRemise : number;
  totalHT : number;
  taxe_pourcentages : number[];
}
