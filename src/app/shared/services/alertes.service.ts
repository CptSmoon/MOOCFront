import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit} from "../new models/produit";
import {Taxe} from "../new models/taxe";
import {Alertes} from "../models/Alertes";
import {Produit_Base} from "../new models/produit_base";
import {Facture} from "../models/facture";

@Injectable()
export class AlertesService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }
  getNombreTotalAlertes(): Observable<Alertes> {
    const url = Config.baseUrl + '/alertes';
    return this.http.get<Alertes>(url);
  }

  getProduitsAlerted(): Observable<Produit[]> {
    const url = Config.baseUrl + '/alertes/produits';
    return this.http.get<Produit[]>(url);
  }

  getProduitsBasesAlerted(): Observable<Produit_Base[]> {
    const url = Config.baseUrl + '/alertes/produitsBases';
    return this.http.get<Produit_Base[]>(url);
  }

  getFacturesAlerted(): Observable<Facture[]> {
    const url = Config.baseUrl + '/alertes/factures';
    return this.http.get<Facture[]>(url);
  }

}
