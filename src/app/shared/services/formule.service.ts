import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {Config} from "../config";
import {Emballage} from "../models/emballage";
import {Observable} from "rxjs/Observable";
import {Formule} from "../models/formule";
import {StorageService} from "./storage.service";

@Injectable()
export class FormuleService  extends GenericService{

  constructor(private http: HttpClient, private storageService:StorageService) {super(); }

  addFormule(formule : Formule): Observable<Formule> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + "/formule/add";
  return this.http.post<Formule>(url, formule);
  }

  editFormule(selectedformule: Formule) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + "/formule/edit";
    return this.http.put<Formule>(url, selectedformule);
  }
}
