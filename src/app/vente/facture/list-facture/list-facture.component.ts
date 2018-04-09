import {Component, OnInit} from '@angular/core';
import {PdfService} from '../../../shared/services/pdf.service';
import {FactureService} from '../../../shared/services/facture.service';
import {Facture} from '../../../shared/new models/facture';
import {Subscription} from 'rxjs/Subscription';
import {Utils} from '../../../shared/utils';

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-livraison',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit {
  factures: Facture[] = [];
  selectedFacture: Facture;
  busy: Subscription;

  constructor(private factureService: FactureService, private pdfService: PdfService) {
  }

  ngOnInit() {
    this.getFactures();
  }

  public getFactures() {
    this.busy =
      this.factureService.getAll().subscribe(data => {
        this.factures = data;
        Utils.initializeDataTables(20, 5, 'table');
      });
  }


  selectFacture(i: number) {
    this.selectedFacture = this.factures[i];
  }

  bon(i: number) {
    this.pdfService.facture(this.factures[i].facture_id);
  }
}
