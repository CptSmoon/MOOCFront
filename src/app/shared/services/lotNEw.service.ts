import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {Config} from "../config";
import {Observable} from "rxjs/Observable";
import {Lot} from "../new models/lot";
import {AdminService} from "./admin.service";

@Injectable()
export class LotNEwService  extends GenericService{

  constructor( private adminService: AdminService,private http: HttpClient) {super(); }

  addLot(lot :Lot){
    // const headers = this.headers.set('Authorization', this.adminService.adminToken);
    const url = Config.baseUrl + "/lot/add";
    // return this.http.post<Lot>(url,lot,{headers});
    return this.http.post<Lot>(url,lot);
  }

  getAllLots() {
    // const headers = this.headers.set('Authorization', this.adminService.adminToken);
    const url = Config.baseUrl + "/lot";
    // return this.http.get<Lot[]>(url,{headers});
    return this.http.get<Lot[]>(url);
  }

  setFinnished(i: number) {
    // const headers = this.headers.set('Authorization', this.adminService.adminToken);
    const url = Config.baseUrl + "/lot/setFinnished/"+i;
    console.log(url);
    // return this.http.get<Lot>(url,{headers});
    return this.http.get<Lot>(url);

  }
}
