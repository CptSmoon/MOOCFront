import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {Produit} from '../models/produit';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit_Base} from "../new models/produit_base";
import {CommandeAchat} from "../new models/commande_achat";
import {Achat} from "../new models/achat";

@Injectable()
export class AchatService extends GenericService {
  constructor(private http: HttpClient) {
    super();
  }

  public add(a:Achat):Observable<Achat>{
    const url=Config.baseUrl+'/achat/add';
    console.log(JSON.stringify(a));
    return <Observable<Achat>>this.http.post(url, a);
  }


  getAll():Observable<Array<Achat>>{
    return <Observable<Array<Achat>>> this.http.get(Config.baseUrl+'/achat');
  }
}
