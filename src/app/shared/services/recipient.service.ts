import {Injectable} from "@angular/core";
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {Recipient} from "../models/recipient";

@Injectable()
export class RecipientService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getRecipients(): Observable<Recipient[]> {
    const url = Config.baseUrl + "/recipient";
    return this.http.get<Recipient[]>(url);
  }

}
