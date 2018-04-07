import { Component, OnInit } from '@angular/core';
import {Utils} from "../../../shared/utils";
import {EmballageService} from "../../../shared/services/emballage.service";
import {MPService} from "../../../shared/services/mp.service";
import {Router} from "@angular/router";
import {RecipientService} from "../../../shared/services/recipient.service";
import {UniteService} from "../../../shared/services/unite.service";
import {FormuleService} from "../../../shared/services/formule.service";
import {ProduitNEwService} from "../../../shared/services/produitNEw.service";
import {Subscription} from "rxjs/Subscription";
import {Produit} from "../../../shared/new models/produit";
import {Formule} from "../../../shared/models/formule";
import {Client} from "../../../shared/models/client";
import {Produit_Produit_Base} from "../../../shared/new models/produit_produit_base";
import {ProduitBaseService} from "../../../shared/services/produit-base.service";
import {Produit_Base} from "../../../shared/new models/produit_base";
declare var jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {
  busy: Subscription;
  public produits : Produit[] = [];
  private selectedProduit: Produit;
  private openProduitIndex: number;
  produits_bases: Array<Produit_Base>=[];
  private enabled: boolean=true;
  constructor(private produitBaseService: ProduitBaseService,
              private router: Router, private produitService: ProduitNEwService) { }

  ngOnInit() {
    this.getAllProduits();
    this.getAllProduitBases();
  }

  private getAllProduits() {
    let baseContext  = this;
    this.busy = this.produitService.getProduits().subscribe(response => {
      baseContext.produits = response as Array<Produit>;
      console.log(this.produits);
      Utils.initializeDataTables(20, 9, 'dataTable');

    }), error => {
      console.debug(error);
    };
  }
  //
  confirmLigne(index: number) {
    let pro = this.produits[index];

    if (!pro.label || !pro.reference||
      !pro.codeABarre || !pro.prix||
      !pro.seuil || pro.seuil<=0) {
      return;
    }
    if (pro.editMode == 1) {
      pro.editMode = 0;
      this.busy = this.produitService.editProduit(pro)
        .subscribe(response => {}), error => {
        console.debug(error);
      };
    } else {
      pro.editMode = 0;
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.produits.length - 1);
    this.produits[index].editMode = 1;
  }
  //
  // deleteLigne(index: number) {
  //   this.produits.pop();
  //   this.produits.splice(index, 1);
  //   this.initializeContentTable(this.produits[0], this.produits.length);
  //   this.initializeSelectProduct(this.produits.length - 1);
  // }


  private confirmAllLigne(length) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne(i);
    }
  }



  private changeProductValue(indexLignesortie: number, indexProduct) {
    this.produits[indexLignesortie] = this.produits[indexProduct];
    this.produits[indexLignesortie].produit_id = this.produits[indexProduct].produit_id;
    this.produits[indexLignesortie].position = indexProduct;
  }


  openComposition(i) {
    if (i >= 0) {
      this.selectedProduit = this.produits[i];
      this.openProduitIndex = i;
    }
    Utils.initializeDataTables(20, 3, 'datatable2');

  }

  cleanCompositionModal() {
    this.selectedProduit.editMode2 = 0;
    this.enabled = true;
    jQuery('#list-composition-modal').modal('toggle');
  }
  //----------------------------------------------------------------------------

  getAllProduitBases() {
    let baseContext = this;

    this.busy = this.produitBaseService.getAll().subscribe(response => {
      baseContext.produits_bases = response;

      this.initializeContentTable2( this.produits_bases[0], 0);
      this.initializeSelectProduct2(0);

    }), error => {
      console.debug(error);

    };
  }


  initializeContentTable2(produit: Produit_Base, index: number) {
    this.selectedProduit.produit_produit_bases.push(
      new Produit_Produit_Base()
    );
    console.log(produit);
    this.selectedProduit.produit_produit_bases[index].produit_base = produit;
    this.selectedProduit.produit_produit_bases[index].produit_base_id = produit.produit_base_id;
  }
  private initializeSelectProduct2(index) {
    console.log("what's wrong'");
    const baseContext = this;
    setTimeout(function () {
      const selectProduct = jQuery('.select-product-' + index);
      selectProduct.select2();
      selectProduct.on('change', function () {
        baseContext.changeProductValue2(index, +jQuery(this).val());
      });
      selectProduct.val(baseContext.selectedProduit.produit_produit_bases[index].produit_base.position)
        .trigger('change');
    }, 20);
  }
  confirmLigne2(index: number) {
    if (!this.selectedProduit.produit_produit_bases[index].produit_base ||
      !this.selectedProduit.produit_produit_bases[index].quantite||
      this.selectedProduit.produit_produit_bases[index].quantite<=0) {

      return;
    }
    console.log(this.selectedProduit.produit_produit_bases[index]);
    if (this.selectedProduit.produit_produit_bases[index].editMode == 1) {
      this.selectedProduit.produit_produit_bases[index].editMode = 0;
      // this.initializeContentTable2(this.produits_bases[index], index + 1);
      // this.initializeSelectProduct2(index + 1);
      if(index == this.selectedProduit.produit_produit_bases.length - 1){
        this.enabled=true;
      }
    } else {

      this.selectedProduit.produit_produit_bases[index].editMode = 0;

    }
  }


  private changeProductValue2(indexLignesortie: number, indexProduct) {
    this.selectedProduit.produit_produit_bases[indexLignesortie].produit_base = this.produits_bases[indexProduct];
    this.selectedProduit.produit_produit_bases[indexLignesortie].produit_base_id = this.produits_bases[indexProduct].produit_base_id;
    this.selectedProduit.produit_produit_bases[indexLignesortie].position = indexProduct;
  }


  editLigne2(index: number) {
    this.selectedProduit.editMode2=1;
    this.confirmAllLigne2(this.selectedProduit.produit_produit_bases.length - 1);
    this.selectedProduit.produit_produit_bases[index].editMode = 1;
    this.initializeSelectProduct2(index);
  }

  deleteLigne2(index: number) {
    this.selectedProduit.produit_produit_bases.pop();
    this.selectedProduit.produit_produit_bases.splice(index, 1);
    this.initializeContentTable2(this.produits_bases[0], this.selectedProduit.produit_produit_bases.length);
    this.initializeSelectProduct2(this.selectedProduit.produit_produit_bases.length - 1);
  }


  private confirmAllLigne2(length) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne2(i);

    }
  }

  editComposition() {
    // this.selectedProduit.produit_produit_bases.pop();

    let baseContext = this;
    console.log(this.selectedProduit);

    this.busy = this.produitService.editCompositionProduit(this.selectedProduit).subscribe(response => {
      swal({
        title: 'Modifié !',
        text: 'La composition du produit a été modifiée.',
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

  addLigne(index) {
    this.enabled = false;
    this.initializeContentTable2(this.produits_bases[index+1], index + 1);
    this.initializeSelectProduct2(index + 1);
  }

  testEditProduit() {
    return this.selectedProduit.editMode2 != 0 ;
  }
}
