import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Client} from "../../../shared/models/client";
import {Ligne_Commande} from "../../../shared/models/ligne_Commande";
import {Produit} from "../../../shared/new models/produit";
import {Produit_Produit_Base} from "../../../shared/new models/produit_produit_base";
import {Produit_Base} from "../../../shared/new models/produit_base";
import {Unite} from "../../../shared/new models/unite";
import {ProduitBaseService} from "../../../shared/services/produit-base.service";
import {ProduitService} from "../../../shared/services/produit.service";
import {Router} from "@angular/router";
import {ProduitNEwService} from "../../../shared/services/produitNEw.service";
declare var jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  busy: Subscription;
  public isEditAction: boolean = false;

  public produits_bases : Produit_Base[]= [];
  public produit: Produit = new Produit();
  public produits : Produit_Produit_Base[] = [];
  constructor(private router: Router,
              private produitBaseService : ProduitBaseService,
              private produitService : ProduitNEwService) { }

  ngOnInit() {
    this.getAllProduitBases();
  }


  initializeContentTable(produit: Produit_Base, index: number) {
    this.produit.produit_produit_bases.push(
      new Produit_Produit_Base()
    );

    this.produit.produit_produit_bases[index].produit_base = produit;
    this.produit.produit_produit_bases[index].produit_base_id = produit.produit_base_id;
  }

  getAllProduitBases() {
    let baseContext = this;

    this.busy = this.produitBaseService.getAll().subscribe(response => {
      baseContext.produits_bases = response;

      this.initializeContentTable( this.produits_bases[0], 0);
      this.initializeSelectProduct(0);

    }), error => {
      console.debug(error);

    };
      this.produits.push(new Produit_Produit_Base());



  }


  confirmLigne(index: number) {
    if (!this.produit.produit_produit_bases[index].produit_base ||
      !this.produit.produit_produit_bases[index].quantite||
      this.produit.produit_produit_bases[index].quantite<=0) {
      return;
    }
    if (this.produit.produit_produit_bases[index].editMode == 1) {

      this.produit.produit_produit_bases[index].editMode = 0;
      this.initializeContentTable(this.produits_bases[0], index + 1);
      this.initializeSelectProduct(index + 1);
    } else {
      this.produit.produit_produit_bases[index].editMode = 0;
      console.log("yes");

    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.produit.produit_produit_bases.length - 1);
    this.produit.produit_produit_bases[index].editMode = 2;
    this.initializeSelectProduct(index);
  }

  deleteLigne(index: number) {
    this.produit.produit_produit_bases.pop();
    this.produit.produit_produit_bases.splice(index, 1);
    this.initializeContentTable(this.produits[0].produit_base, this.produit.produit_produit_bases.length);
    this.initializeSelectProduct(this.produit.produit_produit_bases.length - 1);
  }


  private confirmAllLigne(length) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne(i);
    }
  }


  private initializeSelectProduct(index) {
    console.log("what's wrong'");
    const baseContext = this;
    setTimeout(function () {
      const selectProduct = jQuery('.select-product-' + index);
      selectProduct.select2();
      selectProduct.on('change', function () {
        baseContext.changeProductValue(index, +jQuery(this).val());
      });
      selectProduct.val(baseContext.produit.produit_produit_bases[index].produit_base.position)
        .trigger('change');
    }, 20);
  }

  private changeProductValue(indexLigneCommande: number, indexProduct) {
    this.produit.produit_produit_bases[indexLigneCommande].produit_base= this.produits_bases[indexProduct];
    this.produit.produit_produit_bases[indexLigneCommande].produit_base_id = this.produits_bases[indexProduct].produit_base_id;
    this.produit.produit_produit_bases[indexLigneCommande].produit_base.position = indexProduct;
  }
  private addProduit() {
    if(this.produit.produit_produit_bases
        [this.produit.produit_produit_bases.length-1].quantite<=0){
      this.produit.produit_produit_bases.pop();
    }
    if(this.produit.produit_produit_bases.length == 0)
    {swal({
        title: 'Enregistrez la composition !',
        text: 'Les valeurs doivent être valides',
        confirmButtonColor: 'red',
        type: 'error'
      });
    return;}
    let baseContext = this;
    console.log(this.produit);

    this.busy = this.produitService.addProduit(this.produit).subscribe(response => {
      swal({
        title: 'Ajouté !',
        text: 'Un nouveau produit est ajouté.',
        confirmButtonColor: '#66BB6A',
        type: 'success'
      }).then((isConfirm) => {
        this.router.navigate(['/production/produit/list']);
      });
    }, error => {
      swal({
        title: 'Erreur !',
        text: JSON.stringify(error.error.errors),
        confirmButtonColor: 'red',
        type: 'error'
      });
      console.debug(error);
    });
  }



}
