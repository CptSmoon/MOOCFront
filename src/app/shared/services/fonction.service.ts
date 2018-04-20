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
import {Fonction} from "../new models/fonction";
import {StorageService} from "./storage.service";


@Injectable()
export class FonctionService extends GenericService {

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
  }

  getAllFonctions(): Observable<Fonction[]> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/fonction';
    return this.http.get<Fonction[]>(url,{headers:headers});
  }

}
