import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Config} from '../config';
import {Observable} from 'rxjs/Observable';
import {Livraison} from '../new models/livraison';
import {StorageService} from "./storage.service";

@Injectable()
export class LivraisonService extends GenericService {
  url: string;

  /* Convert Additional */
  commandIds: number[] = [];
  clientId: number = -1;

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
    this.url = Config.baseUrl + '/livraison';
  }

  public getAll(): Observable<Array<Livraison>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Livraison>>> this.http.get(this.url,{headers:headers});
  }

  public add(l: Livraison): Observable<Livraison> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Livraison>> this.http.post(this.url + '/add', l,{headers:headers});
  }

  getBonLivraison(id: number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/livraison/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});

  }

  deleteLivraison(livraison_id: number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return this.http.delete(this.url + '/' + livraison_id + '/delete',{headers:headers});
  }

  getLivraisonById(livraisonId: number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/livraison/' + livraisonId;
    return this.http.get(url,{headers:headers});
  }

  editLivraison(livraisonId: number, livraison: Livraison) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/livraison/' + livraisonId + '/edit';
    return this.http.put(url, livraison,{headers:headers});
  }

  paiementIllegal(livraisonId: number, livraison: Livraison) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/livraison/' + livraisonId + '/pi';
    return this.http.get(url,{headers:headers});
  }

  getLivraisonByCommandIds(clientId: number, commandIds: number[]) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/livraison/commandIds';
    return this.http.post(url, {
      'commandIds': this.commandIds,
      'clientId': clientId
    },{headers:headers});
  }
  getBon(id: number):Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/generate/livraison/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
  }}
