import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config} from "../config";
import {Observable} from "rxjs/Observable";
import {Region} from "../models/region";
import {GenericService} from "./generic.service";
import {Ville} from "../models/ville";

@Injectable()
export class RegionService extends GenericService{
  url:string;
  constructor(private http: HttpClient) {
    super();
    this.url=Config.baseUrl+"/region";
  }

  public getAll(): Observable<Array<Ville>>{
    return <Observable<Array<Ville>>> this.http.get(this.url);
  }


}
