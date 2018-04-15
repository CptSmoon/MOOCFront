import {Component, OnInit} from '@angular/core';
import {Utils} from '../../../shared/utils';
import {Subscription} from 'rxjs/Subscription';
import {LotNEwService} from '../../../shared/services/lotNEw.service';
import {Lot} from '../../../shared/new models/lot';
import {Router} from '@angular/router';
import {PdfService} from '../../../shared/services/pdf.service';
import * as FileSaver from 'file-saver';

declare var jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-lot',
  templateUrl: './list-lot.component.html',
  styleUrls: ['./list-lot.component.css']
})
export class ListLotComponent implements OnInit {
  busy: Subscription;
  lots: Array<Lot> = [];
  private selectedLot: Lot;
  private openLotIndex: number;

  constructor(private router: Router,
              private lotService: LotNEwService,
              private pdfService: PdfService) {
  }

  ngOnInit() {
    this.getAllLots();

  }

  private getAllLots() {
    let baseContext = this;
    this.busy = this.lotService.getAllLots().subscribe(response => {
      baseContext.lots = response as Array<Lot>;
      console.log(this.lots);
      Utils.initializeDataTables(20, 11, 'datatable1');
    }), error => {
      console.debug(error);
    };
  }

  openComposition(i) {
    if (i >= 0) {
      this.selectedLot = this.lots[i];
      this.openLotIndex = i;
    }
    Utils.initializeDataTables(20, 4, 'datatable2');

  }

  setFinnished(i, index) {
    let baseContext = this;
    if (this.lots[index].inputQtReele != true)
      this.lots[index].inputQtReele = true;
    else {
      if (this.lots[index].quantite_reele > 0)
        this.busy = this.lotService.setFinnished(baseContext.lots[index]).subscribe(response => {
          baseContext.lots[index].etat = 1;

          baseContext.lots[index].date_fabrication = new Date();
          baseContext.lots[index].date_expiration=  new Date();
          baseContext.lots[index].date_expiration.
          setDate(baseContext.lots[index].date_expiration.getDate()+baseContext.lots[index].expiration);

          this.lots[index].inputQtReele = false;

        }, error => {
          console.debug(error);
        });
    }
  }

  confirmLigne(index: number) {
    let lot = this.lots[index];

    if (!lot.label || !lot.reference ||
      !lot.cout || !lot.quantite_calculee || !lot.quantite_voulue) {
      return;
    }
    if (lot.editMode == 1) {
      lot.editMode = 0;
      this.busy = this.lotService.editLot(lot)
        .subscribe(response => {
            swal({
              title: 'Ajouté !',
              text: 'L\'ordre de fabrication est modifié.',
              confirmButtonColor: '#66BB6A',
              type: 'success'
            }).then((isConfirm) => {
              this.router.navigate(['/production/lot/list']);
            });
          }
          , error => {
            swal({
              title: 'Erreur !',
              text: JSON.stringify(error.error.errors),
              confirmButtonColor: 'red',
              type: 'error'
            });
            console.debug(error);
          });
    } else {
      lot.editMode = 0;
    }
  }

  editLigne(index: number) {
    this.lots[index].editMode = 1;
  }

  editLigne2(index: number) {
    this.selectedLot.lot_produit_bases[index].editMode = 1;
  }


  confirmLigne2(index: number) {
    if (!this.selectedLot.lot_produit_bases[index].quantite ||
      this.selectedLot.lot_produit_bases[index].quantite <= 0) {
      return;
    }
    this.selectedLot.lot_produit_bases[index].editMode = 0;

    this.busy = this.lotService.editCompositionProduit(this.selectedLot)
      .subscribe(response => {
        }
        , error => {
          swal({
            title: 'Erreur !',
            text: JSON.stringify(error.error.errors),
            confirmButtonColor: 'red',
            type: 'error'
          });
          console.debug(error);
        });
  }

  ficheDeControle(lod_id: number) {
    this.busy = this.lotService.getFicheControle(lod_id)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, 'Fiche_De_Controle_' + lod_id);
        }
      );
    // this.pdfService.ficheDeControle(lod_id);
  }


  cleanCompositionModal() {
    this.selectedLot.editMode2 = 0;
    jQuery('#list-composition-modal').modal('toggle');
  }
}
