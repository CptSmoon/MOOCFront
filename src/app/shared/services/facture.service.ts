import {Injectable} from "@angular/core";
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {MatierePremiere} from "../models/matiere-premiere";
import {Facture} from "../models/facture";

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

}
