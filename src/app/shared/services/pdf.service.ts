import {Injectable} from "@angular/core";
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {MatierePremiere} from "../models/matiere-premiere";
import {AchatMP} from "../models/achatMP";
import {FournisseurService} from "./Fournisseur.service";
import {Fournisseur} from "../models/fournisseur";
import {Unite} from "../models/unite";

@Injectable()
export class PdfService extends GenericService {
  url:string;
  constructor(private http: HttpClient) {
    super();
    this.url=Config.baseUrl+"/generate";
  }

  public commande(id:number){
    window.open(this.url+'/commande/'+id);
  }
  public livraison(id:number){
    window.open(this.url+'/livraison/'+id);
  }
  public facture(id:number){
    window.open(this.url+'/facture/'+id);
  }
  public sortie(id:number){
    window.open(this.url+'/sortie/'+id);
  }
  public ficheDeControle(id:number){
    window.open(this.url+'/lot/'+id);

  }

}
