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


@Injectable()
export class EmployeService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Client[]> {
    const url = Config.baseUrl + '/employe';
    return this.http.get<Client[]>(url);
  }

}
