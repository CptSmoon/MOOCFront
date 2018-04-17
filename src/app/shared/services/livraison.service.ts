import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Config} from '../config';
import {Observable} from 'rxjs/Observable';
import {Livraison} from '../new models/livraison';

@Injectable()
export class LivraisonService extends GenericService {
  url: string;

  /* Convert Additional */
  commandIds: number[] = [];
  clientId: number = -1;

  constructor(private http: HttpClient) {
    super();
    this.url = Config.baseUrl + '/livraison';
  }

  public getAll(): Observable<Array<Livraison>> {
    return <Observable<Array<Livraison>>> this.http.get(this.url);
  }

  public add(l: Livraison): Observable<Livraison> {
    return <Observable<Livraison>> this.http.post(this.url + '/add', l);
  }

  getBonLivraison(id: number) {
    const url = Config.baseUrl + '/livraison/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});

  }

  deleteLivraison(livraison_id: number) {
    return this.http.delete(this.url + '/' + livraison_id + '/delete');
  }

  getLivraisonById(livraisonId: number) {
    const url = Config.baseUrl + '/livraison/' + livraisonId;
    return this.http.get(url);
  }

  editLivraison(livraisonId: number, livraison: Livraison) {
    const url = Config.baseUrl + '/livraison/' + livraisonId + '/edit';
    return this.http.put(url, livraison);
  }

  paiementIllegal(livraisonId: number, livraison: Livraison) {
    const url = Config.baseUrl + '/livraison/' + livraisonId + '/pi';
    return this.http.put(url, livraison);
  }

  getLivraisonByCommandIds(clientId: number, commandIds: number[]) {
    const url = Config.baseUrl + '/livraison/commandIds';
    return this.http.post(url, {
      'commandIds': this.commandIds,
      'clientId': clientId
    });
  }
  getBon(id: number):Observable<Object> {
    const url = Config.baseUrl + '/generate/livraison/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
  }}
