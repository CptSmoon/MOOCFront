import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GenericService} from "./generic.service";
import {Cours} from "../models/Cours";

@Injectable()
export class CoursService extends GenericService {
  constructor(private http: HttpClient) {
    super();

  }


  public get(): Observable<Cours[]> {
    const url = Config.baseUrl + '/cours';
    return <Observable<Cours[]>>this.http.get(url);
  }

  public add(c: Cours): Observable<Cours> {
    const url = Config.baseUrl + '/cours';
    return <Observable<Cours>>this.http.post(url, c);
  }
}
