import {Produit} from "./produit";
import {Produit_Base} from "./produit_base";
import {Lot} from "./lot";
import {Taxe} from "./taxe";

export class Produit_Taxe {
  produit_taxe_id:number;

  produit_id:number;
  taxe_id:number;
  quantite:number;

  livraison_id:number;


  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
  produit:Produit;
  taxe:Taxe;
}
