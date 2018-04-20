import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit_Base} from '../new models/produit_base';
import {Type} from '../new models/type';
import {StorageService} from "./storage.service";



@Injectable()
export class ProduitBaseService extends GenericService {

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
  }

  getAll(): Observable<Array<Produit_Base>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Produit_Base>>> this.http.get(Config.baseUrl + '/produitbase',{headers:headers});
  }

  edit(produit_base_id: number, produit_base: Produit_Base):Observable<Produit_Base> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Produit_Base>>this.http.put(Config.baseUrl + '/produitbase/' + produit_base_id + '/edit', produit_base,{headers:headers});
  }

  getTypes(): Observable<Array<Type>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Type>>>this.http.get(Config.baseUrl + '/produitbase/types',{headers:headers});
  }

  add(produit: Produit_Base): Observable<Produit_Base> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Produit_Base>> this.http.post(Config.baseUrl + '/produitbase/add', produit,{headers:headers});
  }

}
