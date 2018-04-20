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
import {StorageService} from "./storage.service";

@Injectable()
export class AchatMPService extends GenericService {
  url:string;
  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
    this.url=Config.baseUrl+"/achatmp";
  }

  getAll(): Observable<Array<AchatMP>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<AchatMP>>> this.http.get(this.url,{headers:headers});
  }

  add(unit:Unite, date:Date, quantite:number, fournisseur:Fournisseur, mp:MatierePremiere, prix:number):Observable<MatierePremiere>{
    let body:Object;
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    body = {
      unite_id:unit.unite_id,
      date:date,
      quantite:quantite,
      fournisseur_id:fournisseur.fournisseur_id,
      matiere_premiere_id:mp.matiere_premiere_id,
      prix:prix
    };
    return <Observable<MatierePremiere>> this.http.post(this.url + "/add" , body,{headers:headers});
    }

}
