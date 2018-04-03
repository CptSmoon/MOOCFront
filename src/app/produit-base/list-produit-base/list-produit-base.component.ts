import { Component, OnInit } from '@angular/core';
import {CommandeAchat} from "../../shared/new models/commande_achat";
import {ProduitBaseService} from "../../shared/services/produit-base.service";
import {Produit_Base} from "../../shared/new models/produit_base";


declare var jQuery:any;
@Component({
  selector: 'app-list-produit-base',
  templateUrl: './list-produit-base.component.html',
  styleUrls: ['./list-produit-base.component.css']
})
export class ListProduitBaseComponent implements OnInit {

  pbs:Array<Produit_Base>;
  cmd:CommandeAchat;
  constructor(private produitBaseService: ProduitBaseService) { }

  ngOnInit() {
    this.produitBaseService.getAll().subscribe(data=>{
      this.pbs=data;
    });

  }
}
