import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../new models/commande';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {StatAchat} from "../new models/statAchat";
import {StatVente} from "../new models/statVente";


@Injectable()
export class StatVenteService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getStatsVente(statVente : StatVente) :Observable<StatVente>{
    const url = Config.baseUrl + '/stats/ventes';
    return  this.http.post<StatVente>(url,statVente);
  }

}
