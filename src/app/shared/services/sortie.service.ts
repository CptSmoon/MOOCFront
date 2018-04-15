import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {Sortie} from "../new models/sortie";
import {Livraison} from "../new models/livraison";


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

  delete(id: number) {
    const url = Config.baseUrl + '/sortie/' + id + '/delete';
    return this.http.delete(url);
  }

  getById(sortieId: number):Observable<Sortie> {
    const url = Config.baseUrl + '/sortie/'+sortieId;
    return <Observable<Sortie>>this.http.get(url);

  }


  edit(sortieId: number, sortie: Sortie) {
    const url = Config.baseUrl + '/sortie/' + sortieId + '/edit';
    return this.http.put(url, sortie);
  }
}
