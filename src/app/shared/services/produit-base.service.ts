import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {Produit} from '../models/produit';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit_Base} from "../new models/produit_base";

@Injectable()
export class ProduitBaseService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll():Observable<Array<Produit_Base>>{
    return <Observable<Array<Produit_Base>>> this.http.get(Config.baseUrl+'/produitbase');
  }

}
