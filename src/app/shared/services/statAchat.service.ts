import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../new models/commande';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {StatAchat} from "../new models/statAchat";


@Injectable()
export class StatAchatService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getStatsAchat(statAchat : StatAchat) :Observable<StatAchat>{
    const url = Config.baseUrl + '/stats/achats';
    return  this.http.post<StatAchat>(url,statAchat);
  }

}
