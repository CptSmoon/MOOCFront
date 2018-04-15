import { Component, OnInit } from '@angular/core';
import {Facture} from "../../shared/models/facture";
import {Subscription} from "rxjs/Subscription";
import {AlertesService} from "../../shared/services/alertes.service";
import {Livraison} from "../../shared/new models/livraison";
import {Utils} from "../../shared/utils";

@Component({
  selector: 'app-alertes-livraisons',
  templateUrl: './alertes-livraisons.component.html',
  styleUrls: ['./alertes-livraisons.component.css']
})
export class AlertesLivraisonsComponent implements OnInit {
  livraisons : Livraison[]=[];
  private busy: Subscription;
  constructor(private alertesService : AlertesService) { }

  ngOnInit() {
    this.getAlertedLivraisons();
  }

  private getAlertedLivraisons() {
    this.busy = this.alertesService.getLivraisonsAlerted().subscribe(response => {
      this.livraisons = response;
      // this.alertesService.changeNumberAlertes(4,this.livraisons.length);
      Utils.initializeDataTables(20, 5, 'dataTable');
    })
  }
}
