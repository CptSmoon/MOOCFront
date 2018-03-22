import {Component, OnInit} from '@angular/core';
import {MatierePremiere} from "../shared/models/matiere-premiere";
import {MPService} from "../shared/services/mp.service";
import {UniteService} from "../shared/services/unite.service";
import {Unite} from "../shared/models/unite";
import {Client} from "../shared/models/client";
import {ClientService} from "../shared/services/client.service";
import {RegionService} from "../shared/services/region.service";
import {TypeClient} from "../shared/models/type-client";
import {Ville} from "../shared/models/ville";

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients:Array<Client>;
  toAddClient:Client;
  types :Array<TypeClient>;
  villes: Array<Ville>;
  selectedVille:Ville;
  constructor(private clientService:ClientService, private regionService:RegionService) {}

  ngOnInit() {
    this.getClients();
    this.getTypes();
    this.getVilles();
    this.toAddClient=new Client();

  }

  public getClients(){
    this.clientService.getClients().subscribe(data=>this.clients=data);
  }

  public getTypes(){
    this.clientService.getTypes().subscribe(data=>{
      this.types=data;
      if (this.types) this.toAddClient.type=this.types[0];
    });
  }

  public getVilles(){
    this.regionService.getAll().subscribe(data=>{
      this.villes=data;
      if (this.villes) this.selectedVille=this.villes[0];
      if (this.villes && this.villes[0].region) this.toAddClient.region=this.villes[0].region[0];
    });
  }

  public cleanAddClientModal(){
    this.toAddClient=new Client();
    if (this.types) this.toAddClient.type=this.types[0];
    if (this.villes[0].region) this.toAddClient.region=this.villes[0].region[0];
    if (this.villes) this.selectedVille=this.villes[0];
    if (this.types) this.toAddClient.type=this.types[0];
    jQuery('#add-client-modal').modal('toggle');
  }
  validChampsClient() {
    if (this.toAddClient.name && this.toAddClient.mobile && this.toAddClient.email) {
      return true;
    }
    return false;
  }

}
