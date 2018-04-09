import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config';
import {Observable} from 'rxjs/Observable';
import {Lot} from '../new models/lot';
import {AdminService} from './admin.service';
import {Produit} from '../new models/produit';

@Injectable()
export class LotNEwService extends GenericService {

  constructor(private adminService: AdminService, private http: HttpClient) {
    super();
  }

  editLot(lot: Lot) {
    // const headers = this.headers.set('Authorization', this.adminService.adminToken);
    const url = Config.baseUrl + '/lot/edit';
    // return this.http.post<Lot>(url,lot,{headers});
    return this.http.put<Lot>(url, lot);
  }

  getAllLots() {
    // const headers = this.headers.set('Authorization', this.adminService.adminToken);
    const url = Config.baseUrl + '/lot';
    // return this.http.get<Lot[]>(url,{headers});
    return this.http.get<Lot[]>(url);
  }

  addLot(lot: Lot) {
    // const headers = this.headers.set('Authorization', this.adminService.adminToken);
    const url = Config.baseUrl + '/lot/add';
    // return this.http.post<Lot>(url,lot,{headers});
    return this.http.post<Lot>(url, lot);
  }

  setFinnished(lot: Lot) {
    // const headers = this.headers.set('Authorization', this.adminService.adminToken);
    const url = Config.baseUrl + '/lot/setFinnished';
    console.log(url);
    // return this.http.get<Lot[]>(url,{headers});
    return this.http.put<Lot>(url, lot);

  }

  editCompositionProduit(selectedLot: Lot) {
    const url = Config.baseUrl + '/lot/editComposition';
    return this.http.put<Lot>(url, selectedLot);
  }

  getFicheControle(lot_id: number) {
    const url = Config.baseUrl + '/generate/lot/' + lot_id + '/fichecontrole';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
  }
}
