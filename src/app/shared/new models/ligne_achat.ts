import {Produit} from './produit';
import {Produit_Base} from "./produit_base";
import {Achat} from "./achat";

export class Ligne_Achat {
  public ligne_achat_id: number;
  public produit: Produit;
  public quantite: number;
  public cout: number;

  public produit_base_id: number;
  public achat_id: number;
  public produit_base : Produit_Base;
  public achat : Achat;

  public editMode: number = 1;
}
