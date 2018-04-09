import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../new models/commande';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';


@Injectable()
export class CommandeService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  addCommande(commande: Commande): Observable<Commande> {
    const url = Config.baseUrl + '/commande/add';
    console.log(JSON.stringify(commande));
    return this.http.post<Commande>(url, commande);
  }

  editCommande(commande: Commande) {
    const url = Config.baseUrl + '/commande/edit';
    return this.http.put<Commande>(url, commande);
  }

  getCommandes(): Observable<Commande[]> {
    const url = Config.baseUrl + '/commande';
    return this.http.get<Commande[]>(url);
  }

  getBonCommande(id: number) {
    const url = Config.baseUrl + '/commande/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});

  }
}
