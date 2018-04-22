import {Achat} from "./achat";
import {Depense} from "./depense";

export class StatAchat {
  public date_deb: Date;
  public date_fin: Date;

  public achats : Achat[]=[];
  public depenses : Depense[]=[];

  public total_achats : number;
  public total_HT : number;
  public total_remises : number;
  public tab_sum_taxes : number[];
}
