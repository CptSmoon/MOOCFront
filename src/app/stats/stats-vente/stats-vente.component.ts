import { Component, OnInit } from '@angular/core';
import {StatAchatService} from "../../shared/services/statAchat.service";
import {ProduitNEwService} from "../../shared/services/produitNEw.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StatVenteService} from "../../shared/services/statVente.service";
import {Utils} from "../../shared/utils";
import {StatAchat} from "../../shared/new models/statAchat";
import {Subscription} from "rxjs/Subscription";
import {Taxe} from "../../shared/new models/taxe";
import {StatVente} from "../../shared/new models/statVente";

declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-stats-vente',
  templateUrl: './stats-vente.component.html',
  styleUrls: ['./stats-vente.component.css']
})
export class StatsVenteComponent implements OnInit {
  public statV : StatVente = new StatVente();
  busy: Subscription;
  taxes: Taxe[];
  constructor( private produitService : ProduitNEwService ,
               private statVenteService: StatVenteService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
    this.getAllTaxes();
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
  private getVentes(){
    let baseContext = this;
    this.busy = this.statVenteService.getStatsVente(this.statV).subscribe(
      response => {
        let d1 = this.statV.date_deb;
        let d2 = this.statV.date_fin;
        this.statV=response;
        this.statV.date_deb=d1;
        this.statV.date_fin=d2;
        Utils.initializeDataTables(20, 6+this.taxes.length, 'dataTable');
        console.log(baseContext.statV.tab_sum_taxes);

      }

    )

  }
}
