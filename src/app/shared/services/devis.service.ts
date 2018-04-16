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

  // add(facture: Facture): Observable<Facture> {
  //   return <Observable<Facture>> this.http.post(this.url + "/add", facture);
  // }
  //
  // delete(id: number): Observable<Object> {
  //   const url = Config.baseUrl + '/facture/' + id + '/delete';
  //   return this.http.delete(url);
  // }
  //
  // getById(factureId: number): Observable<Facture> {
  //   return <Observable<Facture>> this.http.get(this.url + '/' + factureId);
  // }
  //
  // edit(facture_id, facture: Facture): Observable<Object> {
  //   return <Observable<Facture>> this.http.put(this.url + "/" + facture_id + "/edit", facture);
  // }
  //
  // getBon(id: number): Observable<Object> {
  //   const url = Config.baseUrl + '/generate/facture/' + id;
  //   return this.http.get(
  //     url,
  //     {headers: this.headers, responseType: 'blob'});
  // }

}
