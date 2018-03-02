import {Injectable} from "@angular/core";
import {Config} from "../config";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GenericService} from "./generic.service";
import {MatierePremiere} from "../models/matiere-premiere";
import {AchatMP} from "../models/achatMP";

@Injectable()
export class AchatMPService extends GenericService {
  url:string;
  constructor(private http: HttpClient) {
    super();
    this.url=Config.baseUrl+"/achatmp";
  }

  getAll(): Observable<Array<AchatMP>> {
    return <Observable<Array<AchatMP>>> this.http.get(this.url);
  }

  // add(nom:string, unite_id:number):Observable<MatierePremiere>{
  //   return <Observable<MatierePremiere>> this.http.post(this.url+"/add",{nom:nom, unite_id:unite_id});
  // }

}
