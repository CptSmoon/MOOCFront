import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config} from "../config";
import {Observable} from "rxjs/Observable";
import {Region} from "../models/region";
import {GenericService} from "./generic.service";
import {Ville} from "../models/ville";
import {StorageService} from "./storage.service";

@Injectable()
export class RegionService extends GenericService{
  url:string;
  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
    this.url=Config.baseUrl+"/region";
  }

  public getAll(): Observable<Array<Ville>>{
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<Ville>>> this.http.get(this.url,{headers:headers});
  }


}
