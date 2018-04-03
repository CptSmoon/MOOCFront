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
import {Ville} from "../../../shared/new models/ville";
import {RegionService} from "../../../shared/services/region.service";
import {TypeClient} from "../../../shared/new models/type-client";

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
  toAddClient: Client;
  selectedVille:Ville;
  villes:Array<Ville>;
  types:Array<TypeClient>;
  constructor(private clientService: ClientService,
              private commandeService: CommandeService,
              private produitService: ProduitService,
              private regionService:RegionService,
              private clientSevice:ClientService,
              private router: Router) {
  }

  ngOnInit() {
    this.toAddClient=new Client();
    this.getAllClients();
    this.getAllProduits();
    this.getVilles();
    this.getTypes();
  }

  public getTypes() {
    this.clientService.getTypes().subscribe(data => {
      this.types = data;
      this.toAddClient.type = this.types[0];
    });
  }

  public getVilles() {
    this.regionService.getAll().subscribe(data => {
      this.villes = data;
      this.selectedVille = this.villes[0];
      if (this.villes && this.villes[0].region) this.toAddClient.region = this.villes[0].region[0];
    });
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
    if (this.toAddClient.name && this.toAddClient.mobile && this.toAddClient.email && this.toAddClient.region && this.toAddClient.type && this.selectedVille) {
      return true;
    }
    return false;
  }

  addClient() {
    this.toAddClient.region_id = this.toAddClient.region.region_id;
    this.toAddClient.type_client_id = this.toAddClient.type.type_client_id;
    this.clientService.addClient(this.toAddClient).subscribe(data => {
        this.clients.push(data);
        swal({
          title: 'Succès',
          text: 'Le client "' + data.name + '" a été ajoutée',
          confirmButtonColor: '#66BB6A',
          type: 'success',
          button: 'OK!',
        });
      },
      error => {
        swal({
          title: 'Erreur',
          text: 'L\'operation a échoué',
          confirmButtonColor: '#FF0000',
          type: 'warning',
          button: 'OK!',
        });
      });
    this.cleanAddClientModal();

  }

  public cleanAddClientModal() {
    jQuery('#add-client-modal').modal('toggle');
    if (this.types) this.toAddClient.type = this.types[0];
    if (this.villes[0].region) this.toAddClient.region = this.villes[0].region[0];
    if (this.villes) this.selectedVille = this.villes[0];
    if (this.types) this.toAddClient.type = this.types[0];
  }

}
