import {Client} from "./client";
import {Devis_Produit} from "./devis_produit";


export class Devis {
  devis_id:number;
  montant:number;
  client_id:number;
  client:Client;
  produits: Devis_Produit[]= [];
  etat:number;


}
