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
import {Employe} from "../new models/employe";


@Injectable()
export class EmployeService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Employe[]> {
    const url = Config.baseUrl + '/employe';
    return this.http.get<Employe[]>(url);
  }

  add(e: Employe) {
    const url = Config.baseUrl + '/employe/add';
    return this.http.post<Employe>(url,e);
  }

  edit(e: Employe) {
    const url = Config.baseUrl + '/employe/edit';
    return this.http.put<Employe>(url,e);

  }

  getById(id : number) {
    const url = Config.baseUrl + '/employe/'+id;
    return this.http.get<Employe>(url);
  }

  delete(i: number) {
    const url = Config.baseUrl +'/employe/' + i;
    return this.http.delete(url);
  }
}
