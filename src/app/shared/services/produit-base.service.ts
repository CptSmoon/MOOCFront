import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Produit_Base} from '../new models/produit_base';
import {Type} from '../new models/Type';


@Injectable()
export class ProduitBaseService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Array<Produit_Base>> {
    return <Observable<Array<Produit_Base>>> this.http.get(Config.baseUrl + '/produitbase');
  }

  edit(produit_base_id: number, produit_base: Produit_Base):Observable<Produit_Base> {
    return <Observable<Produit_Base>>this.http.put(Config.baseUrl + '/produitbase/' + produit_base_id + '/edit', produit_base);
  }

  getTypes():Observable<Array<Type>>{
    return <Observable<Array<Type>>>this.http.get(Config.baseUrl + '/produitbase/types');
  }
  add(produit:Produit_Base):Observable<Produit_Base>{
    return <Observable<Produit_Base>> this.http.post(Config.baseUrl + '/produitbase/add', produit);
  }

}
