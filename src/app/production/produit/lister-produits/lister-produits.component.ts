import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../../../shared/services/produit.service";
import {Router} from "@angular/router";
import {Produit} from "../../../shared/models/produit";
import {Subscription} from "rxjs/Subscription";
import {Emballage} from "../../../shared/models/emballage";
import {Utils} from "../../../shared/utils";
import {EmballageService} from "../../../shared/services/emballage.service";
import {RecipientService} from "../../../shared/services/recipient.service";
import {Recipient} from "../../../shared/models/recipient";

@Component({
  selector: 'app-lister-produits',
  templateUrl: './lister-produits.component.html',
  styleUrls: ['./lister-produits.component.css']
})
export class ListerProduitsComponent implements OnInit {
  busy : Subscription;
  produits : Produit[] = [];

  constructor(private router: Router, private produitService : ProduitService

              ) { }

  ngOnInit() {

    this.getAllProduits();
  }

  private getAllProduits() {
    this.busy = this.produitService.getProduits().subscribe(response => {
      this.produits = response as Array<Produit>;
      Utils.initializeDataTables(20, 9, "dataTable");
    }), error => {
      console.debug(error);
    };
  }


}
