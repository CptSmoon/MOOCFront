import { Component, OnInit } from '@angular/core';
import {Produit} from "../../shared/new models/produit";
import {Produit_Base} from "../../shared/new models/produit_base";
import {Utils} from "../../shared/utils";
import {AlertesService} from "../../shared/services/alertes.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-alertes-produits-bases',
  templateUrl: './alertes-produits-bases.component.html',
  styleUrls: ['./alertes-produits-bases.component.css']
})
export class AlertesProduitsBasesComponent implements OnInit {
  produits_bases : Produit_Base[]=[];
  private busy: Subscription;

  constructor(private alertesService : AlertesService) { }

  ngOnInit() {
    this.getProduitsBasesAlerted();
  }


  private getProduitsBasesAlerted() {
    this.busy = this.alertesService.getProduitsBasesAlerted().subscribe(response => {
      this.produits_bases=response;
      this.alertesService.changeNumberAlertes(2,this.produits_bases.length);

      Utils.initializeDataTables(20, 7, 'dataTable');
    });
  }

}
