import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {Devis} from "../new models/devis";
import {StorageService} from "./storage.service";

@Injectable()
export class DevisService extends GenericService {
  url: string;

  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
    this.url = Config.baseUrl + "/devis";
  }

  getAll(): Observable<Array<Devis>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Devis>>> this.http.get(this.url,{headers:headers});
  }

  add(devis: Devis): Observable<Devis> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Devis>> this.http.post(this.url + "/add", devis,{headers:headers});
  }
  delete(id: number): Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/devis/' + id + '/delete';
    return this.http.delete(url,{headers:headers});
  }

  getById(devisId: number): Observable<Devis> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Devis>> this.http.get(this.url + '/' + devisId,{headers:headers});
  }

  edit(devisId, devis: Devis): Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Devis>> this.http.put(this.url + "/" + devisId + "/edit", devis,{headers:headers});
  }

  getBon(id: number):Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/generate/devis/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});
  }

}
