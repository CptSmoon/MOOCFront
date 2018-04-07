import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit} from "../new models/produit";

@Injectable()
export class ProduitNEwService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getProduits(): Observable<Produit[]> {
    const url = Config.baseUrl + '/produit';
    return this.http.get<Produit[]>(url);
  }

  addProduit(produit: Produit): Observable<Produit> {
    const url = Config.baseUrl + '/produit/add';
    return this.http.post<Produit>(url, produit);
  }

  editProduit(produit: Produit): Observable<Produit> {
    const url = Config.baseUrl + '/produit/edit';
    return this.http.put<Produit>(url, produit);
  }

  deleteProduit(produit_id: number): Observable<Produit> {
    const url = Config.baseUrl + '/produit/' + produit_id;
    return this.http.delete<Produit>(url);
  }

  getProduitDetails(produit_id: number): Observable<Produit> {
    const url = Config.baseUrl + '/produit/' + produit_id;
    return this.http.get<Produit>(url);
  }

  editCompositionProduit(selectedProduit: Produit) {
    const url = Config.baseUrl + '/produit/editComposition';
    return this.http.put<Produit>(url, selectedProduit);
  }
}
