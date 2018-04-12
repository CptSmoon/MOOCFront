import {Component, OnInit} from '@angular/core';
import {Client} from '../../../shared/new models/client';
import {Subscription} from 'rxjs/Subscription';
import {Produit} from '../../../shared/new models/produit';
import {Ville} from '../../../shared/new models/ville';
import {TypeClient} from '../../../shared/new models/type-client';
import {ClientService} from '../../../shared/services/client.service';
import {ProduitService} from '../../../shared/services/produit.service';
import {RegionService} from '../../../shared/services/region.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LivraisonService} from '../../../shared/services/livraison.service';
import {Facture} from '../../../shared/new models/facture';
import {Mode_Paiement} from '../../../shared/new models/mode_paiement';
import {FactureService} from '../../../shared/services/facture.service';
import {Facture_Produit} from '../../../shared/new models/facture_produit';
import {Commande} from "../../../shared/new models/commande";
import {Livraison} from "../../../shared/new models/livraison";

declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit {

  modes: Mode_Paiement[] = [];
  clients: Client[] = [];
  busy: Subscription;
  produits: Produit[] = [];
  sumPrice: number;
  toAddClient: Client;
  selectedVille: Ville;
  villes: Array<Ville>;
  types: Array<TypeClient>;
  factureId:number;
  facture:Facture;
  convertAction:boolean;

  constructor(private clientService: ClientService,
              private livraisonService: LivraisonService,
              private produitService: ProduitService,
              private regionService: RegionService,
              private factureService: FactureService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.factureId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.sumPrice = 0;
    this.toAddClient = new Client();
    this.facture = new Facture();
    this.facture.produits = new Array<Facture_Produit>(0);
    this.getAllClients();
    this.getAllProduits();
    this.getModesPaiement();
    this.convertAction = this.router.url.indexOf('convert') !== -1;
    if (this.convertAction) {
      if (this.factureService.livraisonsIds.length == 0 && this.factureService.clientId != -1) {
        this.router.navigate(['/vente/livraison/list']);
      } else {
        this.getFactureByLivraisonIds(this.factureService.clientId, this.factureService.livraisonsIds);
      }
    }

  }

  private initLivraisonUI() {
    this.sumPrice = this.facture.montant;

    this.initializeSelectClient();
    this.initializeAllSelectLivraison();
    this.initializeContentTable(this.produits[0], this.facture.produits.length);
    this.initializeSelectProduct(this.facture.produits.length - 1);
    this.confirmAllLigne(this.facture.produits.length - 1);
  }

  private initializeAllSelectLivraison() {
    for (let i = 0; i < this.facture.produits.length; i++) {
      this.initializeSelectProduct(i);
    }
  }

  public getModesPaiement() {
    this.factureService.modesPaiement().subscribe(data => {
      this.modes = data;
      this.facture.mode_paiement = this.modes[0];
    });

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

  getAllClients() {
    this.clientService.getClients()
      .subscribe(
        (data) => {
          if (data.length !== 0)
            this.facture.client = data[0];
          this.clients = data;

        },
        (error) => {

        }
      );
  }

  private initializeSelectClient() {
    const baseContext = this;
    setTimeout(function () {
      const selectClients = jQuery('#clientsSelect');
      selectClients.select2();
      selectClients.on('change', function () {
        baseContext.facture.client_id = baseContext.clients[parseInt(jQuery(this).val())].client_id;
      });
      if (baseContext.factureId) {
        const indexClient = baseContext.clients.map(
          function (x) {
            return x.client_id;
          }
        ).indexOf(baseContext.facture.client_id);
        selectClients.val(indexClient).trigger('change');
      }
    }, 20);
  }

private initializeSelectModePaiement() {
    const baseContext = this;
    setTimeout(function () {
      const selectMode = jQuery('#modeSelect');
      selectMode.select2();
      selectMode.on('change', function () {
        baseContext.facture.mode_paiement_id = baseContext.modes[parseInt(jQuery(this).val())].mode_paiement_id;
      });
      if (baseContext.factureId) {
        const indexmode = baseContext.modes.map(
          function (x) {
            return x.mode_paiement_id;
          }
        ).indexOf(baseContext.facture.client_id);
        selectMode.val(indexmode).trigger('change');
      }
    }, 20);
  }

  initializeContentTable(produit: Produit, index: number) {
    this.facture.produits.push(new Facture_Produit());
    this.facture.produits[this.facture.produits.length-1].quantite=0;
    this.facture.produits[this.facture.produits.length-1].total_price=0;
    this.facture.produits[index].editMode = 1;
    this.facture.produits[index].produit = produit;
    this.facture.produits[index].produit_id = produit.produit_id;
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
          if (this.factureId) this.getFactureById(this.factureId);
        },
        (error) => {

        }
      );
  }

  confirmLigne(index: number) {
    if (!this.facture.produits[index].produit || !this.facture.produits[index].quantite) {
      return;
    }
    if (this.facture.produits[index].editMode == 1) {
      this.facture.produits[index].editMode = 0;
      this.initializeContentTable(this.produits[0], index + 1);
      this.initializeSelectProduct(index + 1);

    } else {
      this.facture.produits[index].editMode = 0;
    }
    this.onChangePrice();
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.facture.produits.length - 1);
    this.facture.produits[index].editMode = 2;
    this.initializeSelectProduct(index);
  }

  deleteLigne(index: number) {
    this.facture.produits.pop();
    this.facture.produits.splice(index, 1);
    this.initializeContentTable(this.produits[0], this.facture.produits.length);
    this.initializeSelectProduct(this.facture.produits.length - 1);
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
      if (baseContext.factureId) {
        const indexProduct = baseContext.produits.map(
          function (x) {
            return x.produit_id;
          }
        ).indexOf(baseContext.facture.produits[index].produit_id);
        selectProduct.val(indexProduct).trigger('change');
      } else {
        selectProduct.val(baseContext.facture.produits[index].produit.position).trigger('change');
      }
    }, 20);
  }

  private changeProductValue(i: number, indexProduct: number) {
    this.facture.produits[i].produit = this.produits[indexProduct];
    this.facture.produits[i].produit_id = this.produits[indexProduct].produit_id;
    this.facture.produits[i].produit.position = indexProduct;
    this.changeTotalLigne(i);
    this.onChangePrice();
  }

  private onChangePrice() {
    this.sumPrice = 0;
    for (let i = 0; i < this.facture.produits.length; i++) {
      this.sumPrice += this.facture.produits[i].total_price;
    }
  }

  isEmptyLignes() {
    let i;
    for (i = 0; i < this.facture.produits.length - 1; i++) {
      if (this.facture.produits[i].editMode !== 0) {
        return true;
      }
    }
    return i === 0;
  }

  submitFacture() {
    if (this.isEmptyLignes() || !this.facture.client.client_id || !this.facture.mode_paiement) {
      swal('Attention', 'Valider vos lignes', 'warning');
      return;
    }

    this.facture.produits.pop();
    this.onChangePrice();
    this.facture.montant = this.sumPrice;
    this.facture.client_id = this.facture.client.client_id;
    if (!this.factureId){
      this.busy = this.factureService.add(this.facture)
        .subscribe(
          (data) => {
            swal({
              title: 'Succès',
              text: 'La commande a été ajoutée',
              confirmButtonColor: '#66BB6A',
              type: 'success',
              button: 'OK!',
            });
            this.router.navigate(['/vente/facture/list']);
          },
          (error) => {

          }
        );
    }
    else{
      this.busy = this.factureService.edit(this.facture)
        .subscribe(
          (data) => {
            swal({
              title: 'Succès',
              text: 'La commande a été modifiée',
              confirmButtonColor: '#66BB6A',
              type: 'success',
              button: 'OK!',
            }).then((isConfirm)=>{
            this.router.navigate(['/vente/facture/list']);});
          },
          (error) => {
          console.debug(error);
          }
        );
    }
  }

  public cleanAddClientModal() {
    jQuery('#add-client-modal').modal('toggle');
    if (this.types) this.toAddClient.type = this.types[0];
    if (this.villes[0].region) this.toAddClient.region = this.villes[0].region[0];
    if (this.villes) this.selectedVille = this.villes[0];
    if (this.types) this.toAddClient.type = this.types[0];
  }

  private changeTotalLigne(index: number) {
    if (this.facture.produits[index].remise < 0 || this.facture.produits[index].remise >= 100) {
      this.facture.produits[index].total_price = 0;
      return;
    }
    let total = 0;
    total = this.facture.produits[index].quantite * this.facture.produits[index].produit.prix;
    total = total - ((total * this.facture.produits[index].remise) / 100);
    for (let i = 0; i < this.facture.produits[index].produit.taxes.length; i++) {
      total = total + ((total * this.facture.produits[index].produit.taxes[i].pourcentage) / 100);
    }
    this.facture.produits[index].total_price = parseFloat(total.toFixed(2));
  }

  private getFactureById(factureId: number) {
    this.factureService.getById(this.factureId)
      .subscribe(
        (data: Facture) => {
          this.facture = data;
          this.initFactureUI();
        }
      );
  }

  private initFactureUI() {
    this.sumPrice = this.facture.montant;

    this.initializeSelectClient();
    this.initializeSelectModePaiement();
    this.initializeAllSelectFacture();
    this.initializeContentTable(this.produits[0], this.facture.produits.length);
    this.initializeSelectProduct(this.facture.produits.length - 1);
    this.confirmAllLigne(this.facture.produits.length - 1);
  }

  private initializeAllSelectFacture() {
    for (let i = 0; i < this.facture.produits.length; i++) {
      this.initializeSelectProduct(i);
    }
  }

  getFactureByLivraisonIds(clientId: number, livraisonIds: number[]) {
    this.factureService.getFactureByLivraisonIds(clientId, livraisonIds)
      .subscribe(
        (data: Facture) => {
          this.facture = data;
          this.initLivraisonUI();
        }
      );
  }
}
