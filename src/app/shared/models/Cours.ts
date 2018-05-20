import {Auteur} from "./Auteur";
import {Sujet} from "./Sujet";

export class Cours {
  id : number;
  label : string;
  description : string;
  nombre_heures : string;
  auteur_id : number;
  sujet_id : number;
  auteur : Auteur;
  sujet : Sujet;
  image_name : string;
  pdf_name: string;
}
