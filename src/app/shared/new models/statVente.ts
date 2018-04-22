import {Facture} from "./facture";
import {Livraison} from "./livraison";

export class StatVente {
  public date_deb: Date;
  public date_fin: Date;

  public factures : Facture[]=[];
  public lirvaisons_payees : Livraison[]=[];

  public total_achats : number;
  public total_HT : number;
  public total_remises : number;
  public tab_sum_taxes : number[];
}
