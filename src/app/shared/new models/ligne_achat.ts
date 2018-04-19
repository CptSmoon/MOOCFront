import {Produit} from './produit';
import {Produit_Base} from './produit_base';
import {Achat} from './achat';
import {LPB_LA} from "./lpb_la";

class Pivot {
lot_produit_base_id : number;
ligne_achat_id : number;
quantite :number;
}

export class Ligne_Achat {
  public ligne_achat_id: number;
  public quantite: number;
  public quantite_disponible: number;
  public quantite_totale: number;
  public cout: number;
  public produit_base_id: number;
  public achat_id: number;
  public produit_base: Produit_Base;
  public achat: Achat = new Achat();
  public date_expiration : Date;
  public n_lot : number;

  public lpb_la : LPB_LA[];
  public pivot : Pivot;

}
