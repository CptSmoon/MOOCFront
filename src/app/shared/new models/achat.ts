import {Fournisseur} from "./fournisseur";
import {Operation} from "./operation";

export class Achat{
  achat_id:number;
  fournisseur_id:number;
  operation_id:number;
  montant:number;
  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
  fournisseur : Fournisseur;
  operation : Operation;
}
