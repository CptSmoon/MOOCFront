import {Admin_Privilege} from "./admin_privilege";

export class Admin {
  admin_id: number;
  nom: number;
  prenom: number;
  email: number;
  privileges:Array<Admin_Privilege>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
