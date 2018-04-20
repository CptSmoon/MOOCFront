import {Privilege} from "./privilege";
import {Admin} from "./admin";

export class Admin_Privilege {
  admin_privilege_id: number;
  admin_id: number;
  privilege_id: number;
  privilege:Privilege;
  admin:Admin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
