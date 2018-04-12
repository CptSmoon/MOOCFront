import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {Sortie} from "../new models/sortie";


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

  getBon(id: number):Observable<Object> {
    const url = Config.baseUrl + '/generate/sortie/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
  }
}
