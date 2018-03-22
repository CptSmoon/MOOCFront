import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../models/commande';
import {Observable} from 'rxjs/Observable';
import {Formule} from '../models/formule';
import {Config} from '../config';
import {Emballage} from '../models/emballage';
import {Client} from '../models/client';
import {TypeClient} from "../models/type-client";


@Injectable()
export class ClientService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  addClient(client: Client): Observable<Client> {
    const url = Config.baseUrl + '/client/add';
    return this.http.post<Client>(url, client);
  }

  editClient(client: Client) {
    const url = Config.baseUrl + '/client/edit';
    return this.http.put<Client>(url, client);
  }

  getClients(): Observable<Client[]> {
    const url = Config.baseUrl + '/client';
    return this.http.get<Client[]>(url);
  }

  getTypes():Observable<Array<TypeClient>>{
    return <Observable<Array<TypeClient>>> this.http.get(Config.baseUrl+'/client/types');
}
}
