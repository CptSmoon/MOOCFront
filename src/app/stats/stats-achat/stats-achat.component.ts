import { Component, OnInit } from '@angular/core';
import {StatAchat} from "../../shared/new models/statAchat";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {CommandeAchatService} from "../../shared/services/commande-achat.service";
import {StatAchatService} from "../../shared/services/statAchat.service";
import {Utils} from "../../shared/utils";
import {ProduitService} from "../../shared/services/produit.service";
import {ProduitNEwService} from "../../shared/services/produitNEw.service";
import {Taxe} from "../../shared/new models/taxe";

declare var jQuery: any;
declare var swal: any;


@Component({
  selector: 'app-stats-achat',
  templateUrl: './stats-achat.component.html',
  styleUrls: ['./stats-achat.component.css']
})
export class StatsAchatComponent implements OnInit {

  public statA : StatAchat = new StatAchat();
  busy: Subscription;
  taxes: Taxe[];

  constructor(   private produitService : ProduitNEwService ,
                 private statAchatService: StatAchatService,
                 private route: ActivatedRoute,
                 private router: Router,) { }

  ngOnInit() {
    this.getAllTaxes();
  }


  private getAchatsDepenses() {
    this.busy = this.statAchatService.getStatsAchat(this.statA).subscribe(
      response => {
        let d1 = this.statA.date_deb;
        let d2 = this.statA.date_fin;
        this.statA=response;
        this.statA.date_deb=d1;
        this.statA.date_fin=d2;
        Utils.initializeDataTables(20, 6+this.taxes.length, 'dataTable');


      }

      )
  }

  private getAllTaxes() {
    let baseContext = this;

    this.busy = this.produitService.getTaxes().subscribe(response => {
      baseContext.taxes = response;
      Utils.initializeDataTables(20, 6+baseContext.taxes.length, 'dataTable');

      console.log(baseContext.taxes);

    }, error => {
      console.debug(error);

    });
  }
}
