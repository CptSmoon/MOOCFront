import {Client} from './client';
import {Facture} from './facture';
import {Livraison_Produit} from './livraison_produit';
import {Sortie} from "./sortie";

export class Livraison {
  livraison_id: number;
  produits: Livraison_Produit[] = [];
  date_echeance: Date;
  date: Date;
  etat: number;
  montant: number;

  client_id: number;
  facture_id: number;
  isConverted:boolean;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
  client: Client;
  facture: Facture;
  sortie_id:number;
  sortie:Sortie;
  message:string;


}
