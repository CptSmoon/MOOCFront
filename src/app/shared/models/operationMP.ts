import {Unite} from "./unite";
import {MatierePremiere} from "./matiere-premiere";

export class OperationMP{
  operation_MP_id:number;
  date:string;
  quantite:number
  unite_id: number;
  matiere_premiere_id:number;
  unite:Unite;
  mp:MatierePremiere;
  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
}
