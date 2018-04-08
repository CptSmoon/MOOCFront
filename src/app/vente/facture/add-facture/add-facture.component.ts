import {Component, OnInit} from "@angular/core";
import {Commande} from "../../../shared/new models/commande";
import {Client} from "../../../shared/new models/client";
import {Subscription} from "rxjs/Subscription";
import {Produit} from "../../../shared/new models/produit";
import {Ville} from "../../../shared/new models/ville";
import {TypeClient} from "../../../shared/new models/type-client";
import {ClientService} from "../../../shared/services/client.service";
import {CommandeService} from "../../../shared/services/commande.service";
import {ProduitService} from "../../../shared/services/produit.service";
import {RegionService} from "../../../shared/services/region.service";
import {Router} from "@angular/router";
import {Ligne_Commande} from "../../../shared/new models/ligne_commande";
import {Livraison} from "../../../shared/new models/livraison";
import {Livraison_Produit} from "../../../shared/new models/livraison_produit";
import {LivraisonService} from "../../../shared/services/livraison.service";
import {Facture} from "../../../shared/new models/facture";
import {Mode_Paiement} from "../../../shared/new models/mode_paiement";
import {FactureService} from "../../../shared/services/facture.service";
import {Facture_Produit} from "../../../shared/new models/facture_produit";

declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent   implements OnInit {

  facture:Facture;
  modes:Array<Mode_Paiement>;
  clients: Client[] = [];
  busy: Subscription;
  produits: Produit[] = [];
  sumPrice: number;
  toAddClient: Client;
  selectedVille:Ville;
  villes:Array<Ville>;
  types:Array<TypeClient>;
  constructor(private clientService: ClientService,
              private livraisonService: LivraisonService,
              private produitService: ProduitService,
              private regionService:RegionService,
              private factureService:FactureService,
              private router: Router) {
  }

  ngOnInit() {
    this.sumPrice=0;
    this.toAddClient=new Client();
    this.facture=new Facture();
    this.facture.produits=new Array<Facture_Produit>(0);
    this.getAllClients();
    this.getAllProduits();
    this.getVilles();
    this.getTypes();
    this.getModesPaiement();
  }

  public getModesPaiement(){
    this.factureService.modesPaiement().subscribe(data=>{
      this.modes=data;
      this.facture.mode_paiement=this.modes[0];
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

  initializeContentTable(produit: Produit, index: number) {
    this.facture.produits.push(new Facture_Produit());
    this.facture.produits[index].editMode=1;
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
      this.onChangePrice();
    } else {
      this.facture.produits[index].editMode = 0;
    }
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
        baseContext.changeProductValue(index,jQuery(this).val());
      });
    }, 20);
  }

  private changeProductValue(i: number, indexProduct:number) {
    this.facture.produits[i].produit = this.produits[indexProduct];
    this.facture.produits[i].produit_id = this.produits[indexProduct].produit_id;
    this.facture.produits[i].produit.position = indexProduct;
    this.onChangePrice();
  }

  private onChangePrice() {
    this.sumPrice = 0;
    let temp:number;
    for (let i = 0; i < this.facture.produits.length-1; i++) {
      temp=this.facture.produits[i].produit.prix * this.facture.produits[i].quantite;
      temp-=temp*(this.facture.produits[i].remise/100);
      this.sumPrice += temp;
    }
  }

  submitFacture() {
    this.facture.produits.pop();

    this.facture.montant = this.sumPrice+0.19*this.sumPrice;
    this.facture.client_id = this.facture.client.client_id;
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