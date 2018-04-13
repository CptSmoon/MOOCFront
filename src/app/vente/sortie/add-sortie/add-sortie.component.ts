import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../../../shared/services/produit.service";
import {SortieService} from "../../../shared/services/sortie.service";
import {Produit} from "../../../shared/new models/produit";
import {Subscription} from "rxjs/Subscription";
import {Sortie} from "../../../shared/new models/sortie";
import {ActivatedRoute, Router} from "@angular/router";
import {Ligne_Sortie} from "../../../shared/new models/ligne_sortie";
import {Employe} from "../../../shared/models/employe";
import {EmployeService} from "../../../shared/services/employe.service";
import {Commande} from "../../../shared/new models/commande";

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
  sortie: Sortie = new Sortie();
  private sumPrice: number;
  employes: Array<Employe>;
  employe: Employe;
  sortieId: number;

  constructor(private produitService: ProduitService,
              private sortieService: SortieService,
              private employeService: EmployeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sortieId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getAllProduits();
    this.getAllEmployes();
    this.sortie.lignes_sortie = [];
  }

  addSortie() {
    let baseContext = this;
    this.sortie.lignes_sortie.splice(this.sortie.lignes_sortie.length - 1);
    this.sortie.montant = this.onChangePrice();
    if(!this.sortieId) {

      this.busy = this.sortieService.addSortie(this.sortie).subscribe(data => {

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
    }else{
      this.busy = this.sortieService.edit(this.sortieId, this.sortie)
        .subscribe(
          (data) => {
            swal('Succées', 'La sortie a été modifiée avec succées', 'success');
            this.router.navigate(['/vente/sortie/list']);
          },
          (error) => {
          }
        );
    }

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
          if (this.sortieId)
            this.getSortieById(this.sortieId);
        },
        (error) => {

        }
      );

  }

  getAllEmployes() {
    this.employeService.getAll().subscribe(data => {
      this.employes = data;
      if (this.employes) this.sortie.employe = this.employes[0];
      if (!this.sortieId) this.initializeSelectEmploye();
    });

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
        baseContext.changeTotalLigne(index);
      });
      if (baseContext.sortieId) {
        const indexProduct = baseContext.produits.map(
          function (x) {
            return x.produit_id;
          }
        ).indexOf(baseContext.sortie.lignes_sortie[index].produit_id);
        selectProduct.val(indexProduct).trigger('change');
      } else {
        selectProduct.val(baseContext.sortie.lignes_sortie[index].produit.position).trigger('change');
      }
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
      this.sumPrice += this.sortie.lignes_sortie[i].total_price;
    }
    return this.sumPrice;
  }

  changeTotalLigne(index) {
    let total = 0;
    total = this.sortie.lignes_sortie[index].quantity * this.sortie.lignes_sortie[index].produit.prix;
    for (let i = 0; i < this.sortie.lignes_sortie[index].produit.taxes.length; i++) {
      total = total + ((total * this.sortie.lignes_sortie[index].produit.taxes[i].pourcentage) / 100);
    }
    this.sortie.lignes_sortie[index].total_price = parseFloat(total.toFixed(2));
  }

  private getSortieById(commandId: number) {
    this.sortieService.getById(this.sortieId)
      .subscribe(
        (data: Sortie) => {
          this.sortie = data;
          this.initSortieUI();
        }
      );
  }

  private initSortieUI() {
    this.sumPrice = this.sortie.montant;
    this.initializeSelectEmploye();
    this.initializeAllSelectSortie();
    this.initializeContentTable(this.produits[0], this.sortie.lignes_sortie.length);
    this.initializeSelectProduct(this.sortie.lignes_sortie.length - 1);
    this.confirmAllLigne(this.sortie.lignes_sortie.length - 1);
  }


  private initializeSelectEmploye() {
    const baseContext = this;
    setTimeout(function () {
      const selectEmploye = jQuery('#empSelect');
      selectEmploye.select2();
      selectEmploye.on('change', function () {
        baseContext.sortie.employe.employe_id= baseContext.employes[parseInt(jQuery(this).val())].employe_id;
      });
      /* Edit Additional */
      if (baseContext.sortieId) {
        const indexEmploye = baseContext.employes.map(
          function (x) {
            return x.employe_id;
          }
        ).indexOf(baseContext.sortie.employe_id);
        selectEmploye.val(indexEmploye).trigger('change');
      }
    }, 20);
  }

  private initializeAllSelectSortie() {
    for (let i = 0; i < this.sortie.lignes_sortie.length; i++) {
      this.initializeSelectProduct(i);
    }
  }
}
