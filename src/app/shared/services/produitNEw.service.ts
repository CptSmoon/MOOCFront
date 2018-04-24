import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit} from "../new models/produit";
import {Taxe} from "../new models/taxe";
import {StorageService} from "./storage.service";

@Injectable()
export class ProduitNEwService extends GenericService {

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
  }

  getProduits(): Observable<Produit[]> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/produit';
    return this.http.get<Produit[]>(url,{headers:headers});
  }

  add(produit: Produit): Observable<Produit> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/produit/add';
    return this.http.post<Produit>(url, produit,{headers:headers});
  }

  editProduit(produit: Produit): Observable<Produit> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/produit/edit';
    return this.http.put<Produit>(url, produit,{headers:headers});
  }

  getTaxes(): Observable<Taxe[]> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/produit/taxes';
    return this.http.get<Taxe[]>(url,{headers:headers});
  }
  deleteProduit(produit_id: number): Observable<Produit> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/produit/' + produit_id;
    return this.http.delete<Produit>(url,{headers:headers});
  }

  getProduitDetails(produit_id: number): Observable<Produit> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/produit/' + produit_id;
    return this.http.get<Produit>(url,{headers:headers});
  }

  editCompositionProduit(selectedProduit: Produit) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/produit/editComposition';
    return this.http.put<Produit>(url, selectedProduit,{headers:headers});
  }
}
