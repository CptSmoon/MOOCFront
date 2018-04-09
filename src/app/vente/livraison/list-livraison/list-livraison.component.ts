import {Component, OnInit} from '@angular/core';
import * as FileSaver from 'file-saver';
import {Subscription} from 'rxjs/Subscription';
import {LivraisonService} from '../../../shared/services/livraison.service';
import {Livraison} from '../../../shared/new models/livraison';
import {PdfService} from '../../../shared/services/pdf.service';
import {Utils} from '../../../shared/utils';

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-livraison',
  templateUrl: './list-livraison.component.html',
  styleUrls: ['./list-livraison.component.css']
})
export class ListLivraisonComponent implements OnInit {
  livraisons: Array<Livraison>;
  selectedLivraison: Livraison;
  busy: Subscription;

  constructor(private livraisonService: LivraisonService, private pdfService: PdfService) {
  }

  ngOnInit() {
    this.getLivraisons();
  }

  public getLivraisons() {
    this.busy = this.livraisonService.getAll().subscribe(data => {
      this.livraisons = data;
      Utils.initializeDataTables(20, 6, 'table');
    });
  }


  selectLivrison(i: number) {
    this.selectedLivraison = this.livraisons[i];
  }

  bon(livraison_id: number) {

    this.busy = this.livraisonService.getBonLivraison(livraison_id)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, 'Bon_Livraison' + livraison_id);
        },
        (error) => {

        }
      );
  }

  deleteLivraison(index: number) {
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
          baseContext.busy = baseContext.livraisonService.deleteLivraison(baseContext.livraisons[index].livraison_id)
            .subscribe(
              (data) => {
                baseContext.livraisons.splice(index, 1);
                swal('Succées', 'Livraison supprimé avec succées', 'success');
                Utils.initializeDataTables(20, 6, 'table');
              }
            );
        }
      });

  }
}
