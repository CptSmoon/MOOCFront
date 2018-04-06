import {Injectable} from "@angular/core";
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {Facture} from "../new models/facture";
import {Mode_Paiement} from "../new models/mode_paiement";

@Injectable()
export class FactureService extends GenericService {
  url:string;
  constructor(private http: HttpClient) {
    super();
    this.url=Config.baseUrl+"/facture";
  }

  add(facture:Facture):Observable<Facture>{
    console.log(JSON.stringify(facture));
    return <Observable<Facture>> this.http.post(this.url+"/add",facture);
  }

  getAll():Observable<Array<Facture>>{
    return <Observable<Array<Facture>>> this.http.get(this.url);
  }

  modesPaiement():Observable<Array<Mode_Paiement>>{
    return <Observable<Array<Mode_Paiement>>>this.http.get(Config.baseUrl+'/modespaiement');
  }


}
