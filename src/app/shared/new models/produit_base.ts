import {Unite} from './unite';
import {Type} from './type';
import {Taxe} from "./taxe";

export class Produit_Base {
  produit_base_id: number;
  label: string;
  reference: string;
  seuil: number;
  cout_moyen: number;
  quantite_disponible: number;
  quantite_physique: number;
  unite_id: number;
  type_id: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  unite: Unite = new Unite();
  type: Type = new Type();
  position: number = 0;
  editMode: number = 0;
  taxes_ids:Array<number>;
  taxes:Array<Taxe>;


}
