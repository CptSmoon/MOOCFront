import {Injectable} from "@angular/core";
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {MatierePremiere} from "../models/matiere-premiere";
import {Fournisseur} from "../models/fournisseur";
import {StorageService} from "./storage.service";

@Injectable()
export class FournisseurService extends GenericService {
  url:string;
  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
    this.url=Config.baseUrl+"/fournisseur";
  }

  getAll(): Observable<Array<Fournisseur>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Fournisseur>>> this.http.get(this.url,{headers:headers});
  }

  add(nom:string):Observable<Fournisseur>{
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Fournisseur>> this.http.post(this.url+"/add", {nom:nom},{headers:headers});
  }

}
