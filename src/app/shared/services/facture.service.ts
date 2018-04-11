import {Injectable} from "@angular/core";
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {Facture} from "../new models/facture";
import {Mode_Paiement} from "../new models/mode_paiement";

@Injectable()
export class FactureService extends GenericService {
  url: string;
  livraisonsIds: number[];
  clientId: number;

  constructor(private http: HttpClient) {
    super();
    this.url = Config.baseUrl + "/facture";
  }

  add(facture: Facture): Observable<Facture> {
    return <Observable<Facture>> this.http.post(this.url + "/add", facture);
  }

  getAll(): Observable<Array<Facture>> {
    return <Observable<Array<Facture>>> this.http.get(this.url);
  }

  modesPaiement(): Observable<Array<Mode_Paiement>> {
    return <Observable<Array<Mode_Paiement>>>this.http.get(Config.baseUrl + '/modespaiement');
  }

  delete(id: number): Observable<Object> {
    const url = Config.baseUrl + '/facture/' + id + '/delete';
    return this.http.delete(url);
  }

  getById(factureId: number): Observable<Facture> {
    return <Observable<Facture>> this.http.get(this.url + '/' + factureId);
  }

  edit(facture: Facture):Observable<Object>{
    return <Observable<Facture>> this.http.put(this.url +"/"+ facture.facture_id+ "/edit", facture);
  }

  getBon(id: number):Observable<Object> {
    const url = Config.baseUrl + '/generate/facture/' + id ;
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
  }

  getFactureByLivraisonIds(clientId: number, livraisonIds: number[]) {
    const url = Config.baseUrl + '/facture/livraisonIds';
    console.log(JSON.stringify({
      'livraisonIds': this.livraisonsIds,
      'clientId': clientId
    }));
    return this.http.post(url, {
      'livraisonIds': this.livraisonsIds,
      'clientId': clientId
    });
  }
}
