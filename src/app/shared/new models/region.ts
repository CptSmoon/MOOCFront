import {Ville} from "./ville";

export class Region {
  region_id:number;
  ville_id:number;
  nom:string;
  ville:Ville;
  deleted_at:Date;
  updated_at:Date;
  created_at:Date;
}
