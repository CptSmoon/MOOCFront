import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {Produit} from '../models/produit';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit_Base} from '../new models/produit_base';
import {CommandeAchat} from '../new models/commande_achat';
import {Achat} from '../new models/achat';
import {StorageService} from "./storage.service";

@Injectable()
export class AchatService extends GenericService {
  constructor(private http: HttpClient, private storageService:StorageService) {
    super();

  }

  public getById(achatId: string) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return this.http.get(Config.baseUrl + '/achat/' + achatId,{headers:headers});
  }

  public add(a: Achat): Observable<Achat> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/achat/add';
    return <Observable<Achat>>this.http.post(url, a,{headers:headers});
  }


  getAll(): Observable<Array<Achat>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Achat>>> this.http.get(Config.baseUrl + '/achat',{headers:headers});
  }

  delete(achatId) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return this.http.delete(Config.baseUrl + '/achat/' + achatId + '/delete',{headers:headers});
  }

  edit(achatId: string, achat: Achat) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return this.http.put(Config.baseUrl + '/achat/' + achatId + '/edit', achat,{headers:headers});
  }
}
