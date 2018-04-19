import {Produit} from "./produit";
import {Produit_Base} from "./produit_base";
import {Lot} from "./lot";
import {LPB_LA} from "./lpb_la";
import {Ligne_Achat} from "./ligne_achat";

export class Lot_Produit_Base {

  lot_produit_base_id:number;

  produit_base_id:number;
  quantite:number;

  livraison_id:number;
  lot_id:number;


  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
  produit_base:Produit_Base;
  lot:Lot;
  editMode: number=0;

  public lpb_la : LPB_LA[];
  public lignes_achats : Ligne_Achat[];

}
