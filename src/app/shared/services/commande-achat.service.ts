import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {Produit} from '../models/produit';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit_Base} from '../new models/produit_base';
import {CommandeAchat} from '../new models/commande_achat';
import {StorageService} from "./storage.service";

@Injectable()
export class CommandeAchatService extends GenericService {
  constructor(private http: HttpClient, private storageService:StorageService) {
    super();
  }

  public add(cmd: CommandeAchat): Observable<CommandeAchat> {
    const url = Config.baseUrl + '/cmdachat/add';
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<CommandeAchat>>this.http.post(url, cmd,{headers:headers});
  }


  getAll(): Observable<Array<CommandeAchat>> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<Array<CommandeAchat>>> this.http.get(Config.baseUrl + '/cmdachat',{headers:headers});
  }

  get(id: string): Observable<CommandeAchat> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<CommandeAchat>> this.http.get(Config.baseUrl + '/cmdachat/' + id,{headers:headers});
  }

  edit(commandeId: number, commande: CommandeAchat): Observable<CommandeAchat> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return <Observable<CommandeAchat>> this.http.put(Config.baseUrl + '/cmdachat/' + commandeId + '/edit', commande,{headers:headers});
  }

  delete(id: number) {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    return this.http.delete(Config.baseUrl + '/cmdachat/' + id + '/delete',{headers:headers});
  }

  getBon(id: number):Observable<Object> {
    const headers = this.headers.set("Authorization", this.storageService.read("erp-admin-token"));
    const url = Config.baseUrl + '/generate/cmdachat/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});

  }
}
