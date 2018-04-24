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
import {StorageService} from "./storage.service";

@Injectable()
export class FactureService extends GenericService {
  url: string;
  livraisonsIds: number[];
  clientId: number;

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
    this.url = Config.baseUrl + "/facture";
  }

  add(facture: Facture): Observable<Facture> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Facture>> this.http.post(this.url + "/add", facture,{headers:headers});
  }

  getAll(): Observable<Array<Facture>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Facture>>> this.http.get(this.url,{headers:headers});
  }

  modesPaiement(): Observable<Array<Mode_Paiement>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Mode_Paiement>>>this.http.get(Config.baseUrl + '/modespaiement',{headers:headers});
  }

  delete(id: number): Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/facture/' + id + '/delete';
    return this.http.delete(url,{headers:headers});
  }

  getById(factureId: number): Observable<Facture> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Facture>> this.http.get(this.url + '/' + factureId,{headers:headers});
  }

  edit(facture_id, facture: Facture): Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Facture>> this.http.put(this.url + "/" + facture_id + "/edit", facture,{headers:headers});
  }

  getBon(id: number): Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/generate/facture/' + id;
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
  }

  getFactureByLivraisonIds(clientId: number, livraisonIds: number[]) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/facture/livraisonIds';
    console.log(JSON.stringify({
      'livraisonIds': this.livraisonsIds,
      'clientId': clientId
    }));
    return this.http.post(url, {
      'livraisonIds': this.livraisonsIds,
      'clientId': clientId
    },{headers:headers});
  }
}
