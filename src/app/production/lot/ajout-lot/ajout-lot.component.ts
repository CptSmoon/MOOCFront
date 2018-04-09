import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Lot} from "../../../shared/new models/lot";
import {ProduitBaseService} from "../../../shared/services/produit-base.service";
import {Router} from "@angular/router";
import {LotService} from "../../../shared/services/lot.service";
import {ProduitService} from "../../../shared/services/produit.service";
import {Utils} from "../../../shared/utils";
import {Produit} from "../../../shared/new models/produit";
import {ProduitNEwService} from "../../../shared/services/produitNEw.service";
import {LotNEwService} from "../../../shared/services/lotNEw.service";

declare var jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-ajout-lot',
  templateUrl: './ajout-lot.component.html',
  styleUrls: ['./ajout-lot.component.css']
})
export class AjoutLotComponent implements OnInit {

  busy: Subscription;
  public isEditAction: boolean = false;


  public lot: Lot = new Lot();
  public produits : Produit [] = [];
  constructor(private router: Router,
              private lotService : LotNEwService,
              private produitService : ProduitNEwService) { }

  ngOnInit() {
    this.getAllProduits();
  }

  private getAllProduits() {
    let baseContext  = this;
    this.busy = this.produitService.getProduits().subscribe(response => {
      baseContext.produits = response as Array<Produit>;
      baseContext.initializeSelectProduct();
      baseContext.lot.produit= baseContext.produits[0];
    }, error => {
      console.debug(error);
    });
  }

  private initializeSelectProduct() {

    const baseContext = this;
    setTimeout(function () {

      const selectProduct = jQuery('.select-product');
      selectProduct.select2();

      selectProduct.on('change', function () {

        baseContext.changeProductValue(+jQuery(this).val());
      });
      if(baseContext.lot.produit)
      selectProduct.val(baseContext.lot.produit.position)
        .trigger('change');
    }, 50);
  }

  private changeProductValue(indexProduct) {
    this.lot.produit= this.produits[indexProduct];
    this.lot.produit_id = this.produits[indexProduct].produit_id;
    this.lot.produit.position = indexProduct;
    console.log(this.lot.produit);
  }

  quantiteChanged(quantite_ligne,quantite,i) {
    let min = 999999;

    let prods =this.lot.produit.produit_produit_bases;
    this.lot.quantite_calculee=99999;
    console.log(prods);
    for (let item of prods ) {
      console.log("heee");


      if(item.quantite_totale == undefined ) {
        this.lot.quantite_calculee=0;
        return;
      }

      else if(( item.quantite_totale / item.quantite < min)&&(item.quantite!=0))
      {
        min = item.quantite_totale  / item.quantite ;
      }

    }
    this.lot.quantite_calculee= Math.floor(min);

  }

  private addLot() {

    let baseContext = this;

    this.busy = this.lotService.addLot(this.lot).subscribe(response => {
      swal({
        title: 'Ajouté !',
        text: 'Un nouveau ordre de fabrication est créé.',
        confirmButtonColor: '#66BB6A',
        type: 'success'
      }).then((isConfirm) => {
        this.router.navigate(['/production/lot/list']);
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
