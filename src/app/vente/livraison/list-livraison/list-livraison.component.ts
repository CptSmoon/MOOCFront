import {Component, OnInit} from '@angular/core';
import * as FileSaver from 'file-saver';
import {Subscription} from 'rxjs/Subscription';
import {LivraisonService} from '../../../shared/services/livraison.service';
import {Livraison} from '../../../shared/new models/livraison';
import {PdfService} from '../../../shared/services/pdf.service';
import {Utils} from '../../../shared/utils';
import {ClientService} from "../../../shared/services/client.service";
import {Client} from "../../../shared/new models/client";
import {Route, Router} from "@angular/router";
import {FactureService} from "../../../shared/services/facture.service";

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
  clients:Client[];
  clientIndex:number=-1;
  allwedConvert:boolean;
  constructor(private livraisonService: LivraisonService,
              private clientService: ClientService,
              private pdfService: PdfService,
              private factureService:FactureService,
              private router:Router) {
  }

  ngOnInit() {
    this.getLivraisons();
    this.getClients();
  }

  public getLivraisons() {
    this.busy = this.livraisonService.getAll().subscribe(data => {
      this.livraisons = data;
    Utils.initializeDataTables(20, 7, 'table');
    });
  }

  public getClients() {
    this.busy = this.clientService.getClients().subscribe(data => {
      this.clients = data;
      this.initializeSelectClient();
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
  print(id:number){
    this.busy = this.livraisonService.getBon(id)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, 'bonDeLivraison' + id);
        }
      );
  }

  private initializeSelectClient() {
    const baseContext = this;
    this.clientIndex=-1;
    setTimeout(function () {
      const selectClients = jQuery('#clientsSelect');
      selectClients.select2();
      selectClients.on('change', function () {
        baseContext.clientIndex = jQuery(this).val();
      });
    }, 20);
  }

  changeEtat(index) {
    if (this.isCheckedLivraisons()) {
      this.allwedConvert = true;
      return;
    }
    this.allwedConvert = false;
  }

  private isCheckedLivraisons() {
    for (let i = 0; i < this.livraisons.length; i++) {
      if (this.livraisons[i].isConverted) {
        return true;
      }
    }
    return false;
  }

  convert(){
    const livraisonsIds: number[] = [];
    for (let i = 0; i < this.livraisons.length; i++) {
      if (this.livraisons[i].isConverted) {
        livraisonsIds.push(this.livraisons[i].livraison_id);
      }
    }
    this.factureService.livraisonsIds = livraisonsIds;
    this.factureService.clientId = this.clients[this.clientIndex].client_id;
    this.router.navigate(['/vente/facture/convert']);
  }

  pi(i:number) {
    this.busy=this.livraisonService.paiementIllegal(this.livraisons[i].livraison_id,this.livraisons[i]).subscribe(data=>{
      this.livraisons[i].etat=4;
      swal('Succées', 'paiement Illégal enregistré', 'success');
    });
  }
}
