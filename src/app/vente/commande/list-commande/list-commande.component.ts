import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Commande} from '../../../shared/new models/commande';
import {CommandeService} from '../../../shared/services/commande.service';
import {Utils} from '../../../shared/utils';
import {PdfService} from '../../../shared/services/pdf.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {


  busy: Subscription;
  commandes: Commande[] = [];
  private cmd: Commande;

  constructor(private commandeService: CommandeService, private pdfService: PdfService) {
  }

  ngOnInit() {

    this.getAllCommande();
  }

  getAllCommande() {
    this.busy = this.commandeService.getCommandes()
      .subscribe(
        (data) => {
          this.commandes = data;
          Utils.initializeDataTables(50, 5, 'dataTable');
        },
        (error) => {

        }
      );
  }

  bon(commande_id: number) {

    this.busy = this.commandeService.getBonCommande(commande_id)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, 'Bon_Commande' + commande_id);
        },
        (error) => {

        }
      );
  }

  detailsCmd(i) {
    this.cmd=this.commandes[i];
    console.log(this.cmd);
  }
}
