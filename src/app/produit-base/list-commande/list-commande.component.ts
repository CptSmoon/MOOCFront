import { Component, OnInit } from '@angular/core';
import {CommandeAchatService} from "../../shared/services/commande-achat.service";
import {CommandeAchat} from "../../shared/new models/commande_achat";


declare var jQuery:any;
@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {

  commandes:Array<CommandeAchat>;
  cmd:CommandeAchat;
  constructor(private commandeAchatService: CommandeAchatService) { }

  ngOnInit() {
    this.commandeAchatService.getAll().subscribe(data=>{
      this.commandes=data;
    });

  }

  detailsCmd(i) {
    this.cmd=this.commandes[i];
  }
}
