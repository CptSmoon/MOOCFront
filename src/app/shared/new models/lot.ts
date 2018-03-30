import {Produit} from "./produit";

export class Lot {
  lot_id: number;
  quantite: number;
  cout: number;
  seuil: number;
  quantite_calculee: number;
  quantite_voulue: number;
  quantite_reele: number;
  label: string;
  reference: string;
  is_finnished : boolean;
  produit_id: number;

  produit: Produit;

  created_at : Date;
}
