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
import {StorageService} from "./storage.service";

@Injectable()
export class DepenseService extends GenericService {
  url: string;

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
    this.url = Config.baseUrl + "/depense";
  }

  getAll(): Observable<Array<Depense>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Depense>>> this.http.get(this.url,{headers:headers});
  }

  add(depense: Depense): Observable<Depense> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Depense>> this.http.post(this.url + "/add", depense,{headers:headers});
  }

  delete(id: number): Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/depense/delete/'+id;
    return this.http.delete(url,{headers:headers});
  }

  getById(depense_id: number): Observable<Depense> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Depense>> this.http.get(this.url + '/' + depense_id,{headers:headers});
  }
  //
  edit(depense_id, depense: Depense): Observable<Depense> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Depense>> this.http.put(this.url + "/edit/"+ depense_id, depense,{headers:headers});
  }

}
