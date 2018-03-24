import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../models/commande';
import {Observable} from 'rxjs/Observable';
import {Formule} from '../models/formule';
import {Config} from '../config';
import {Emballage} from '../models/emballage';
import {Sortie} from "../models/sortie";


@Injectable()
export class SortieService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  addSortie(sortie: Sortie): Observable<Sortie> {
    const url = Config.baseUrl + '/sortie/add';
    return this.http.post<Sortie>(url, sortie);
  }

  getSorties(): Observable<Sortie[]> {
    const url = Config.baseUrl + '/sortie';
    return this.http.get<Sortie[]>(url);
  }
}
