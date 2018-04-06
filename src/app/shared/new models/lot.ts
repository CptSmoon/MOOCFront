import {Produit} from "./produit";

export class Lot {
  lot_id: number;
  quantite: number;
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
  produit: Produit;

  public editMode : number = 0;

  lot_produit_bases:number[];
  created_at : Date;
  inputQtReele: boolean = false;
}
