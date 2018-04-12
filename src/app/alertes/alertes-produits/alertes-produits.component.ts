import {Component, OnInit} from '@angular/core';
import {AlertesService} from "../../shared/services/alertes.service";
import {Produit} from "../../shared/new models/produit";
import {Utils} from "../../shared/utils";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-alertes-produits',
  templateUrl: './alertes-produits.component.html',
  styleUrls: ['./alertes-produits.component.css']
})
export class AlertesProduitsComponent implements OnInit {

// TODO - Update numbers at each call of service
// TODO - Update numbers Daily

  produits: Produit[] = [];
  private busy: Subscription;

  constructor(private alertesService: AlertesService) {
  }

  ngOnInit() {
    console.log("heeeeeeeeee");
    this.getProduitsAlerted();

  }

  private getProduitsAlerted() {
    this.busy = this.alertesService.getProduitsAlerted().subscribe(response => {
      this.produits = response;
      this.alertesService.changeNumberAlertes(1, this.produits.length);

      Utils.initializeDataTables(20, 9, 'dataTable');
    });
  }
}
