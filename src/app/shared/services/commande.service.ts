import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../new models/commande';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {StorageService} from "./storage.service";


@Injectable()
export class CommandeService extends GenericService {

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
  }

  addCommande(commande: Commande): Observable<Commande> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/commande/add';
    console.log(JSON.stringify(commande));
    return this.http.post<Commande>(url, commande,{headers:headers});
  }

  editCommande(commandId: number, commande: Commande) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/commande/' + commandId + '/edit';
    return this.http.put(url, commande,{headers:headers});
  }

  getCommandes(): Observable<Commande[]> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/commande';
    return this.http.get<Commande[]>(url,{headers:headers});
  }

  getBonCommande(id: number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/commande/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
  }

  deleteCommande(commandeId: number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/commande/' + commandeId + '/delete';
    return this.http.delete(
      url,{headers:headers});
  }

  getCommandById(commandId: number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/commande/' + commandId;
    return this.http.get(url,{headers:headers});
  }

  getBon(id: number):Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/generate/commande/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
    }
}
