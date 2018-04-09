import {Component, OnInit} from '@angular/core';
import {CommandeAchat} from '../../shared/new models/commande_achat';
import {ProduitBaseService} from '../../shared/services/produit-base.service';
import {Produit_Base} from '../../shared/new models/produit_base';
import {Subscription} from 'rxjs/Subscription';
import {Utils} from '../../shared/utils';
import {Type} from "../../shared/new models/type";
import {ProduitNEwService} from "../../shared/services/produitNEw.service";
import {Taxe} from "../../shared/new models/taxe";


declare var jQuery: any;
declare var swal: any;


//TODO check why selectTaxes in edit does not work
@Component({
  selector: 'app-list-produit-base',
  templateUrl: './list-produit-base.component.html',
  styleUrls: ['./list-produit-base.component.css']
})
export class ListProduitBaseComponent implements OnInit {

  busy: Subscription;
  pbs: Array<Produit_Base>;
  cmd: CommandeAchat;
  types:Array<Type>;
  taxes:Array<Taxe>;

  constructor(private produitBaseService: ProduitBaseService,
              private produitService:ProduitNEwService) {
  }

  ngOnInit() {
    this.busy = this.produitBaseService.getAll().subscribe(data => {
      this.pbs = data;
      Utils.initializeDataTables(20, 7, 'dataTable');
      this.getAllTaxes();

    });
    this.produitBaseService.getTypes().subscribe(data => {
      this.types = data;
    });
  }

  editLigne(index: number) {
    const base=this;
    for (let t of this.types){
      if (this.pbs[index].type_id==t.type_id) this.pbs[index].type=t;
    }
    this.pbs[index].editMode = 1;
  }

  confirmLigne(index: number) {
    if (!this.pbs[index].quantite_physique || !this.pbs[index].quantite_disponible) {
      return;
    }

    this.busy = this.produitBaseService.edit(this.pbs[index].produit_base_id, this.pbs[index])
      .subscribe(
        (data) => {
          this.pbs[index].editMode = 0;
          swal('Succées', 'Modificaton du quantité avec succées', 'success');
        },
        (error) => {

        }
      );

  }

  private getAllTaxes() {
    let baseContext = this;

    this.busy = this.produitService.getTaxes().subscribe(response => {
      baseContext.taxes = response;
      this.initializeAllSelectTaxes();
    }), error => {
      console.debug(error);
    };
  }

  private initializeAllSelectTaxes() {
    for (let i = 0; i < this.pbs.length; i++) {
      this.initializeSelectTaxes(i);
    }
  }

  private initializeSelectTaxes(index) {
    const baseContext = this;
    setTimeout(function () {
      const selectProduct = jQuery('.select-taxe-' + index);
      selectProduct.select2();
      baseContext.setSelectedTaxes(index);
      selectProduct.val(baseContext.pbs[index].taxes_ids).trigger('change');
    }, 20);
  }
  private setSelectedTaxes(index){
    this.pbs[index].taxes_ids=[];
    let baseContext = this;
    this.pbs[index].taxes.forEach(
      taxe =>
      {
        baseContext.pbs[index].taxes_ids.push(taxe.taxe_id);

      }
    );
    if(this.pbs[index].taxes_ids.length==0)
      baseContext.pbs[index].taxes_ids.push(baseContext.taxes[0].taxe_id);
  }

}
