import {Component, OnInit} from '@angular/core';
import {Client} from '../../../shared/new models/client';
import {Subscription} from 'rxjs/Subscription';
import {Produit} from '../../../shared/new models/produit';
import {Ville} from '../../../shared/new models/ville';
import {TypeClient} from '../../../shared/new models/type-client';
import {Taxe} from '../../../shared/new models/taxe';
import {ClientService} from '../../../shared/services/client.service';
import {ProduitNEwService} from '../../../shared/services/produitNEw.service';
import {RegionService} from '../../../shared/services/region.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DevisService} from "../../../shared/services/devis.service";
import {Devis} from "../../../shared/new models/devis";
import {Devis_Produit} from "../../../shared/new models/devis_produit";


declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-add-devis',
  templateUrl: './add-devis.component.html',
  styleUrls: ['./add-devis.component.css']
})
export class AddDevisComponent implements OnInit {

  devis: Devis = new Devis();
  clients: Client[] = [];
  busy: Subscription;
  produits: Produit[] = [];
  sumPrice: number;
  toAddClient: Client;
  selectedVille: Ville;
  villes: Array<Ville>;
  taxes: Taxe[] = [];
  types: TypeClient[] = [];

  /* Edit Additional*/
  devisId: number;

  constructor(private clientService: ClientService,
              private devisService: DevisService,
              private produitService: ProduitNEwService,
              private regionService: RegionService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    /* Edit Additional*/
    this.devisId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getAllClients();
    this.getAllProduits();
    this.sumPrice = 0;
  }

  changeTotalLigne(index) {
    if (this.devis.produits[index].remise < 0 || this.devis.produits[index].remise >= 100) {
      this.devis.produits[index].total_price = 0;
      return;
    }
    let total = 0;
    total = this.devis.produits[index].quantite * this.devis.produits[index].produit.prix;
    total = total - ((total * this.devis.produits[index].remise) / 100);
    for (let i = 0; i < this.devis.produits[index].produit.taxes.length; i++) {
      total = total + ((total * this.devis.produits[index].produit.taxes[i].pourcentage) / 100);
    }
    this.devis.produits[index].total_price = parseFloat(total.toFixed(2));
  }

  initializeContentTable(produit: Produit, index: number) {
    this.devis.produits.push(new Devis_Produit());
    this.devis.produits[index].editMode=1;
    this.devis.produits[index].produit = produit;
    this.devis.produits[index].produit_id = produit.produit_id;
  }

  getAllClients() {
    this.clientService.getClients()
      .subscribe(
        (data) => {
          if (data.length !== 0)
            this.devis.client = data[0];
          this.clients = data;
          if(!this.devisId)
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
          if (this.devisId) {
            this.getDevisById(this.devisId);
          }
        },
        (error) => {

        }
      );
  }

  confirmLigne(index: number) {
    if (!this.devis.produits[index].produit || !this.devis.produits[index].quantite) {
      return;
    }
    this.onChangePrice();
    if (this.devis.produits[index].editMode == 1) {
      this.devis.produits[index].editMode = 0;
      this.initializeContentTable(this.produits[0], index + 1);
      this.initializeSelectProduct(index + 1);
    } else {
      this.devis.produits[index].editMode = 0;
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.devis.produits.length - 1);
    this.devis.produits[index].editMode = 2;
    this.initializeSelectProduct(index);
  }

  deleteLigne(index: number) {
    this.devis.produits.pop();
    this.devis.produits.splice(index, 1);
    this.initializeContentTable(this.produits[0], this.devis.produits.length);
    this.initializeSelectProduct(this.devis.produits.length - 1);
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
      if (baseContext.devisId) {
        const indexProduct = baseContext.produits.map(
          function (x) {
            return x.produit_id;
          }
        ).indexOf(baseContext.devis.produits[index].produit_id);
        selectProduct.val(indexProduct).trigger('change');
      } else {
        selectProduct.val(baseContext.devis.produits[index].produit.position).trigger('change');
      }
    }, 20);

  }

  private changeProductValue(indexLignedevis: number, indexProduct: number) {
    this.devis.produits[indexLignedevis].produit = this.produits[indexProduct];
    this.devis.produits[indexLignedevis].produit_id = this.produits[indexProduct].produit_id;
    this.devis.produits[indexLignedevis].produit.position = indexProduct;
    this.changeTotalLigne(indexLignedevis);
    this.onChangePrice();
  }

  private onChangePrice() {
    this.sumPrice = 0;
    for (let i = 0; i < this.devis.produits.length; i++) {
      if(this.devis.produits[i].total_price) this.sumPrice += this.devis.produits[i].total_price;
    }
  }

  isEmptyLignes() {
    let i;
    for (i = 0; i < this.devis.produits.length - 1; i++) {
      if (this.devis.produits[i].editMode !== 0) {
        return true;
      }
    }
    return i === 0;
  }

  submitDevis() {
    if (this.isEmptyLignes() || !this.devis.client) {
      swal('Attention', 'Valider vos lignes', 'warning');
      return;
    }
    this.devis.produits.pop();
    this.devis.montant = this.sumPrice;
    this.devis.client_id = this.devis.client.client_id;
    this.devis.etat = 0;
    if (!this.devisId) {
      this.busy = this.devisService.add(this.devis)
        .subscribe(
          (data) => {
            swal({
              title: 'Succès',
              text: 'La devis a été ajoutée',
              confirmButtonColor: '#66BB6A',
              type: 'success',
              button: 'OK!',
            });
            this.router.navigate(['/vente/devis/list']);
          },
          (error) => {

          }
        );
    } else {
      this.busy = this.devisService.edit(this.devisId, this.devis)
        .subscribe(
          (data) => {
            swal('Succées', 'La devis a été modifiée avec succées', 'success');
            this.router.navigate(['/vente/devis/list']);
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
        baseContext.devis.client_id = baseContext.clients[parseInt(jQuery(this).val())].client_id;
      });
      /* Edit Additional */
      if (baseContext.devisId) {
        const indexClient = baseContext.clients.map(
          function (x) {
            return x.client_id;
          }
        ).indexOf(baseContext.devis.client_id);
        selectClients.val(indexClient).trigger('change');
      }
    }, 20);
  }

  /* Edit Additional */
  private getDevisById(devisId: number) {
    this.devisService.getById(devisId)
      .subscribe(
        (data: Devis) => {
          this.devis = data;
          this.initdevisUI();
        }
      );
  }

  private initdevisUI() {
    this.sumPrice = this.devis.montant;

    this.initializeSelectClient();
    this.initializeAllSelectCommand();
    this.initializeContentTable(this.produits[0], this.devis.produits.length);
    this.initializeSelectProduct(this.devis.produits.length - 1);
    this.confirmAllLigne(this.devis.produits.length - 1);
  }

  private initializeAllSelectCommand() {
    for (let i = 0; i < this.devis.produits.length; i++) {
      this.initializeSelectProduct(i);
    }
  }
}
