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
import {Contrat} from "../new models/contrat";


@Injectable()
export class ContratService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getAllContrats(): Observable<Contrat[]> {
    const url = Config.baseUrl + '/contrat';
    return this.http.get<Contrat[]>(url);
  }

}