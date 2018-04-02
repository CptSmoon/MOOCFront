import { Component, OnInit } from '@angular/core';
import {CommandeAchatService} from "../../shared/services/commande-achat.service";
import {CommandeAchat} from "../../shared/new models/commande_achat";
import {Achat} from "../../shared/new models/achat";
import {AchatService} from "../../shared/services/achat.service";


declare var jQuery:any;
@Component({
  selector: 'app-list-commande',
  templateUrl: './list-achat.component.html',
  styleUrls: ['./list-achat.component.css']
})
export class ListAchatComponent implements OnInit {

  achats:Array<Achat>;
  achat:Achat;
  constructor(private achatService: AchatService) { }

  ngOnInit() {
    this.achatService.getAll().subscribe(data=>{
      this.achats=data;
    });

  }

  detailsAchat(i) {
    this.achat=this.achats[i];
  }
}
