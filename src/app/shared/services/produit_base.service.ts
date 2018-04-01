import {Injectable} from "@angular/core";
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {Produit_Base} from "../new models/produit_base";

@Injectable()
export class ProduitBaseService extends GenericService {
  url:string;
  constructor(private http: HttpClient) {
    super();
    this.url=Config.baseUrl+"/produit_base";
  }

  getAll(): Observable<Array<Produit_Base>> {
    return <Observable<Array<Produit_Base>>> this.http.get(this.url);
  }


}
