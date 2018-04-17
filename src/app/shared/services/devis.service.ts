import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {Devis} from "../new models/devis";

@Injectable()
export class DevisService extends GenericService {
  url: string;

  constructor(private http: HttpClient) {
    super();
    this.url = Config.baseUrl + "/devis";
  }

  getAll(): Observable<Array<Devis>> {
    return <Observable<Array<Devis>>> this.http.get(this.url);
  }

  add(devis: Devis): Observable<Devis> {
    return <Observable<Devis>> this.http.post(this.url + "/add", devis);
  }
  // delete(id: number): Observable<Object> {
  //   const url = Config.baseUrl + '/facture/' + id + '/delete';
  //   return this.http.delete(url);
  // }
  //
  getById(devisId: number): Observable<Devis> {
    return <Observable<Devis>> this.http.get(this.url + '/' + devisId);
  }
  //
  edit(devisId, devis: Devis): Observable<Object> {
    return <Observable<Devis>> this.http.put(this.url + "/" + devisId + "/edit", devis);
  }
  //
  // getBon(id: number): Observable<Object> {
  //   const url = Config.baseUrl + '/generate/facture/' + id;
  //   return this.http.get(
  //     url,
  //     {headers: this.headers, responseType: 'blob'});
  // }

}
