import {TypeClient} from "./type-client";
import {Region} from "./region";
import {Livraison} from "./livraison";
import {Contrat} from "./contrat";
import {Fonction} from "./fonction";

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
  salaire:number;
  prime:number;
  date_cin :Date;
  date_naissance : Date;
  n_enfants:number;
  date_debut_service: Date;
  contrat_id : number;
  fonction_id : number;
  contrat : Contrat;
  fonction: Fonction;

}
