import {TypeClient} from "./type-client";
import {Region} from "./region";
import {Livraison} from "./livraison";

export class Client {
  public client_id: number;
  public name: string;
  public mobile: string;
  public email: string;
  type_client_id:number;
  region_id:number;
  type:TypeClient;
  region:Region;
  livraisons:Array<Livraison>;

}
