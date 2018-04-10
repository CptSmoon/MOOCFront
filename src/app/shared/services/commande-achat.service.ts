import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {Produit} from '../models/produit';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit_Base} from '../new models/produit_base';
import {CommandeAchat} from '../new models/commande_achat';

@Injectable()
export class CommandeAchatService extends GenericService {
  constructor(private http: HttpClient) {
    super();
  }

  public add(cmd: CommandeAchat): Observable<CommandeAchat> {
    const url = Config.baseUrl + '/cmdachat/add';
    return <Observable<CommandeAchat>>this.http.post(url, cmd);
  }


  getAll(): Observable<Array<CommandeAchat>> {
    return <Observable<Array<CommandeAchat>>> this.http.get(Config.baseUrl + '/cmdachat');
  }

  get(id: string): Observable<CommandeAchat> {
    return <Observable<CommandeAchat>> this.http.get(Config.baseUrl + '/cmdachat/' + id);
  }

  edit(commandeId: number, commande: CommandeAchat): Observable<CommandeAchat> {
    return <Observable<CommandeAchat>> this.http.put(Config.baseUrl + '/cmdachat/' + commandeId + '/edit', commande);
  }

  delete(id: number) {
    return this.http.delete(Config.baseUrl + '/cmdachat/' + id + '/delete');
  }

  getBon(id: number):Observable<Object> {
    const url = Config.baseUrl + '/generate/cmdachat/' + id + '/bon';
    return this.http.get(
      url,
      {headers: this.headers, responseType: 'blob'});

  }
}
