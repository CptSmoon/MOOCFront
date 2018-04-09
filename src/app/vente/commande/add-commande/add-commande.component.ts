import {Component, OnInit} from '@angular/core';
import {Commande} from '../../../shared/new models/commande';
import {Client} from '../../../shared/new models/client';
import {Subscription} from 'rxjs/Subscription';
import {Produit} from '../../../shared/new models/produit';
import {Ville} from '../../../shared/new models/ville';
import {TypeClient} from '../../../shared/new models/type-client';
import {Taxe} from '../../../shared/new models/taxe';
import {ClientService} from '../../../shared/services/client.service';
import {CommandeService} from '../../../shared/services/commande.service';
import {ProduitNEwService} from '../../../shared/services/produitNEw.service';
import {RegionService} from '../../../shared/services/region.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Ligne_Commande} from '../../../shared/new models/ligne_commande';


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
  selectedVille: Ville;
  villes: Array<Ville>;
  taxes: Taxe[] = [];
  types: TypeClient[] = [];

  /* Edit Additional*/
  commandId: number;

  constructor(private clientService: ClientService,
              private commandeService: CommandeService,
              private produitService: ProduitNEwService,
              private regionService: RegionService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    /* Edit Additional*/
    this.commandId = parseInt(this.route.snapshot.paramMap.get('commandId'));


    this.sumPrice = 0;
    this.toAddClient = new Client();
    this.getAllClients();
    this.getAllProduits();
    this.getAllTaxes();
    // this.getVilles();
    // this.getTypes();
  }

  public getAllTaxes() {
    this.produitService.getTaxes()
      .subscribe(
        (data) => {
          this.taxes = data;
        }
      );
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

  changeTotalLigne(index) {
    if (this.commande.lignes_commande[index].remise < 0 || this.commande.lignes_commande[index].remise >= 100) {
      this.commande.lignes_commande[index].total_price = 0;
      return;
    }
    let total = 0;
    total = this.commande.lignes_commande[index].quantite * this.commande.lignes_commande[index].produit.prix;
    total = total - ((total * this.commande.lignes_commande[index].remise) / 100);
    for (let i = 0; i < this.commande.lignes_commande[index].produit.taxes.length; i++) {
      total = total + ((total * this.commande.lignes_commande[index].produit.taxes[i].pourcentage) / 100);
    }
    this.commande.lignes_commande[index].total_price = parseFloat(total.toFixed(2));
  }

  initializeContentTable(produit: Produit, index: number) {
    this.commande.lignes_commande.push(new Ligne_Commande());
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
          if (this.commandId == null)
            this.initializeSelectClient();
        },
        (error) => {

        }
      );
  }

  getAllProduits() {
    this.produitService.getProduits()
      .subscribe(
        (data) => {
          this.produits = data;
          if (data.length !== 0) {
            this.initializeContentTable(this.produits[0], 0);
          }
          this.initializeSelectProduct(0);
          if (this.commandId) {
            this.getCommandeById(this.commandId);
          }
        },
        (error) => {

        }
      );
  }

  confirmLigne(index: number) {
    if (!this.commande.lignes_commande[index].produit || !this.commande.lignes_commande[index].quantite) {
      return;
    }
    this.onChangePrice();
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
    this.onChangePrice();
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
      /* Edit Additional */
      if (baseContext.commandId) {
        const indexProduct = baseContext.produits.map(
          function (x) {
            return x.produit_id;
          }
        ).indexOf(baseContext.commande.lignes_commande[index].produit_id);
        selectProduct.val(indexProduct).trigger('change');
      } else {
        selectProduct.val(baseContext.commande.lignes_commande[index].produit.position).trigger('change');
      }
    }, 20);

  }

  private changeProductValue(indexLigneCommande: number, indexProduct: number) {
    this.commande.lignes_commande[indexLigneCommande].produit = this.produits[indexProduct];
    this.commande.lignes_commande[indexLigneCommande].produit_id = this.produits[indexProduct].produit_id;
    this.commande.lignes_commande[indexLigneCommande].produit.position = indexProduct;
    this.changeTotalLigne(indexLigneCommande);
    this.onChangePrice();
  }

  private onChangePrice() {
    this.sumPrice = 0;
    for (let i = 0; i < this.commande.lignes_commande.length; i++) {
      this.sumPrice += this.commande.lignes_commande[i].total_price;
    }
  }

  isEmptyLignes() {
    let i;
    for (i = 0; i < this.commande.lignes_commande.length - 1; i++) {
      if (this.commande.lignes_commande[i].editMode !== 0) {
        return true;
      }
    }
    return i === 0;
  }

  submitCommande() {

    if (this.isEmptyLignes() || !this.commande.client) {
      swal('Attention', 'Valider vos lignes', 'warning');
      return;
    }
    this.commande.lignes_commande.pop();
    this.commande.montant = this.sumPrice;
    this.commande.client_id = this.commande.client.client_id;
    this.commande.etat = false;
    if (!this.commandId) {
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
    } else {
      this.busy = this.commandeService.editCommande(this.commandId, this.commande)
        .subscribe(
          (data) => {
            swal('Succées', 'La commande a été modifiée avec succées', 'success');
            this.router.navigate(['/vente/commande/list']);
          },
          (error) => {
          }
        );
    }
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

  private initializeSelectClient() {
    const baseContext = this;
    setTimeout(function () {
      const selectClients = jQuery('#clientsSelect');
      selectClients.select2();
      selectClients.on('change', function () {
        baseContext.commande.client_id = baseContext.clients[parseInt(jQuery(this).val())].client_id;
      });
      /* Edit Additional */
      if (baseContext.commandId) {
        const indexClient = baseContext.clients.map(
          function (x) {
            return x.client_id;
          }
        ).indexOf(baseContext.commande.client_id);
        selectClients.val(indexClient).trigger('change');
      }
    }, 20);
  }

  /* Edit Additional */
  private getCommandeById(commandId: number) {
    this.commandeService.getCommandById(commandId)
      .subscribe(
        (data: Commande) => {
          this.commande = data;
          this.initCommandeUI();
        }
      );
  }

  private initCommandeUI() {
    this.sumPrice = this.commande.montant;

    this.initializeSelectClient();
    this.initializeAllSelectCommand();
    this.initializeContentTable(this.produits[0], this.commande.lignes_commande.length);
    this.initializeSelectProduct(this.commande.lignes_commande.length - 1);
    this.confirmAllLigne(this.commande.lignes_commande.length - 1);
  }

  private initializeAllSelectCommand() {
    for (let i = 0; i < this.commande.lignes_commande.length; i++) {
      this.initializeSelectProduct(i);
    }
  }
}
