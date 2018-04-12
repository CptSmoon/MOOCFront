import { Component, OnInit } from '@angular/core';
import {Facture} from "../../shared/models/facture";
import {AlertesService} from "../../shared/services/alertes.service";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";

@Component({
  selector: 'app-alertes-factures',
  templateUrl: './alertes-factures.component.html',
  styleUrls: ['./alertes-factures.component.css']
})
export class AlertesFacturesComponent implements OnInit {
  factures : Facture[]=[];
  private busy: Subscription;
  constructor(private alertesService : AlertesService) { }

  ngOnInit() {
    this.getAlertedFactures();
  }

  private getAlertedFactures() {
    this.busy = this.alertesService.getFacturesAlerted().subscribe(response => {
      this.factures = response;
      this.alertesService.changeNumberAlertes(3,this.factures.length);
      Utils.initializeDataTables(20, 5, 'dataTable');
    }
  );
  }
}
