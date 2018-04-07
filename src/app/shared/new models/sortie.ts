import {Ligne_Sortie} from "./ligne_sortie";


export class Sortie {
  public sortie_id: number;
  public nom_personnel: string;
  public lignes_sortie: Ligne_Sortie[] = [];

  public created_at: Date;
  public deleted_at: Date;
  public updated_at: Date;
}
