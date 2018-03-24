import {Produit} from "./produit";

export class Ligne_Sortie {
  public ligne_sortie_id: number;
  public produit: Produit;
  public produit_id: number;
  public sortie_id: number;
  public quantity: number = 0;
  public editMode: number = 1;

}

export class Sortie {
  public sortie_id: number;
  public nom_personnel: string;
  public lignes_sortie: Ligne_Sortie[] = [];

  public created_at: Date;
  public deleted_at: Date;
  public updated_at: Date;
}
