import {Produit_Produit_Base} from "./produit_produit_base";
import {Taxe} from "./taxe";


export class Produit {
  public produit_id: number;
  public label: string;
  public reference: string;
  public codeABarre: string;
  public seuil: number;
  public quantite_disponible: number;
  public quantite_physique: number;
  public prix: number;


  public editMode : number = 0;
  public editMode2 : number = 0;

  public created_at: Date;
  public deleted_at: Date;
  public updated_at: Date;

  public produit_produit_base_ids: number[] = [];
  public produit_produit_bases: Produit_Produit_Base[] = [];

  public position: number = 0;
  public taxes: Taxe[] = [];
  public taxes_ids: number[] = [];
}
