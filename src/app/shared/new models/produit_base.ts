import {Unite} from "./unite";

export class Produit_Base{
  produit_base_id:number;
  label:string;
  reference:string;
  seuil:number;
  cout_moyen:number;
  quantite_disponible:number;
  quantite_physique:number;
  unite_id:number;
  type_id:number;
  created_at:number;
  updated_at:number;
  deleted_at:number;
  unite:Unite;
  type:Unite;


}
