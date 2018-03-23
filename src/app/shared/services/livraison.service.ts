import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GenericService} from "./generic.service";
import {Config} from "../config";
import {Observable} from "rxjs/Observable";
import {Livraison} from "../models/livraison";

@Injectable()
export class LivraisonService extends GenericService{
  url:string;
  constructor(private http : HttpClient) {
    super();
    this.url=Config.baseUrl+'/livraison';
  }

  public getAll():Observable<Array<Livraison>> {
    return <Observable<Array<Livraison>>> this.http.get(this.url);
  }

}
