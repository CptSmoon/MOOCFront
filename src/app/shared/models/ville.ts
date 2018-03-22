import {Region} from "./region";

export class Ville {
  ville_id:number;
  nom:string;
  deleted_at:Date;
  updated_at:Date;
  created_at:Date;
  region: Array<Region>;
}
