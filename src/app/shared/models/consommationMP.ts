import {Unite} from "./unite";
import {MatierePremiere} from "./matiere-premiere";
import {OperationMP} from "./operationMP";
import {Fournisseur} from "./fournisseur";
import {Lot} from "./lot";

export class ConsommationMP{
  consommation_mp_id:number;
  operation_id:number;
  operation:OperationMP;

  lot_id : number;

  lot: Lot;

  deleted_at:Date;
  created_at:Date;
  updated_at:Date;
}
