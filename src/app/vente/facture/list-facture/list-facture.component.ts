import {Component, OnInit} from '@angular/core';
import {PdfService} from '../../../shared/services/pdf.service';
import {FactureService} from '../../../shared/services/facture.service';
import {Facture} from '../../../shared/new models/facture';
import {Subscription} from 'rxjs/Subscription';
import {Utils} from '../../../shared/utils';
import * as FileSaver from 'file-saver';


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

  deleteFacture(i:number){
    const baseContext = this;
    swal({
      title: 'Attention !',
      text: 'Êtes-vous sûrs de vouloir supprimer cette commande définitivement ? ',
      icon: 'warning',
      dangerMode: true,
      buttons: {
        cancel: {
          text: 'Non annuler',
          value: null,
          visible: true
        },
        confirm: {
          text: 'Oui Supprimer',
          vaule: true,
          visible: true
        }
      }

    })
      .then((willDelete) => {
        if (willDelete) {
          baseContext.busy = baseContext.factureService.delete(baseContext.factures[i].facture_id)
            .subscribe(
              (data) => {
                swal('Succées', 'Commande supprimé avec succées', 'success');
                baseContext.factures.splice(i, 1);
                Utils.initializeDataTables(50, 5, 'dataTable');
              },
              (error) => {

              }
            );
        }
      });

  }
  selectFacture(i:number){
    this.selectedFacture=this.factures[i];
  }

  print(id:number){
    this.busy = this.factureService.getBon(id)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, 'facture' + id);
        }
      );
  }
}
