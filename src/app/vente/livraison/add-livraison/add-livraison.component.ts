import {Component, OnInit} from '@angular/core';
import {Commande} from '../../../shared/new models/commande';
import {Client} from '../../../shared/new models/client';
import {Subscription} from 'rxjs/Subscription';
import {Produit} from '../../../shared/new models/produit';
import {Ville} from '../../../shared/new models/ville';
import {TypeClient} from '../../../shared/new models/type-client';
import {ClientService} from '../../../shared/services/client.service';
import {CommandeService} from '../../../shared/services/commande.service';
import {ProduitService} from '../../../shared/services/produit.service';
import {RegionService} from '../../../shared/services/region.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Ligne_Commande} from '../../../shared/new models/ligne_commande';
import {Livraison} from '../../../shared/new models/livraison';
import {Livraison_Produit} from '../../../shared/new models/livraison_produit';
import {LivraisonService} from '../../../shared/services/livraison.service';

declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-livraison.component.html',
  styleUrls: ['./add-livraison.component.css']
})
export class AddLivraisonComponent implements OnInit {

  livraison: Livraison = new Livraison();
  clients: Client[] = [];
  busy: Subscription;
  produits: Produit[] = [];
  sumPrice: number;
  toAddClient: Client;
  selectedVille: Ville;
  villes: Array<Ville>;
  types: Array<TypeClient>;

  /* Edit Additional*/
  livraisonId: number;

  /* Convert Additional */
  convertAction: boolean;

  constructor(private clientService: ClientService,
              private livraisonService: LivraisonService,
              private produitService: ProduitService,
              private regionService: RegionService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    /* Edit Additional*/
    this.livraisonId = parseInt(this.route.snapshot.paramMap.get('livraisonId'));
    /* Convert Additional */
    this.convertAction = this.router.url.indexOf('convert') !== -1;
    if (this.convertAction) {
      console.log(this.livraisonService.commandIds);
      if (this.livraisonService.commandIds.length == 0 && this.livraisonService.clientId != -1) {
        this.router.navigate(['/vente/livraison/list']);
      } else {
        this.getLivraisonByCommandIds(this.livraisonService.clientId, this.livraisonService.commandIds);
      }
    }
    /*******/


    this.sumPrice = 0;
    this.toAddClient = new Client();
    this.getAllClients();
    this.getAllProduits();
    // this.getVilles();
    // this.getTypes();
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
    this.livraison.produits.push(new Livraison_Produit());
    this.livraison.produits[index].editMode = 1;
    this.livraison.produits[index].produit = produit;
    this.livraison.produits[index].produit_id = produit.produit_id;
  }

  getAllClients() {
    this.clientService.getClients()
      .subscribe(
        (data) => {
          if (data.length !== 0)
            this.livraison.client = data[0];
          this.clients = data;
          if (!this.livraisonId)
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
          if (this.livraisonId) {
            this.getLivraisonById(this.livraisonId);
          }
        },
        (error) => {

        }
      );
  }

  confirmLigne(index: number) {
    if (!this.livraison.produits[index].produit || !this.livraison.produits[index].quantite) {
      return;
    }

    this.onChangePrice();
    if (this.livraison.produits[index].editMode == 1) {
      this.livraison.produits[index].editMode = 0;
      this.initializeContentTable(this.produits[0], index + 1);
      this.initializeSelectProduct(index + 1);

    } else {
      this.livraison.produits[index].editMode = 0;
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.livraison.produits.length - 1);
    this.livraison.produits[index].editMode = 2;
    this.initializeSelectProduct(index);
  }

  deleteLigne(index: number) {
    this.livraison.produits.pop();
    this.livraison.produits.splice(index, 1);
    this.initializeContentTable(this.produits[0], this.livraison.produits.length);
    this.initializeSelectProduct(this.livraison.produits.length - 1);
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
        baseContext.changeProductValue(index, jQuery(this).val());
      });
      /* Edit Additional */
      if (baseContext.livraisonId) {
        const indexProduct = baseContext.produits.map(
          function (x) {
            return x.produit_id;
          }
        ).indexOf(baseContext.livraison.produits[index].produit_id);
        selectProduct.val(indexProduct).trigger('change');
      }
      // selectProduct.val(baseContext.livraison.produits[index].produit.position).trigger('change');
    }, 20);
  }

  private changeProductValue(i: number, indexProduct: number) {
    this.livraison.produits[i].produit = this.produits[indexProduct];
    this.livraison.produits[i].produit_id = this.produits[indexProduct].produit_id;
    this.livraison.produits[i].produit.position = indexProduct;
    this.changeTotalLigne(i);
    this.onChangePrice();
  }

  private onChangePrice() {
    this.sumPrice = 0;
    for (let i = 0; i < this.livraison.produits.length; i++) {
      this.sumPrice += this.livraison.produits[i].total_price;
    }
  }

  isEmptyLignes() {
    let i;
    for (i = 0; i < this.livraison.produits.length - 1; i++) {
      if (this.livraison.produits[i].editMode !== 0) {
        return true;
      }
    }
    return i === 0;
  }

  submitLivraison() {
    if (this.isEmptyLignes() || !this.livraison.client.client_id || !this.livraison.date_echeance) {
      swal('Attention', 'Valider vos lignes', 'warning');
      return;
    }

    this.livraison.produits.pop();

    this.livraison.montant = this.sumPrice;
    this.livraison.client_id = this.livraison.client.client_id;


    if (!this.livraisonId && !this.convertAction) {
      this.busy = this.livraisonService.add(this.livraison)
        .subscribe(
          (data) => {
            swal({
              title: 'Succès',
              text: 'La commande a été ajoutée',
              confirmButtonColor: '#66BB6A',
              type: 'success',
              button: 'OK!',
            });
            this.router.navigate(['/vente/livraison/list']);
          },
          (error) => {

          }
        );
    } else {
      if (this.convertAction) {
        this.livraisonId = this.livraison.livraison_id;
      }
      this.busy = this.livraisonService.editLivraison(this.livraisonId, this.livraison)
        .subscribe(
          (data) => {
            swal('Succées', 'La livraison a été modifiée avec succées', 'success');
            this.router.navigate(['/vente/livraison/list']);
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
        baseContext.livraison.client_id = baseContext.clients[parseInt(jQuery(this).val())].client_id;
      });
      /* Edit Additional */
      if (baseContext.livraisonId) {
        const indexClient = baseContext.clients.map(
          function (x) {
            return x.client_id;
          }
        ).indexOf(baseContext.livraison.client_id);
        selectClients.val(indexClient).trigger('change');
      }
    }, 20);
  }

  changeTotalLigne(index) {

    if (this.livraison.produits[index].remise < 0 || this.livraison.produits[index].remise >= 100) {
      this.livraison.produits[index].total_price = 0;
      return;
    }
    let total = 0;
    total = this.livraison.produits[index].quantite * this.livraison.produits[index].produit.prix;
    total = total - ((total * this.livraison.produits[index].remise) / 100);
    for (let i = 0; i < this.livraison.produits[index].produit.taxes.length; i++) {
      total = total + ((total * this.livraison.produits[index].produit.taxes[i].pourcentage) / 100);
    }
    this.livraison.produits[index].total_price = parseFloat(total.toFixed(2));
  }


  /* Edit Additional */
  private getLivraisonById(livraisonId: number) {
    this.livraisonService.getLivraisonById(livraisonId)
      .subscribe(
        (data: Livraison) => {
          this.livraison = data;
          this.initLivraisonUI();
        }
      );
  }

  private initLivraisonUI() {
    this.sumPrice = this.livraison.montant;

    this.initializeSelectClient();
    this.initializeAllSelectLivraison();
    this.initializeContentTable(this.produits[0], this.livraison.produits.length);
    this.initializeSelectProduct(this.livraison.produits.length - 1);
    this.confirmAllLigne(this.livraison.produits.length - 1);
  }

  private initializeAllSelectLivraison() {
    for (let i = 0; i < this.livraison.produits.length; i++) {
      this.initializeSelectProduct(i);
    }
  }

  /***********/

  /* Convert Additional */
  getLivraisonByCommandIds(clientId: number, commandIds: number[]) {
    this.livraisonService.getLivraisonByCommandIds(clientId, commandIds)
      .subscribe(
        (data: Livraison) => {
          this.livraison = data;
          this.initLivraisonUI();
        }
      );
  }

}
