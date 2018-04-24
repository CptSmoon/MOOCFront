import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {Sortie} from "../new models/sortie";
import {Livraison} from "../new models/livraison";
import {StorageService} from "./storage.service";


@Injectable()
export class SortieService extends GenericService {

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
  }

  addSortie(sortie: Sortie): Observable<Sortie> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/sortie/add';
    return this.http.post<Sortie>(url, sortie,{headers:headers});
  }

  getSorties(): Observable<Sortie[]> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/sortie';
    return this.http.get<Sortie[]>(url,{headers:headers});
  }

  getBon(id: number):Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/generate/sortie/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
  }

  delete(id: number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/sortie/' + id + '/delete';
    return this.http.delete(url,{headers:headers});
  }

  getById(sortieId: number):Observable<Sortie> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/sortie/'+sortieId;
    return <Observable<Sortie>>this.http.get(url,{headers:headers});

  }


  edit(sortieId: number, sortie: Sortie) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/sortie/' + sortieId + '/edit';
    return this.http.put(url, sortie,{headers:headers});
  }
}
