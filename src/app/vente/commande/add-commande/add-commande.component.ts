import {Component, OnInit} from '@angular/core';
import {Commande} from '../../../shared/models/commande';
import {Client} from '../../../shared/models/client';
import {ClientService} from '../../../shared/services/client.service';
import {CommandeService} from '../../../shared/services/commande.service';
import {Subscription} from 'rxjs/Subscription';
import {Ligne_Commande} from '../../../shared/models/ligne_Commande';
import {Produit} from '../../../shared/models/produit';
import {ProduitService} from '../../../shared/services/produit.service';
import {Router} from '@angular/router';

declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit {

  commande: Commande = new Commande();
  clients: Client[] = [];
  clientModal: Client = new Client();
  busy: Subscription;
  produits: Produit[] = [];
  sumPrice: number;

  constructor(private clientService: ClientService,
              private commandeService: CommandeService,
              private produitService: ProduitService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllClients();
    this.getAllProduits();
  }

  initializeContentTable(produit: Produit, index: number) {
    this.commande.lignes_commande.push(
      new Ligne_Commande()
    );
    this.commande.lignes_commande[index].produit = produit;
    this.commande.lignes_commande[index].produit_id = produit.produit_id;
  }

  getAllClients() {
    this.clientService.getClients()
      .subscribe(
        (data) => {
          if (data.length !== 0)
            this.commande.client = data[0];
          this.clients = data;
        },
        (error) => {

        }
      );
  }

  getAllProduits() {
    this.produitService.getProduits()
      .subscribe(
        (data) => {
          if (data.length !== 0) {
            this.initializeContentTable(data[0], 0);
          }
          this.produits = data;
          this.initializeSelectProduct(0);
        },
        (error) => {

        }
      );
  }

  confirmLigne(index: number) {
    if (!this.commande.lignes_commande[index].produit || !this.commande.lignes_commande[index].quantity) {
      return;
    }
    if (this.commande.lignes_commande[index].editMode == 1) {
      this.commande.lignes_commande[index].editMode = 0;
      this.initializeContentTable(this.produits[0], index + 1);
      this.initializeSelectProduct(index + 1);
    } else {
      this.commande.lignes_commande[index].editMode = 0;
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.commande.lignes_commande.length - 1);
    this.commande.lignes_commande[index].editMode = 2;
    this.initializeSelectProduct(index);
  }

  deleteLigne(index: number) {
    this.commande.lignes_commande.pop();
    this.commande.lignes_commande.splice(index, 1);
    this.initializeContentTable(this.produits[0], this.commande.lignes_commande.length);
    this.initializeSelectProduct(this.commande.lignes_commande.length - 1);
  }


  private confirmAllLigne(length) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne(i);
    }
  }


  private initializeSelectProduct(index) {
    const baseContext = this;
    setTimeout(function () {
      const selectProduct = jQuery('.select-product-' + index);
      selectProduct.select2();
      selectProduct.on('change', function () {
        baseContext.changeProductValue(index, +jQuery(this).val());
      });
        selectProduct.val(baseContext.commande.lignes_commande[index].produit.position).trigger('change');
    }, 20);
  }

  private changeProductValue(indexLigneCommande: number, indexProduct) {
    this.commande.lignes_commande[indexLigneCommande].produit = this.produits[indexProduct];
    this.commande.lignes_commande[indexLigneCommande].produit_id = this.produits[indexProduct].produit_id;
    this.commande.lignes_commande[indexLigneCommande].produit.position = indexProduct;
    this.onChangePrice();
  }

  private onChangePrice() {

    this.sumPrice = 0;
    for (let i = 0; i < this.commande.lignes_commande.length; i++) {
      this.sumPrice += this.commande.lignes_commande[i].produit.prix * this.commande.lignes_commande[i].quantity;
    }
    return this.sumPrice;
  }

  submitCommande() {
    this.commande.lignes_commande.pop();

    this.commande.montant = this.sumPrice;
    this.commande.client_id = this.commande.client.client_id;
    console.log(this.commande);
    this.busy = this.commandeService.addCommande(this.commande)
      .subscribe(
        (data) => {
          swal({
            title: 'Succès',
            text: 'La commande a été ajoutée',
            confirmButtonColor: '#66BB6A',
            type: 'success',
            button: 'OK!',
          });
          this.router.navigate(['/vente/commande/list']);
        },
        (error) => {

        }
      );
  }

  validChampsClient() {
    if (this.clientModal.name && this.clientModal.mobile && this.clientModal.email) {
      return true;
    }
    return false;
  }

  addClient() {
    console.log(this.clientModal);
    this.clientService.addClient(this.clientModal)
      .subscribe(
        (data) => {
          this.clients.push(data);
          swal({
            title: 'Succès',
            text: 'Le Client "' + data.name + '" a été ajoutée',
            confirmButtonColor: '#66BB6A',
            type: 'success',
            button: 'OK!',
          });
        },
        (error) => {

        }
      );
    this.cleanAddClientModal();
  }

  cleanAddClientModal() {
    this.clientModal = new Client();
    jQuery('#add-client-modal').modal('toggle');
  }

}
