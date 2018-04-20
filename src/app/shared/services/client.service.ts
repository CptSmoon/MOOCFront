import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../models/commande';
import {Observable} from 'rxjs/Observable';
import {Formule} from '../models/formule';
import {Config} from '../config';
import {Emballage} from '../models/emballage';
import {Client} from '../new models/client';
import {TypeClient} from "../models/type-client";
import {StorageService} from "./storage.service";


@Injectable()
export class ClientService extends GenericService {

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
  }

  addClient(client: Client): Observable<Client> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/client/add';
    return this.http.post<Client>(url, client,{headers:headers});
  }

  editClient(client: Client) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/client/edit';
    return this.http.put<Client>(url, client,{headers:headers});
  }

  getClients(): Observable<Client[]> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/client';
    return this.http.get<Client[]>(url,{headers:headers});
  }

  getTypes():Observable<Array<TypeClient>>{
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<TypeClient>>> this.http.get(Config.baseUrl+'/client/types',{headers:headers});
}
}
