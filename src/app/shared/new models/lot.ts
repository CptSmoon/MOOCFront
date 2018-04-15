import {Produit} from "./produit";
import {Lot_Produit_Base} from "./lot_produit_base";

export class Lot {
  lot_id: number;
  quantite: number;
  expiration: number;
  cout: number;
  seuil: number;
  quantite_calculee: number = 0;
  quantite_voulue: number = 0;
  quantite_reele: number = 0;
  label: string;
  reference: string;
  etat : number;
  produit_id: number;
  date_fabrication : Date;
  date_expiration : Date;
  produit: Produit;

  public editMode : number = 0;

  lot_produit_bases:Lot_Produit_Base[];
  created_at : Date;
  inputQtReele: boolean = false;
  editMode2: number=0;
}
