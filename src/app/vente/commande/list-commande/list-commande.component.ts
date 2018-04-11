import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Commande} from '../../../shared/new models/commande';
import {CommandeService} from '../../../shared/services/commande.service';
import {Utils} from '../../../shared/utils';
import * as FileSaver from 'file-saver';
import {ClientService} from '../../../shared/services/client.service';
import {Client} from '../../../shared/new models/client';
import {LivraisonService} from '../../../shared/services/livraison.service';
import {Router} from '@angular/router';

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
  allwedConvert: boolean;


  constructor(private commandeService: CommandeService,
              private clientService: ClientService,
              private livraisonService: LivraisonService,
              private router: Router) {
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
          Utils.initializeDataTables(50, 6, 'dataTable');
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
                Utils.initializeDataTables(50, 6, 'dataTable');
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

  changeEtat(index) {
    if (this.isCheckedCommands()) {
      this.allwedConvert = true;
      return;
    }
    this.allwedConvert = false;
  }

  private isCheckedCommands() {
    for (let i = 0; i < this.commandes.length; i++) {
      if (this.commandes[i].isConverted) {
        return true;
      }
    }
    return false;
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
    const commandIds: number[] = [];
    for (let i = 0; i < this.commandes.length; i++) {
      if (this.commandes[i].isConverted) {
        commandIds.push(this.commandes[i].commande_id);
      }
    }
    this.livraisonService.commandIds = commandIds;
    this.livraisonService.clientId = this.clients[this.clientIndex].client_id;
    this.router.navigate(['/vente/livraison/convert']);
  }

  print(id:number){
    this.busy = this.commandeService.getBon(id)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, 'bonDeCommande' + id);
        }
      );
  }
}
