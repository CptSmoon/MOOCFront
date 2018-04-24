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
import {StorageService} from "./storage.service";


@Injectable()
export class EmployeService extends GenericService {

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
  }

  getAll(): Observable<Employe[]> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/employe';
    return this.http.get<Employe[]>(url,{headers:headers});
  }

  add(e: Employe) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/employe/add';
    return this.http.post<Employe>(url,e,{headers:headers});
  }

  edit(e: Employe) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/employe/edit';
    return this.http.put<Employe>(url,e,{headers:headers});

  }

  getById(id : number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/employe/'+id;
    return this.http.get<Employe>(url,{headers:headers});
  }

  delete(i: number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl +'/employe/' + i;
    return this.http.delete(url,{headers:headers});
  }
}
