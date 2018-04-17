import {Produit} from "./produit";
import {Lot_Produit_Base} from "./lot_produit_base";
import {Ligne_Achat} from "./ligne_achat";

export class LPB_LA {
  public lpb_la_id: number;

  public quantite: number;

  public lot_produit_base_id: number;
  public lot_produit_base: Lot_Produit_Base;

  public ligne_achat_id: number;
  public ligne_achat: Ligne_Achat;

}
