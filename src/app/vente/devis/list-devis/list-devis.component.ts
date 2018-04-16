import {Component, OnInit} from '@angular/core';
import {PdfService} from '../../../shared/services/pdf.service';
import {FactureService} from '../../../shared/services/facture.service';
import {Facture} from '../../../shared/new models/facture';
import {Subscription} from 'rxjs/Subscription';
import {Utils} from '../../../shared/utils';
import * as FileSaver from 'file-saver';
import {Devis} from "../../../shared/new models/devis";
import {DevisService} from "../../../shared/services/devis.service";


declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-livraison',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.css']
})
export class ListDevisComponent implements OnInit {
  devis: Devis[] = [];
  selectedDevis: Devis;
  busy: Subscription;

  constructor(private devisService: DevisService, private pdfService: PdfService) {
  }

  ngOnInit() {
    this.getDevis();
  }

  public getDevis() {
    this.busy =
      this.devisService.getAll().subscribe(data => {
        this.devis = data;
        Utils.initializeDataTables(20, 4, 'table');
      });
  }

  // deleteFacture(i:number){
  //   const baseContext = this;
  //   swal({
  //     title: 'Attention !',
  //     text: 'Êtes-vous sûrs de vouloir supprimer cette commande définitivement ? ',
  //     icon: 'warning',
  //     dangerMode: true,
  //     buttons: {
  //       cancel: {
  //         text: 'Non annuler',
  //         value: null,
  //         visible: true
  //       },
  //       confirm: {
  //         text: 'Oui Supprimer',
  //         vaule: true,
  //         visible: true
  //       }
  //     }
  //
  //   })
  //     .then((willDelete) => {
  //       if (willDelete) {
  //         baseContext.busy = baseContext.factureService.delete(baseContext.factures[i].facture_id)
  //           .subscribe(
  //             (data) => {
  //               swal('Succées', 'Commande supprimé avec succées', 'success');
  //               baseContext.factures.splice(i, 1);
  //               Utils.initializeDataTables(50, 5, 'dataTable');
  //             },
  //             (error) => {
  //
  //             }
  //           );
  //       }
  //     });
  //
  // }

  selectDevis(i:number){
    this.selectedDevis=this.devis[i];
  }

  // print(id:number){
  //   this.busy = this.factureService.getBon(id)
  //     .subscribe(
  //       (data) => {
  //         FileSaver.saveAs(data, 'facture' + id);
  //       }
  //     );
  // }
}
