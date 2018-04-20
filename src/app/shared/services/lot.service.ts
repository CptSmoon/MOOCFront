import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {Config} from "../config";
import {Observable} from "rxjs/Observable";
import {Lot} from "../models/lot";
import {AdminService} from "./admin.service";
import {StorageService} from "./storage.service";

@Injectable()
export class LotService  extends GenericService{

  constructor( private adminService: AdminService,private http: HttpClient, private storageService:StorageService) {super(); }


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

  setFinnished(lot : Lot) {
    // const headers = this.headers.set('Authorization', this.adminService.adminToken);
    const url = Config.baseUrl + "/lot/setFinnished/";
    console.log(url);
    // return this.http.get<Lot[]>(url,{headers});
    return this.http.put<Lot>(url,lot);

  }
}
