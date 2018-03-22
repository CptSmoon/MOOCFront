import {Component, OnInit} from '@angular/core';
import {MatierePremiere} from "../shared/models/matiere-premiere";
import {MPService} from "../shared/services/mp.service";
import {UniteService} from "../shared/services/unite.service";
import {Unite} from "../shared/models/unite";
import {Client} from "../shared/models/client";
import {ClientService} from "../shared/services/client.service";
import {RegionService} from "../shared/services/region.service";

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients:Array<Client>;

  constructor(private clientService:ClientService, private regionService:RegionService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(data=>this.clients=data);
  }

  public getClients(){

  }


}
