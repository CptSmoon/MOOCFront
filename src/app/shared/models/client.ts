import {TypeClient} from "./type-client";
import {Region} from "./region";

export class Client {
  public client_id: number;
  public name: string;
  public mobile: string;
  public email: string;
  type_client_id:number;
  region_id:number;
  type:TypeClient;
  region:Region;

}
