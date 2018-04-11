import {TypeClient} from "./type-client";
import {Region} from "./region";
import {Livraison} from "./livraison";

export class Employe {
  public employe_id: number;
  nom:string;
  prenom:string;
  mobile:number;
  email:string;
  cin:number;
  num_carte:number;
  adresse:string;
  code_postal:number;
  remarque:string;

}
