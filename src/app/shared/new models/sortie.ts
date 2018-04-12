import {Ligne_Sortie} from "./ligne_sortie";
import {Employe} from "../models/employe";


export class Sortie {
  public sortie_id: number;
  public nom_personnel: string;
  public lignes_sortie: Ligne_Sortie[] = [];
  montant:number;
  public employe_id:number;
  public employe:Employe;
  public created_at: Date;
  public deleted_at: Date;
  public updated_at: Date;
}
