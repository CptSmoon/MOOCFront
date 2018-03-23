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
import {ConsommationMP} from "../models/consommationMP";

@Injectable()
export class ConsommationMPService extends GenericService {
  url:string;
  constructor(private http: HttpClient) {
    super();
    this.url=Config.baseUrl+"/consommationmp";
  }

  getAll(): Observable<Array<ConsommationMP>> {
    return <Observable<Array<ConsommationMP>>> this.http.get(this.url);
  }


}
