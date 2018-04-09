import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Commande} from '../../../shared/new models/commande';
import {CommandeService} from '../../../shared/services/commande.service';
import {PdfService} from '../../../shared/services/pdf.service';
import {Utils} from '../../../shared/utils';
import * as FileSaver from 'file-saver';
import {ClientService} from '../../../shared/services/client.service';
import {Client} from '../../../shared/new models/client';
import {forEach} from '@angular/router/src/utils/collection';

declare var jQuery: any;
declare var swal: any;

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
  clientIndex: number;
  selectedCommandes: Array<number>;



  constructor(private commandeService: CommandeService,
              private clientService: ClientService, private pdfService: PdfService) {
  }

  ngOnInit() {
    this.getAllCommande();
    this.getAllClients();
    this.clientIndex = -1;
    this.selectedCommandes = new Array<number>(0);
    this.clientIndex = -1;

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

  deleteCommande(index: number) {
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
          baseContext.busy = baseContext.commandeService.deleteCommande(baseContext.commandes[index].commande_id)
            .subscribe(
              (data) => {
                swal('Succées', 'Commande supprimé avec succées', 'success');
                baseContext.commandes.splice(index, 1);
                Utils.initializeDataTables(50, 5, 'dataTable');
              },
              (error) => {

              }
            );
        }
      });

  }

  detailsCmd(i) {
    this.cmd = this.commandes[i];
  }

  private initializeSelectClient() {
    const baseContext = this;
    setTimeout(function () {
      const selectClients = jQuery('#clientsSelect');
      selectClients.select2();
      selectClients.on('change', function () {
        baseContext.clientIndex = jQuery(this).val();
        console.log(baseContext.clientIndex);
      });
    }, 20);
  }

  convert() {
    for (let c of this.commandes) {
      if (c.selected && c.client.client_id == this.clients[this.clientIndex].client_id) this.selectedCommandes.push(c.client_id);
    }
    console.log(this.selectedCommandes);
  }
}
