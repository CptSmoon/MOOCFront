import {Component, OnInit} from '@angular/core';
import * as FileSaver from 'file-saver';
import {Subscription} from 'rxjs/Subscription';
import {LivraisonService} from "../../../shared/services/livraison.service";
import {Livraison} from "../../../shared/new models/livraison";
import {PdfService} from "../../../shared/services/pdf.service";

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
    this.busy = this.livraisonService.getAll().subscribe(data => this.livraisons = data);
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
}
