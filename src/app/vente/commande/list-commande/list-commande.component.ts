import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Commande} from '../../../shared/new models/commande';
import {CommandeService} from '../../../shared/services/commande.service';
import {Utils} from '../../../shared/utils';
import {PdfService} from '../../../shared/services/pdf.service';
import * as FileSaver from 'file-saver';
import {ClientService} from "../../../shared/services/client.service";
import {Client} from "../../../shared/new models/client";

declare var jQuery: any;

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {


  busy: Subscription;
  commandes: Commande[] = [];
  private cmd: Commande;
  clients: Array<Client>;
  clientIndex:number;

  constructor(private commandeService: CommandeService,
              private clientService: ClientService, private pdfService: PdfService) {
  }

  ngOnInit() {
    this.getAllCommande();
    this.getAllClients();
    this.clientIndex=-1;
  }

  getAllClients() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
      this.initializeSelectClient();
    });
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
    this.cmd = this.commandes[i];
  }

  private initializeSelectClient() {
    const baseContext = this;
    setTimeout(function () {
      const selectClients = jQuery('#clientsSelect');
      selectClients.select2();
      selectClients.on('change',function () {
        baseContext.clientIndex = jQuery(this).val();
        console.log(baseContext.clientIndex);
      });
    }, 20);
  }
}
