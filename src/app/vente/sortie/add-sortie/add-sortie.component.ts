import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../../../shared/services/produit.service";
import {SortieService} from "../../../shared/services/sortie.service";
import {Produit} from "../../../shared/models/produit";
import {Utils} from "../../../shared/utils";
import {Subscription} from "rxjs/Subscription";
import {Ligne_Sortie, Sortie} from "../../../shared/models/sortie";
import {Formule_Matiere_Premiere} from "../../../shared/models/formule";
import {Emballage} from "../../../shared/models/emballage";
import {Router} from "@angular/router";
import {Client} from "../../../shared/models/client";
declare let swal: any;
declare var jQuery: any;

@Component({
  selector: 'app-add-sortie',
  templateUrl: './add-sortie.component.html',
  styleUrls: ['./add-sortie.component.css']
})
export class AddSortieComponent implements OnInit {
  busy: Subscription;
  produits: Produit[] = [];
  sortie : Sortie = new Sortie();
  private sumPrice: number;

  constructor(private produitService : ProduitService,
              private sortieService : SortieService,
              private router: Router) { }

  ngOnInit() {
    this.getAllProduits();
    this.sortie.lignes_sortie = [];
  }

  addProd(){
    let canAdd: boolean;
    canAdd = true;
    let fmp: Ligne_Sortie;
    const base = this;
    setTimeout(function () {
      for (let j = 0; j < base.sortie.lignes_sortie.length; j++) {
        fmp = base.sortie.lignes_sortie[j];
        console.log(fmp);
        if (!fmp.quantity) {

          canAdd = false;
          break;
        }
        if (!fmp.produit_id) {
          canAdd = false;
          break;
        }
      }
      if (canAdd) {
        base.sortie.lignes_sortie.push(new Ligne_Sortie());
        console.log(base.sortie.lignes_sortie);
      }
      });

  }
  addSortie(){
    let baseContext = this;
    this.busy =this.sortieService.addSortie(this.sortie).subscribe(data => {

      swal({
        title: 'Enregistrée !',
        text: 'La sortie des produits est enregistrée.',
        confirmButtonColor: '#66BB6A',
        type: 'success'
      }).then((isConfirm) => {
        baseContext.router.navigate(['/vente/sortie/list']);
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




  initializeContentTable(produit: Produit, index: number) {
    this.sortie.lignes_sortie.push(
      new Ligne_Sortie()
    );
    this.sortie.lignes_sortie[index].produit = produit;
    this.sortie.lignes_sortie[index].produit_id = produit.produit_id;
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
    if (!this.sortie.lignes_sortie[index].produit || !this.sortie.lignes_sortie[index].quantity) {
      return;
    }
    if (this.sortie.lignes_sortie[index].editMode == 1) {
      this.sortie.lignes_sortie[index].editMode = 0;
      this.initializeContentTable(this.produits[0], index + 1);
      this.initializeSelectProduct(index + 1);
    } else {
      this.sortie.lignes_sortie[index].editMode = 0;
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.sortie.lignes_sortie.length - 1);
    this.sortie.lignes_sortie[index].editMode = 2;
    this.initializeSelectProduct(index);
  }

  deleteLigne(index: number) {
    this.sortie.lignes_sortie.pop();
    this.sortie.lignes_sortie.splice(index, 1);
    this.initializeContentTable(this.produits[0], this.sortie.lignes_sortie.length);
    this.initializeSelectProduct(this.sortie.lignes_sortie.length - 1);
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
      selectProduct.val(baseContext.sortie.lignes_sortie[index].produit.position).trigger('change');
    }, 20);
  }

  private changeProductValue(indexLignesortie: number, indexProduct) {
    this.sortie.lignes_sortie[indexLignesortie].produit = this.produits[indexProduct];
    this.sortie.lignes_sortie[indexLignesortie].produit_id = this.produits[indexProduct].produit_id;
    this.sortie.lignes_sortie[indexLignesortie].produit.position = indexProduct;
    this.onChangePrice();
  }

  private onChangePrice() {

    this.sumPrice = 0;
    for (let i = 0; i < this.sortie.lignes_sortie.length; i++) {
      this.sumPrice += this.sortie.lignes_sortie[i].produit.prix * this.sortie.lignes_sortie[i].quantity;
    }
    return this.sumPrice;
  }




}
