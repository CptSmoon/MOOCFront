import {Injectable} from "@angular/core";
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {MatierePremiere} from "../models/matiere-premiere";
import {Unite} from "../models/unite";
import {StorageService} from "./storage.service";

@Injectable()
export class UniteService extends GenericService {
  url:string;
  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
    this.url=Config.baseUrl+"/unite";
  }

  getAllUnits(): Observable<Array<Unite>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Unite>>> this.http.get(this.url,{headers:headers});
  }

}
