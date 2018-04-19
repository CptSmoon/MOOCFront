import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {Devis} from "../new models/devis";
import {Depense} from "../new models/depense";

@Injectable()
export class DepenseService extends GenericService {
  url: string;

  constructor(private http: HttpClient) {
    super();
    this.url = Config.baseUrl + "/depense";
  }

  getAll(): Observable<Array<Depense>> {
    return <Observable<Array<Depense>>> this.http.get(this.url);
  }

  add(depense: Depense): Observable<Depense> {
    return <Observable<Depense>> this.http.post(this.url + "/add", depense);
  }

  delete(id: number): Observable<Object> {
    const url = Config.baseUrl + '/depense/delete/'+id;
    return this.http.delete(url);
  }

  getById(depense_id: number): Observable<Depense> {
    return <Observable<Depense>> this.http.get(this.url + '/' + depense_id);
  }
  //
  edit(depense_id, depense: Depense): Observable<Depense> {
    return <Observable<Depense>> this.http.put(this.url + "/edit/"+ depense_id, depense);
  }

}
